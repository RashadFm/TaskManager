using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TaskManagerAppAPi.Models.Auth;
using TaskManagerAppAPi.Utilities;

namespace TaskManagerAppAPi.Helpers.Auth
{
    public class Login
    {
        public List<User> AccessLogin(string email, string password)
        {
            System_ sys = new System_();
            string sqlAuth = "DECLARE @BLOCKEDMINUTE AS INT=30; " +
                             "SELECT U_ID [id], U_USERNAME [username] ,U_IMG [image],U_EMAIL [email], U_TYPE [position], U_COMPANY [company],'' [password] FROM SYS_USER " +
                             "WHERE (U_EMAIL='" + email + "') AND U_PASSWORD = '" + System_.GenerateSHA256String(password) + "' AND U_STATUS=1 AND " +
                             "(SELECT COUNT(UL_ID) FROM SYS_USER_LOG WHERE UL_CREATEDATE > DATEADD(MINUTE,-@BLOCKEDMINUTE, GETDATE()) AND UL_EMAIL='" + email + "' AND UL_LOGIN_TYPE=0)<3";
            List<User> u = new List<User>();
            using (SqlConnection con = new SqlConnection(conn.getConnStr()))
            {
                var cmd = new SqlCommand(sqlAuth, con);
                cmd.Connection.Open();
                cmd.CommandTimeout = 1800;
                var r = cmd.ExecuteReader();
                while (r.Read())
                {
                    u.Add(new User()
                    {
                        id = int.Parse(r["id"].ToString()),
                        username = r["username"].ToString(),
                        email = r["email"].ToString(),
                        image = r["image"].ToString(),
                        position = int.Parse(r["position"].ToString()),
                        company = int.Parse(r["company"].ToString()),
                    });
                }

                Passlog(sys.GetGlobalIP(), sys.GetLocalIP(), System_.GenerateSHA256String(email), (u.Count > 0) ? u[0].id : 0, (u.Count > 0) ? 1 : 0, "Log");

                r.Close();
                cmd.Connection.Close();
                cmd.Dispose();
                con.Close();
            }

            return u;
        }
        public void Passlog(string globalIp, string locaIP, string email, int userId, int type, string logOpe)
        {
            try
            {
                List<Parameters> INS_USER_LOG = new List<Parameters>()
                        {
                            new Parameters(){ Parametr_name="UL_U_ID",Parametr_value=userId.ToString() },
                            new Parameters(){ Parametr_name="UL_EMAIL",Parametr_value=email },
                            new Parameters(){ Parametr_name="UL_LOGIN_TYPE",Parametr_value=type.ToString() },
                            new Parameters(){ Parametr_name="UL_LOCAL_IP",Parametr_value=locaIP },
                            new Parameters(){ Parametr_name="UL_GLOBAL_IP",Parametr_value=globalIp },
                            new Parameters(){ Parametr_name="UL_OPE",Parametr_value=logOpe },
                            new Parameters(){ Parametr_name="UL_STATUS",Parametr_value="1" },
                        };
                conn.dbExecute(INS_USER_LOG, "SYS_USER_LOG", "INS");
            }
            catch
            {
            }
        }
        public string catchError(string email, string password)
        {
            System_ sys = new System_();
            string authMessage = "";
            string sqlAuth = "EXEC SP_SYS_AUTH_MESSAGE @EMAIL='" + System_.GenerateSHA256String(email) + "', @PASSWORD='" + System_.GenerateSHA256String(password) + "'";
            using (SqlConnection con = new SqlConnection(conn.getConnStr()))
            {
                var cmd = new SqlCommand(sqlAuth, con);
                cmd.Connection.Open();
                cmd.CommandTimeout = 1800;
                var r = cmd.ExecuteReader();
                while (r.Read())
                {
                    authMessage = r["message"].ToString();
                }
                r.Close();
                cmd.Connection.Close();
                cmd.Dispose();
                con.Close();
            }
            return authMessage;
        }
    }
}

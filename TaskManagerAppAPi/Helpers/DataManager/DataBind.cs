using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using TaskManagerAppAPi.Models.Auth;

namespace TaskManagerAppAPi.Helpers.DataManager
{
    public class DataBind
    {
        public string CheckEmail(UserEmail userinfo)
        {

            string sql = @"SELECT COUNT(U_ID) [ope] FROM SYS_USER WHERE U_EMAIL='" + userinfo.email + "' AND U_STATUS=1";
            DataTable dt = conn.dbRun(sql);
            if (dt.Rows.Count != 0)
            {
                return dt.Rows[0][0].ToString();
            }
            return "{}";
        }

        public string GetGlobalModalData(string type, int id)
        {
            string sql = @"SP_MODAL_DATA_BIND @TYPE='" + type + "' , @COMPANY_ID="+ conn.getCompanyId()+"  ,@ID=" + id;

            DataTable dt = conn.dbRun(sql);
            if (dt.Rows.Count != 0)
            {
                return dt.Rows[0][0].ToString();
            }
            return "{}";
        }

        public string GetGlobalGridData(string type)
        {
            string sql = @"SP_GRID_DATA_BIND @TYPE='" + type + "' ,@ID=" + conn.getUserId();

            DataTable dt = conn.dbRun(sql);
            if (dt.Rows.Count != 0)
            {
                return dt.Rows[0][0].ToString();
            }
            return "{}";
        }

        public string ChangeGlobalStatus(string type, string status, int id)
        {
            string sql = @"SP_GLOBAL_STATUS @TYPE='" + type + "',@STATUS=" + status + ", @ID=" + id;
            DataTable dt = conn.dbRun(sql);
            if (dt.Rows.Count != 0)
            {
                return dt.Rows[0][0].ToString();
            }
            return "{}";
        }
    }
}

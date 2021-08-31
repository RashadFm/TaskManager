using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagerAppAPi.Controllers;
using TaskManagerAppAPi.Models.Auth;
using TaskManagerAppAPi.Models.Global;
using TaskManagerAppAPi.Models.Task;
using TaskManagerAppAPi.Utilities;

namespace TaskManagerAppAPi.Helpers.DataManager
{
    public class DataOption
    {
        public IActionResult NewOrganizationOperation(Company company)
        {
            int id = company.id;

            List<Parameters> INS_COMPANY = new List<Parameters>()
            {
                new Parameters(){ Parametr_name="C_NAME",Parametr_value=company.name.ToString() },
                new Parameters(){ Parametr_name="C_ADDRESS",Parametr_value=company.address.ToString() },
                new Parameters(){ Parametr_name="C_PHONE_NUMBER",Parametr_value=company.phone.ToString() },
                new Parameters(){ Parametr_name="C_STATUS",Parametr_value="1" },
            };

            int companyId = conn.dbExecute(INS_COMPANY, "SYS_COMPANY", "INS");


            List<Parameters> INS_ROLE = new List<Parameters>()
            {
                new Parameters(){ Parametr_name="R_NAME",Parametr_value="Adminstrator" },
                new Parameters(){ Parametr_name="R_STATUS",Parametr_value="1" },
                new Parameters(){ Parametr_name="R_COMPANY",Parametr_value=companyId.ToString() },
            };

            int roleId = conn.dbExecute(INS_ROLE, "SYS_USER_ROLE", "INS");

            List<Parameters> INS_USER = new List<Parameters>()
            {
                new Parameters(){ Parametr_name="U_USERNAME",Parametr_value=company.username.ToString() },
                new Parameters(){ Parametr_name="U_EMAIL",Parametr_value=company.email.ToString() },
                new Parameters(){ Parametr_name="U_STATUS",Parametr_value="1" },
                new Parameters(){ Parametr_name="U_TYPE",Parametr_value=roleId.ToString() },
                new Parameters(){ Parametr_name="U_COMPANY",Parametr_value=companyId.ToString()},
                new Parameters(){ Parametr_name="U_PASSWORD",Parametr_value=System_.GenerateSHA256String(company.password).ToString()},
            };

            conn.dbExecute(INS_USER, "SYS_USER", "INS");

            User u = new User()
            {
                email = company.email,
                password = company.password
            };
            var response = new AuthController().Login(u);

            return response;
        }

        public string SaveCoverImg(CoverImage coverImage)
        {
            int id = coverImage.id;

            List<Parameters> INS_USER_IMAGE = new List<Parameters>()
            {
                new Parameters(){ Parametr_name="U_IMG",Parametr_value=coverImage.image },
            };

            conn.dbExecute(INS_USER_IMAGE, "SYS_USER", "UPD", id, "U_ID");

            DataBind dtb = new DataBind();
            return dtb.GetGlobalGridData("UserDashboard");

        }

        public string ChangeUserAccount(UserAccount userAccount)
        {
            int id = userAccount.id;
            List<Parameters> INS_USER_ACCOUNT = new List<Parameters>()
            {
                new Parameters(){ Parametr_name="U_USERNAME",Parametr_value=userAccount.username },
                new Parameters(){ Parametr_name="U_EMAIL",Parametr_value=userAccount.email },
                new Parameters(){ Parametr_name="U_PASSWORD",Parametr_value=  System_.GenerateSHA256String(userAccount.password).ToString() },
            };

            conn.dbExecute(INS_USER_ACCOUNT, "SYS_USER", "UPD", id, "U_ID");
            return "{}";
        }

        public string RoleOperation(UserRole userRole)
        {
            int id = userRole.id;

            if (id == 0)
            {
                List<Parameters> INS_USER_ROLE = new List<Parameters>()
                        {
                            new Parameters(){ Parametr_name="R_NAME",Parametr_value=userRole.name },
                            new Parameters(){ Parametr_name="R_STATUS",Parametr_value="1" },
                            new Parameters(){ Parametr_name="R_COMPANY",Parametr_value=conn.getCompanyId().ToString() },
                        };

                conn.dbExecute(INS_USER_ROLE, "SYS_USER_ROLE", "INS");
            }
            else
            {
                List<Parameters> UPD_USER_ROLE = new List<Parameters>()
                        {
                            new Parameters(){ Parametr_name="R_NAME",Parametr_value=userRole.name },
                        };

                conn.dbExecute(UPD_USER_ROLE, "SYS_USER_ROLE", "UPD", id, "R_ID");
            }

            return "{}";
        }

        public string UserOperation(User user)
        {
            int id = user.id;

            if (id == 0)
            {
                List<Parameters> INS_USER_USER = new List<Parameters>()
                        {
                            new Parameters(){ Parametr_name="U_USERNAME",Parametr_value=user.username },
                            new Parameters(){ Parametr_name="U_TYPE",Parametr_value=user.position.ToString() },
                            new Parameters(){ Parametr_name="U_EMAIL",Parametr_value=user.email },
                            new Parameters(){ Parametr_name="U_COMPANY",Parametr_value=conn.getCompanyId().ToString() },
                            new Parameters(){ Parametr_name="U_STATUS",Parametr_value="1" },
                        };

                conn.dbExecute(INS_USER_USER, "SYS_USER", "INS");
            }
            else
            {
                List<Parameters> UPD_USER_USER = new List<Parameters>()
                        {
                            new Parameters(){ Parametr_name="U_USERNAME",Parametr_value=user.username },
                            new Parameters(){ Parametr_name="U_TYPE",Parametr_value=user.position.ToString() },
                            new Parameters(){ Parametr_name="U_EMAIL",Parametr_value=user.email },
                        };

                conn.dbExecute(UPD_USER_USER, "SYS_USER", "UPD", id, "U_ID");
            }

            return "{}";
        }

        public string TaskOperation(Tasks task)
        {
            int id = task.id;
            if (id == 0)
            {
                List<Parameters> INS_TASK = new List<Parameters>()
                        {
                            new Parameters(){ Parametr_name="T_NAME",Parametr_value=task.name },
                            new Parameters(){ Parametr_name="T_EFFORT",Parametr_value=task.deadline},
                            new Parameters(){ Parametr_name="T_DESC",Parametr_value=task.desc },
                            new Parameters(){ Parametr_name="T_T_STATUS",Parametr_value=task.status.ToString() },
                            new Parameters(){ Parametr_name="T_STATUS",Parametr_value="1" },
                            new Parameters(){ Parametr_name="T_U_ID",Parametr_value=conn.getUserId().ToString() },
                        };
                int taskId = conn.dbExecute(INS_TASK, "T_TASK", "INS");

                if (task.uids != "")
                {
                    foreach (var item in task.uids.Split(","))
                    {
                        List<Parameters> INS_TASK_ASSIGNER = new List<Parameters>()
                        {
                            new Parameters(){ Parametr_name="TA_T_ID",Parametr_value=taskId.ToString() },
                            new Parameters(){ Parametr_name="TA_TA_ID",Parametr_value=item.ToString()},
                            new Parameters(){ Parametr_name="TA_U_ID",Parametr_value=conn.getUserId().ToString()},
                            new Parameters(){ Parametr_name="TA_STATUS",Parametr_value="1" },
                        };
                        conn.dbExecute(INS_TASK_ASSIGNER, "T_TASK_ASSIGNER", "INS");
                    }
                }
            }
            else
            {
                List<Parameters> UPD_TASK = new List<Parameters>()
                        {
                            new Parameters(){ Parametr_name="T_NAME",Parametr_value=task.name },
                            new Parameters(){ Parametr_name="T_EFFORT",Parametr_value=task.deadline},
                            new Parameters(){ Parametr_name="T_DESC",Parametr_value=task.desc },
                            new Parameters(){ Parametr_name="T_T_STATUS",Parametr_value=task.status.ToString() },
                        };
                conn.dbExecute(UPD_TASK, "T_TASK", "UPD", id, "T_ID");

                DataBind dtb = new DataBind();
                dtb.ChangeGlobalStatus("TaskAssigners", "-1", id);

                if (task.uids != "")
                {
                    foreach (var item in task.uids.Split(","))
                    {
                        List<Parameters> UPD_TASK_ASSIGNER = new List<Parameters>()
                        {
                            new Parameters(){ Parametr_name="TA_T_ID",Parametr_value=id.ToString() },
                            new Parameters(){ Parametr_name="TA_TA_ID",Parametr_value=item.ToString()},
                            new Parameters(){ Parametr_name="TA_U_ID",Parametr_value=conn.getUserId().ToString()},
                            new Parameters(){ Parametr_name="TA_STATUS",Parametr_value="1" },
                        };
                        conn.dbExecute(UPD_TASK_ASSIGNER, "T_TASK_ASSIGNER", "INS");
                    }
                }
            }
            return "{}";
        }
    }
}

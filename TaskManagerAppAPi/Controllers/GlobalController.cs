using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagerAppAPi.Helpers.DataManager;

namespace TaskManagerAppAPi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Authorize]
    public class GlobalController : ControllerBase
    {
        [HttpGet]
        [Route("Global/GetGlobalGridData/{type?}")]
        public IActionResult GetGlobalGridData(string type)
        {
            DataBind dtb = new DataBind();
            return Content(dtb.GetGlobalGridData(type), "application/json");
        }

        [HttpGet]
        [Route("Global/GetGlobalModalData/{type?}/{id?}")]
        public IActionResult GetGlobalModalData(string type, int id)
        {
            DataBind dtb = new DataBind();
            return Content(dtb.GetGlobalModalData(type, id), "application/json");
        }

        [HttpGet]
        [Route("Global/ChangeGlobalStatus/{type?}/{status?}/{id?}")]
        public IActionResult ChangeGlobalStatus(string type, string status, int id)
        {
            DataBind dtb = new DataBind();
            return Content(dtb.ChangeGlobalStatus(type, status, id), "application/json");
        }
    }
}

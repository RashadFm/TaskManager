using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using TaskManagerAppAPi.Helpers;
using TaskManagerAppAPi.Helpers.DataManager;
using TaskManagerAppAPi.Models.Task;

namespace TaskManagerAppAPi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        [HttpPost]
        [Route("Task/TaskOperation/")]
        public IActionResult TaskOperation([FromBody] Tasks task)
        {
            DataOption dtb = new DataOption();
            return Content(dtb.TaskOperation(task), "application/json");
        }

    }
}

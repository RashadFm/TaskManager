using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagerAppAPi.Helpers.DataManager;
using TaskManagerAppAPi.Models.Auth;
using TaskManagerAppAPi.Models.Global;
using TaskManagerAppAPi.Utilities;



namespace TaskManagerAppAPi.Controllers
{
    [Produces("application/json")]
    [Authorize]
    public class UserController : ControllerBase
    {

        [HttpPost]
        [RequestSizeLimit(52428800)]
        [Route("User/UploadCoverImg/")]
        public async Task<IActionResult> UploadCoverImg(FileUpload fileUpload)
            {
            List<Files> files = await FileOperation.UploadFile(fileUpload);
            return Ok(files);
        }

        [HttpPost]
        [Route("User/SaveCoverImg/")]
        public IActionResult SaveCoverImg([FromBody] CoverImage coverImage)
        {
            DataOption dtb = new DataOption();
            return Content(dtb.SaveCoverImg(coverImage), "application/json");
        }


        [HttpPost]
        [Route("User/ChangeUserAccount/")]
        public IActionResult ChangeUserAccount([FromBody] UserAccount coverImage)
        {
            DataOption dtb = new DataOption();
            return Content(dtb.ChangeUserAccount(coverImage), "application/json");
        }

        [HttpPost]
        [Route("User/RoleOperation/")]
        public IActionResult RoleOperation([FromBody] UserRole userRole)
        {
            DataOption dtb = new DataOption();
            return Content(dtb.RoleOperation(userRole), "application/json");
        }

        [HttpPost]
        [Route("User/UserOperation/")]
        public IActionResult UserOperation([FromBody] User user)
        {
            DataOption dtb = new DataOption();
            return Content(dtb.UserOperation(user), "application/json");
        }
    }
}

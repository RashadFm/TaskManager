using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TaskManagerAppAPi.Helpers.Auth;
using TaskManagerAppAPi.Models.Auth;
using TaskManagerAppAPi.Helpers.DataManager;

namespace TaskManagerAppAPi.Controllers
{
    [ApiController]
    [Route("Auth")]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] User userinfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Login lg = new Login();
            IActionResult response = Unauthorized();
            List<User> user = lg.AccessLogin(userinfo.email, userinfo.password);
            if (user.Count != 0)
            {
                 JwtToken token = new JwtToken();
                var tokenString = token.GenerateJWT(user);
                List<LocalStorage> localStorage = new List<LocalStorage>()
                {
                    new LocalStorage()
                    {
                        id = int.Parse(user[0].id.ToString()),
                        email = userinfo.email,
                        username = user[0].username,
                        imgPath = user[0].image,
                    }
                };

                response = Ok(new
                {
                    token = tokenString,
                    userinfo = localStorage,
                    islogin = 1
                });
            }
            else
            {
                string errorMessage = lg.catchError(userinfo.email, userinfo.password);
                response = Ok(new
                {
                    error = errorMessage,
                    islogin = 0
                });
            }

            return response;
        }

        [HttpPost]
        [Route("CheckEmail")]
        public IActionResult CheckEmail([FromBody] UserEmail userinfo)
        {
            DataBind dtb = new DataBind();
            return Content(dtb.CheckEmail(userinfo), "application/json");
        }

        [HttpPost]
        [Route("NewOrganizationOperation")]
        public IActionResult NewOrganizationOperation([FromBody] Company company)
        {
            DataOption dtb = new DataOption();
            return dtb.NewOrganizationOperation(company);
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagerAppAPi.Models.Auth
{
    public class User
    {
        public int id { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
        public string username { get; set; }
        public string image { get; set; }
        public int position { get; set; }
        public int company { get; set; }
    }

    public class UserEmail
    {
        public string email { get; set; }
    }

    public class UserRole
    {
        public int id { get; set; }
        public string name { get; set; }
    }

    public class UserAccount
    {
        public int id { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        public string password { get; set; }
        public string username { get; set; }

    }

    public class Company
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string username { get; set; }
        public string phone { get; set; }
        public string address { get; set; }

    }
}

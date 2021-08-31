using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagerAppAPi.Models.Auth
{
    public class LocalStorage
    {
        public int id { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string imgPath { get; set; }
    }
}

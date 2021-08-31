using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagerAppAPi.Models.Task
{
    public class Tasks
    {
        public int id { get; set; }
        public string name { get; set; }
        public string deadline { get; set; }
        public int status { get; set; }
        public string uids { get; set; }
        public string desc { get; set; }
    }
}

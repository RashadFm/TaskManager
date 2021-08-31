using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TaskManagerAppAPi.Models.Global;

namespace TaskManagerAppAPi.Utilities
{
    public class FileOperation
    {
        public async static Task<List<Files>> UploadFile(FileUpload fileUpload)
        {
            List<Files> Attach = new List<Files>();
            var f = fileUpload.collection.Files;
            if (f == null)
            {
                Attach.Add(new Files()
                {
                    error = "Not selected files",
                });
                return Attach;
            }
            else
            {
                foreach (var file in f)
                {
                    try
                    {
                        var myfilename = string.Format(@"{0}", Guid.NewGuid());
                        string smallPath = "/wwwroot/Files/User/" + fileUpload.type;
                        string folderPath = System.IO.Directory.GetCurrentDirectory() + smallPath;
                        string fullPath = folderPath + "/" + myfilename + Path.GetExtension(file.FileName);
                        string savedPath = "Files/User/" + fileUpload.type + "/" + myfilename + Path.GetExtension(file.FileName);
                        if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                        Attach.Add(new Files()
                        {
                            name = file.FileName,
                            url = savedPath,
                            size = int.Parse(file.Length.ToString()),
                            type = file.ContentType,
                        });
                    }
                    catch (Exception ex)
                    {
                        Attach.Add(new Files()
                        {
                            error = ex.ToString(),
                        });
                        return Attach;
                    }
                }
            }
            return Attach;
        }

    }
}

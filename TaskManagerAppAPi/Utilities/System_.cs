using Microsoft.AspNetCore.Http.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;


namespace TaskManagerAppAPi.Utilities
{
    public class System_
    {
        public string GetMAC()
        {
            string macAddresses = "";

            foreach (NetworkInterface nic in NetworkInterface.GetAllNetworkInterfaces())
            {
                if (nic.OperationalStatus == OperationalStatus.Up)
                {
                    macAddresses += nic.GetPhysicalAddress().ToString();
                    break;
                }
            }
            return macAddresses;
        }
        public string GetGlobalIP()
        {
            string GlobalIP = "";
            try
            {
                GlobalIP = TaskManagerAppAPi.Helpers.HttpContext.Current.Connection.RemoteIpAddress.ToString();
            }
            catch
            {
                GlobalIP = "";
            }
            return GlobalIP;
        }
        public string GetCurrentUrl()
        {
            string url = TaskManagerAppAPi.Helpers.HttpContext.Current.Request.GetEncodedUrl().ToString();
            return url;
        }
        public string GetLocalIP()
        {
            string LocalIP = TaskManagerAppAPi.Helpers.HttpContext.Current.Connection.LocalIpAddress.ToString();
            return LocalIP;
        }
        public string GetHostName()
        {
            string LocalIP = Dns.GetHostEntry(GetGlobalIP()).ToString();
            return LocalIP;
        }
        public static string GenerateSHA256String(string inputString)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = sha256.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }
        public static string GenerateSHA512String(string inputString)
        {
            SHA512 sha512 = SHA512Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = sha512.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }
        private static string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }
    }
}

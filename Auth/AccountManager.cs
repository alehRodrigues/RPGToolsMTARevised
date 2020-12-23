using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace RPGToolsMTARevised.Auth
{
    public static class AccountManager
    {
        [JSInvokable]
        public static void Login(string user)
        {
            Console.WriteLine(user);
            //throw new NotImplementedException();
        }

        [JSInvokable]
        public static void Logout()
        {
            throw new NotImplementedException();
        }

        public static void AddPhoneNumber(string phone)
        {
            throw new NotImplementedException();
        }

        public static void ChangeDisplayName(string name)
        {
            throw new NotImplementedException();
        }

        public static void ChangeEmail(string email)
        {
            throw new NotImplementedException();
        }

        public static void ChangePhotoURL(string imgUri)
        {
            throw new NotImplementedException();
        }

        public static void ChangeRole(Roles role)
        {
            throw new NotImplementedException();
        }

        public static void DeleteAccount()
        {
            throw new NotImplementedException();
        }

        public static void GetPasswordChangePage()
        {
            throw new NotImplementedException();
        }

        

        

        private static void ChangePassword()
        {
            throw new NotImplementedException();
        }
    }
}

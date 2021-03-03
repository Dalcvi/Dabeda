using Strength.DB;
using System;
using System.Collections.Generic;
using System.Text;

namespace Users.Core
{
    public interface IUserServices
    {
        void CreateUser(User user);
        bool Login(string email);
    }
}

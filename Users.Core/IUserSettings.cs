using Strength.DB.Models;

namespace Users.Core
{
    public interface IUserSettings
    {
        void ChangePassword(string currentPassword, string newPassword, string confirmedPassword);
        string ChangeUsername(string username);
        void ChangeEmail(string currentPassword, string newEmail);
    }
}

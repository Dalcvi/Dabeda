using Microsoft.AspNetCore.Http;
using System.Linq;
using Strength.DB;
using Strength.DB.Models;
using Users.Core.CustomExceptions;
using Microsoft.AspNet.Identity;
using System;
using System.Text.RegularExpressions;
using Users.Core.Utilities;

namespace Users.Core
{
    public class UserSettings : IUserSettings
    {
        private readonly AppDbContext _context;
        private readonly User _user;
        private readonly IPasswordHasher _passwordHasher;


        public UserSettings(AppDbContext context, IHttpContextAccessor httpContextAccessor, IPasswordHasher passwordHasher)
        {
            _context = context;
            _user = _context.Users.First(u => u.Username == httpContextAccessor.HttpContext.User.Identity.Name);
            _passwordHasher = passwordHasher;
        }

        /// <summary>
        /// used for changing user's password
        /// </summary>
        /// <param name="currentPassword"> user's current password </param>
        /// <param name="newPassword"> given password </param>
        /// <param name="confirmedPassword"> given password, that should match newPassword </param>
        public void ChangePassword(string currentPassword, string newPassword, string confirmedPassword)
        {
            // password must contain at least: one uppercase letter, one lowercase letter, one digit,
            // and have at least 8 characters
            var regexPasswordCheck = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})";

            // finding user in the database
            var dbUser = _context.Users
                .FirstOrDefault(u => u.Id == _user.Id);

            // checking if user was found and verifying his password
            if (dbUser == null || _passwordHasher.VerifyHashedPassword(dbUser.Password, currentPassword) == PasswordVerificationResult.Failed)
            {
                throw new InvalidUsernamePasswordException("Invalid username or password");
            }

            // checking if user's password meets the requirements
            Match match = Regex.Match(newPassword, regexPasswordCheck);
            if (!match.Success)
            {
                throw new Exception("Password is too weak");
            }

            // checking if given passwords match
            if (newPassword != confirmedPassword)
            {
                throw new Exception("Passwords do not match");
            }
            dbUser.Password = _passwordHasher.HashPassword(newPassword);

            _context.SaveChanges();
        }

        public string ChangeUsername(string username)
        {
            // finding user in the database
            var dbUser = _context.Users
                .FirstOrDefault(u => u.Id == _user.Id);

            // checking if user was found and verifying his password
            if (dbUser == null)
            {
                throw new DoesNotMatchIdException("User not found");
            }

            dbUser.Username = username;

            _context.SaveChanges();
            return JwtGenerator.GenerateUserToken(username);
        }

        public void ChangeEmail(string currentPassword, string newEmail)
        {
            // finding user in the database
            var dbUser = _context.Users
                .FirstOrDefault(u => u.Id == _user.Id);

            // checking if user was found and verifying his password
            if (dbUser == null || _passwordHasher.VerifyHashedPassword(dbUser.Password, currentPassword) == PasswordVerificationResult.Failed)
            {
                throw new InvalidUsernamePasswordException("Invalid password");
            }

            dbUser.Email = newEmail;

            _context.SaveChanges();
        }
    }
}

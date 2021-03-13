using Microsoft.AspNet.Identity;
using Microsoft.EntityFrameworkCore;
using Strength.DB;
using System;
using System.Threading.Tasks;
using Users.Core.CustomExceptions;
using Users.Core.DTO;
using Users.Core.Utilities;

namespace Users.Core
{
    public class UserServices : IUserServices
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher _passwordHasher;

        public UserServices(AppDbContext context, IPasswordHasher passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        //-----------------------------------------------------------------------------------------------------------------------
        // sign in
        //-----------------------------------------------------------------------------------------------------------------------
        public async Task<AuthenticatedUser> SignIn(Strength.DB.User user)
        {
            var dbUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == user.Email);

            if (dbUser == null || _passwordHasher.VerifyHashedPassword(dbUser.Password, user.Password) == PasswordVerificationResult.Failed)
            {
                throw new InvalidUsernamePasswordException("Invalid username or password");
            }

            return new AuthenticatedUser
            {
                Username = dbUser.Username,
                Token = JwtGenerator.GenerateUserToken(dbUser.Username),
                Id = dbUser.Id
            };
        }
        //-----------------------------------------------------------------------------------------------------------------------


        //-----------------------------------------------------------------------------------------------------------------------
        // sign up
        //-----------------------------------------------------------------------------------------------------------------------
        public async Task<AuthenticatedUser> SignUp(Strength.DB.User user)
        {
            var checkUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username.Equals(user.Username));

            if (checkUser != null)
            {
                throw new UsernameAlreadyExistsException("Username already exists");
            }

            user.Password = _passwordHasher.HashPassword(user.Password);
            Random ran = new Random();
            string id = ran.Next(100, 2048).ToString();
            Int64 unixTimestamp = (Int64)DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
            id += unixTimestamp.ToString();
            for (int i = 0; i < 2; i++)
            {
                id += ran.Next(1000, 3048).ToString();
            }
            byte[] toEncodeAsBytes = System.Text.ASCIIEncoding.ASCII.GetBytes(id);
            user.Id = Convert.ToBase64String(toEncodeAsBytes);
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();

            return new AuthenticatedUser
            {
                Username = user.Username,
                Token = JwtGenerator.GenerateUserToken(user.Username),
                Id = user.Id
            };
        }
        //-----------------------------------------------------------------------------------------------------------------------
    }
}

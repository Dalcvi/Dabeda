using Microsoft.AspNet.Identity;
using Microsoft.EntityFrameworkCore;
using Strength.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Users.Core.CustomExceptions;
using Users.Core.DTO;
using Users.Core.Utilities;

namespace Users.Core
{
    public class UserServices : IUserServices
    {
        private readonly AppDbContext _context;

        // user for password hashing
        private readonly IPasswordHasher _passwordHasher;

        public UserServices(AppDbContext context, IPasswordHasher passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }


        /// <summary>
        /// logging into a user's account
        /// </summary>
        /// <param name="user"></param>
        /// <returns> user's username, JWT token, their ID </returns>
        public async Task<AuthenticatedUser> SignIn(Strength.DB.User user)
        {
            // finding user in the database
            var dbUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == user.Email);

            // checking if user was found and if given password matches password in the database
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


        /// <summary>
        /// creating a new account
        /// </summary>
        /// <param name="user"></param>
        /// <returns> their username, JWT token and ID </returns>
        public async Task<AuthenticatedUser> SignUp(Strength.DB.User user)
        {
            // checking if username exists
            var checkUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username.Equals(user.Username));

            if (checkUser != null)
            {
                throw new UsernameAlreadyExistsException("Username already exists");
            }

            // checking if email is legitimate
            bool isEmail = Regex.IsMatch(user.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
            if (!isEmail)
            {
                throw new Exception("Invalid email");
            }

            // checking if password is strong enough
            var regexPasswordCheck = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})";
            Match match = Regex.Match(user.Password, regexPasswordCheck);

            if (!match.Success)
            {
                throw new Exception("Password is too weak");
            }

            // hashing password
            user.Password = _passwordHasher.HashPassword(user.Password);

            // generating random ID
            Random ran = new Random();
            string id = ran.Next(100, 2048).ToString();
            Int64 unixTimestamp = (Int64)DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
            id += unixTimestamp.ToString();

            for (int i = 0; i < 2; i++)
            {
                id += ran.Next(1000, 3048).ToString();
            }
            byte[] toEncodeAsBytes = System.Text.ASCIIEncoding.ASCII.GetBytes(id);

            // assigning generated ID
            user.Id = Convert.ToBase64String(toEncodeAsBytes);

            // save changes
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


        // used for creating initial program for a user, days, programs and exercises are hardcoded
        public void CreateInitialProgram(string id)
        {
            // finding user by his ID
            Strength.DB.User user = _context.Users.FirstOrDefault(n => n.Id == id);

            // creating a program
            Strength.DB.Models.ExProgram program = new Strength.DB.Models.ExProgram();
            program.Name = "First program";
            program.User = user;
            _context.Programs.Add(program);
            _context.SaveChanges();

            // finding program in a database
            program = _context.Programs.First(n => id == n.User.Id);

            // creating a day in found program
            Strength.DB.Models.Day firstDay = new Strength.DB.Models.Day();
            firstDay.Name = "First day";
            firstDay.Program = program;
            _context.Days.Add(firstDay);
            _context.SaveChanges();

            // creating another day in a program
            Strength.DB.Models.Day secondDay = new Strength.DB.Models.Day();
            secondDay.Name = "Second day";
            secondDay.Program = program;
            _context.Days.Add(secondDay);
            _context.SaveChanges();

            // creating a list of days in the program
            List<Strength.DB.Models.Day> days = _context.Days.Include(n => n.Program).Where(n => id == n.Program.User.Id).ToList();

            // creating exercises for the first day
            CreateInitialExercise(days[0], "Bench press");
            CreateInitialExercise(days[0], "Squats");
            CreateInitialExercise(days[0], "Rows");

            // creating exercises for the second day
            CreateInitialExercise(days[1], "Overhead press");
            CreateInitialExercise(days[1], "Deadlift");

            _context.SaveChanges();
        }
        //-----------------------------------------------------------------------------------------------------------------------


        // used for creating a exercise, hardcoded
        private void CreateInitialExercise(Strength.DB.Models.Day day, string name)
        {
            Strength.DB.Models.Exercise exer = new Strength.DB.Models.Exercise();
            exer.Name = name;
            exer.Day = day;
            exer.Program = day.Program;

            // hardcoded amount of sets in each exercise, feel free to change
            exer.SetsAmount = 3;

            _context.Exercises.Add(exer);
            _context.SaveChanges();
        }
    }
}

using Strength.DB;
using System.Threading.Tasks;
using Users.Core.DTO;

namespace Users.Core
{
    public interface IUserServices
    {

        Task<AuthenticatedUser> SignUp(Strength.DB.User user);
        Task<AuthenticatedUser> SignIn(Strength.DB.User user);
    }
}

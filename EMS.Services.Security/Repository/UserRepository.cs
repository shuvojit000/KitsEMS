using System;
using EMS.Services.Security.Response;
using EMS.Services.Security.Request;

namespace EMS.Services.Security.Repository
{
    public class UserRepository:IUserRepository
    {
        public UserResponseDTO ValidateUser(LogInRequestDTO request)
        {
            return new UserResponseDTO(){};
        }
    }
}

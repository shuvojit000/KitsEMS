using System;
using EMS.Services.Security.Response;
using EMS.Services.Security.Request;

namespace EMS.Services.Security.Repository
{
    public interface IUserRepository
    {
        UserResponseDTO ValidateUser(LogInRequestDTO request);
    }
}

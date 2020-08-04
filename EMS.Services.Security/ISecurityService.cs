using System;
using EMS.Services.Security.Response;
using EMS.Services.Security.Request;

namespace EMS.Services.Security
{
    public interface ISecurityService
    {
         UserResponseDTO ValidateUser(LogInRequestDTO request);
    }
}

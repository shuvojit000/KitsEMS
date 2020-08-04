using System;
using EMS.Services.Security.Response;
using EMS.Services.Security.Request;

namespace EMS.Services.Security
{
    public class SecurityService:ISecurityService
    {
        public UserResponseDTO ValidateUser(LogInRequestDTO request)
        {
             using (var unitOfWork = new SecurityUnitOfWork())
            {
                return unitOfWork.UserRepository.ValidateUser(request);
            }
        }
    }
}

using System;
using EMS.Services.Security.Response;
using EMS.Services.Security.Request;
using Microsoft.Extensions.Configuration;

namespace EMS.Services.Security
{
    public class SecurityService:ISecurityService
    {
        private IConfiguration _config;
        public SecurityService(IConfiguration config)
        {
            _config = config;
        }
        private string DbConnection=>_config.GetConnectionString("DefaultConnection");
        public UserResponseDTO ValidateUser(LogInRequestDTO request)
        {
             using (var unitOfWork = new SecurityUnitOfWork(this.DbConnection))
            {
                return unitOfWork.UserRepository.ValidateUser(request);
            }
        }
    }
}

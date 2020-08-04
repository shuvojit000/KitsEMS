using System;
using EMS.Services.Security.Repository;

namespace EMS.Services.Security
{
    
    public class SecurityUnitOfWork: IDisposable
    {
        private IUserRepository userRepository;
        public void Dispose() => GC.SuppressFinalize(this);
        public IUserRepository UserRepository
        {
            get
            {
                if (this.userRepository == null)
                {

                    this.userRepository = new UserRepository();
                }

                return this.userRepository;
            }
        }
    }
}

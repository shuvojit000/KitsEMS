using System;
using EMS.Services.Security.Repository;

namespace EMS.Services.Security
{
    
    public class SecurityUnitOfWork: IDisposable
    {
        public SecurityUnitOfWork(string dbConnection)
        {
            this.DbConnection=dbConnection;
        }
        public string DbConnection{get;set;}
        private IUserRepository userRepository;
        public void Dispose() => GC.SuppressFinalize(this);
        public IUserRepository UserRepository
        {
            get
            {
                if (this.userRepository == null)
                {

                    this.userRepository = new UserRepository(this.DbConnection);
                }

                return this.userRepository;
            }
        }
    }
}

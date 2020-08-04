using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using EMS.Application.Admin.Models;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using EMS.Services.Security;

namespace EMS.Application.Admin.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ISecurityService securityService;

        public HomeController(ILogger<HomeController> logger,SecurityService _securityService)
        {
            _logger = logger;
            securityService=_securityService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public IActionResult LogIn()=>View();
        [HttpPost]
        public async Task<IActionResult> Login(string ssn)
        {
            // var user ;
            // if (user == null)
            // {
            //     ModelState.AddModelError("", "User not found");
            //     return View();
            // }
            var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
            identity.AddClaim(new Claim(ClaimTypes.Name, ""));
            identity.AddClaim(new Claim(ClaimTypes.GivenName, ""));
            identity.AddClaim(new Claim(ClaimTypes.Surname, ""));
    
            
    
            var principal = new ClaimsPrincipal(identity);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
    
            return RedirectToAction("Index","Home");
        }
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
    
            return RedirectToAction(nameof(LogIn));
        }
    }
}

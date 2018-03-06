using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace TerminalOrderProcessor.Controllers
{
    [Route("api/[controller]")]
    public class CompanySearch : Controller
    {
        [HttpGet("[action]")]
        public dynamic FindByName(string name)
        {
            return new List<object>
            {
                new {
                    name = "Demo"
                },
                new {
                    name = "Demo2"
                }
            };
        }
    }
}

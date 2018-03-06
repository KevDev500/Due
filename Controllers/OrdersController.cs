using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace TerminalOrderProcessor.Controllers
{
    [Route("api/[controller]")]
    public class Orders : Controller
    {
        public static IList<object> OrderList = new List<object>();

        [HttpPost("/")]
        public IActionResult CreateOrder(object order)
        {
            OrderList.Add(order);
            return Ok();
        }
    }
}

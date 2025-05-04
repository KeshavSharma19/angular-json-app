// Controllers/DataController.cs
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "data.json");

        [HttpGet]
        public IActionResult Get()
        {
            if (!System.IO.File.Exists(_filePath))
                return NotFound("Data file not found.");

            var jsonData = System.IO.File.ReadAllText(_filePath);
            var dataItem = JsonSerializer.Deserialize<DataItem>(jsonData, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return Ok(dataItem);
        }

        [HttpPost]
        public IActionResult Save([FromBody] DataItem dataItem)
        {
            var jsonData = JsonSerializer.Serialize(dataItem, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            System.IO.File.WriteAllText(_filePath, jsonData);
            return Ok("Data saved successfully.");
        }
    }
}

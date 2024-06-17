
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController :BaseApiController
    {


 

        [HttpGet]  // api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            // return await _context.Activities.ToListAsync();
            return await Mediator.Send(new List.Query());
        }


        [HttpGet("{id}")] // api/activity/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)

        {
            return await Mediator.Send(new Details.Query{Id=id });
        }
    }
}

using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

// Request Models and Response Models: Separate from your domain models, these are used to define the shape of 
// data expected in requests and responses. This separation allows you to keep the domain layer isolated 
// from any presentation concerns.

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

        
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
      
            // line below was passing params for okay but I git below error:
            // Argument 1: cannot convert from 'void' to 'object?
            // The Mediator.Send() method sends the Create.Command instance to MediatR.
            // MediatR finds the handler associated with the Create.Command class. 
            // This handler is defined in the Application layer as Create.Handler.
            
            await Mediator.Send(new Create.Command {Activity = activity});
            return Ok();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;

          await Mediator.Send(new Edit.Command {Activity = activity});
           
            return Ok();

        }
        

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            await Mediator.Send(new Delete.Command{Id = id});

            return Ok();
        }

    }
}
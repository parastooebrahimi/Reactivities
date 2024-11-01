using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Create
{
    public class Command : IRequest // query returns data command do not and it is a fundamental difference between them
    {
        public Activity Activity { get; set; }
         
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Activity).SetValidator(new ActivityValidator());

        }
    }


    public class Handler : IRequestHandler<Command>  
    // The Handler class is responsible for processing the Command when it is sent.
    // It implements IRequestHandler<Command>, which MediatR uses to route the Command to the correct handler.
    //  This handler processes the Create.Command sent by the controller.
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
       
        {
           _context = context;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
             // Inside Handle, the handler receives a Command object (request), which contains the Activity to be added.
             // The handler interacts with the DataContext (an Entity Framework DbContext) to add the Activity to the 
             // database and save the changes.
            _context.Activities.Add(request.Activity);
            await _context.SaveChangesAsync();
       
            
        }
    }
}

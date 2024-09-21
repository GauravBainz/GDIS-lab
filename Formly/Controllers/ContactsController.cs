
using Formly.Data;
using Formly.Models;
using Formly.Models.Domain;
using Microsoft.AspNetCore.Mvc;


namespace Formly.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {

        private readonly FormlyDBContext dbContext;
        public ContactsController(FormlyDBContext dbContext)
        {
            this.dbContext = dbContext;
        }



        [HttpGet(Name = "GetContacts")]
        public IActionResult GetAllContacts()
        {
            var contacts = dbContext.Contacts.ToList();
            if (contacts == null || !contacts.Any())
    {
        Console.WriteLine("No contacts found");
    }
            return Ok(contacts);
        }


        [HttpPost]  
        public IActionResult AddContact(AddContactRequestDTO request)
        {
            var domainModelContact = new Contact
            {
                Id = Guid.NewGuid(),
                firstName = request.firstName,
                lastName = request.lastName,
                email = request.email,
                age = request.age,
                q1 = request.q1,
                q2 = request.q2,
                q3 = request.q3,
                q4 = request.q4,
                q5 = request.q5,
                q6 = request.q6,
                q7 = request.q7,
                q8 = request.q8,
                q9 = request.q9,
                q10 = request.q10,
                q11 = request.q11,
                q12= request.q12,
                q13= request.q13,
                q14= request.q14,
                q15= request.q15,
                
            };

            dbContext.Contacts.Add(domainModelContact);
            dbContext.SaveChanges();

            return Ok(domainModelContact);
        }     

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteContact(Guid id)
        {
            var contact = dbContext.Contacts.Find(id);

            if(contact is not null)
            {
                dbContext.Contacts.Remove(contact);
                dbContext.SaveChanges();
            }
            return Ok();
        }
    }
}
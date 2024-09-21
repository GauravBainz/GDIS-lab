using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Formly.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Formly.Data
{
    public class FormlyDBContext: DbContext
    {
        public FormlyDBContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
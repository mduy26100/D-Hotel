﻿namespace Infrastructure.Data.Seeds
{
    public static class SeedIdentityData
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

            //Seed roles
            if(!await roleManager.RoleExistsAsync(Roles.Manager))
            {
                await roleManager.CreateAsync(new ApplicationRole { Name = Roles.Manager });
            }
            if(!await roleManager.RoleExistsAsync(Roles.User))
            {
                await roleManager.CreateAsync(new ApplicationRole { Name = Roles.User });
            }
            if(!await roleManager.RoleExistsAsync(Roles.HotelManager))
            {
                await roleManager.CreateAsync(new ApplicationRole { Name = Roles.HotelManager });
            }
            if (!await roleManager.RoleExistsAsync(Roles.HotelStaff))
            {
                await roleManager.CreateAsync(new ApplicationRole { Name = Roles.HotelStaff });
            }

            var emailManager = "manager@example.com";
            var managerUser = await userManager.FindByEmailAsync(emailManager);

            if (managerUser == null)
            {
                managerUser = new ApplicationUser
                {
                    UserName = emailManager,
                    Email = emailManager,
                    FirstName = "Manager",
                    LastName = "User",
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(managerUser, "Password123!");
                await userManager.AddToRoleAsync(managerUser, Roles.Manager);
            }
        }
    }
}

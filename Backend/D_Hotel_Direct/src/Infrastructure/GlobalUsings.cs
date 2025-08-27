// Domain Models
global using Domain.Models.Bookings;
global using Domain.Models.Hotels;
global using Domain.Models.Purposes;
global using Domain.Models.Rooms;
global using Domain.Models.Utilities;
global using Domain.Consts;

// Infrastructure Models & Configurations
global using Infrastructure.Auth.Models;
global using Infrastructure.Data.Configurations.Auth;
global using Infrastructure.Data.Configurations.Bookings;
global using Infrastructure.Data.Configurations.Hotels;
global using Infrastructure.Data.Configurations.Purposes;
global using Infrastructure.Data.Configurations.Rooms;
global using Infrastructure.Data.Configurations.Utilities;

// Entity Framework || Identity
global using Microsoft.EntityFrameworkCore;
global using Microsoft.EntityFrameworkCore.Metadata.Builders;
global using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
global using Microsoft.AspNetCore.Identity;
global using Microsoft.Extensions.DependencyInjection;
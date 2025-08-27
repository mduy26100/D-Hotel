using Application.Common.Interfaces.Shared;
using Application.Features.Hotels.Mappings;
using Application.Features.Places.Interfaces.Services.Command.CreateHotelLocation;
using Application.Features.Places.Interfaces.Services.Command.CreateLocation;
using Application.Features.Places.Interfaces.Services.Command.DeleteHotelLocation;
using Application.Features.Places.Interfaces.Services.Command.DeleteLocation;
using Application.Features.Places.Interfaces.Services.Command.UpdateHotelLocation;
using Application.Features.Places.Interfaces.Services.Command.UpdateLocation;
using Application.Features.Places.Interfaces.Services.Query.GetAllHotelLocations;
using Application.Features.Places.Interfaces.Services.Query.GetAllLocations;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByHotelId;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByLocationId;
using Application.Features.Places.Interfaces.Services.Query.GetLocationById;
using Application.Features.Places.Mappings;
using Application.Features.Places.Repositories;
using Application.Features.Places.Services.Command.CreateHotelLocation;
using Application.Features.Places.Services.Command.CreateLocation;
using Application.Features.Places.Services.Command.DeleteHotelLocation;
using Application.Features.Places.Services.Command.DeleteLocation;
using Application.Features.Places.Services.Command.UpdateHotelLocation;
using Application.Features.Places.Services.Command.UpdateLocation;
using Application.Features.Places.Services.Query.GetAllHotelLocations;
using Application.Features.Places.Services.Query.GetAllLocations;
using Application.Features.Places.Services.Query.GetHotelLocationByHotelId;
using Application.Features.Places.Services.Query.GetHotelLocationByLocationId;
using Application.Features.Places.Services.Query.GetLocationById;
using Application.Features.Utilities.Interfaces.Services.Command.CreateHotelUtility;
using Application.Features.Utilities.Interfaces.Services.Command.DeleteHotelUtility;
using Application.Features.Utilities.Interfaces.Services.Command.UpdateHotelUtility;
using Application.Features.Utilities.Services.Command.CreateHotelUtility;
using Application.Features.Utilities.Services.Command.DeleteHotelUtility;
using Application.Features.Utilities.Services.Command.UpdateHotelUtility;
using Infrastructure.Common.Shared;
using Infrastructure.Places.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Connect SQL Server Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

//Add Identity services
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

//Option Token
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("Jwt"));

//Add MediatR
builder.Services.AddMediatR(typeof(LoginCommandHandler).Assembly);

//Add FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<ChangePasswordCommandValidator>();
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

//JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    var jwtSecret = builder.Configuration["JWT:Secret"]
    ?? throw new InvalidOperationException("JWT Secret is not configured");
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),

        ClockSkew = TimeSpan.Zero
    };
});

//CloudFlare
builder.Services.Configure<CloudinarySettings>(
    builder.Configuration.GetSection("Cloudinary"));

//Mappings
builder.Services.AddAutoMapper(cfg => {
    cfg.AddProfile<UtilityMappingProfile>();
});
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<HotelMappingProfile>();
});
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<PlaceMappingProfile>();
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//DI
//Auth
//ChangePassword
builder.Services.AddScoped<IChangePasswordStrategyFactory, ChangePasswordStrategyFactory>();
builder.Services.AddScoped<IChangePasswordStrategy, SelfChangePasswordStrategy>();
builder.Services.AddScoped<IChangePasswordService, ChangePasswordService>();

//Login
builder.Services.AddScoped<ILoginStrategyFactory, LoginStrategyFactory>();
builder.Services.AddScoped<ILoginStrategy, EmailPasswordLoginStrategy>();
builder.Services.AddScoped<ILoginService, LoginService>();

//Logout
builder.Services.AddScoped<ILogoutStrategyFactory, LogoutStrategyFactory>();
builder.Services.AddScoped<ILogoutStrategy, LocalLogoutStrategy>();
builder.Services.AddScoped<ILogoutService, LogoutService>();

//Register
builder.Services.AddScoped<IRegisterStrategyFactory, RegisterStrategyFactory>();
builder.Services.AddScoped<IRegisterStrategy, EmailPasswordRegisterStrategy>();
builder.Services.AddScoped<IRegisterService, RegisterService>();

//TokenRefresh
builder.Services.AddScoped<ITokenRefreshService, TokenRefreshService>();

//UpdatteProfile
builder.Services.AddScoped<IUpdateProfileStrategyFactory, UpdateProfileStrategyFactory>();
builder.Services.AddScoped<IUpdateProfileStrategy, SelfUpdateProfileStrategy>();
builder.Services.AddScoped<IUpdateProfileStrategy, ManagerUpdateProfileStrategy>();
builder.Services.AddScoped<ManagerUpdateProfileStrategy>();
builder.Services.AddScoped<SelfUpdateProfileStrategy>();
builder.Services.AddScoped<IUpdateProfileService, UpdateProfileService>();

//Repository
//builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

//FileUpLoad
builder.Services.AddScoped<IFileUploadService, FileUploadService>();

//Utilities
//Repositories
builder.Services.AddScoped<IUtilityRepository, UtilityRepository>();
builder.Services.AddScoped<IUtilityItemRepository, UtilityItemRepository>();
builder.Services.AddScoped<IRoomUtilityRepository, RoomUtilityRepository>();
builder.Services.AddScoped<IHotelUtilityRepository, HotelUtilityRepository>();

//Create Utility
builder.Services.AddScoped<ICreateUtilityService, CreateUtilityService>();

//Delete Utility
builder.Services.AddScoped<IDeleteUtilityService, DeleteUtilityService>();

//Update Utility
builder.Services.AddScoped<IUpdateUtilityService, UpdateUtilityService>();

//Create Utility Item
builder.Services.AddScoped<ICreateUtilityItemService, CreateUtilityItemService>();

//Delete Utility Item
builder.Services.AddScoped<IDeleteUtilityItemService, DeleteUtilityItemService>();

//Update Utility Item
builder.Services.AddScoped<IUpdateUtilityItemService, UpdateUtilityItemService>();

//Get All Utilities
builder.Services.AddScoped<IGetAllUtilitiesService, GetAllUtilitiesService>();

//Get Utility By Id
builder.Services.AddScoped<IGetUtilityByIdService, GetUtilityByIdService>();

//Get Utility Items By Hotel Id
builder.Services.AddScoped<IGetUtilityByHotelIdService, GetUtilityByHotelIdService>();

//Get Utility Items By Room Id
builder.Services.AddScoped<IGetUtilityByRoomIdService, GetUtilityByRoomIdService>();

//Get Utility Items By Utility Id
builder.Services.AddScoped<IGetUtilityItemsByUtilityIdService, GetUtilityItemsByUtilityIdService>();

//Create Hotel Utility
builder.Services.AddScoped<ICreateHotelUtilityService, CreateHotelUtilityService>();

//Update Hotel Utility
builder.Services.AddScoped<IUpdateHotelUtilityService, UpdateHotelUtilityService>();

//Delete Hotel Utility
builder.Services.AddScoped<IDeleteHotelUtilityService, DeleteHotelUtilityService>();

//Places
//Repositories
builder.Services.AddScoped<ILocationsRepository, LocationsRepository>();
builder.Services.AddScoped<IHotelLocationsRepository, HotelLocationsRepository>();

//Create Location
builder.Services.AddScoped<ICreateLocationService, CreateLocationService>();

//Get All Locations
builder.Services.AddScoped<IGetAllLocationsService, GetAllLocationsService>();

//Delete Location
builder.Services.AddScoped<IDeleteLocationService, DeleteLocationService>();

//Update Location
builder.Services.AddScoped<IUpdateLocationService, UpdateLocationService>();

//Get Location By Id
builder.Services.AddScoped<IGetLocationByIdService, GetLocationByIdService>();

//Create Hotel Location
builder.Services.AddScoped<ICreateHotelLocationService, CreateHotelLocationService>();

//Update Hotel Location
builder.Services.AddScoped<IUpdateHotelLocationService, UpdateHotelLocationService>();

//Delete Hotel Location
builder.Services.AddScoped<IDeleteHotelLocationService, DeleteHotelLocationService>();

//Get All Hotel Locations
builder.Services.AddScoped<IGetAllHotelLocationsService, GetAllHotelLocationsService>();

//Get Hotel Location By Hotel Id
builder.Services.AddScoped<IGetHotelLocationByHotelIdService, GetHotelLocationByHotelIdService>();

//Get Hotel Location By Location Id
builder.Services.AddScoped<IGetHotelLocationByLocationIdService, GetHotelLocationByLocationIdService>();

//Hotels
//Repositories
builder.Services.AddScoped<IHotelRepository, HotelRepository>();
builder.Services.AddScoped<IHotelCategoryRepository, HotelCategoryRepository>();

//Create Hotel
builder.Services.AddScoped<ICreateHotelService, CreateHotelService>();

//Delete Hotel
builder.Services.AddScoped<IDeleteHotelService, DeleteHotelService>();

//Update Hotel
builder.Services.AddScoped<IUpdateHotelService, UpdateHotelService>();

//Create Hotel Category
builder.Services.AddScoped<ICreateHotelCategoryService, CreateHotelCategoryService>();

//Delete Hotel Category
builder.Services.AddScoped<IDeleteHotelCategoryService, DeleteHotelCategoryService>();

//Update Hotel Category
builder.Services.AddScoped<IUpdateHotelCategoryService, UpdateHotelCategoryService>();

//Get All Hotels
builder.Services.AddScoped<IGetAllHotelsService, GetAllHotelsService>();

//GetHotel By Id
builder.Services.AddScoped<IGetHotelByIdService, GetHotelByIdService>();

//Get Hotels By Category Id
builder.Services.AddScoped<IGetHotelsByCategoryIdService, GetHotelsByCategoryIdService>();

//Get All Hotel Categories
builder.Services.AddScoped<IGetAllHotelCategoriesService, GetAllHotelCategoriesService>();

//Get All Hotel Category By Id
builder.Services.AddScoped<IGetHotelCategoryByIdService, GetHotelCategoryByIdService>();

//JWT Token
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

//Current User Context
builder.Services.AddScoped<ICurrentUserContext, CurrentUserContext>();

//Current User
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

//Get All Users
builder.Services.AddScoped<IGetAllUsersService, GetAllUsersService>();

//Decorators
builder.Services.AddScoped<TokenRefreshService>();
builder.Services.AddScoped<ITokenRefreshService>(sp =>
{
    var core = sp.GetRequiredService<TokenRefreshService>();
    var logger = sp.GetRequiredService<ILogger<LogTokenRefreshDecorator>>();
    return new LogTokenRefreshDecorator(core, logger);
});

//Logging
builder.Services.AddScoped(typeof(ILoggingService<>), typeof(LoggingService<>));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowed(_ => true)
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseAuthorization();

app.MapControllers();


//Data Seed
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await SeedIdentityData.SeedAsync(services);
}

app.Run();

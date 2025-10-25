using Application.Common.Interfaces.Services.User;
using Application.Common.Interfaces.Shared;
using Application.Features.Auth.Configurations;
using Infrastructure.Common.Shared;
using Infrastructure.Services.User;

namespace WebAPI.DependencyInjection.Auth
{
    public static class AuthServiceRegistration
    {
        public static IServiceCollection AddAuthService(this IServiceCollection services, IConfiguration configuration)
        {
            // ===== Identity =====
            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // ===== JWT =====
            services.Configure<JwtSettings>(configuration.GetSection("Jwt"));

            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;

                    var jwtSecret = configuration["JWT:Secret"]
                        ?? throw new InvalidOperationException("JWT Secret is not configured");

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["JWT:ValidIssuer"],
                        ValidAudience = configuration["JWT:ValidAudience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            // ===== Decorators =====
            services.AddScoped<TokenRefreshService>();
            services.AddScoped<ITokenRefreshService>(sp =>
            {
                var core = sp.GetRequiredService<TokenRefreshService>();
                var logger = sp.GetRequiredService<ILogger<LogTokenRefreshDecorator>>();
                return new LogTokenRefreshDecorator(core, logger);
            });

            // ===== Core Services =====
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
            services.AddScoped<ICurrentUserContext, CurrentUserContext>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IGetAllUsersService, GetAllUsersService>();

            // ===== Change Password =====
            services.AddScoped<IChangePasswordStrategyFactory, ChangePasswordStrategyFactory>();
            services.AddScoped<IChangePasswordStrategy, SelfChangePasswordStrategy>();
            services.AddScoped<IChangePasswordService, ChangePasswordService>();

            // ===== Login =====
            services.AddScoped<ILoginStrategyFactory, LoginStrategyFactory>();
            services.AddScoped<ILoginStrategy, EmailPasswordLoginStrategy>();
            services.AddScoped<ILoginStrategy, FacebookLoginStrategy>();
            services.AddScoped<ILoginStrategy, GoogleLoginStrategy>();
            services.AddScoped<ILoginService, LoginService>();

            // ===== Logout =====
            services.AddScoped<ILogoutStrategyFactory, LogoutStrategyFactory>();
            services.AddScoped<ILogoutStrategy, LocalLogoutStrategy>();
            services.AddScoped<ILogoutService, LogoutService>();

            // ===== Register =====
            services.AddScoped<IRegisterStrategyFactory, RegisterStrategyFactory>();
            services.AddScoped<IRegisterStrategy, EmailPasswordRegisterStrategy>();
            services.AddScoped<IRegisterService, RegisterService>();

            // ===== Token Refresh =====
            services.AddScoped<ITokenRefreshService, TokenRefreshService>();

            // ===== Update Profile =====
            services.AddScoped<IUpdateProfileStrategyFactory, UpdateProfileStrategyFactory>();
            services.AddScoped<IUpdateProfileStrategy, SelfUpdateProfileStrategy>();
            services.AddScoped<IUpdateProfileStrategy, ManagerUpdateProfileStrategy>();
            services.AddScoped<IUpdateProfileService, UpdateProfileService>();

            // Strategies (direct resolve)
            services.AddScoped<ManagerUpdateProfileStrategy>();
            services.AddScoped<SelfUpdateProfileStrategy>();

            // ✅ Bind Facebook settings
            services.Configure<FacebookAuthSettings>(
                configuration.GetSection("FacebookAuth"));

            // ✅ Bind Facebook settings
            services.Configure<GoogleAuthSettings>(
                configuration.GetSection("GoogleAuth"));

            return services;
        }
    }
}
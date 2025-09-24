using Application.Common.Interfaces.Persistence.EFCore;
using Domain.Models.Places;
using Infrastructure.Data.Configurations.Places;

namespace Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public ApplicationDbContext()
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Auth
            builder.ApplyConfiguration(new RefreshTokenConfiguration());

            //Places
            builder.ApplyConfiguration(new LocationsConfiguration());
            builder.ApplyConfiguration(new HotelLocationsConfiguration());

            // Bookings
            builder.ApplyConfiguration(new BookingConfiguration());
            builder.ApplyConfiguration(new BookingDetailConfiguration());
            builder.ApplyConfiguration(new InvoiceConfiguration());

            // Hotels
            builder.ApplyConfiguration(new HotelConfiguration());
            builder.ApplyConfiguration(new HotelCategoryConfiguration());
            builder.ApplyConfiguration(new HotelStaffConfiguration());

            // Purposes
            builder.ApplyConfiguration(new HotelTravelPurposeConfiguration());
            builder.ApplyConfiguration(new RoomPurposeConfiguration());
            builder.ApplyConfiguration(new RoomTypePurposeConfiguration());
            builder.ApplyConfiguration(new TravelPurposeConfiguration());

            // Rooms
            builder.ApplyConfiguration(new BedTypeConfiguration());
            builder.ApplyConfiguration(new QuantityGuestConfiguration());
            builder.ApplyConfiguration(new RoomTypeImageConfiguration());
            builder.ApplyConfiguration(new RoomTypeConfiguration());

            // Utilities
            builder.ApplyConfiguration(new HotelUtilityConfiguration());
            builder.ApplyConfiguration(new RoomUtilityConfiguration());
            builder.ApplyConfiguration(new UtilityConfiguration());
            builder.ApplyConfiguration(new UtilityItemConfiguration());

            builder.Entity<ApplicationUser>().ToTable("AppUsers");
            builder.Entity<ApplicationRole>().ToTable("AppRoles");
        }

        //Auth
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        //Places
        public DbSet<Locations> Locations { get; set; }
        public DbSet<HotelLocations> HotelLocations { get; set; }

        //Bookings
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingDetail> BookingDetails { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        //Hotels
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<HotelCategory> HotelCategories { get; set; }
        public DbSet<HotelStaff> HotelStaffs { get; set; }

        //Purposes
        public DbSet<HotelTravelPurpose> HotelTravelPurposes { get; set; }
        public DbSet<RoomPurpose> RoomPurposes { get; set; }
        public DbSet<RoomTypePurpose> RoomTypePurposes { get; set; }
        public DbSet<TravelPurpose> TravelPurposes { get; set; }

        //Rooms
        public DbSet<BedType> BedTypes { get; set; }
        public DbSet<QuantityGuest> QuantityGuests { get; set; }
        public DbSet<RoomTypeImage> RoomTypeImages { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }

        //Utilities
        public DbSet<HotelUtility> HotelUtility { get; set; }
        public DbSet<RoomUtility> RoomUtility { get; set; }
        public DbSet<Utility> Utilities { get; set; }
        public DbSet<UtilityItem> UtilityItems { get; set; }
    }
}

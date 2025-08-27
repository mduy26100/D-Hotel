using Domain.Models.Places;

namespace Infrastructure.Data.Configurations.Places
{
    public class HotelLocationsConfiguration : IEntityTypeConfiguration<HotelLocations>
    {
        public void Configure(EntityTypeBuilder<HotelLocations> builder)
        {
            builder.ToTable("HotelLocations");

            builder.HasKey(hl => new { hl.HotelId, hl.LocationId });

            builder.HasOne<Locations>()
                   .WithMany()
                   .HasForeignKey(hl => hl.LocationId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

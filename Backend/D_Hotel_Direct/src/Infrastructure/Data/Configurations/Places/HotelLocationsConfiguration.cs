using Domain.Models.Places;

namespace Infrastructure.Data.Configurations.Places
{
    public class HotelLocationsConfiguration : IEntityTypeConfiguration<HotelLocations>
    {
        public void Configure(EntityTypeBuilder<HotelLocations> builder)
        {
            builder.ToTable("HotelLocations");

            builder.HasKey(hl => new { hl.HotelId, hl.LocationId });

            builder.Property(hl => hl.HotelId)
                .IsRequired();

            builder.Property(hl => hl.LocationId)
                .IsRequired();
        }
    }
}

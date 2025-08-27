using Domain.Models.Places;

namespace Infrastructure.Data.Configurations.Places
{
    public class LocationsConfiguration : IEntityTypeConfiguration<Locations>
    {
        public void Configure(EntityTypeBuilder<Locations> builder)
        {
            builder.ToTable("Locations");

            builder.HasKey(l => l.Id);

            builder.Property(l => l.Name)
                   .IsRequired()
                   .HasMaxLength(255);

            builder.Property(l => l.ImgUrl)
                   .IsRequired()
                   .HasMaxLength(500);
        }
    }
}

namespace Infrastructure.Data.Configurations.Hotels
{
    public class HotelStaffConfiguration : IEntityTypeConfiguration<HotelStaff>
    {
        public void Configure(EntityTypeBuilder<HotelStaff> builder)
        {
            builder.ToTable("HotelStaffs");

            builder.HasKey(hs => hs.Id);

            builder.Property(hs => hs.UserId)
                   .IsRequired();

            builder.Property(hs => hs.HotelId)
                   .IsRequired();

            builder.Property(hs => hs.IsActive)
                   .HasDefaultValue(true);

            builder.HasIndex(hs => hs.UserId)
                   .IsUnique();

            builder.HasIndex(hs => hs.HotelId);
        }
    }
}

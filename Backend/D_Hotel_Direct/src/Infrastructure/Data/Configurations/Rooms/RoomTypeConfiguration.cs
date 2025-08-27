namespace Infrastructure.Data.Configurations.Rooms
{
    public class RoomTypeConfiguration : IEntityTypeConfiguration<RoomType>
    {
        public void Configure(EntityTypeBuilder<RoomType> builder)
        {
            builder.ToTable("RoomTypes");

            builder.HasKey(r => r.Id);

            builder.Property(r => r.HotelId)
                .IsRequired();

            builder.Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(128);

            builder.Property(r => r.Description)
                .IsRequired()
                .HasMaxLength(1024);

            builder.Property(r => r.Price)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(r => r.Area)
                .IsRequired()
                .HasMaxLength(64);

            builder.Property(r => r.QuantityGuestId)
                .IsRequired();

            builder.Property(r => r.BedTypeId)
                .IsRequired();

            builder.Property(r => r.Quantity)
                .IsRequired();

            builder.Property(r => r.IsActive)
                .IsRequired();
        }
    }
}
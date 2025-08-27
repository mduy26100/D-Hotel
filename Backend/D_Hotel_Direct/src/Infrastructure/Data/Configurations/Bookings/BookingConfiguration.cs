namespace Infrastructure.Data.Configurations.Bookings
{
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.ToTable("Bookings");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.UserId)
                .IsRequired(false);

            builder.Property(b => b.HotelId)
                .IsRequired();

            builder.Property(b => b.RoomTypeId)
                .IsRequired();

            builder.Property(b => b.CheckInDate)
                .IsRequired();

            builder.Property(b => b.CheckOutDate)
                .IsRequired();

            builder.Property(b => b.GuestName)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(b => b.GuestPhone)
                .IsRequired()
                .HasMaxLength(64);

            builder.Property(b => b.GuestEmail)
                .HasMaxLength(256);

            builder.Property(b => b.Note)
                .HasMaxLength(1024);

            builder.Property(b => b.CreatedByStaffId)
                .IsRequired(false);

            builder.Property(b => b.IsWalkIn)
                .IsRequired();

            builder.Property(b => b.Status)
                .IsRequired()
                .HasMaxLength(64);

            builder.Property(b => b.BookingDate)
                .IsRequired();
        }
    }
}
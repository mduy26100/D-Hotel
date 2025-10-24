namespace Infrastructure.Data.Configurations.Bookings
{
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.ToTable("Bookings");

            // Key
            builder.HasKey(b => b.Id);

            // Properties
            builder.Property(b => b.UserId)
                .IsRequired(false);

            builder.Property(b => b.HotelId)
                .IsRequired();

            builder.Property(b => b.RoomTypeId)
                .IsRequired();

            builder.Property(b => b.CheckInDate)
                .IsRequired(false);

            builder.Property(b => b.CheckOutDate)
                .IsRequired(false);

            builder.Property(b => b.StartTime)
                .IsRequired(false);

            builder.Property(b => b.EndTime)
                .IsRequired(false);

            builder.Property(b => b.RentalPrice)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            builder.Property(b => b.RentalType)
                .HasMaxLength(64)
                .IsRequired(false);

            builder.Property(b => b.GuestName)
                .HasMaxLength(256)
                .IsRequired();

            builder.Property(b => b.GuestPhone)
                .HasMaxLength(64)
                .IsRequired();

            builder.Property(b => b.GuestEmail)
                .HasMaxLength(256)
                .IsRequired(false);

            builder.Property(b => b.Note)
                .HasMaxLength(1024)
                .IsRequired(false);

            builder.Property(b => b.CreatedByStaffId)
                .IsRequired(false);

            builder.Property(b => b.IsWalkIn)
                .IsRequired();

            builder.Property(b => b.Status)
                .HasMaxLength(64)
                .IsRequired();

            builder.Property(b => b.BookingDate)
                .IsRequired();
        }
    }
}
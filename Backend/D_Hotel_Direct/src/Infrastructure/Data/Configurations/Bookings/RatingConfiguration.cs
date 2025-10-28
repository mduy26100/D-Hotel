namespace Infrastructure.Data.Configurations.Bookings
{
    public class RatingConfiguration : IEntityTypeConfiguration<Rating>
    {
        public void Configure(EntityTypeBuilder<Rating> builder)
        {
            builder.ToTable("Ratings");

            builder.HasKey(r => r.Id);

            builder.Property(r => r.BookingId)
                .IsRequired();

            builder.Property(r => r.UserId)
                .IsRequired();

            builder.Property(r => r.HotelId)
                .IsRequired();

            builder.Property(r => r.RatingValue)
                .IsRequired();

            builder.Property(r => r.Comment)
                .HasColumnType("nvarchar(max)");

            builder.Property(r => r.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");
        }
    }
}

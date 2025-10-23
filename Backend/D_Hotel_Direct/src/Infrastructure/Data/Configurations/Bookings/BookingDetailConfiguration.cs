namespace Infrastructure.Data.Configurations.Bookings
{
    public class BookingDetailConfiguration : IEntityTypeConfiguration<BookingDetail>
    {
        public void Configure(EntityTypeBuilder<BookingDetail> builder)
        {
            builder.ToTable("BookingDetails");

            // Key
            builder.HasKey(d => d.Id);

            // Properties
            builder.Property(d => d.BookingId)
                .IsRequired();

            builder.Property(d => d.ItemType)
                .HasMaxLength(128)
                .IsRequired(false); // nullable để mở rộng

            builder.Property(d => d.ItemId)
                .IsRequired(false);

            builder.Property(d => d.ItemName)
                .HasMaxLength(256)
                .IsRequired(false); // nullable

            builder.Property(d => d.UnitPrice)
                .HasColumnType("decimal(18,2)")
                .IsRequired(false);

            builder.Property(d => d.Quantity)
                .IsRequired(false);

            builder.Property(d => d.TotalPrice)
                .HasColumnType("decimal(18,2)")
                .IsRequired(false);

            // Relationship
            builder.HasOne<Booking>()
                .WithMany()
                .HasForeignKey(d => d.BookingId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

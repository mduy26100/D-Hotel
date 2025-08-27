namespace Infrastructure.Data.Configurations.Bookings
{
    public class BookingDetailConfiguration : IEntityTypeConfiguration<BookingDetail>
    {
        public void Configure(EntityTypeBuilder<BookingDetail> builder)
        {
            builder.ToTable("BookingDetails");

            builder.HasKey(d => d.Id);

            builder.Property(d => d.BookingId)
                .IsRequired();

            builder.Property(d => d.ItemType)
                .IsRequired()
                .HasMaxLength(128);

            builder.Property(d => d.ItemId)
                .IsRequired(false);

            builder.Property(d => d.ItemName)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(d => d.UnitPrice)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(d => d.Quantity)
                .IsRequired();

            builder.Property(d => d.TotalPrice)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.HasOne<Booking>()
                .WithMany()
                .HasForeignKey(d => d.BookingId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
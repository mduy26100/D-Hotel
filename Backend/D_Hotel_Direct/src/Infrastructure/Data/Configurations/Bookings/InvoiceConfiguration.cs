namespace Infrastructure.Data.Configurations.Bookings
{
    public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {
            builder.ToTable("Invoices");

            builder.HasKey(i => i.Id);

            builder.Property(i => i.BookingId)
                .IsRequired();

            builder.Property(i => i.InvoiceNumber)
                .IsRequired()
                .HasMaxLength(128);

            builder.Property(i => i.TotalAmount)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(i => i.PaymentMethod)
                .IsRequired()
                .HasMaxLength(64);

            builder.Property(i => i.IssuedDate)
                .IsRequired();

            builder.Property(i => i.Status)
                .IsRequired()
                .HasMaxLength(32);

            builder.Property(i => i.PaymentIntentId)
                .HasMaxLength(128)
                .IsRequired(false);

            builder.HasOne<Booking>()
                .WithMany()
                .HasForeignKey(i => i.BookingId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
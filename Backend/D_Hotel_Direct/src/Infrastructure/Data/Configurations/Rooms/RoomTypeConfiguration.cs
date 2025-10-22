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

            // --- Giá thuê theo giờ ---
            builder.Property(r => r.BaseHourlyPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(r => r.BaseHours);

            builder.Property(r => r.ExtraHourPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(r => r.MaxHours);

            // --- Giá qua đêm ---
            builder.Property(r => r.OvernightPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(r => r.OvernightStartTime);
            builder.Property(r => r.OvernightEndTime);

            // --- Giá theo ngày ---
            builder.Property(r => r.DailyPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(r => r.DailyStartTime);
            builder.Property(r => r.DailyEndTime);

            // --- Diện tích ---
            builder.Property(r => r.Area)
                .IsRequired()
                .HasMaxLength(64);

            // --- Thông tin tham chiếu ---
            builder.Property(r => r.QuantityGuestId)
                .IsRequired();

            builder.Property(r => r.BedTypeId)
                .IsRequired();

            builder.Property(r => r.Quantity)
                .IsRequired();

            builder.Property(r => r.IsActive)
                .IsRequired();

            // --- Relationships ---
            builder.HasOne<BedType>()
                .WithMany()
                .HasForeignKey(r => r.BedTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne<QuantityGuest>()
                .WithMany()
                .HasForeignKey(r => r.QuantityGuestId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

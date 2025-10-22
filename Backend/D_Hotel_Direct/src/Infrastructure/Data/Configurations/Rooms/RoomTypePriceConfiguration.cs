namespace Infrastructure.Data.Configurations.Rooms
{
    public class RoomTypePriceConfiguration : IEntityTypeConfiguration<RoomTypePrice>
    {
        public void Configure(EntityTypeBuilder<RoomTypePrice> builder)
        {
            builder.ToTable("RoomTypePrices");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Id)
                .ValueGeneratedOnAdd();

            builder.Property(p => p.RoomTypeId)
                .IsRequired();

            builder.Property(p => p.PriceType)
                .IsRequired()
                .HasMaxLength(64);

            // --- Giá theo từng loại ---
            builder.Property(p => p.BaseHourlyPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.ExtraHourPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.OvernightPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.DailyPrice)
                .HasColumnType("decimal(18,2)");

            // --- Khoảng thời gian áp dụng ---
            builder.Property(p => p.StartDate)
                .IsRequired();

            builder.Property(p => p.EndDate)
                .IsRequired();

            builder.Property(p => p.IsActive)
                .IsRequired();

            // --- Quan hệ ---
            builder.HasOne<RoomType>()
                .WithMany()
                .HasForeignKey(p => p.RoomTypeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

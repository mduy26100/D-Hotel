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

            builder.Property(p => p.Price)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.StartDate)
                .IsRequired();

            builder.Property(p => p.EndDate)
                .IsRequired();

            builder.Property(p => p.PriceType)
                .HasMaxLength(64);

            builder.Property(p => p.IsActive)
                .IsRequired();

            // Relationship
            builder.HasOne<RoomType>()
                .WithMany()
                .HasForeignKey(p => p.RoomTypeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

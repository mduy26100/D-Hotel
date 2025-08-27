namespace Infrastructure.Data.Configurations.Hotels
{
    public class HotelConfiguration : IEntityTypeConfiguration<Hotel>
    {
        public void Configure(EntityTypeBuilder<Hotel> builder)
        {
            builder.ToTable("Hotels");

            builder.HasKey(h => h.Id);

            builder.Property(h => h.Name)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(h => h.CategoryId)
                .IsRequired();

            builder.Property(h => h.HotelManagerId)
                .IsRequired();

            builder.Property(h => h.Address)
                .IsRequired()
                .HasMaxLength(512);

            builder.Property(h => h.Description)
                .IsRequired()
                .HasMaxLength(2048);

            builder.Property(h => h.ImgUrl)
                .IsRequired()
                .HasMaxLength(512);

            builder.Property(h => h.IsActive)
                .IsRequired();

            builder.HasOne<HotelCategory>()
                .WithMany()
                .HasForeignKey(h => h.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
namespace Infrastructure.Data.Configurations.Hotels
{
    public class HotelCategoryConfiguration : IEntityTypeConfiguration<HotelCategory>
    {
        public void Configure(EntityTypeBuilder<HotelCategory> builder)
        {
            builder.ToTable("HotelCategories");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(128);
        }
    }
}
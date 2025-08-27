namespace Infrastructure.Data.Configurations.Utilities
{
    public class HotelUtilityConfiguration : IEntityTypeConfiguration<HotelUtility>
    {
        public void Configure(EntityTypeBuilder<HotelUtility> builder)
        {
            builder.ToTable("HotelUtilityItems");

            builder.HasKey(hui => new { hui.HotelId, hui.UtilityId });

            builder.Property(hui => hui.HotelId)
                .IsRequired();

            builder.Property(hui => hui.UtilityId)
                .IsRequired();
        }
    }
}
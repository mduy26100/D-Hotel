namespace Infrastructure.Data.Configurations.Purposes
{
    public class HotelTravelPurposeConfiguration : IEntityTypeConfiguration<HotelTravelPurpose>
    {
        public void Configure(EntityTypeBuilder<HotelTravelPurpose> builder)
        {
            builder.ToTable("HotelTravelPurpose");

            builder.HasKey(htp => new { htp.HotelId, htp.TravelPurposeId });

            builder.Property(htp => htp.HotelId)
                .IsRequired();

            builder.Property(htp => htp.TravelPurposeId)
                .IsRequired();
        }
    }
}
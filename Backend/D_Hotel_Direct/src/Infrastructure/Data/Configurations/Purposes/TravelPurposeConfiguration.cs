namespace Infrastructure.Data.Configurations.Purposes
{
    public class TravelPurposeConfiguration : IEntityTypeConfiguration<TravelPurpose>
    {
        public void Configure(EntityTypeBuilder<TravelPurpose> builder)
        {
            builder.ToTable("TravelPurposes");

            builder.HasKey(tp => tp.Id);

            builder.Property(tp => tp.Name)
                .IsRequired()
                .HasMaxLength(128);
        }
    }
}
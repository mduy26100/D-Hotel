namespace Infrastructure.Data.Configurations.Purposes
{
    public class RoomPurposeConfiguration : IEntityTypeConfiguration<RoomPurpose>
    {
        public void Configure(EntityTypeBuilder<RoomPurpose> builder)
        {
            builder.ToTable("RoomPurposes");

            builder.HasKey(rp => rp.Id);

            builder.Property(rp => rp.Name)
                .IsRequired()
                .HasMaxLength(128);
        }
    }
}
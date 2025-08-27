namespace Infrastructure.Data.Configurations.Purposes
{
    public class RoomTypePurposeConfiguration : IEntityTypeConfiguration<RoomTypePurpose>
    {
        public void Configure(EntityTypeBuilder<RoomTypePurpose> builder)
        {
            builder.ToTable("RoomTypePurposes");

            builder.HasKey(rtp => new { rtp.RoomId, rtp.RoomPurposeId });

            builder.Property(rtp => rtp.RoomId)
                .IsRequired();

            builder.Property(rtp => rtp.RoomPurposeId)
                .IsRequired();
        }
    }
}
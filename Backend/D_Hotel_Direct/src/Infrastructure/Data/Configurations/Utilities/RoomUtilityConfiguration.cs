namespace Infrastructure.Data.Configurations.Utilities
{
    public class RoomUtilityConfiguration : IEntityTypeConfiguration<RoomUtility>
    {
        public void Configure(EntityTypeBuilder<RoomUtility> builder)
        {
            builder.ToTable("RoomUtilityItems");

            builder.HasKey(rui => new { rui.RoomId, rui.UtilityId });

            builder.Property(rui => rui.RoomId)
                .IsRequired();

            builder.Property(rui => rui.UtilityId)
                .IsRequired();
        }
    }
}
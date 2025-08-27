namespace Infrastructure.Data.Configurations.Utilities
{
    public class UtilityItemConfiguration : IEntityTypeConfiguration<UtilityItem>
    {
        public void Configure(EntityTypeBuilder<UtilityItem> builder)
        {
            builder.ToTable("UtilityItems");

            builder.HasKey(ui => ui.Id);

            builder.Property(ui => ui.UtilityId)
                .IsRequired();

            builder.Property(ui => ui.Name)
                .IsRequired()
                .HasMaxLength(128);
        }
    }
}
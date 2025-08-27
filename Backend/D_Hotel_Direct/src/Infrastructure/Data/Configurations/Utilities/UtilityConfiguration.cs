namespace Infrastructure.Data.Configurations.Utilities
{
    public class UtilityConfiguration : IEntityTypeConfiguration<Utility>
    {
        public void Configure(EntityTypeBuilder<Utility> builder)
        {
            builder.ToTable("Utilities");

            builder.HasKey(u => u.Id);

            builder.Property(u => u.Name)
                .IsRequired()
                .HasMaxLength(128);

            builder.Property(u => u.IconUrl)
                .IsRequired()
                .HasMaxLength(256);
        }
    }
}
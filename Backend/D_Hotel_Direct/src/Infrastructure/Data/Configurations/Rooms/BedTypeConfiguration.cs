namespace Infrastructure.Data.Configurations.Rooms
{
    public class BedTypeConfiguration : IEntityTypeConfiguration<BedType>
    {
        public void Configure(EntityTypeBuilder<BedType> builder)
        {
            builder.ToTable("BedTypes");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.Name)
                .IsRequired()
                .HasMaxLength(128);

            builder.Property(b => b.Description)
                .HasMaxLength(512);

            builder.Property(b => b.Dimensions)
                .HasMaxLength(64);

            builder.Property(b => b.Capacity)
                .IsRequired();

            builder.Property(b => b.IsShared)
                .IsRequired();
        }
    }
}

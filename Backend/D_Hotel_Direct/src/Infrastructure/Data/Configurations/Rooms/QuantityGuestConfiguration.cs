namespace Infrastructure.Data.Configurations.Rooms
{
    public class QuantityGuestConfiguration : IEntityTypeConfiguration<QuantityGuest>
    {
        public void Configure(EntityTypeBuilder<QuantityGuest> builder)
        {
            builder.ToTable("QuantityGuest");

            builder.HasKey(q => q.Id);

            builder.Property(q => q.Id)
                .ValueGeneratedOnAdd();

            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(64);
        }
    }
}
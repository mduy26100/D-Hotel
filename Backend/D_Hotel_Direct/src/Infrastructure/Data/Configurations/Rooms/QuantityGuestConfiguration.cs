namespace Infrastructure.Data.Configurations.Rooms
{
    public class QuantityGuestConfiguration : IEntityTypeConfiguration<QuantityGuest>
    {
        public void Configure(EntityTypeBuilder<QuantityGuest> builder)
        {
            builder.ToTable("QuantityGuests");

            builder.HasKey(q => q.Id);

            builder.Property(q => q.Id)
                .ValueGeneratedOnAdd();

            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(64);

            builder.Property(q => q.MinGuests)
                .IsRequired();

            builder.Property(q => q.MaxGuests)
                .IsRequired();

            builder.Property(q => q.StandardGuests)
                .IsRequired();

            builder.Property(q => q.ExtraGuestCharge)
                .HasColumnType("decimal(18,2)");

            builder.Property(q => q.ChildrenAllowed)
                .IsRequired();

            builder.Property(q => q.MaxChildren)
                .IsRequired(false);
        }
    }
}

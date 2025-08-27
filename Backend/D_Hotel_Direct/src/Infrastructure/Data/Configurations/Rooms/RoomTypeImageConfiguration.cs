using Domain.Models.Rooms;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations.Rooms
{
    public class RoomTypeImageConfiguration : IEntityTypeConfiguration<RoomTypeImage>
    {
        public void Configure(EntityTypeBuilder<RoomTypeImage> builder)
        {
            builder.ToTable("RoomTypeImages");

            builder.HasKey(i => i.Id);

            builder.Property(i => i.RoomTypeId)
                .IsRequired();

            builder.Property(i => i.ImgUrl)
                .IsRequired()
                .HasMaxLength(512);
        }
    }
}
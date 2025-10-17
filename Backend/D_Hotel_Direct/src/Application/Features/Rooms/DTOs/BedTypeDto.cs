namespace Application.Features.Rooms.DTOs
{
    public class BedTypeDto
    {
        public int Id { get; set; }

        public required string Name { get; set; }       // Ví dụ: "King Bed"
        public string? Description { get; set; }        // Mô tả chi tiết
        public string? Dimensions { get; set; }         // Ví dụ: "200cm x 180cm"
        public int Capacity { get; set; }               // Tối đa bao nhiêu người ngủ 1 giường
        public bool IsShared { get; set; }              // Giường chung (dorm) hay riêng
    }
}

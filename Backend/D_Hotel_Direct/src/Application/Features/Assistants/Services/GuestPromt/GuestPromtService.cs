using Application.Common.Interfaces.Services.AI;
using Application.Features.Assistants.Interfaces;
using Application.Features.Hotels.Repositories;
using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomsByHotelId;
using Application.Features.Rooms.Interfaces.Services.Query.RoomTypeImage.GetRoomImagesByRoomTypeId;
using System.Text;

namespace Application.Features.Assistants.Services.GuestPromt
{
    public class GuestPromtService : IPromtService
    {
        private readonly IOpenAIService _openAIService;
        private readonly IHotelRepository _hotelRepository;
        private readonly IGetRoomsByHotelIdService _roomsService;
        private readonly IGetRoomImagesByRoomTypeIdService _roomImagesService;

        private readonly Random _random = new Random();

        public GuestPromtService(
            IOpenAIService openAIService,
            IHotelRepository hotelRepository,
            IGetRoomsByHotelIdService roomsService,
            IGetRoomImagesByRoomTypeIdService roomImagesService)
        {
            _openAIService = openAIService;
            _hotelRepository = hotelRepository;
            _roomsService = roomsService;
            _roomImagesService = roomImagesService;
        }

        public bool Cancel(string prompt, Guid? accountId, CancellationToken cancellationToken = default)
        {
            return accountId == null || accountId == Guid.Empty;
        }

        public async Task<string> AskAsync(string prompt, Guid? accountId, CancellationToken cancellationToken = default)
        {
            if (accountId != null && accountId != Guid.Empty)
                return null!;

            // Lấy danh sách khách sạn
            var hotels = await _hotelRepository.GetAllAsync(cancellationToken);
            if (hotels == null || !hotels.Any())
                return "Hiện không có thông tin khách sạn.";

            var sb = new StringBuilder();
            sb.AppendLine("Tôi là một người dùng chưa đăng nhập. Dưới đây là thông tin khách sạn, phòng trống, giá phòng và link đặt phòng:");

            foreach (var hotel in hotels)
            {
                sb.AppendLine($"\n- {hotel.Name} (Địa chỉ: {hotel.Address})");

                // Lấy phòng còn trống qua service GetRoomsByHotelIdService
                var rooms = await _roomsService.GetRoomsByHotelId(
                    hotel.Id,
                    priceType: "Daily", // default Daily, AI có thể hỏi sau
                    startDate: DateTime.Today,
                    endDate: DateTime.Today.AddDays(1),
                    cancellationToken: cancellationToken);

                if (rooms == null || !rooms.Any())
                {
                    sb.AppendLine("  Hiện không có phòng nào.");
                    continue;
                }

                foreach (var room in rooms)
                {
                    // Lấy 1 ảnh ngẫu nhiên
                    // Lấy 1 ảnh đầu tiên
                    var images = await _roomImagesService.GetByRoomTypeIdAsync(room.Id, cancellationToken);
                    var imageUrl = images != null && images.Any()
                        ? images.First().ImgUrl
                        : "https://via.placeholder.com/400x300?text=No+Image";

                    sb.AppendLine($"  - {room.Name} (Còn {room.Quantity} phòng):");
                    sb.AppendLine($"    Giá: {room.DisplayPrice}đ / {room.DisplayType}");

                    // Tạo link checkout
                    var checkoutLink = GenerateCheckoutLink(
                        hotel.Id,
                        room.Id,
                        room.Name,
                        room.DisplayPrice,
                        room.DisplayType ?? "",
                        room.DisplayStartDate ?? DateTime.Today,
                        room.DisplayEndDate ?? DateTime.Today.AddDays(1),
                        room.DisplayStartTime?.ToString() ?? "12:00:00",
                        room.DisplayEndTime?.ToString() ?? "12:00:00",
                        imageUrl
                    );

                    sb.AppendLine($"    Link đặt phòng: {checkoutLink}");
                }
            }

            var guidePrompt = $"""
                {sb}

                Hướng dẫn:
                - Hãy hỏi khách hàng muốn đặt khách sạn khu vực nào.
                - Giới thiệu giá cả về phòng còn trống của khách sạn.
                - Tư vấn phù hợp với nhu cầu của khách hàng.
                - Cung cấp link đặt phòng trực tiếp.

                Câu hỏi của tôi là: {prompt}
                """;

            return await _openAIService.AskChatAsync(guidePrompt);
        }

        private string GenerateCheckoutLink(int hotelSn, int roomTypeSn, string roomName, decimal rentalPrice, string rentalType,
                                            DateTime startDate, DateTime endDate, string startTime, string endTime, string imageUrl)
        {
            var url = new UriBuilder("https://localhost:5173/checkout/" + Uri.EscapeDataString(roomName));
            var query = System.Web.HttpUtility.ParseQueryString(string.Empty);
            query["hotelSn"] = hotelSn.ToString();
            query["roomTypeSn"] = roomTypeSn.ToString();
            query["checkInDatePlan"] = startDate.ToString("yyyy-MM-dd");
            query["startDate"] = startDate.ToString("yyyy-MM-dd");
            query["startTime"] = startTime;
            query["endDate"] = endDate.ToString("yyyy-MM-dd");
            query["endTime"] = endTime;
            query["rentalPrice"] = rentalPrice.ToString();
            query["rentalType"] = rentalType;
            query["roomName"] = roomName;
            query["imageUrl"] = imageUrl;

            url.Query = query.ToString();
            return url.ToString();
        }
    }
}

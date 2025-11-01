using Application.Common.Interfaces.Services.AI;
using Application.Features.Assistants.Interfaces;
using Application.Features.Hotels.Repositories;
using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomsByHotelId;
using Application.Features.Rooms.Interfaces.Services.Query.RoomTypeImage.GetRoomImagesByRoomTypeId;
using System.Text;

namespace Application.Features.Assistants.Services.GuestPromt
{
    public class GuestPromptService : IPromptService
    {
        private readonly IOpenAIService _openAIService;
        private readonly IHotelRepository _hotelRepository;
        private readonly IGetRoomsByHotelIdService _roomsService;
        private readonly IGetRoomImagesByRoomTypeIdService _roomImagesService;

        private readonly Random _random = new Random();

        public GuestPromptService(
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

            var hotels = await _hotelRepository.GetAllAsync(cancellationToken);
            if (hotels == null || !hotels.Any())
                return "Currently, there is no hotel information available.";

            var sb = new StringBuilder();
            sb.AppendLine("I am a guest user. Below is the list of hotels, available rooms, room prices, and booking links:");

            foreach (var hotel in hotels)
            {
                sb.AppendLine($"\n- {hotel.Name} (Address: {hotel.Address})");

                var rooms = await _roomsService.GetRoomsByHotelId(
                    hotel.Id,
                    priceType: "Daily",
                    startDate: DateTime.Today,
                    endDate: DateTime.Today.AddDays(1),
                    cancellationToken: cancellationToken);

                if (rooms == null || !rooms.Any())
                {
                    sb.AppendLine("  No available rooms at the moment.");
                    continue;
                }

                foreach (var room in rooms)
                {
                    var images = await _roomImagesService.GetByRoomTypeIdAsync(room.Id, cancellationToken);
                    var imageUrl = images != null && images.Any()
                        ? images.First().ImgUrl
                        : "https://via.placeholder.com/400x300?text=No+Image";

                    sb.AppendLine($"  - {room.Name} (Remaining: {room.Quantity} rooms):");
                    sb.AppendLine($"    Price: {room.DisplayPrice}đ / {room.DisplayType}");

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

                    sb.AppendLine($"    Booking link: {checkoutLink}");
                }
            }

            var guidePrompt = $"""
                {sb}

                Instructions:
                - Ask the customer which area they want to book a hotel in.
                - Introduce the available rooms and their prices.
                - Suggest the most suitable options based on the customer's needs.
                - Provide the direct booking link.

                My question is: {prompt}
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

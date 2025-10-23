namespace Domain.Consts
{
    public static class BookingStatus
    {
        public const string Pending = "Pending";           // mới tạo, chưa xác nhận
        public const string Confirmed = "Confirmed";       // đã xác nhận
        public const string CheckedIn = "CheckedIn";       // khách đã nhận phòng
        public const string CheckedOut = "CheckedOut";     // khách đã trả phòng
        public const string Cancelled = "Cancelled";       // khách hủy
        public const string NoShow = "NoShow";             // khách không đến
    }
}

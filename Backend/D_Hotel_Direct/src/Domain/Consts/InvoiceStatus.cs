namespace Domain.Consts
{
    public static class InvoiceStatus
    {
        public const string Pending = "Pending";           // chờ thanh toán
        public const string Paid = "Paid";                 // đã thanh toán
        public const string Cancelled = "Cancelled";       // hủy hóa đơn
        public const string Refunded = "Refunded";         // đã hoàn tiền
    }
}

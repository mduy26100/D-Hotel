namespace Domain.Consts
{
    public static class PaymentMethod
    {
        public const string Cash = "Cash";             // Thanh toán tiền mặt
        public const string CreditCard = "CreditCard"; // Thẻ tín dụng
        public const string DebitCard = "DebitCard";   // Thẻ ghi nợ
        public const string EWallet = "EWallet";       // Ví điện tử (Momo, ZaloPay,…)
        public const string BankTransfer = "BankTransfer"; // Chuyển khoản ngân hàng
    }
}

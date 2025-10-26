using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking.PaymentStrategies;
using Domain.Enums.Bookings;

namespace Application.Features.Bookings.Interfaces.Services.Command.CreateBooking.Factory
{
    public interface IPaymentStrategyFactory
    {
        IPaymentStrategy GetStrategy(PaymentProvider provider);
    }
}

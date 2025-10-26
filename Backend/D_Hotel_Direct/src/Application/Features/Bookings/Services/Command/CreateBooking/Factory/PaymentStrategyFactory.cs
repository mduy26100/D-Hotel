using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking.Factory;
using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking.PaymentStrategies;
using Domain.Enums.Bookings;

namespace Application.Features.Bookings.Services.Command.CreateBooking.Factory
{
    public class PaymentStrategyFactory : IPaymentStrategyFactory
    {
        private readonly IEnumerable<IPaymentStrategy> _strategies;

        public PaymentStrategyFactory(IEnumerable<IPaymentStrategy> strategies)
        {
            _strategies = strategies;
        }

        public IPaymentStrategy GetStrategy(PaymentProvider provider)
        {
            var strategy = _strategies.FirstOrDefault(s => s.Provider == provider);
            if (strategy == null)
                throw new InvalidOperationException($"No payment strategy found for {provider}");
            return strategy;
        }
    }
}

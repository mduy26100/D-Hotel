﻿using Application.Features.Auth.Services.Command.Login.Strategy;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.Login.Factory
{
    public class LoginStrategyFactory : ILoginStrategyFactory
    {
        private readonly Dictionary<LoginProvider, ILoginStrategy> _strategies;

        public LoginStrategyFactory(IEnumerable<ILoginStrategy> strategies)
        {
            _strategies = strategies.ToDictionary(s => s.Provider);
        }

        public ILoginStrategy GetStrategy(LoginProvider provider)
        {
            if (_strategies.TryGetValue(provider, out var strategy))
            {
                return strategy;
            }

            throw new NotImplementedException($"Login provider {provider} not supported.");
        }
    }
}

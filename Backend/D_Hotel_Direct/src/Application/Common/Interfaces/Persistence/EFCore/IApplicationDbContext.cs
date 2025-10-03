﻿using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Application.Common.Interfaces.Persistence.EFCore
{
    public interface IApplicationDbContext
    {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        DatabaseFacade Database { get; }
    }
}

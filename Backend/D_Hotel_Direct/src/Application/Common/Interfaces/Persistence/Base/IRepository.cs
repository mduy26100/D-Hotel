using System.Linq.Expressions;

namespace Application.Common.Interfaces.Persistence.Base
{
    public interface IRepository<T> where T : class
    {
        // CRUD cơ bản
        Task<T?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default);
        Task<T?> FindOneAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken= default);

        Task AddAsync(T entity, CancellationToken cancellationToken = default);
        void Update(T entity);
        void Remove(T entity);

        // Kiểm tra tồn tại
        Task<bool> AnyAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default);
    }
}

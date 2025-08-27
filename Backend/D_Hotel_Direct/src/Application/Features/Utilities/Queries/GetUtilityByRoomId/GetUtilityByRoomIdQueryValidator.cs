using FluentValidation;

namespace Application.Features.Utilities.Queries.GetUtilityByRoomId
{
    public class GetUtilityByRoomIdQueryValidator : AbstractValidator<GetUtilityByRoomIdQuery>
    {
        public GetUtilityByRoomIdQueryValidator()
        {
            RuleFor(x => x.roomId)
                .GreaterThan(0).WithMessage("RoomId must be greater than 0.");
        }
    }
}

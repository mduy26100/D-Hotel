﻿using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Commands.Login
{
    public record LoginCommand(LoginRequestDto Dto) : IRequest<JwtTokenResponseDto>;
}

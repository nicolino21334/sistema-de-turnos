using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ReservasAPI.DTOs;
using ReservasAPI.Service;
using ReservasAPI.Repositories;

namespace ReservasAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] //todos los endpoints deben estyar authenticados

public class TurnosController : ControllerBase
{

    private readonly ITurnoService _turnoService;
    private readonly IServicioRepository _servicioRepository;

    public TurnosController(ITurnoService turnoService, IServicioRepository servicioRepository)
    {
        _turnoService = turnoService;
        _servicioRepository = servicioRepository;
    }

    //GET: api/Turnos (Solo Admin ve todos los turnos del sistema)
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<TurnoDTO>>> GetAllTurnos()
    {
        var turnos = await _turnoService.GetAllAsync();
        return Ok(turnos);
    }

    //GET: api/Turnos/mis-turnos (El usuario ve solo sus propios turnos)
    [HttpGet("mis-turnos")]
    public async Task<ActionResult<IEnumerable<TurnoDTO>>> GetMyTurnos()
    {
        var userId = GetCurrentUserId();
        var turnos = await _turnoService.GetByUserIdAsync(userId);
        return Ok(turnos);
    }

    //GET: api/Turnos/5 (cualquier usuario autenticado ve un turno por ID)
    [HttpGet("{id}")]
    public async Task<ActionResult<TurnoDTO>> GetById(int id) 
    {
        var turno = await _turnoService.GetByIdAsync(id);
        if (turno == null) return NotFound("Turno no encontrado");

        return Ok(turno);
    }

    //POST: api/Turnos (cualquier usuario autenticado reserva un turno)
    [HttpPost]
    public async Task<ActionResult<TurnoDTO>> Create(CrearTurnoDTO dto) 
    {
        var userId = GetCurrentUserId();
        var nuevoTurno = await _turnoService.CreateAsync(dto, userId);
        return CreatedAtAction(nameof(GetById), new { id = nuevoTurno.Id }, nuevoTurno);
    }

    //PUT: api/turnos/5/estado (Solo Admin cambia el estado de un turno)
    [HttpPut("{id}/estado")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ToggleEstado(int id, [FromBody] string newStatus) 
    {
        var result = await _turnoService.ChangeStatusAsync(id, newStatus);
        if (!result) return NotFound("Turno no encontrado");

        return NoContent();
    }

    

    //obtener el ID del usuario logueado desde los claims del Token JWT
    private int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.Parse(userIdClaim);
    }
}


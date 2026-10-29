using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReservasAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddActivoToServicio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Actionable",
                table: "Servicios",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Actionable",
                table: "Servicios");
        }
    }
}

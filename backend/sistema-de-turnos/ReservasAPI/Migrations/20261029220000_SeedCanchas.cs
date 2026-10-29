using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ReservasAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedCanchas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Actionable",
                table: "Servicios",
                newName: "Activo");

            migrationBuilder.InsertData(
                table: "Servicios",
                columns: new[] { "Id", "Activo", "Descripcion", "DuracionMinutos", "Nombre", "Precio" },
                values: new object[,]
                {
                    { 1, true, "Sintético", 0, "Cancha 1 - Fútbol 5", 20000m },
                    { 2, true, "Sintético", 0, "Cancha 2 - Fútbol 5", 20000m },
                    { 3, true, "Sintético", 0, "Cancha 3 - Fútbol 5", 20000m },
                    { 4, true, "Cristal y sintético", 0, "Cancha 1 - Pádel", 15000m },
                    { 5, true, "Cristal y sintético", 0, "Cancha 2 - Pádel", 15000m },
                    { 6, true, "Piso flotante", 0, "Cancha - Básquet", 18000m },
                    { 7, true, "Piso parquet", 0, "Cancha - Vóley", 16000m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Servicios",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Servicios",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Servicios",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Servicios",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Servicios",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Servicios",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Servicios",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.RenameColumn(
                name: "Activo",
                table: "Servicios",
                newName: "Actionable");
        }
    }
}

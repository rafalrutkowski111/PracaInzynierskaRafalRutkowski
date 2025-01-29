using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.MigrationsOld
{
    /// <inheritdoc />
    public partial class updateEmployee3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployeeWithoutEmployerId",
                table: "Employees");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "EmployeeWithoutEmployerId",
                table: "Employees",
                type: "uniqueidentifier",
                nullable: true);
        }
    }
}

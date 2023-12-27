using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class AddEmployeeWithoutEmployerSpecialization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeWithoutEmployerSpecializations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeWithoutEmployerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SpecializationId = table.Column<int>(type: "int", nullable: false),
                    ExperienceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeWithoutEmployerSpecializations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeWithoutEmployerSpecializations_EmployeeWithoutEmployers_EmployeeWithoutEmployerId",
                        column: x => x.EmployeeWithoutEmployerId,
                        principalTable: "EmployeeWithoutEmployers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeWithoutEmployerSpecializations_Specializations_SpecializationId",
                        column: x => x.SpecializationId,
                        principalTable: "Specializations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeWithoutEmployerSpecializations_EmployeeWithoutEmployerId",
                table: "EmployeeWithoutEmployerSpecializations",
                column: "EmployeeWithoutEmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeWithoutEmployerSpecializations_SpecializationId",
                table: "EmployeeWithoutEmployerSpecializations",
                column: "SpecializationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeWithoutEmployerSpecializations");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class addTabelEmployeeWithoutEmployer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "EmployeeWithoutEmployerId",
                table: "Employees",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "EmployeeWithoutEmployers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsEmployed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeWithoutEmployers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeWithoutEmployerId",
                table: "Employees",
                column: "EmployeeWithoutEmployerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeWithoutEmployers_EmployeeWithoutEmployerId",
                table: "Employees",
                column: "EmployeeWithoutEmployerId",
                principalTable: "EmployeeWithoutEmployers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeWithoutEmployers_EmployeeWithoutEmployerId",
                table: "Employees");

            migrationBuilder.DropTable(
                name: "EmployeeWithoutEmployers");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeWithoutEmployerId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeWithoutEmployerId",
                table: "Employees");
        }
    }
}

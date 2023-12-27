using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEmployee2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeWithoutEmployers_EmployeeWithoutEmployerId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeWithoutEmployerId",
                table: "Employees");

            migrationBuilder.AlterColumn<Guid>(
                name: "EmployeeWithoutEmployerId",
                table: "Employees",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeWithoutEmployerId",
                table: "Employees",
                column: "EmployeeWithoutEmployerId",
                unique: true,
                filter: "[EmployeeWithoutEmployerId] IS NOT NULL");

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

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeWithoutEmployerId",
                table: "Employees");

            migrationBuilder.AlterColumn<Guid>(
                name: "EmployeeWithoutEmployerId",
                table: "Employees",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

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
    }
}

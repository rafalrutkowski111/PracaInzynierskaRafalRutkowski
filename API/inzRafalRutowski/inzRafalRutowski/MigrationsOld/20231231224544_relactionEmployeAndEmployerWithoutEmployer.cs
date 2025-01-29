using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.MigrationsOld
{
    /// <inheritdoc />
    public partial class relactionEmployeAndEmployerWithoutEmployer : Migration
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
                principalColumn: "Id");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class ChangeExpFromEmployeeToEmployer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Experience_Employees_EmployeeId",
                table: "Experience");

            migrationBuilder.RenameColumn(
                name: "EmployeeId",
                table: "Experience",
                newName: "EmployerId");

            migrationBuilder.RenameIndex(
                name: "IX_Experience_EmployeeId",
                table: "Experience",
                newName: "IX_Experience_EmployerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Experience_Employers_EmployerId",
                table: "Experience",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Experience_Employers_EmployerId",
                table: "Experience");

            migrationBuilder.RenameColumn(
                name: "EmployerId",
                table: "Experience",
                newName: "EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_Experience_EmployerId",
                table: "Experience",
                newName: "IX_Experience_EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Experience_Employees_EmployeeId",
                table: "Experience",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}

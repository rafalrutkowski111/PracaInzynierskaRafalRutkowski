using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.MigrationsOld
{
    /// <inheritdoc />
    public partial class updateEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Employers_EmployerId",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "EmployerId",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Employers_EmployerId",
                table: "Employees",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Employers_EmployerId",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "EmployerId",
                table: "Employees",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Employers_EmployerId",
                table: "Employees",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id");
        }
    }
}

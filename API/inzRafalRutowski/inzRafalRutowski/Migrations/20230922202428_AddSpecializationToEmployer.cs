using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class AddSpecializationToEmployer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployerId",
                table: "Specializations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Specializations_EmployerId",
                table: "Specializations",
                column: "EmployerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Specializations_Employers_EmployerId",
                table: "Specializations",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Specializations_Employers_EmployerId",
                table: "Specializations");

            migrationBuilder.DropIndex(
                name: "IX_Specializations_EmployerId",
                table: "Specializations");

            migrationBuilder.DropColumn(
                name: "EmployerId",
                table: "Specializations");
        }
    }
}

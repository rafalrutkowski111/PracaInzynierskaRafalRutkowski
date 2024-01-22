using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAnotherTables2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSpecializationAnothers_ExperianceAnotherS_ExperianceAnotherId",
                table: "EmployeeSpecializationAnothers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExperianceAnotherS",
                table: "ExperianceAnotherS");

            migrationBuilder.RenameTable(
                name: "ExperianceAnotherS",
                newName: "ExperianceAnothers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExperianceAnothers",
                table: "ExperianceAnothers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSpecializationAnothers_ExperianceAnothers_ExperianceAnotherId",
                table: "EmployeeSpecializationAnothers",
                column: "ExperianceAnotherId",
                principalTable: "ExperianceAnothers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSpecializationAnothers_ExperianceAnothers_ExperianceAnotherId",
                table: "EmployeeSpecializationAnothers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExperianceAnothers",
                table: "ExperianceAnothers");

            migrationBuilder.RenameTable(
                name: "ExperianceAnothers",
                newName: "ExperianceAnotherS");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExperianceAnotherS",
                table: "ExperianceAnotherS",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSpecializationAnothers_ExperianceAnotherS_ExperianceAnotherId",
                table: "EmployeeSpecializationAnothers",
                column: "ExperianceAnotherId",
                principalTable: "ExperianceAnotherS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

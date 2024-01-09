using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class ChangeNameAndUpdateJobEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "experienceValue",
                table: "Experiences",
                newName: "ExperienceValue");

            migrationBuilder.RenameColumn(
                name: "experienceName",
                table: "Experiences",
                newName: "ExperienceName");

            migrationBuilder.AddColumn<int>(
                name: "SpecializationId",
                table: "JobEmployees",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SpecializationId",
                table: "JobEmployees");

            migrationBuilder.RenameColumn(
                name: "ExperienceValue",
                table: "Experiences",
                newName: "experienceValue");

            migrationBuilder.RenameColumn(
                name: "ExperienceName",
                table: "Experiences",
                newName: "experienceName");
        }
    }
}

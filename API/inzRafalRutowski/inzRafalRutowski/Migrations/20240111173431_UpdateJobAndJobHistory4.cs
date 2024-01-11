using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class UpdateJobAndJobHistory4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Surname",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "JobHistorys",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Surname",
                table: "JobHistorys",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Surname",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "JobHistorys");

            migrationBuilder.DropColumn(
                name: "Surname",
                table: "JobHistorys");
        }
    }
}

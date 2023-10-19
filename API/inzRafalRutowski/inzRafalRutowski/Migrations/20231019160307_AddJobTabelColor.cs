using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class AddJobTabelColor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Jobs");
        }
    }
}

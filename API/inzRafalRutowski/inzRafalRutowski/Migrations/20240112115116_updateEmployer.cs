using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class updateEmployer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Employers",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Employers");
        }
    }
}

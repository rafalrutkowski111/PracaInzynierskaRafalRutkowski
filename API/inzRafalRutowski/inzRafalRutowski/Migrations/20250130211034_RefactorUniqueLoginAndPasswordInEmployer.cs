using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class RefactorUniqueLoginAndPasswordInEmployer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Employers_Email",
                table: "Employers");

            migrationBuilder.DropIndex(
                name: "IX_Employers_Login",
                table: "Employers");

            migrationBuilder.CreateIndex(
                name: "IX_Employers_Login_Email",
                table: "Employers",
                columns: new[] { "Login", "Email" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Employers_Login_Email",
                table: "Employers");

            migrationBuilder.CreateIndex(
                name: "IX_Employers_Email",
                table: "Employers",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employers_Login",
                table: "Employers",
                column: "Login",
                unique: true);
        }
    }
}

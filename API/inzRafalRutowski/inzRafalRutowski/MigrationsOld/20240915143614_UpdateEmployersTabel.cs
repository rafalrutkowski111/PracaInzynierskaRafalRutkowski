using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.MigrationsOld
{
    /// <inheritdoc />
    public partial class UpdateEmployersTabel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Login",
                table: "Employers",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<bool>(
                name: "ConfirmEmail",
                table: "Employers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Employers",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Employers_Email",
                table: "Employers");

            migrationBuilder.DropIndex(
                name: "IX_Employers_Login",
                table: "Employers");

            migrationBuilder.DropColumn(
                name: "ConfirmEmail",
                table: "Employers");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Employers");

            migrationBuilder.AlterColumn<string>(
                name: "Login",
                table: "Employers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}

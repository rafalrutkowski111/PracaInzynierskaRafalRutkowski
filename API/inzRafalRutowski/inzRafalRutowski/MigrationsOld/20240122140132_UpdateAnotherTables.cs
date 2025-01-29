using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.MigrationsOld
{
    /// <inheritdoc />
    public partial class UpdateAnotherTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeWithoutEmployerSpecializations");

            migrationBuilder.DropTable(
                name: "EmployeeWithoutEmployers");

            migrationBuilder.DropColumn(
                name: "IsEmployed",
                table: "Employees");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Employers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "EmployeeAnothers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsEmployed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeAnothers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExperianceAnotherS",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExperienceName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExperienceValue = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExperianceAnotherS", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SpecializationAnothers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecializationAnothers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeSpecializationAnothers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeAnotherId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SpecializationAnotherId = table.Column<int>(type: "int", nullable: false),
                    ExperianceAnotherId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSpecializationAnothers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSpecializationAnothers_EmployeeAnothers_EmployeeAnotherId",
                        column: x => x.EmployeeAnotherId,
                        principalTable: "EmployeeAnothers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeSpecializationAnothers_ExperianceAnotherS_ExperianceAnotherId",
                        column: x => x.ExperianceAnotherId,
                        principalTable: "ExperianceAnotherS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeSpecializationAnothers_SpecializationAnothers_SpecializationAnotherId",
                        column: x => x.SpecializationAnotherId,
                        principalTable: "SpecializationAnothers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSpecializationAnothers_EmployeeAnotherId",
                table: "EmployeeSpecializationAnothers",
                column: "EmployeeAnotherId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSpecializationAnothers_ExperianceAnotherId",
                table: "EmployeeSpecializationAnothers",
                column: "ExperianceAnotherId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSpecializationAnothers_SpecializationAnotherId",
                table: "EmployeeSpecializationAnothers",
                column: "SpecializationAnotherId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeSpecializationAnothers");

            migrationBuilder.DropTable(
                name: "EmployeeAnothers");

            migrationBuilder.DropTable(
                name: "ExperianceAnotherS");

            migrationBuilder.DropTable(
                name: "SpecializationAnothers");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Employers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<bool>(
                name: "IsEmployed",
                table: "Employees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "EmployeeWithoutEmployers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsEmployed = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeWithoutEmployers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeWithoutEmployerSpecializations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeWithoutEmployerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SpecializationId = table.Column<int>(type: "int", nullable: false),
                    ExperienceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeWithoutEmployerSpecializations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeWithoutEmployerSpecializations_EmployeeWithoutEmployers_EmployeeWithoutEmployerId",
                        column: x => x.EmployeeWithoutEmployerId,
                        principalTable: "EmployeeWithoutEmployers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeWithoutEmployerSpecializations_Specializations_SpecializationId",
                        column: x => x.SpecializationId,
                        principalTable: "Specializations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeWithoutEmployerSpecializations_EmployeeWithoutEmployerId",
                table: "EmployeeWithoutEmployerSpecializations",
                column: "EmployeeWithoutEmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeWithoutEmployerSpecializations_SpecializationId",
                table: "EmployeeWithoutEmployerSpecializations",
                column: "SpecializationId");
        }
    }
}

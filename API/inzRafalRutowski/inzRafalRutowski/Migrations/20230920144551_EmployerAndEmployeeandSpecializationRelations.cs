using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class EmployerAndEmployeeandSpecializationRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RemainingHours",
                table: "Specializations");

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsEmployed = table.Column<bool>(type: "bit", nullable: false),
                    HourStartWork = table.Column<double>(type: "float", nullable: true),
                    HourFinishtWork = table.Column<double>(type: "float", nullable: true),
                    ContractFinishTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Employers_EmployerId",
                        column: x => x.EmployerId,
                        principalTable: "Employers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeSpecialization",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    SpecializationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSpecialization", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSpecialization_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeSpecialization_Specializations_SpecializationId",
                        column: x => x.SpecializationId,
                        principalTable: "Specializations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployerId",
                table: "Employees",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSpecialization_EmployeeId",
                table: "EmployeeSpecialization",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSpecialization_SpecializationId",
                table: "EmployeeSpecialization",
                column: "SpecializationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeSpecialization");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.AddColumn<double>(
                name: "RemainingHours",
                table: "Specializations",
                type: "float",
                nullable: true);
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class AddJobEmployessAndCreateJobHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContractFinishTime",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "HourFinishtWork",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "HourStartWork",
                table: "Employees");

            migrationBuilder.AddColumn<DateTime>(
                name: "CurrentTimeFinishJob",
                table: "Jobs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "JobEmployees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimeStartJob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeFinishJob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsNeed = table.Column<bool>(type: "bit", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    JobId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobEmployees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobEmployees_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobEmployees_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobHistorys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpecializationId = table.Column<int>(type: "int", nullable: false),
                    HourLeft = table.Column<int>(type: "int", nullable: false),
                    JobId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobHistorys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobHistorys_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobEmployees_EmployeeId",
                table: "JobEmployees",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_JobEmployees_JobId",
                table: "JobEmployees",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobHistorys_JobId",
                table: "JobHistorys",
                column: "JobId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobEmployees");

            migrationBuilder.DropTable(
                name: "JobHistorys");

            migrationBuilder.DropColumn(
                name: "CurrentTimeFinishJob",
                table: "Jobs");

            migrationBuilder.AddColumn<string>(
                name: "ContractFinishTime",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "HourFinishtWork",
                table: "Employees",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "HourStartWork",
                table: "Employees",
                type: "float",
                nullable: true);
        }
    }
}

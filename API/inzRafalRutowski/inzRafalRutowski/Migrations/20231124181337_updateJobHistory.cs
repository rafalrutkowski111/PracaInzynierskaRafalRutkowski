using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inzRafalRutowski.Migrations
{
    /// <inheritdoc />
    public partial class updateJobHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HourLeft",
                table: "JobHistorys");

            migrationBuilder.DropColumn(
                name: "SpecializationId",
                table: "JobHistorys");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "JobHistorys",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CurrentTimeFinishJob",
                table: "JobHistorys",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ListEmployeeAddToJob",
                table: "JobHistorys",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeAddHistory",
                table: "JobHistorys",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeFinishJob",
                table: "JobHistorys",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeStartJob",
                table: "JobHistorys",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "JobHistorys",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "JobHistorys");

            migrationBuilder.DropColumn(
                name: "CurrentTimeFinishJob",
                table: "JobHistorys");

            migrationBuilder.DropColumn(
                name: "ListEmployeeAddToJob",
                table: "JobHistorys");

            migrationBuilder.DropColumn(
                name: "TimeAddHistory",
                table: "JobHistorys");

            migrationBuilder.DropColumn(
                name: "TimeFinishJob",
                table: "JobHistorys");

            migrationBuilder.DropColumn(
                name: "TimeStartJob",
                table: "JobHistorys");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "JobHistorys");

            migrationBuilder.AddColumn<int>(
                name: "HourLeft",
                table: "JobHistorys",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SpecializationId",
                table: "JobHistorys",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

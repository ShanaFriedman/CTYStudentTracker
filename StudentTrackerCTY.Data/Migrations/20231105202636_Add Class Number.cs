using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentTrackerCTY.Data.Migrations
{
    public partial class AddClassNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Notes");

            migrationBuilder.AddColumn<int>(
                name: "ClassNumber",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClassNumber",
                table: "Students");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Notes",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

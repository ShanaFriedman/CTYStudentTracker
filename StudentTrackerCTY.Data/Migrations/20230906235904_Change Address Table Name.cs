using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentTrackerCTY.Data.Migrations
{
    public partial class ChangeAddressTableName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_AddressDetails_AddressId",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AddressDetails",
                table: "AddressDetails");

            migrationBuilder.RenameTable(
                name: "AddressDetails",
                newName: "Addresses");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Addresses_AddressId",
                table: "Students",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Addresses_AddressId",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses");

            migrationBuilder.RenameTable(
                name: "Addresses",
                newName: "AddressDetails");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AddressDetails",
                table: "AddressDetails",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_AddressDetails_AddressId",
                table: "Students",
                column: "AddressId",
                principalTable: "AddressDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

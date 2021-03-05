using Microsoft.EntityFrameworkCore.Migrations;

namespace Strength.DB.Migrations
{
    public partial class noMoreNumer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SetsNumer",
                table: "Exercises",
                newName: "SetsAmount");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SetsAmount",
                table: "Exercises",
                newName: "SetsNumer");
        }
    }
}

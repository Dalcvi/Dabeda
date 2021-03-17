using Microsoft.EntityFrameworkCore.Migrations;

namespace Strength.DB.Migrations
{
    public partial class ExercisesUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProgramId",
                table: "Exercises",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_ProgramId",
                table: "Exercises",
                column: "ProgramId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Programs_ProgramId",
                table: "Exercises",
                column: "ProgramId",
                principalTable: "Programs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Programs_ProgramId",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_ProgramId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "ProgramId",
                table: "Exercises");
        }
    }
}

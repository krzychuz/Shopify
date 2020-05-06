using Microsoft.EntityFrameworkCore.Migrations;

namespace Shopify.Data.Migrations
{
    public partial class AddForeignKeysHandling : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingridient_UnitOfMeassure_UnitOfMeassureId",
                table: "Ingridient");

            migrationBuilder.AlterColumn<int>(
                name: "UnitOfMeassureId",
                table: "Ingridient",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingridient_UnitOfMeassure_UnitOfMeassureId",
                table: "Ingridient",
                column: "UnitOfMeassureId",
                principalTable: "UnitOfMeassure",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingridient_UnitOfMeassure_UnitOfMeassureId",
                table: "Ingridient");

            migrationBuilder.AlterColumn<int>(
                name: "UnitOfMeassureId",
                table: "Ingridient",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Ingridient_UnitOfMeassure_UnitOfMeassureId",
                table: "Ingridient",
                column: "UnitOfMeassureId",
                principalTable: "UnitOfMeassure",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

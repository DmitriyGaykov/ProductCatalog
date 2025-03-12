using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductCatalog.Data.Migrations
{
    /// <inheritdoc />
    public partial class Categories_AddField_UserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("a9220cbe-2b78-4f58-9fcf-1fa5b41cd95e"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Categories",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Email", "FirstName", "LastName", "ModifiedAt", "PasswordHash", "Role" },
                values: new object[] { new Guid("69deaf03-c893-417a-b406-74b6a575719b"), new DateTime(2025, 3, 12, 21, 30, 17, 371, DateTimeKind.Local).AddTicks(2149), null, "admin@mail.by", "Администратор", null, null, "932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef", "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_UserId",
                table: "Categories",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Users_UserId",
                table: "Categories",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Users_UserId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_UserId",
                table: "Categories");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("69deaf03-c893-417a-b406-74b6a575719b"));

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Categories");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Email", "FirstName", "LastName", "ModifiedAt", "PasswordHash", "Role" },
                values: new object[] { new Guid("a9220cbe-2b78-4f58-9fcf-1fa5b41cd95e"), new DateTime(2025, 3, 12, 0, 59, 14, 379, DateTimeKind.Local).AddTicks(846), null, "admin@mail.by", "Администратор", null, null, "932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef", "Admin" });
        }
    }
}

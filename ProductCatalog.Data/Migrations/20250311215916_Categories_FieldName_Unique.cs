using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductCatalog.Data.Migrations
{
    /// <inheritdoc />
    public partial class Categories_FieldName_Unique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("92253e45-44da-461c-a607-a7e32fb1fcc4"));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Categories",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Email", "FirstName", "LastName", "ModifiedAt", "PasswordHash", "Role" },
                values: new object[] { new Guid("a9220cbe-2b78-4f58-9fcf-1fa5b41cd95e"), new DateTime(2025, 3, 12, 0, 59, 14, 379, DateTimeKind.Local).AddTicks(846), null, "admin@mail.by", "Администратор", null, null, "932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef", "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_Name",
                table: "Categories",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Categories_Name",
                table: "Categories");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("a9220cbe-2b78-4f58-9fcf-1fa5b41cd95e"));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Email", "FirstName", "LastName", "ModifiedAt", "PasswordHash", "Role" },
                values: new object[] { new Guid("92253e45-44da-461c-a607-a7e32fb1fcc4"), new DateTime(2025, 3, 12, 0, 36, 50, 315, DateTimeKind.Local).AddTicks(9952), null, "admin@mail.by", "Администратор", null, null, "932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef", "Admin" });
        }
    }
}

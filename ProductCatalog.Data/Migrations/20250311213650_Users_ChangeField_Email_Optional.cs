using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductCatalog.Data.Migrations
{
    /// <inheritdoc />
    public partial class Users_ChangeField_Email_Optional : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5f44e8c8-859f-45a7-8780-dbc1539a2f08"));

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Email", "FirstName", "LastName", "ModifiedAt", "PasswordHash", "Role" },
                values: new object[] { new Guid("92253e45-44da-461c-a607-a7e32fb1fcc4"), new DateTime(2025, 3, 12, 0, 36, 50, 315, DateTimeKind.Local).AddTicks(9952), null, "admin@mail.by", "Администратор", null, null, "932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef", "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("92253e45-44da-461c-a607-a7e32fb1fcc4"));

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Email", "FirstName", "LastName", "ModifiedAt", "PasswordHash", "Role" },
                values: new object[] { new Guid("5f44e8c8-859f-45a7-8780-dbc1539a2f08"), new DateTime(2025, 3, 11, 22, 2, 1, 387, DateTimeKind.Local).AddTicks(8481), null, "admin@mail.by", "Администратор", null, null, "932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef", "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }
    }
}

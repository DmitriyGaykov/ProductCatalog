using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductCatalog.Data.Migrations
{
    /// <inheritdoc />
    public partial class Products_RenameField_UpdatedAt_To_ModifiedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("69deaf03-c893-417a-b406-74b6a575719b"));

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Products",
                newName: "ModifiedAt");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Email", "FirstName", "LastName", "ModifiedAt", "PasswordHash", "Role" },
                values: new object[] { new Guid("65dda137-43d9-41f3-ad31-1188b13907b9"), new DateTime(2025, 3, 12, 21, 59, 3, 789, DateTimeKind.Local).AddTicks(6569), null, "admin@mail.by", "Администратор", null, null, "932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef", "Admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("65dda137-43d9-41f3-ad31-1188b13907b9"));

            migrationBuilder.RenameColumn(
                name: "ModifiedAt",
                table: "Products",
                newName: "UpdatedAt");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Email", "FirstName", "LastName", "ModifiedAt", "PasswordHash", "Role" },
                values: new object[] { new Guid("69deaf03-c893-417a-b406-74b6a575719b"), new DateTime(2025, 3, 12, 21, 30, 17, 371, DateTimeKind.Local).AddTicks(2149), null, "admin@mail.by", "Администратор", null, null, "932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef", "Admin" });
        }
    }
}

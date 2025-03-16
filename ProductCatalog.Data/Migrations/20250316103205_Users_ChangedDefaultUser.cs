using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductCatalog.Data.Migrations
{
    /// <inheritdoc />
    public partial class Users_ChangedDefaultUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000001"),
                columns: new[] { "CreatedAt", "Email" },
                values: new object[] { new DateTime(2025, 3, 16, 13, 32, 4, 326, DateTimeKind.Local).AddTicks(3395), "admin@mail.ru" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000001"),
                columns: new[] { "CreatedAt", "Email" },
                values: new object[] { new DateTime(2025, 3, 15, 19, 49, 53, 712, DateTimeKind.Local).AddTicks(3688), "admin@mail.by" });
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Update_RoomType_And_RoomTypePrice_Structure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BasePrice",
                table: "RoomTypes");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "RoomTypePrices");

            migrationBuilder.AddColumn<decimal>(
                name: "BaseHourlyPrice",
                table: "RoomTypes",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BaseHours",
                table: "RoomTypes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "DailyEndTime",
                table: "RoomTypes",
                type: "time",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DailyPrice",
                table: "RoomTypes",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "DailyStartTime",
                table: "RoomTypes",
                type: "time",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ExtraHourPrice",
                table: "RoomTypes",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaxHours",
                table: "RoomTypes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "OvernightEndTime",
                table: "RoomTypes",
                type: "time",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "OvernightPrice",
                table: "RoomTypes",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "OvernightStartTime",
                table: "RoomTypes",
                type: "time",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PriceType",
                table: "RoomTypePrices",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(64)",
                oldMaxLength: 64,
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "BaseHourlyPrice",
                table: "RoomTypePrices",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DailyPrice",
                table: "RoomTypePrices",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ExtraHourPrice",
                table: "RoomTypePrices",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "OvernightPrice",
                table: "RoomTypePrices",
                type: "decimal(18,2)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BaseHourlyPrice",
                table: "RoomTypes");

            migrationBuilder.DropColumn(
                name: "BaseHours",
                table: "RoomTypes");

            migrationBuilder.DropColumn(
                name: "DailyEndTime",
                table: "RoomTypes");

            migrationBuilder.DropColumn(
                name: "DailyPrice",
                table: "RoomTypes");

            migrationBuilder.DropColumn(
                name: "DailyStartTime",
                table: "RoomTypes");

            migrationBuilder.DropColumn(
                name: "ExtraHourPrice",
                table: "RoomTypes");

            migrationBuilder.DropColumn(
                name: "MaxHours",
                table: "RoomTypes");

            migrationBuilder.DropColumn(
                name: "OvernightEndTime",
                table: "RoomTypes");

            migrationBuilder.DropColumn(
                name: "OvernightPrice",
                table: "RoomTypes");

            migrationBuilder.DropColumn(
                name: "OvernightStartTime",
                table: "RoomTypes");

            migrationBuilder.DropColumn(
                name: "BaseHourlyPrice",
                table: "RoomTypePrices");

            migrationBuilder.DropColumn(
                name: "DailyPrice",
                table: "RoomTypePrices");

            migrationBuilder.DropColumn(
                name: "ExtraHourPrice",
                table: "RoomTypePrices");

            migrationBuilder.DropColumn(
                name: "OvernightPrice",
                table: "RoomTypePrices");

            migrationBuilder.AddColumn<decimal>(
                name: "BasePrice",
                table: "RoomTypes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<string>(
                name: "PriceType",
                table: "RoomTypePrices",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(64)",
                oldMaxLength: 64);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "RoomTypePrices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}

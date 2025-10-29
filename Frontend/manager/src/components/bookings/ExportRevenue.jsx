import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Download,
  FileText,
  TrendingUp,
  Users,
  CreditCard,
  Loader,
  RotateCcw,
  X,
} from "lucide-react";

const ExportRevenue = ({ bookings = [] }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);

  const generateReport = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end date");
      return;
    }

    const filtered = bookings.filter((b) => {
      if (!b.checkInDate) return false;
      const checkIn = b.checkInDate.split("T")[0];
      return checkIn >= startDate && checkIn <= endDate;
    });

    const checkedOut = filtered.filter(
      (b) => (b.status || "").replace(/\s/g, "").toLowerCase() === "checkedout"
    );

    if (checkedOut.length === 0) {
      alert("No CheckedOut bookings found in this date range");
      setReportData(null);
      return;
    }

    const totalRevenue = checkedOut.reduce(
      (sum, b) => sum + (b.rentalPrice || 0),
      0
    );

    const paymentCount = checkedOut.reduce(
      (acc, b) => {
        if ((b.paymentMethod || "").toLowerCase() === "onsite") acc.OnSite++;
        else if ((b.paymentMethod || "").toLowerCase() === "stripe")
          acc.Stripe++;
        return acc;
      },
      { OnSite: 0, Stripe: 0 }
    );

    const groupRevenue = {};
    checkedOut.forEach((b) => {
      const key = `${b.hotelName} - ${b.roomTypeName}`;
      if (!groupRevenue[key]) {
        groupRevenue[key] = { revenue: 0, count: 0 };
      }
      groupRevenue[key].revenue += b.rentalPrice || 0;
      groupRevenue[key].count++;
    });

    setReportData({
      checkedOut,
      totalRevenue,
      totalCheckedOut: checkedOut.length,
      paymentCount,
      groupRevenue,
    });
  };

  const resetReport = () => {
    setReportData(null);
    setStartDate("");
    setEndDate("");
  };

  const closeReport = () => {
    setReportData(null);
  };

  const exportExcel = () => {
    if (!reportData) {
      alert("Please generate report first");
      return;
    }

    const {
      checkedOut,
      totalRevenue,
      totalCheckedOut,
      paymentCount,
      groupRevenue,
    } = reportData;

    const sheet1Data = checkedOut.map((b) => ({
      "Booking ID": b.invoiceNumber,
      "Guest Name": b.guestName,
      "Hotel Name": b.hotelName,
      "Room Type": b.roomTypeName,
      "Check-in Date": b.checkInDate.split("T")[0],
      "Check-out Date": b.checkOutDate.split("T")[0],
      "Rental Price": b.rentalPrice,
      Status: b.status,
      "Payment Method": b.paymentMethod,
    }));

    const sheet2Data = [
      { Metric: "Total Revenue", Value: totalRevenue },
      { Metric: "Total CheckedOut", Value: totalCheckedOut },
      { Metric: "OnSite Payment", Value: paymentCount.OnSite },
      { Metric: "Stripe Payment", Value: paymentCount.Stripe },
      {},
      { Metric: "Revenue by Hotel and Room Type" },
      ...Object.entries(groupRevenue).map(([key, val]) => ({
        Metric: key,
        Revenue: val.revenue,
        Quantity: val.count,
      })),
    ];

    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.json_to_sheet(sheet1Data);
    XLSX.utils.book_append_sheet(wb, ws1, "Details");

    const ws2 = XLSX.utils.json_to_sheet(sheet2Data);
    XLSX.utils.book_append_sheet(wb, ws2, "Summary");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Revenue_Report_${startDate}_${endDate}.xlsx`);
  };

  const exportPDF = async () => {
    if (!reportData || !reportRef.current) {
      alert("Please generate report first");
      return;
    }

    try {
      setIsExporting(true);

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgProperties = { width: canvas.width, height: canvas.height };

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (imgProperties.height * imgWidth) / imgProperties.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;
      }

      pdf.save(`Revenue_Report_${startDate}_${endDate}.pdf`);
      setIsExporting(false);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("An error occurred while exporting PDF");
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-800">📊 Revenue Report</h1>
        {reportData && (
          <button
            onClick={closeReport}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium flex items-center gap-2"
          >
            <X size={18} />
            Close Report
          </button>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={reportData !== null}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={reportData !== null}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={generateReport}
              disabled={reportData !== null}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              Generate Report
            </button>
          </div>
          <div className="flex items-end">
            <button
              onClick={exportExcel}
              disabled={!reportData}
              className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Excel
            </button>
          </div>
          <div className="flex items-end">
            <button
              onClick={exportPDF}
              disabled={!reportData || isExporting}
              className="w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isExporting ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {reportData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  $
                  {reportData.totalRevenue.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <TrendingUp className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total CheckedOut
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-2">
                  {reportData.totalCheckedOut}
                </p>
              </div>
              <Users className="text-purple-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">OnSite</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">
                  {reportData.paymentCount.OnSite}
                </p>
              </div>
              <CreditCard className="text-orange-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Stripe</p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {reportData.paymentCount.Stripe}
                </p>
              </div>
              <CreditCard className="text-green-600" size={32} />
            </div>
          </div>
        </div>
      )}

      {/* Report Content */}
      {reportData && (
        <div
          ref={reportRef}
          className="bg-white rounded-lg shadow-md overflow-hidden p-8"
        >
          {/* Header */}
          <div className="mb-8 pb-6 border-b-2 border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              📈 REVENUE REPORT
            </h2>
            <p className="text-slate-600">
              Period: {startDate} to {endDate}
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="text-slate-600 text-sm font-medium">
                Total Revenue
              </p>
              <p className="text-xl font-bold text-blue-600 mt-1">
                $
                {reportData.totalRevenue.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
              <p className="text-slate-600 text-sm font-medium">
                Total CheckedOut
              </p>
              <p className="text-xl font-bold text-purple-600 mt-1">
                {reportData.totalCheckedOut}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
              <p className="text-slate-600 text-sm font-medium">
                OnSite Payments
              </p>
              <p className="text-xl font-bold text-orange-600 mt-1">
                {reportData.paymentCount.OnSite}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
              <p className="text-slate-600 text-sm font-medium">
                Stripe Payments
              </p>
              <p className="text-xl font-bold text-green-600 mt-1">
                {reportData.paymentCount.Stripe}
              </p>
            </div>
          </div>

          {/* Hotel Revenue Table */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Revenue by Hotel & Room Type
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-300">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Hotel - Room Type
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(reportData.groupRevenue).map(
                    ([key, val], idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-200 hover:bg-slate-50 transition"
                      >
                        <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                          {key}
                        </td>
                        <td className="px-6 py-4 text-sm text-right font-semibold text-blue-600">
                          $
                          {val.revenue.toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-slate-700">
                          {val.count}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Booking Details Table */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Booking Details
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-300">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Guest Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Hotel
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Room Type
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.checkedOut.map((booking, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-200 hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-3 text-sm font-mono text-slate-600">
                        {booking.invoiceNumber}
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-700">
                        {booking.guestName}
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-700">
                        {booking.hotelName}
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-700">
                        {booking.roomTypeName}
                      </td>
                      <td className="px-6 py-3 text-sm text-right font-semibold text-green-600">
                        $
                        {booking.rentalPrice.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t-2 border-slate-200 text-center text-slate-500 text-sm">
            <p className="font-medium">Auto-generated revenue report</p>
            <p>{new Date().toLocaleString("en-US")}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!reportData && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-slate-500 text-lg">
            Select a date range and click "Generate Report" to view data
          </p>
        </div>
      )}

      {/* Reset Button (when report is displayed) */}
      {reportData && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={resetReport}
            className="bg-slate-600 text-white px-8 py-3 rounded-lg hover:bg-slate-700 transition font-medium flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Reset & Generate New Report
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportRevenue;

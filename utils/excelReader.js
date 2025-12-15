const ExcelJS = require('exceljs');

/**
 * Reads an Excel file and returns its data as a 2D array
 * @param {string} filePath - Path to Excel file
 * @returns {Promise<Array>} - Array of rows
 */
async function readExcel(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const sheet = workbook.worksheets[0]; // first sheet
  const data = [];

  sheet.eachRow((row) => {
    data.push(row.values.slice(1)); // ExcelJS rows are 1-indexed
  });

  return data;
}

module.exports = { readExcel };

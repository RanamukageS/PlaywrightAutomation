// utils/convertExcelToJson.js
const ExcelJS = require('exceljs');
const fs = require('fs');

(async () => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('./testData/loginData.xlsx');
  const sheet = workbook.worksheets[0];

  const data = [];
  sheet.eachRow((row) => {
    data.push(row.values.slice(1)); // skip first empty value in row.values
  });

  fs.writeFileSync('./testData/loginData.json', JSON.stringify(data, null, 2));
  console.log('Excel converted to JSON successfully!');
})();

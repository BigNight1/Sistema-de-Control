import path from "path";
import xlsx from "xlsx";
import fs from "fs";
import { __dirname } from "../utils.js";

// Ruta del archivo de Excel
const filePath = path.join(__dirname, "/data/micas.xlsx");
const workbook = xlsx.readFile(filePath);

// Iterar sobre todas las hojas del libro de Excel
workbook.SheetNames.forEach(sheetName => {
  const worksheet = workbook.Sheets[sheetName];

  // Convertir la hoja a JSON, ignorando la primera fila como encabezado
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1, range: 1 });

  // Formatear los datos
  const formattedData = data
    .flatMap((row, index) => [
      {
        marca: sheetName,
        modelo: row[0],
        completo: row[1] || 0,
        simple: row[2] || 0,
        posicion: index + 1,
      }
      
    ])
    .filter(mica => mica.modelo); // Filtrar filas sin modelo

  // Guardar los datos en un archivo JSON
  const outputFilePath = path.join(__dirname, `/data/micas_${sheetName.toLowerCase()}.json`);
  fs.writeFileSync(outputFilePath, JSON.stringify(formattedData, null, 2));

  console.log(`Datos exportados a micas_${sheetName.toLowerCase()}.json`);
});

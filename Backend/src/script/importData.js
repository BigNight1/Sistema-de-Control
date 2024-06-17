import fs from "fs";
import path from "path";
import { __dirname } from "../utils.js";
import { dbConnect } from "../DataBase/mongodb.js";
import micaModel from "../models/MicaSchema.js";

// Conectar a la base de datos
dbConnect().then(async () => {
  console.log("Conectado a la base de datos");

  const folderPath = path.join(__dirname, "/data");

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error leyendo la carpeta", err);
      process.exit(1);
    }

    files.forEach(async (file) => {
      if (path.extname(file) === ".json") {
        const filePath = path.join(folderPath, file);
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        try {
          await micaModel.insertMany(data);
          console.log(`Datos de ${file} importados correctamente`);
        } catch (error) {
          console.error(`Error importando datos de ${file}`, error);
        }
      }
    });
  });
});

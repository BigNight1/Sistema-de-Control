import express from "express";
import cors from "cors";

import { dbConnect } from "./src/DataBase/mongodb.js";
import tableController from "./src/routes/table.router.js";
import sumPayments from "./src/routes/sumPays.router.js"
import micaController from "./src/routes/mica.router.js"
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use(tableController);
app.use(sumPayments)
app.use(micaController)

app.listen(process.env.port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${process.env.port}`);
});

dbConnect();

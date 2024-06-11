import clientModel from "../models/clientSchema.js";

export const SumPaymentsYape = async (req, res) => {
  try {
    // Espera a que la promesa se resuelva
    const clientes = await clientModel.find({});

    // Sumar los montos de todos los pagos realizados con Yape
    const totalYape = clientes.reduce(
      (acc, cliente) => acc + (cliente.yape || 0),
      0
    );

    // Enviar la suma total como respuesta
    res.status(200).json({ totalYape });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los pagos con Yape" });
  }
};

export const SumPaymentsCash = async (req, res) => {
  try {
    // Espera a que la promesa se resuelva
    const clientes = await clientModel.find({});

    // Sumar los montos de todos los pagos realizados con Yape
    const totalCash = clientes.reduce(
      (acc, cliente) => acc + (cliente.efectivo || 0),
      0
    );

    // Enviar la suma total como respuesta
    res.status(200).json({ totalCash });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los pagos con Yape" });
  }
};

export const SumPaymentsGastos = async (req, res) => {
  try {
    // Espera a que la promesa se resuelva
    const clientes = await clientModel.find({});

    // Sumar los montos de todos los pagos realizados con Yape
    const totalGasto = clientes.reduce(
      (acc, cliente) => acc + (cliente.gastos || 0),
      0
    );

    // Enviar la suma total como respuesta
    res.status(200).json({ totalGasto });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los pagos con Yape" });
  }
};

export const ClientCount = async (req, res) => {
  try {
    const CountClient = await clientModel.countDocuments();
    res.json({ totalCliente: CountClient });
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async (req, res) => {
  try {
    const { day, month, year } = req.params;

    // Convertir la fecha al formato de la base de datos (DD/MM/YYYY)
    const formattedDate = `${day}/${month}/${year}`;

    // Agregación para sumar los campos efectivo, yape y gastos
    const result = await clientModel.aggregate([
      {
        $match: { fecha: formattedDate }, // Filtrar por la fecha especificada
      },
      {
        $group: {
          _id: null, // Agrupar todos los documentos juntos

          totalEfectivo: { $sum: "$efectivo" },
          totalYape: { $sum: "$yape" },
          totalGastos: { $sum: "$gastos" },
        },
      },
    ]);
    const clients = await clientModel.find({ fecha: formattedDate });

    // Si hay resultados, el resultado será un array con un solo elemento
    const dailyData = result.length > 0 ? result[0] : null;

    res.status(200).json({ dailyData, clients });
  } catch (error) {
    console.error("Error al obtener los datos diarios:", error);
    res.status(500).json({ error: "Error al obtener los datos diarios" });
  }
};

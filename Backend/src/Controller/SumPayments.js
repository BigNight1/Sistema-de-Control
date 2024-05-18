import clientModel from "../models/clientSchema.js";

export const SumPaymentsYape = async (req, res) => {
    try {
        // Espera a que la promesa se resuelva
        const clientes = await clientModel.find({});

        // Sumar los montos de todos los pagos realizados con Yape
        const totalYape = clientes.reduce((acc, cliente) => acc + (cliente.yape || 0), 0);

        // Enviar la suma total como respuesta
        res.status(200).json({ totalYape });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los pagos con Yape' });
    }
};

export const SumPaymentsCash = async (req, res) => {
    try {
        // Espera a que la promesa se resuelva
        const clientes = await clientModel.find({});

        // Sumar los montos de todos los pagos realizados con Yape
        const totalCash = clientes.reduce((acc, cliente) => acc + (cliente.efectivo || 0), 0);

        // Enviar la suma total como respuesta
        res.status(200).json({ totalCash });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los pagos con Yape' });
    }
};
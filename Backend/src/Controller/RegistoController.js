import RegistroModel from "../models/RegistroSchema.js";
import dayjs from "dayjs";

// Obtener todos los registros
export const obtenerRegistros = async (req, res) => {
  try {
    const registros = await RegistroModel.find();
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo registro
export const createRegistro = async (req, res) => {
  const { ingresos, gastos } = req.body;

  try {
    const nuevoRegistro = new RegistroModel({
      fecha: dayjs().startOf("day").toDate(),
      ingresos,
      gastos,
    });

    await nuevoRegistro.save();
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Agregar un nuevo ingreso a un registro existente
export const agregarIngreso = async (req, res) => {
  const { tipo, monto, detalles } = req.body;

  try {
    const startOfDay = dayjs().startOf("day").toDate();
    const endOfDay = dayjs().endOf("day").toDate();

    let registro = await RegistroModel.findOne({
      fecha: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!registro) {
      // Si no existe un registro para la fecha, crear uno nuevo
      registro = new RegistroModel({
        fecha: startOfDay,
        ingresos: [{ tipo, monto, detalles }],
        gastos: [],
        ingreso_bruto: monto,
        ingreso_neto: monto,
      });
    } else {
      // Si existe un registro para la fecha, agregar el nuevo ingreso
      registro.ingresos.push({ tipo, monto, detalles });

      // Actualizar los ingresos brutos y netos
      registro.ingreso_bruto = calcularIngresoBruto(registro.ingresos);
      registro.ingreso_neto = calcularIngresoNeto(
        registro.ingresos,
        registro.gastos
      );
    }

    await registro.save();
    res.status(200).json(registro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agregar un nuevo gasto a un registro existente
export const agregarGasto = async (req, res) => {
  const { tipo, monto, detalles } = req.body;

  try {
    const startOfDay = dayjs().startOf("day").toDate();
    const endOfDay = dayjs().endOf("day").toDate();

    let registro = await RegistroModel.findOne({
      fecha: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!registro) {
      // Si no existe un registro para la fecha, crear uno nuevo
      registro = new RegistroModel({
        fecha: startOfDay,
        ingresos: [],
        gastos: [{ tipo, monto, detalles }],
        ingreso_bruto: 0,
        ingreso_neto: -monto,
      });
    } else {
      // Si existe un registro para la fecha, agregar el nuevo gasto
      registro.gastos.push({ tipo, monto, detalles });

      // Actualizar los ingresos brutos y netos
      registro.ingreso_bruto = calcularIngresoBruto(registro.ingresos);
      registro.ingreso_neto = calcularIngresoNeto(
        registro.ingresos,
        registro.gastos
      );
    }

    await registro.save();
    res.status(200).json(registro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un ingreso específico
export const actualizarIngreso = async (req, res) => {
  const { registroId, ingresoId } = req.params;
  const { tipo, monto, detalles } = req.body;

  try {
    const registro = await RegistroModel.findById(registroId);
    if (!registro)
      return res.status(404).json({ message: "Registro no encontrado" });

    const ingreso = registro.ingresos.id(ingresoId);
    if (ingreso) {
      ingreso.tipo = tipo;
      ingreso.monto = monto;
      ingreso.detalles = detalles;
    } else {
      return res.status(404).json({ message: "Ingreso no encontrado" });
    }

    // Actualizar los ingresos brutos y netos
    registro.ingreso_bruto = calcularIngresoBruto(registro.ingresos);
    registro.ingreso_neto = calcularIngresoNeto(
      registro.ingresos,
      registro.gastos
    );

    await registro.save();
    res.status(200).json(registro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un gasto específico
export const actualizarGasto = async (req, res) => {
  const { registroId, gastoId } = req.params;
  const { tipo, monto, detalles } = req.body;

  try {
    const registro = await RegistroModel.findById(registroId);
    if (!registro)
      return res.status(404).json({ message: "Registro no encontrado" });

    const gasto = registro.gastos.id(gastoId);
    if (gasto) {
      gasto.tipo = tipo;
      gasto.monto = monto;
      gasto.detalles = detalles;
    } else {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    // Actualizar los ingresos brutos y netos
    registro.ingreso_bruto = calcularIngresoBruto(registro.ingresos);
    registro.ingreso_neto = calcularIngresoNeto(
      registro.ingresos,
      registro.gastos
    );

    await registro.save();
    res.status(200).json(registro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para obtener los totales por fecha y tipo
export const obtenerTotalesPorFecha = async (req, res) => {
  try {
    const registros = await RegistroModel.find({});

    const totalesPorFecha = {};

    registros.forEach((registro) => {
      const fecha = dayjs(registro.fecha).format('YYYY-MM-DD'); // Usando dayjs para formatear la fecha

      if (!totalesPorFecha[fecha]) {
        totalesPorFecha[fecha] = {
          fecha: fecha,
          ingresoEfectivo: 0,
          ingresoYapePlin: 0,
          gastoEfectivo: 0,
          gastoYapePlin: 0,
          ingresoBruto: 0,
          ingresoNeto: 0,
        };
      }

      registro.ingresos.forEach((ingreso) => {
        if (ingreso.tipo === "efectivo") {
          totalesPorFecha[fecha].ingresoEfectivo += ingreso.monto;
        } else if (ingreso.tipo === "yape" || ingreso.tipo === "plin") {
          totalesPorFecha[fecha].ingresoYapePlin += ingreso.monto;
        }
      });

      registro.gastos.forEach((gasto) => {
        if (gasto.tipo === "efectivo") {
          totalesPorFecha[fecha].gastoEfectivo += gasto.monto;
        } else if (gasto.tipo === "yape" || gasto.tipo === "plin") {
          totalesPorFecha[fecha].gastoYapePlin += gasto.monto;
        }
      });

      totalesPorFecha[fecha].ingresoBruto =
        totalesPorFecha[fecha].ingresoEfectivo +
        totalesPorFecha[fecha].ingresoYapePlin;
      totalesPorFecha[fecha].ingresoNeto =
        totalesPorFecha[fecha].ingresoBruto -
        (totalesPorFecha[fecha].gastoEfectivo +
          totalesPorFecha[fecha].gastoYapePlin);
    });

    res.status(200).json(totalesPorFecha);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

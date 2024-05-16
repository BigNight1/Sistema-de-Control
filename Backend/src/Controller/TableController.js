import clientModel from "../models/clientSchema.js";

export const create_cliente = async (req, res) => {
  const { fecha, nombre, numero, trabajo,adelanto, estado,hora } = req.body;

  const efectivo = req.body.efectivo || 0;
  const yape = req.body.yape || 0;

  try {
    const newClient = new clientModel({
      fecha,
      nombre,
      numero,
      trabajo,
      adelanto,
      efectivo,
      yape,
      estado,
      hora
    });
    await newClient.save();
    res.send("cliente creado");
  } catch (error) {
    console.log(error);

    if (error.name === "ValidationError") {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: "Ocurrio un error al crear el cliente" });
    }
  }
};

export const GetClients = async (req, res) => {
  const clientes = await clientModel.find();
  res.json(clientes);
};

export const GetClient = async (req, res) => {
  const client = await clientModel.findById(req.params.id);
  if (!client) return res.status(404).json({ message: "Task not found" });
  res.json(client);
};

export const DeleteClient = async (req, res) => {
  const client = await clientModel.findByIdAndDelete(req.params.id);
  if (!client) return res.status(404).json({ message: "Task not found" });
  res.json(client);
};

export const UptdateClient = async (req, res) => {
  const client = await clientModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!client) return res.status(404).json({ message: "Task not found" });
  res.json(client);
};
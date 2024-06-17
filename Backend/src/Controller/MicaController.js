import micaModel from "../models/MicaSchema.js";

export const CreateMica = async (req, res) => {
  const { marca, modelo, simple, completo } = req.body;

  try {
    const NewMica = new micaModel({
      marca,
      modelo,
      simple,
      completo,
    });

    const saveMica = await NewMica.save();
    console.log(saveMica);
  } catch (error) {
    console.log(error);
  }
};
export const ReadMicas = async (req, res) => {
  const Mica = micaModel.find();
  res.json(Mica);
};
export const UpdateMica = async (req, res) => {
  const Mica = await micaModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!Mica) return res.status(404).json({ message: "Task not found" });
  res.json(Mica);
};
export const DeleteMica = async (req, res) => {
  const Mica = await micaModel.findByIdAndDelete(req.params.id);
  if (!Mica) return res.status(404).json({ message: "Task not found" });
  return res.sendStatus(204);
};


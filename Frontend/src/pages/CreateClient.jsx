import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useClient } from "../context/ClientContext.jsx";
import Formulario from "../components/CreateClient/Formulario.jsx";

const CreateClient = () => {
  const { createClients } = useClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [formaPago, setFormaPago] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    const currentDate = new Date();

    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate.getFullYear()}`;
    const formattedTime = `${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    // Asignar la fecha actual al campo "fecha"
    setValue("fecha", formattedDate);
    setValue("hora", formattedTime);
  }, [setValue]);

  useEffect(() => {
    setValue("formaPago", formaPago);
  }, [formaPago, setValue]);

  useEffect(() => {
    setValue("estado", estado);
  }, [estado, setValue]);
  const navigate = useNavigate(); // Hook para navegación

  const onSubmit = (data) => {
    createClients(data);
    setTimeout(() => {
      navigate("/welcome");
    }, 1200); // Redirigir después de 1 segundo
  };

  return (
    <div>
      <Formulario
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        setFormaPago={setFormaPago}
        setEstado={setEstado}
        formaPago={formaPago}
        estado={estado}
      />
    </div>
  );
};

export default CreateClient;

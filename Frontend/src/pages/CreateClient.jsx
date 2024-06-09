import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useClient } from "../context/ClientContext.jsx";
import Formulario from "../components/CreateClient/Formulario.jsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const CreateClient = () => {
  const { getClienteId } = useClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [formaPago, setFormaPago] = useState("");
  const [estado, setEstado] = useState("");
  const [pago, setPago] = useState("");

  useEffect(() => {
    const currentDate = dayjs();
    const formattedDate = currentDate.format("DD/MM/YYYY");
    const formattedTime = currentDate.format("HH:mm");

    setValue("fecha", formattedDate);
    setValue("hora", formattedTime);
  }, [setValue]);

  useEffect(() => {
    setValue("formaPago", formaPago);
  }, [formaPago, setValue]);

  useEffect(() => {
    setValue("estado", estado);
  }, [estado, setValue]);

  useEffect(() => {
    setValue("pago", pago);
  }, [pago, setValue]);
  return (
    <div>
      <Formulario
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        setFormaPago={setFormaPago}
        setEstado={setEstado}
        formaPago={formaPago}
        estado={estado}
        getClienteId={getClienteId}
        setValue={setValue}
        pago={pago}
        setPago={setPago}
      />
    </div>
  );
};

export default CreateClient;

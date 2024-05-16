import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "../../api/client";

const CreateClient = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    try {
      // Dependiendo de la forma de pago seleccionada, asignar el precio a efectivo o yape
      if (data.formaPago === "efectivo") {
        data.efectivo = data.precio;
        data.yape = 0;
      } else if (data.formaPago === "yape") {
        data.yape = data.precio;
        data.efectivo = 0;
      }
      delete data.precio; // Eliminar el campo de precio para no enviarlo al backend

      const res = await createClient(data);
      console.log(res);
    } catch (error) {
      console.error("Error al crear el cliente:", error);
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-4">Crear Cliente</h1>
      <div className="max-w-md mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Fecha:
            </label>
            <input
              type="text"
              {...register("fecha", { required: true })}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 sr-only">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Hora:
            </label>
            <input
              type="text"
              {...register("hora", { required: true })}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              {...register("nombre", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Número:
            </label>
            <input
              type="text"
              {...register("numero", {
                required: true,
                minLength: 9,
                maxLength: 9,
                pattern: /^[0-9]{1,9}$/,
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.numero?.type === "maxLength" && (
              <p className="text-[red]">
                El campo debe de tener menos de 9 digitos
              </p>
            )}
            {errors.numero?.type === "minLength" && (
              <p className="text-[red]">El campo debe de tener 9 digitos</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Trabajo:
            </label>
            <input
              type="text"
              {...register("trabajo", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Precio:
            </label>
            <input
              type="text"
              {...register("precio", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Forma de Pago:
            </label>
            <select
              name="formaPago"
              {...register("formaPago", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecciona una opción</option>
              <option value="efectivo">Efectivo</option>
              <option value="yape">Yape</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Estado:
            </label>
            <input
              type="text"
              {...register("estado", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateClient;

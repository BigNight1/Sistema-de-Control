import { Select, Option,Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClient } from "../../context/ClientContext";

const Formulario = ({
  handleSubmit,
  register,
  errors,
  setFormaPago,
  setEstado,
  formaPago,
  estado,
  getClienteId,
  setValue,
  pago,
  setPago,
}) => {
  const { createClients, updateClient } = useClient();
  const navigate = useNavigate();
  const params = useParams();
  const [dejarAdelanto, setDejarAdelanto] = useState(false);
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const taskData = await getClienteId(params.id);
        console.log(taskData)
        setTask(taskData);
        setValue("fecha", taskData.fecha);
        setValue("nombre", taskData.nombre);
        setValue("numero", taskData.numero);
        setValue("trabajo", taskData.trabajo);
        setValue("adelanto", taskData.adelanto);
        setValue("precio", taskData.precio);
        setValue("gastos", taskData.gastos);
        setValue("estado", taskData.estado);
        setValue("formaPago", taskData.formaPago);
        setFormaPago(taskData.formaPago);
        setEstado(taskData.estado);

       // Asignar el valor correcto a 'pago' basado en 'formaPago'
        if (taskData.formaPago === "efectivo") {
          setValue("pago", taskData.efectivo);
          setPago(taskData.efectivo);
        } else if (taskData.formaPago === "yape") {
          setValue("pago", taskData.yape);
          setPago(taskData.yape);
        }

        if(taskData.adelanto){
          setDejarAdelanto(true)
        }
      }
    }
    loadTask();
  }, [params.id, getClienteId, setValue, setFormaPago, setEstado, setPago]);

  const handleFormaPagoChange = (val) => {
    setFormaPago(val);
    setValue("formaPago", val);
    if (task) {
      if (val === "efectivo") {
        setValue("pago", task.efectivo);
        setPago(task.efectivo);
      } else if (val === "yape") {
        setValue("pago", task.yape);
        setPago(task.yape);
      }
    }
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
    };

    if (data.formaPago === "efectivo") {
      payload.efectivo = data.pago;
      payload.yape = data.yape;
    } else if (data.formaPago === "yape") {
      payload.yape = data.pago;
      payload.efectivo = data.efectivo;
    }

    if (params.id) {
      updateClient(params.id, payload);
    } else {
      createClients(payload);
      console.log(payload);
    }

    setTimeout(() => {
      navigate("/Home");
    }, 1200); // Redirigir después de 1 segundo
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-3xl font-bold mb-4">Crear Cliente</h1>
        <div className="w-[400px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {/* Fecha */}
            <div className="mb-4">
              <label className="block text-blue-gray-700 text-sm font-bold mb-2">
                Fecha:
              </label>
              <Input
                label="Fecha"
                type="text"
                disabled
                {...register("fecha", { required: true })}
                readOnly
              />
            </div>
            {/* Hora */}
            <div className="mb-4 sr-only">
              <Input
                type="hora"
                {...register("hora", { required: true })}
                readOnly
              />
            </div>
            {/* Nombre */}
            <div className="mb-4">
              <Input
                label="Nombre"
                type="text"
                {...register("nombre", { required: "Es necesario el Nombre" })}
              />
              {errors.nombre && (
                <p className="text-[red]">Es necesario el Nombre</p>
              )}
            </div>
            {/* Número */}
            <div className="mb-4">
              <Input
                label="Número"
                type="text"
                maxLength={9}
                {...register("numero", {
                  required: true,
                  minLength: {
                    value: 9,
                    message: "El campo debe de tener 9 dígitos",
                  },
                  maxLength: {
                    value: 9,
                    message: "El campo debe de tener menos de 9 dígitos",
                  },
                  pattern: {
                    value: /^[0-9]{1,9}$/,
                    message: "El campo debe contener solo números",
                  },
                })}
              />
              {errors.numero && (
                <p className="text-[red]">{errors.numero.message}</p>
              )}
            </div>
            {/* Trabajo */}
            <div className="mb-4">
              <Input
                label="Trabajo"
                type="text"
                {...register("trabajo", { required: true })}
              />
              {errors.trabajo && (
                <p className="text-[red]">
                  Es necesario la Descripcion del Trabajo
                </p>
              )}
            </div>
            {/* Dejar adelanto */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={dejarAdelanto}
                className="size-4 mr-1"
                onChange={(e) => setDejarAdelanto(e.target.checked)}
              />
              <label className="block text-blue-gray-700 text-sm font-bold">
                ¿Desea dejar un adelanto?
              </label>
            </div>
            {/* Monto del adelanto (condicional) */}
            {dejarAdelanto && (
              <div className="mb-4">
                <Input
                  label="Adelanto"
                  type="text"
                  {...register("adelanto")} // Registrar el campo "adelanto"
                />
              </div>
            )}
            {/* Precio */}
            <div className="mb-4">
              <Input
                label="Precio"
                type="text"
                {...register("precio", { required: true })}
              />
              {errors.precio && (
                <p className="text-[red]">Es necesario el Precio</p>
              )}
            </div>
            {/* Pago */}
            <div className="mb-4">
              <Input
                label="Pago"
                type="text"
                value={pago}
                onChange={(e) => {
                  setPago(e.target.value);
                }}
              />
              {errors.pago && (
                <p className="text-[red]">Es necesario el Pago</p>
              )}
            </div>
            {/* Gastos */}
            <div className="mb-4">
              <Input label="Gastos" type="text" {...register("gastos")} />
            </div>
            {/* Forma de Pago */}
            <div className="mb-4">
              <Select
                label="Forma de Pago"
                value={formaPago}
                onChange={(val) => handleFormaPagoChange(val)}
              >
                <Option value="">Selecciona una opción</Option>
                <Option value="efectivo">Efectivo</Option>
                <Option value="yape">Yape</Option>
              </Select>
              {errors.formaPago && (
                <p className="text-[red]">Campo requerido</p>
              )}
            </div>
            {/* Estado */}
            <div className="mb-4">
              <Select
                label="Estado"
                value={estado}
                onChange={(val) => {
                  setEstado(val);
                  setValue("estado", val);
                }}
              >
                <Option value="">Selecciona una opción</Option>
                <Option value="Entregado">Entregado</Option>
                <Option value="En proceso">En proceso</Option>
                <Option value="Cancelado">Cancelado</Option>
              </Select>
              {errors.estado && <p className="text-[red]">Campo requerido</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;

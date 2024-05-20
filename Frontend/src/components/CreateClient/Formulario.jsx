import { Select, Option } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";

const Formulario = ({
  handleSubmit,
  register,
  errors,
  onSubmit,
  setFormaPago,
  setEstado,
  formaPago,
  estado,
}) => {
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center	 justify-center h-full w-full">
        <h1 className=" text-3xl font-bold mb-4">Crear Cliente</h1>
        <div className="w-[400px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {/* Fecha*/}
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
                <p className="text-[red]">Es necesario el Trabajo</p>
              )}
            </div>
            {/* Adelanto */}

            <div className="mb-4">
              <Input
                label="Adelanto"
                type="text"
                {...register("adelanto")}
              />
            </div>
            {/* Pago */}

            <div className="mb-4">
              <Input
                label="Pago"
                type="text"
                {...register("pago")}
              />
              {errors.pago && (
                <p className="text-[red]">Es necesario el Precio</p>
              )}
            </div>
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
            {/* Gastos */}

            <div className="mb-4">
              <Input label="Gastos" type="text" {...register("gastos")} />
            </div>
            {/* Forma de Pago */}

            <div className="mb-4">
              <Select
                label="Forma de Pago"
                value={formaPago}
                onChange={(val) => setFormaPago(val)}
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
                onChange={(val) => setEstado(val)}
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

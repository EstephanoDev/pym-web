"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchemaClient } from "@/lib/validations";
import { FORM_API, LOCAL_URL, pb } from "@/lib/db";
import axios from "axios";

const inputClasses =
  "text-black block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";
const buttonClasses =
  "rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed";

const selectClasses =
  "rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed";



function FormContent() {
  const clientAction = async (formData: FormData) => {
    const ubicacionFormatted = formData.get('Ubicacion') + '-' + formData.get('Ubicacion2') + '-' + formData.get('Ubicacion3')
    const fecha: any = formData.get('Fecha')
    const fechaObjeto = new Date(fecha);
    const fechaFormateada = `${fechaObjeto.getFullYear()}-${(fechaObjeto.getMonth() + 1).toString().padStart(2, '0')}-${fechaObjeto.getDate().toString().padStart(2, '0')} 12:00:00`;


    if (formData.get('TipoTrabajo') == 'BOTH') {
      const newForm = {
        Fecha: fechaFormateada,
        Trabajador: formData.get('Trabajador'),
        Grupo: [formData.get('Grupo'), formData.get('Trabajador')],
        TipoTrabajo: 'INSTALACIONES',
        TrabajoRealizado: formData.get('TrabajoRealizado'),
        Ubicacion: ubicacionFormatted,
        Observacion: formData.get('Observacion'),
      }
      const newForm2 = {
        Fecha: fechaFormateada,
        Trabajador: [formData.get('Grupo'), formData.get('Trabajador')],
        Grupo: formData.get('Grupo'),
        TipoTrabajo: 'ACTIVACIONES',
        TrabajoRealizado: formData.get('TrabajoRealizado'),
        Ubicacion: ubicacionFormatted,
        Observacion: formData.get('Observacion'),
      }
      const result = formSchemaClient.safeParse(newForm)
      if (!result.success) {
        console.log(result)
      }
      await axios.post(`${LOCAL_URL}/${FORM_API}`, newForm)
      await axios.post(`${LOCAL_URL}/${FORM_API}`, newForm2)
      return
    }
    const newForm = {
      Fecha: fechaFormateada,
      Trabajador: [formData.get('Grupo'), formData.get('Trabajador')],
      Grupo: formData.get('Grupo'),
      TipoTrabajo: formData.get('TipoTrabajo'),
      TrabajoRealizado: formData.get('TrabajoRealizado'),
      Ubicacion: ubicacionFormatted,
      Observacion: formData.get('Observacion'),
    }
    const result = formSchemaClient.safeParse(newForm)
    if (!result.success) {
      console.log(result)
    }
    await axios.post(`${LOCAL_URL}/${FORM_API}`, newForm)
  }

  return (
    <div className="grid grid-cols-1 gap-3 relative">
      <form action={clientAction}>
        <Input type="date" className={inputClasses} name="Fecha" />
        <Input type="text" value='6ibspqnkozxup3p' readOnly hidden name="Trabajador" />
        <Input type="text" className={inputClasses} name="Grupo" placeholder="Grupo" />
        <select className={selectClasses} name="TipoTrabajo">
          <option value='RD'>RD</option>
          <option value='RA'>RA</option>
          <option value='DP'>DP</option>
          <option value='BANDEJAS'>BANDEJAS</option>
          <option value='INSTALACIONES'>INSTALACIONES</option>
          <option value='ACTIVACIONES'>ACTIVACIONES</option>
          <option value='BOTH'>INSTALACIONES Y ACTIVACIONES</option>
          <option value='SOPLADO'>SOPLADO</option>
          <option value='FUSIONES'>FUSIONES</option>
          <option value='AVERIAS'>AVERIAS</option>
          <option value='OTROS'>OTROS</option>
        </select>
        <Input className={inputClasses} name="TrabajoRealizado" placeholder="TrabajoRealizado" />
        <div className="flex flex-auto">
          <Input className={inputClasses} name="Ubicacion" placeholder="xxx" />
          <h1 className="m-2">-</h1>
          <Input className={inputClasses} name="Ubicacion2" placeholder="xxx" />
          <h1 className="m-2">-</h1>
          <Input className={inputClasses} name="Ubicacion3" placeholder="xxxxx" />
        </div>
        <Input className={inputClasses} name="Observacion" placeholder="Observacion" />
        <Button className={buttonClasses} type="submit">Submit</Button>
      </form>
    </div>

  );
}

export default FormContent

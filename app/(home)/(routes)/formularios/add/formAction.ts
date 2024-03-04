import { FORM_API, LOCAL_URL } from "@/lib/db";
import { UserData } from "@/lib/types";
import { formSchemaClient } from "@/lib/validations";
import axios from "axios";

export async function createForm(formData: FormData) {
  const ubicacion1 = formData.get('Ubicacion');
  const ubicacion2 = formData.get('Ubicacion2');
  const ubicacion3 = formData.get('Ubicacion3');

  const ubicacionFormatted = `${ubicacion1 || ''}-${ubicacion2 || ''}-${ubicacion3 || ''}`;

  const fecha: any = formData.get('Fecha');
  const fechaObjeto = new Date(fecha);
  const fechaFormateada = `${fechaObjeto.getFullYear()}-${(fechaObjeto.getMonth() + 1).toString().padStart(2, '0')}-${fechaObjeto.getDate().toString().padStart(2, '0')} 12:00:00`;

  const tipoTrabajo = formData.get('TipoTrabajo');

const trabajoRealizadoValue = formData.get('TrabajoRealizado');
const trabajoRealizado = trabajoRealizadoValue instanceof File
  ? trabajoRealizadoValue // Handle the file case as needed
  : trabajoRealizadoValue !== null
    ? parseInt(trabajoRealizadoValue, 10)
    : 0;

  if (tipoTrabajo === 'BOTH') {
    const newForm = {
      Fecha: fechaFormateada,
      Trabajador: formData.get('Trabajador'),
      Grupo: formData.getAll('Grupo'),
      TipoTrabajo: 'INSTALACIONES',
      TrabajoRealizado: formData.get('TrabajoRealizado'),
      Ubicacion: ubicacionFormatted,
      Observacion: formData.get('Observacion'),
    };

    const newForm2 = {
      Fecha: fechaFormateada,
      Trabajador: formData.get('Trabajador'),
      Grupo: formData.getAll('Grupo'),
      TipoTrabajo: 'ACTIVACIONES',
      TrabajoRealizado: formData.get('TrabajoRealizado'),
      Ubicacion: ubicacionFormatted,
      Observacion: formData.get('Observacion'),
    };

    const result1 = formSchemaClient.safeParse(newForm);
    const result2 = formSchemaClient.safeParse(newForm2);

    if (!result1.success) {
      console.log(result1);
    }

    if (!result2.success) {
      console.log(result2);
    }

    await axios.post(`${LOCAL_URL}/${FORM_API}`, newForm);
    await axios.post(`${LOCAL_URL}/${FORM_API}`, newForm2);

    return;
  }
const newForm = {
  Fecha: fechaFormateada,
  Trabajador: formData.get('Trabajador'),
  Grupo: formData.getAll('Grupo'),
  TipoTrabajo: tipoTrabajo as string, // Assuming tipoTrabajo is a string
  TrabajoRealizado: trabajoRealizado, 
  // Converting to number, default to 0 if null   
  Ubicacion: ubicacionFormatted,
  Observacion: formData.get('Observacion'),
};

  console.log(newForm);

  const result = formSchemaClient.safeParse(newForm);

  if (!result.success) {
    console.log(result);
  }

  try {
    await axios.post(`${LOCAL_URL}/${FORM_API}`, newForm);
  } catch (error) {
    // Handle errors as before
  }
}

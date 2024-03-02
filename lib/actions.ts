'use server'

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db, { FILE_API, FORM_API, LOCAL_URL, UBIS_API } from "./db";
import { formSchema } from "./validations";
import { ZodError } from "zod";
import { formData } from "zod-form-data";

export const addForm = async (formData: FormData): Promise<void> => {
  try {
    // Convertir formData a un objeto
    const formObject = Object.fromEntries(formData);

    console.log(formObject)
    // Crear una nueva instancia de la clase Form (si existe)
    // Realizar la solicitud POST con Axios

  } catch (error) {
    // Manejar errores, por ejemplo, lanzar una excepción o realizar algún registro
    console.error("Error al agregar formulario:", error);
    throw new Error("Error al agregar formulario");
  }
  revalidatePath("/Formularios")
  redirect("/Formularios")

  // This line will be reached after the try-catch block
};

export const deleteForm = async (formData: string) => {
  console.log(formData)
  try {
    await axios.delete(`${LOCAL_URL}/${FORM_API}/${formData}`)
  } catch (error) {
    console.error('Error al eliminar Formulario', error)
    throw new Error("Error Al Eliminar Fomulario")
  }
  revalidatePath('/formularios')
  redirect('/formularios')
}

export const EditForm = async (formData: FormData) => {
  const formId = formData.get('id') || undefined
  const Ubicacion = formData.get('Ubicacion') || undefined
  const TipoTrabajo = formData.get('TipoTrabajo') || undefined
  const TrabajoRealizado = formData.get('TrabajoRealizado') || undefined
  const Observacion = formData.get('Observacion') || undefined
  console.log(TrabajoRealizado)
  const data = { Ubicacion: Ubicacion, TipoTrabajo: TipoTrabajo, TrabajoRealizado: TrabajoRealizado, Observacion: Observacion }
  try {
    await axios.patch(`${LOCAL_URL}/${FORM_API}/${formId}`, data)
  } catch (e) {
    console.error('Error al Editer Formulario')
    throw new Error("Error al editar Fomulario")
  }
  revalidatePath('/formularios')
  redirect('/formularios')
}
export const EditUbi = async (ubiId: any, Descripcion: string) => {
  const { descripcion, id } = ubiId
  const data = { Descripcion: descripcion }
  console.log(id)
  try {
    await axios.patch(`${LOCAL_URL}/${UBIS_API}/${id}`, data)
  } catch (error) {
    console.error('Error al Editer Ubicacion')
    throw new Error("Error al editar Ubicacion")
  }
  revalidatePath("/ubicaciones")
  redirect("/ubicaciones")
}
export const createfile = async (fileInfo: any) => {

  try {
    await db.client.collection('Archivos').create(fileInfo);
  } catch (error) {
    console.error('error al crear el archivo', error);
    throw error; // propaga el error para manejarlo en el componente si es necesario
  }
};
export const deleteFile = async (fileId: string) => {
  try {
    await db.client.collection('Archivos').delete(fileId)
    revalidatePath('/Archivos')

  } catch (error) {
    console.error('error al eliminar archivo', error)
    throw error

  }
}

export type State =
  | {
    status: "success";
    message: string;
  }
  | {
    status: "error";
    message: string;
    errors?: Array<{
      path: string;
      message: string;
    }>;
  }
  | null;

export async function getFullName(
  prevState: State,
  data: FormData,
): Promise<State> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { Fecha, Trabajador, Grupo, TipoTrabajo, TrabajoRealizado, Ubicacion, Observacion } = formSchema.parse(data);
    const formData = {
      Fecha: Fecha,
      Trabajador: Trabajador,
      Grupo: Grupo,
      TipoTrabajo: TipoTrabajo,
      TrabajoRealizado: TrabajoRealizado,
      Ubicacion: Ubicacion,
      Observacion: Observacion,
    }
    return (console.log(formData), {
      status: "success",
      message:
        `
      Fecha: ${Fecha}, 
      Trabajador: ${Trabajador},
      Grupo: ${Grupo},
      TipoTrabajo: ${TipoTrabajo},
      TrabajoRealizado: ${TrabajoRealizado},
      Ubicacion: ${Ubicacion},
      Observacion: ${Observacion}`,
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data.",
        errors: e.issues.map((issue) => ({
          path: issue.path.join("."),
          message: `Server validation: ${issue.message}`,
        })),
      };
    }
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}

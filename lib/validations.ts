import { zfd } from "zod-form-data";
import { z } from "zod";

export const formSchema = zfd.formData({
  Fecha: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  Trabajador: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  Grupo: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  TipoTrabajo: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  TrabajoRealizado: zfd.numeric(z.number().min(2, "Too short").max(10000, "Too long")),
  Ubicacion: z
    .string()
    .refine(value => /^[A-Z]{3}-\d{3}-(DP|S)\d{3}$/.test(value), {
      message: "Invalid format"
    }),
  Observacion: zfd.text(z.string().min(2, "Too short").max(100, "Too long")),
});

export const formSchemaClient = z.object({
  Fecha: z.string().min(2, "Too short").max(20, "Too long"),
  Trabajador: z.string().min(2, "Too short").max(20, "Too long"),
  Grupo: z.string().min(2, "Too short").max(20, "Too long"),
  TipoTrabajo: z.string().min(2, "Too short").max(20, "Too long"),
  TrabajoRealizado: z.string().min(0, "Too short").max(20, "Too long"),
  Ubicacion: z
    .string()
    .refine(value => /^[A-Z]{3}-\d{3}-(DP|S)\d{3}$/.test(value), {
      message: "Invalid format"
    }),
  Observacion: z.string().min(2, "Too short").max(100, "Too long"),
});

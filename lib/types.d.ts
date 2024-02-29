export interface Formularios {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  Fecha: string;
  Trabajador: string;
  Grupo: string[];
  TipoTrabajo: string;
  Ubicacion: string;
  Observacion: string;
  TrabajoRealizado: number;
  NombreUsuario?: string;  // Agrega la propiedad NombreUsuario
}
interface UserData {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  roles: string[];
  updated: string;
  username: string;
  verified: boolean;
  token: string;
}
export interface Ubi {
  id: string
  longitud: number
  Descripcion: string
  latitud: number
  user: User[]
}
export type Coordinates = {
  created: string
  id: string
  longitud: number | null;
  latitud: number | null;
  Descripcion: string
};

export type lastSendsData = {
  id?: string
  name: string
  value: number
  workType: string
  location: string
  createdAt?: string
}
export type WeekForms = {
  PorcentajeCambio: string;
  Anio: number
  Semana: string
  SumaDelTrabajo: number
  TipoTrabajo: string
  Trabajadores: string
  collectionId: string
  collectionName: string
  id: string
}
export interface GetRolResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: UserData[];
}
export interface GetFormResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Formularios[];
}

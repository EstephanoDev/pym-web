import { FormTable } from "@/components/formularios"
import { columns } from "@/components/formularios/formTable/columns";
import { getForms, getFormsById } from "@/lib/data"
import db from "@/lib/db";
import { Formularios, GetFormResponse, GetRolResponse } from "@/lib/types";
import { cookies } from "next/headers";
import { AuthModel } from "pocketbase";

async function FormPage({
  searchParams
}: {
  searchParams?: {
    search?: string
    filter?: string
    grupo?: string
  }
}) {
  const cookieStore = cookies()
  const user: AuthModel = await db.getUser(cookieStore)
  const userId = user?.id;

  const search = searchParams?.search || ''; // Pass undefined when search is not provided
  const filter = searchParams?.filter || '';

  if (userId == 'f92t319vbq8h0rf') {
    const forms = await getForms(search, filter);
    return <h1><FormTable data={forms} columns={columns} /></h1>;
  } else {
    const forms: Formularios[] = await getFormsById(userId, search);
    return <h1><FormTable data={forms} columns={columns} /></h1>;
  }
}
export default FormPage


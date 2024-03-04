
import db from "@/lib/db"
import FormContent from "./formContent"
import { cookies } from "next/headers";

async function addPage() {
  const users = await db.client.collection('users').getFullList()
  const cookieStore = cookies();
  const user = await db.getUser(cookieStore);

  return (
    <div><FormContent users={users} client={user}  /></div>
  )
}

export default addPage

import { fetchForm } from "@/lib/data"
import { EditForm } from "@/lib/actions"

const SingleForm = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const form = await fetchForm(id);

  return (
    <div className={`flex justify-center items-center h-screen `}>
      <div className={`w-96 p-8 border border-gray-300 rounded bg-white`}>
        <form action={EditForm} className={`flex flex-col`}>
          <input type="hidden" name="id" value={form.id} />
          <label className="mt-2 font-bold">Tipo Trabajo</label>
          <input type="text" name="TipoTrabajo" placeholder={form.TipoTrabajo} className="mb-2 p-2 border rounded" />
          <label className="mt-2 font-bold">Trabajo Realizado</label>
          <input type="number" name="TrabajoRealizado" placeholder={form.TrabajoRealizado} className="mb-2 p-2 border rounded" />
          <label className="mt-2 font-bold">Ubicacion</label>
          <input type="text" name="Ubicacion" placeholder={form.Ubicacion} className="mb-2 p-2 border rounded" />
          <label className="mt-2 font-bold">Grupo</label>
          <input
            type="text"
            name="color"
            placeholder={form.Grupo || "No"}
            className="mb-2 p-2 border rounded"
          />
          <label className="mt-2 font-bold">Observacion</label>
          <textarea
            name="desc"
            id="desc"
            placeholder={form.Observacion}
            className="mb-2 p-2 border rounded"
          ></textarea>
          <button className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-700">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleForm;


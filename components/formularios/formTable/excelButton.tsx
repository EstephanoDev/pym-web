import * as XLSX from 'xlsx';
import { Formularios } from '@/lib/types';
import { Button } from '@/components/ui/button';

const ExcelDownloadButton = ({ forms }: { forms: any[] }) => {
  const downloadExcel = () => {
    const headers = ["ID", "Fecha", "nombre", "Grupo", "TipoTrabajo", "TrabajoRealizado", "Ubicacion"/* ...other columns */];

    const data = forms.map(form => [
      form.id,
      form.Fecha,
      form.Trabajador,
      form.Grupo,
      form.TipoTrabajo,
      form.TrabajoRealizado,
      form.Ubicacion
      /* ...map other form fields accordingly */
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Forms');

    XLSX.writeFile(wb, 'forms_data.xlsx');
  };

  return (
    <Button className="m-2" onClick={downloadExcel}>
      Descargar Excel
    </Button>
  );
};

export default ExcelDownloadButton;





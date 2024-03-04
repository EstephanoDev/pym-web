'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { createForm } from "./formAction";

interface User {
  id: string; // Adjust the type based on the actual type of the user ID
  value: string;
}
function FormContent({ users, client }: any) {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    // Filtrar opciones solo cuando la longitud de la búsqueda es al menos 3
    if (searchQuery.length >= 3) {
      const filtered = users.filter(
        (user: any) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOptions(
        filtered.map((user: any) => ({
          value: user.id,
          label: user.name,
        }))
      );
    }
  }, [searchQuery, users]);

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };

  const handleInputChange = (inputValue: string) => {
    setSearchQuery(inputValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Extract values from selectedUsers array and add them to the form data
    const selectedValues = selectedUsers.map((user) => user.value);
    const formData = new FormData(event.currentTarget);
    formData.append('selectedUsers', JSON.stringify(selectedValues));
  
    // Call createForm with formData
    createForm(formData);
  };
  

  return (
    <div className="grid grid-cols-1 gap-3 relative">
      <form onSubmit={handleSubmit}>
        <Input type="date" name="Fecha" />
        <input type="text" value={client.id} readOnly hidden name="Trabajador" />
        <Select
          className="text-black"
          isMulti
          name="Grupo"
          options={filteredOptions}
          value={selectedUsers}
          onChange={handleSelectChange} // Handle Select change
          onInputChange={handleInputChange} // Handle input change
        />
        <select  name="TipoTrabajo">
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
        <Input name="TrabajoRealizado" type="number" placeholder="TrabajoRealizado" />
        <div className="flex flex-auto">
          <Input name="Ubicacion" placeholder="xxx" />
          <h1 className="m-2">-</h1>
          <Input name="Ubicacion2" placeholder="xxx" />
          <h1 className="m-2">-</h1>
          <Input name="Ubicacion3" placeholder="xxxxx" />
        </div>
        <Input name="Observacion" placeholder="Observacion" />
        <Button type="submit">Submit</Button>
      </form>
    </div>

  );
}

export default FormContent

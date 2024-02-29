'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { deleteForm } from "@/lib/actions"
import { Formularios } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export const columns: ColumnDef<Formularios>[] = [
  {
    accessorKey: 'Fecha',
    header: 'Fecha',
    cell: ({ row }) => {
      const Fecha = row.original.Fecha

      return <span>{Fecha.toString().slice(4, 16)}</span>
    }
  },
  {
    accessorKey: 'NombreUsuario',
    header: 'Grupo'
  },
  {
    accessorKey: 'TipoTrabajo',
    header: 'TipoTrabajo'
  },
  {
    accessorKey: 'TrabajoRealizado',
    header: 'TrabajoRealizado'
  },
  {
    accessorKey: 'Ubicacion',
    header: 'Ubicacion'
  },
  {
    accessorKey: 'Observacion',
    header: 'Observacion'
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={`/formularios/${payment.id}`}>Editar</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><form action={() => deleteForm(payment.id)}><button type="submit">Eliminar</button></form></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]



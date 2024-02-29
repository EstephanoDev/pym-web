"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation"
import ExcelDownloadButton from "./excelButton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { DatePicker } from 'antd'


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function FormTable<TData, TValue>({
  columns,
  data,

}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (e: string) => {
    const params = new URLSearchParams(searchParams)
    if (e) {
      params.set('search', e)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }
  const handleFilterType = (e: any) => {
    const params = new URLSearchParams(searchParams)
    if (e) {
      params.set('filter', e)
    } else {
      params.delete('filter')
    }
    replace(`${pathname}?${params.toString()}`)
  }
  const opciones = [
    { value: 'RD', label: 'RD' },
    { value: 'RA', label: 'RA' },
    { value: 'DP', label: 'DP' },
    { value: 'BANDEJAS', label: 'Bandejas' },
    { value: 'INSTALACIONES', label: 'Instalaciones' },
    { value: 'ACTIVACIONES', label: 'Activaciones' },
    { value: 'SOPLADO', label: 'Soplado' },
    { value: 'FUSIONES', label: 'Fusiones' },
    { value: 'AVERIAS', label: 'Averías' },
    { value: 'OTROS', label: 'Otros' },
  ];
  const handleButtonClick = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('filter')
    params.delete('search')
    params.delete('date')
    replace(`${pathname}?${params.toString()}`)
  };
  const handleDateChange = (e: any) => {
    console.log(e)
    const params = new URLSearchParams(searchParams)
    if (e) {
      params.set('date', e)
    } else {
      params.delete('date')
    }
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="rounded-md border">
      <div className="mb-4 flex flex-row m-2">
        <DatePicker.RangePicker className="w-3/5 my-2" onChange={handleDateChange} />
        <Input
          type="text"
          placeholder="Ubicacion..."
          defaultValue={searchParams.get('search')?.toString()}
          className="px-4 py-2 rounded-md border w-full m-2"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select onValueChange={(e) => handleFilterType(e)} defaultValue="">
          <SelectTrigger className="w-[180px] m-2">
            <SelectValue placeholder="TipoTrabajo" />
          </SelectTrigger>
          <SelectContent>
            {opciones.map((opcion) => (
              <SelectItem key={opcion.value} value={opcion.value}
              >{opcion.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant='destructive' onClick={handleButtonClick} className="m-2">x</Button>
        <ExcelDownloadButton forms={data} />
        <Button className="m-2" ><Link href={`/formularios/add`}>+</Link></Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}


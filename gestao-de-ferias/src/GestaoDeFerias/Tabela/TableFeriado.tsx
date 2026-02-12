// src/pages/feriados/components/TableFeriado.tsx
import { AnimatePresence, motion } from "framer-motion"
import { Trash2, Settings } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Feriado } from "../HookGestaoDeFerias/Feriado"

type Props = {
  items: Feriado[]
  onDelete: (id: string) => void
}

function formatDateBR(yyyyMmDd: string) {
  // Espera "YYYY-MM-DD"
  if (!yyyyMmDd) return ""
  const [y, m, d] = yyyyMmDd.split("-")
  if (!y || !m || !d) return yyyyMmDd
  return `${d}/${m}/${y}`
}

export function TableFeriado({ items, onDelete }: Props) {
  const [density, setDensity] = useState<"espacosa" | "confortavel" | "compacta">(
    "confortavel"
  )

  const rowPadding = density === "espacosa" ? "py-4" : density === "compacta" ? "py-1" : "py-2.5"
  return (
    <div className="rounded-2xl border bg-background overflow-hidden">
      <div className="px-4 py-3 border-b flex items-start justify-between">
        <div>
          <h2 className="text-sm font-medium">Feriados cadastrados</h2>
          <p className="text-xs text-muted-foreground">
            {items.length} registro{items.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs"
                title="Densidade"
              >
                <Settings className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent sideOffset={8} className="w-44">
              <div className="px-1 py-1">
                <div className="text-xs font-medium px-2 pb-1">Densidade da tabela</div>
                <DropdownMenuRadioGroup value={density} onValueChange={(v) => setDensity(v as any)}>
                  <DropdownMenuRadioItem value="confortavel">Confortável</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="compacta">Compacta</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="espacosa">Espaçosa</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Data</TableHead>
            <TableHead>Feriado</TableHead>
            <TableHead className="w-[140px]">Trabalhado</TableHead>
            <TableHead className="w-[120px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className={`${rowPadding} text-center text-muted-foreground`}>
                  Nenhum feriado encontrado com esses filtros.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="border-b last:border-b-0"
                >
                  <TableCell className={`${rowPadding} font-medium`}>
                    {formatDateBR(item.dtFeriado)}
                  </TableCell>

                  <TableCell className={rowPadding}>{item.Descricao}</TableCell>

                  <TableCell className={rowPadding}>
                    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
                      {item.FeriadoTrabalhado ? "S" : "N"}
                    </span>
                  </TableCell>

                  <TableCell className={`${rowPadding} text-right`}>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-2"
                      onClick={() => onDelete(item.id)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                      Deletar
                    </Button>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  )
}
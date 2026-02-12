import { motion } from "framer-motion"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FiltrosState = {
  dtFeriado: string
  Descricao: string
  FeriadoTrabalhado: "Todos" | "S" | "N"
}

type Props = {
  value: FiltrosState
  onChange: <K extends keyof FiltrosState>(key: K, value: FiltrosState[K]) => void
  onClear: () => void
}

export function FiltrosFeriados({ value, onChange, onClear }: Props) {
  const hasAny =
    !!value.dtFeriado || !!value.Descricao || value.FeriadoTrabalhado !== "Todos"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base">
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Filtre por dia, Nome do Feriado e “trabalhado”.
              </p>
            </div>

            <Button
              variant="ghost"
              className="gap-2"
              onClick={onClear}
              disabled={!hasAny}
              type="button"
            >
              <X className="h-4 w-4" />
              Limpar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="md:col-span-3 space-y-2">
              <Label>Dia</Label>
              <Input
                type="date"
                value={value.dtFeriado}
                onChange={(e) => onChange("dtFeriado", e.target.value)}
              />
            </div>

            <div className="md:col-span-6 space-y-2">
              <Label>Nome Feriado</Label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Ex: Carnaval"
                  value={value.Descricao}
                  onChange={(e) => onChange("Descricao", e.target.value)}
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <Label>Trabalhado</Label>
              <Select
                value={value.FeriadoTrabalhado}
                onValueChange={(v) =>
                  onChange("FeriadoTrabalhado", v as FiltrosState["FeriadoTrabalhado"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="S">Sim</SelectItem>
                  <SelectItem value="N">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
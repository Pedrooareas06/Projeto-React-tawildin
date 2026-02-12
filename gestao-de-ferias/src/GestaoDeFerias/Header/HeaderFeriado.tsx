import { motion } from "framer-motion"
import { CalendarDays, Plus, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Props = {
  total: number
  onNovo?: () => void
  onRecarregar?: () => void
}

export function HeaderFeriados({ total, onNovo, onRecarregar }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-30 left-0 right-0 px-6 py-6 bg-background/90 backdrop-blur border-b"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl border flex items-center justify-center">
            <CalendarDays className="h-5 w-5" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-semibold leading-none">
                Feriados & Datas
              </h1>
              <Badge variant="secondary" className="rounded-full">
                {total} registros
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Cadastre e consulte feriados por período, com controle de “trabalhado”.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={onRecarregar}
            type="button"
          >
            <RefreshCcw className="h-4 w-4" />
            Recarregar
          </Button>

          <Button className="gap-2" onClick={onNovo} type="button">
            <Plus className="h-4 w-4" />
            Novo feriado
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Props = {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  title?: string
  description?: string
}

export function DialogDeleteFeriado({
  open,
  onCancel,
  onConfirm,
  title = "Deletar feriado",
  description = "Essa ação não pode ser desfeita. Deseja realmente deletar este feriado?",
}: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onCancel() : undefined)}>
      <DialogContent className="sm:max-w-[460px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-muted">
              <AlertTriangle className="h-5 w-5" />
            </span>
            {title}
          </DialogTitle>

          <DialogDescription className="pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancelar
          </Button>

          <Button variant="destructive" onClick={onConfirm} type="button">
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
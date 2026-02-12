import { useState } from "react"
import { useFeriados } from "../HookGestaoDeFerias/Feriado";
import { HeaderFeriados } from "../Header/HeaderFeriado";
import { FiltrosFeriados } from "../Filtros/FilterFeriados";
import { FormFeriado } from "../Form/FormFeriado";
import { TableFeriado } from "../Tabela/TableFeriado";
import { DialogDeleteFeriado } from "../Dialog/DialogFeriado";
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Github, Linkedin } from "lucide-react"

export default function GestaoDeFerias() {
  const feriados = useFeriados()
  const [showForm, setShowForm] = useState(false)


  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header em largura total */}
      <HeaderFeriados
        total={feriados.items.length}
        onNovo={() => setShowForm(true)}
        onRecarregar={() => feriados.reload?.()}
      />

      <div className={`mx-auto max-w-6xl p-4 sm:p-6`}>

        <FiltrosFeriados
          value={feriados.filtro}
          onChange={feriados.onChangeFiltro}
          onClear={() => feriados.resetFiltro?.()}
        />

        <TableFeriado
          items={feriados.itemsFiltrados}
          onDelete={feriados.requestDelete}
        />

        {/* Form inside dialog (opens when Novo feriado clicked) */}
        <Dialog open={showForm} onOpenChange={(v) => !v && setShowForm(false)}>
          <DialogContent className="sm:max-w-2xl rounded-2xl">
            <FormFeriado
              value={feriados.form}
              isValid={feriados.isFormValid}
              onChange={feriados.onChangeForm}
              onSubmit={() => {
                feriados.addFeriado()
                setShowForm(false)
              }}
            />
          </DialogContent>
        </Dialog>

        <DialogDeleteFeriado
        open={!!feriados.deletingId}
        onCancel={feriados.cancelDelete}
        onConfirm={feriados.confirmDelete}
        />

        

        {/* Footer */}
        <footer className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Feito por Pedro Areas</div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Pedrooareas06"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/pedrohenriquefrontend/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
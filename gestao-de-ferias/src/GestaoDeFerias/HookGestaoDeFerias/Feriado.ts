import { useMemo, useState } from "react"

export type Feriado = {
  id: string
  dtFeriado: string       // "YYYY-MM-DD"
  Descricao: string
  FeriadoTrabalhado: boolean
}

type FeriadoFormState = {
  dtFeriado: string
  Descricao: string
  FeriadoTrabalhado: "S" | "N"
}

type FeriadosFiltroState = {
  dtFeriado: string
  Descricao: string
  FeriadoTrabalhado: "S" | "N" | "Todos"
}

export function useFeriados() {
  const initialItems: Feriado[] = [
    { id: "1", dtFeriado: "2026-02-17", Descricao: "Carnaval", FeriadoTrabalhado: false },
    { id: "2", dtFeriado: "2026-01-20", Descricao: "São Sebastião", FeriadoTrabalhado: true },
    { id: "3", dtFeriado: "2026-01-01", Descricao: "Confraternização Universal", FeriadoTrabalhado: false },
  ]

  const [items, setItems] = useState<Feriado[]>(initialItems)

  const [form, setForm] = useState<FeriadoFormState>({
    dtFeriado: "",
    Descricao: "",
    FeriadoTrabalhado: "S",
  })

  const [filtro, setFiltro] = useState<FeriadosFiltroState>({
    dtFeriado: "",
    Descricao: "",
    FeriadoTrabalhado: "Todos",
  })

  const [deletingId, setDeletingId] = useState<string | null>(null)

  const isFormValid = useMemo(() => {
    return form.dtFeriado.trim() !== "" && form.Descricao.trim().length >= 2
  }, [form.dtFeriado, form.Descricao])

  function onChangeForm<K extends keyof FeriadoFormState>(key: K, value: FeriadoFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function onChangeFiltro<K extends keyof FeriadosFiltroState>(key: K, value: FeriadosFiltroState[K]) {
    setFiltro((prev) => ({ ...prev, [key]: value }))
  }

  function resetFiltro() {
    setFiltro({ dtFeriado: "", Descricao: "", FeriadoTrabalhado: "Todos" })
  }

  function reload() {
    setItems([...initialItems])
  }

  function addFeriado() {
    if (!isFormValid) return

    const novo: Feriado = {
      id: crypto.randomUUID(),
      dtFeriado: form.dtFeriado,
      Descricao: form.Descricao.trim(),
      FeriadoTrabalhado: form.FeriadoTrabalhado === "S", // ✅ conversão "S/N" -> boolean
    }

    setItems((prev) => [novo, ...prev])
    setForm({ dtFeriado: "", Descricao: "", FeriadoTrabalhado: "S" })
  }

  function requestDelete(id: string) {
    setDeletingId(id)
  }

  function cancelDelete() {
    setDeletingId(null)
  }

  function confirmDelete() {
    if (!deletingId) return
    setItems((prev) => prev.filter((x) => x.id !== deletingId))
    setDeletingId(null)
  }

  // ✅ Exemplo de lista filtrada (se quiser usar)
  const itemsFiltrados = useMemo(() => {
    return items.filter((x) => {
      if (filtro.dtFeriado && x.dtFeriado < filtro.dtFeriado) return false
      if (filtro.Descricao && !x.Descricao.toLowerCase().includes(filtro.Descricao.toLowerCase())) return false

      if (filtro.FeriadoTrabalhado !== "Todos") {
        const flag = filtro.FeriadoTrabalhado === "S"
        if (x.FeriadoTrabalhado !== flag) return false
      }

      return true
    })
  }, [items, filtro])

  return {
    items,              // lista completa
    itemsFiltrados,     // lista com filtro
    form,
    filtro,
    isFormValid,
    deletingId,
    onChangeForm,
    onChangeFiltro,
    resetFiltro,
    reload,
    addFeriado,
    requestDelete,
    cancelDelete,
    confirmDelete,
  }
}
import { motion } from "framer-motion"
import { CalendarDays, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

type FormState = {
    dtFeriado: string
    Descricao: string
    FeriadoTrabalhado: "S" | "N"
}

type FormProps = {
    value: FormState
    isValid: boolean
    onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void
    onSubmit: () => void
}


export function FormFeriado({ value, isValid, onChange, onSubmit }: FormProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
        >
            <Card className="rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <CalendarDays className="h-4 w-4" />
                        Cadastrar Feriado
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-12 ">
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
                            <Input placeholder="Ex: Carnaval"
                                value={value.Descricao}
                                onChange={(e) => onChange("Descricao", e.target.value)}
                            />
                        </div>

                        <div className="md:col-span3 space-y-2">
                            <Label>Trabalhado</Label>
                            <Select
                                value={value.FeriadoTrabalhado}
                                onValueChange={(v) => onChange("FeriadoTrabalhado", v as "S" | "N")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="S">Sim</SelectItem>
                                    <SelectItem value="N">Não</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <p className="text-sm text-muted-foreground">
                            Preenhca o dia e o nome do feriado(mínimo 2 caracteres).
                        </p>

                        <Button
                            className="gap-2"
                            onClick={onSubmit}
                            disabled={!isValid}
                            type="button"
                        >
                            <PlusCircle className="h-4 w-4" />
                            Inserir
                        </Button>

                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
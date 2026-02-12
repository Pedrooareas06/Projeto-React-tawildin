📅 Gestão de Feriados












Sistema moderno para gestão de feriados corporativos, desenvolvido com foco em arquitetura limpa, componentização e experiência do usuário.

Projeto desenvolvido para prática avançada de React + TypeScript + UI moderna.

🚀 Preview

Em breve: GIF demonstrando cadastro, filtro e exclusão.

✨ Funcionalidades
📌 Cadastro

Inserção de novo feriado

Validação de formulário

Conversão automática "S" | "N" → boolean

Reset automático após inserção

🔍 Filtros Dinâmicos

Filtro por Data específica

Filtro por Nome (contém)

Filtro por Trabalhado (Todos / Sim / Não)

Atualização em tempo real com useMemo

📊 Listagem

Tabela estilizada com shadcn/ui

Data formatada (DD/MM/YYYY)

Indicador visual de status

Animações suaves na renderização

🗑 Exclusão

Modal de confirmação (Dialog)

Remoção controlada via estado

Atualização automática da lista

🧠 Arquitetura

O projeto segue separação clara de responsabilidades:

src/
 ├── pages/
 │    └── feriados/
 │         ├── useFeriados.ts        # Regra de negócio
 │         ├── ContainerPrincipal.tsx
 │         └── components/           # UI isolada
 │              ├── FiltrosFeriados.tsx
 │              ├── FormFeriado.tsx
 │              ├── TableFeriado.tsx
 │              └── DialogDeleteFeriado.tsx
🔎 Estado Derivado

A lista filtrada é calculada com:

const itemsFiltrados = useMemo(...)

Garantindo:

Performance

Código previsível

Separação entre estado bruto e estado visual

🎨 UI & UX

Layout responsivo (Mobile First)

Grid adaptável com Tailwind

Componentes acessíveis (shadcn/ui)

Microinterações com Framer Motion

Feedback visual claro (validação e ações destrutivas)

⚙️ Tecnologias
Tecnologia	Finalidade
React	Estrutura da aplicação
TypeScript	Tipagem forte
Vite	Build e dev server
Tailwind CSS v4	Estilização
shadcn/ui	Componentes acessíveis
Framer Motion	Animações
▶️ Como Executar
# Instalar dependências
npm install


# Rodar servidor de desenvolvimento
npm run dev

A aplicação estará disponível em:

http://localhost:5173
📈 Roadmap

 Integração com API REST

 Persistência em banco de dados

 Paginação

 Ordenação por colunas

 Edição de feriado

 Testes unitários

📚 Conceitos Aplicados

Custom Hooks

Componentização desacoplada

Tipagem com Generics

Estado derivado com useMemo

Separação entre regra de negócio e UI

Padrão de organização escalável

👨‍💻 Autor

Desenvolvido por Pedro
Projeto focado em evolução profissional como Desenvolvedor Front-end.
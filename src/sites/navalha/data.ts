export const BASE = "/sites/navalha"

const img = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`

export const IMG = {
  interior: img("1585747860715-2ba37e788b70", 1600),
  chair: img("1512690459411-b9245aed614b"),
  tools: img("1621605815971-fbc98d665033"),
  cut: img("1622286342621-4bd786c2447c"),
  fade: img("1599351431202-1e0f0137899a", 900),
  beard: img("1532710093739-9470acff878f"),
  beardScissors: img("1517832606299-7ae9b720a186", 900),
  towel: img("1596728325488-58c87691e9af"),
  clipper: img("1493256338651-d82f7acb2b38"),
  shave: img("1503951914875-452162b0f3f1"),
}

export type Service = { id: string; name: string; desc: string; min: number; price: number; tag?: string }

export const MENU: { cat: string; note: string; items: Service[] }[] = [
  {
    cat: "Cortes",
    note: "Todos os cortes incluem lavagem e finalização com pomada.",
    items: [
      { id: "classico", name: "Corte Clássico", desc: "Tesoura e máquina, do jeito que o avô aprovaria.", min: 45, price: 60 },
      { id: "degrade", name: "Degradê", desc: "Fade baixo, médio ou alto com transição limpa.", min: 50, price: 70, tag: "Mais pedido" },
      { id: "navalhado", name: "Corte Navalhado", desc: "Acabamento completo na navalha, contorno afiado.", min: 60, price: 80 },
      { id: "maquina", name: "Máquina Única", desc: "Rápido e sem frescura. Um pente, uma passada.", min: 25, price: 40 },
      { id: "infantil", name: "Corte Infantil", desc: "Para os peões de até 12 anos.", min: 40, price: 50 },
    ],
  },
  {
    cat: "Barba",
    note: "Toalha quente, óleo pré-barba e balm de cedro em todos os serviços.",
    items: [
      { id: "barba", name: "Barba Tradicional", desc: "Toalha quente, espuma no pincel e navalha.", min: 40, price: 55 },
      { id: "barba-desenhada", name: "Barba Desenhada", desc: "Modelagem, alinhamento e contorno na navalha.", min: 45, price: 60 },
      { id: "pigmentacao", name: "Pigmentação", desc: "Preenche falhas e uniformiza o tom da barba.", min: 30, price: 50 },
      { id: "pezinho", name: "Pezinho & Contorno", desc: "Manutenção entre um corte e outro.", min: 15, price: 20 },
    ],
  },
  {
    cat: "Combos",
    note: "Combos acompanham uma dose de cortesia do nosso saloon.",
    items: [
      { id: "xerife", name: "Xerife", desc: "Corte + barba tradicional.", min: 90, price: 110, tag: "Clássico" },
      { id: "pistoleiro", name: "Pistoleiro", desc: "Degradê + barba desenhada + sobrancelha.", min: 100, price: 125 },
      { id: "rodeio", name: "Rodeio Completo", desc: "Corte, barba, hidratação, massagem facial e bebida.", min: 120, price: 170, tag: "Experiência" },
    ],
  },
  {
    cat: "Tratamentos",
    note: "Produtos próprios, feitos com óleos naturais do cerrado.",
    items: [
      { id: "hidratacao", name: "Hidratação Capilar", desc: "Máscara de argan e pequi, 20 minutos de pausa.", min: 30, price: 45 },
      { id: "facial", name: "Limpeza Facial", desc: "Esfoliação, vapor de ozônio e máscara de argila.", min: 40, price: 65 },
      { id: "sobrancelha", name: "Sobrancelha na Navalha", desc: "Alinhamento discreto, sem exagero.", min: 15, price: 25 },
      { id: "progressiva", name: "Progressiva Masculina", desc: "Reduz volume e frizz com acabamento natural.", min: 60, price: 120 },
    ],
  },
]

export const SERVICES = MENU.flatMap((c) => c.items)

export const SALOON = [
  { name: "Café coado na hora", desc: "Grão do sul de Minas, torra média", price: 8 },
  { name: "Cerveja artesanal", desc: "IPA ou Red Ale de Pirenópolis, 500 ml", price: 18 },
  { name: "Dose de Bourbon", desc: "Kentucky straight, puro ou com gelo", price: 28 },
  { name: "Cachaça envelhecida", desc: "3 anos em barril de amburana", price: 15 },
  { name: "Refrigerante / água", desc: "Lata gelada", price: 7 },
]

export const PLANS = [
  { name: "Peão", price: 99, perks: ["2 cortes por mês", "10% em produtos", "Agendamento prioritário"] },
  {
    name: "Vaqueiro",
    price: 179,
    perks: ["Cortes ilimitados", "2 barbas por mês", "1 dose por visita", "15% em produtos"],
    featured: true,
  },
  { name: "Coronel", price: 259, perks: ["Tudo ilimitado", "Tratamentos inclusos", "Bebidas liberadas", "Horário exclusivo"] },
]

export const TEAM = [
  {
    id: "tiao",
    name: "Tião Ferraz",
    role: "Mestre barbeiro & fundador",
    years: 18,
    photo: img("1599351431202-1e0f0137899a", 700),
    skills: ["Navalha clássica", "Corte social", "Toalha quente"],
    quote: "Navalha boa é igual cavalo bom: precisa de mão firme e respeito.",
  },
  {
    id: "duda",
    name: "Duda Brasa",
    role: "Especialista em degradê",
    years: 9,
    photo: img("1567894340315-735d7c361db0", 700),
    skills: ["Fade", "Freestyle", "Texturização"],
    quote: "Transição limpa é assinatura. Não tem atalho.",
  },
  {
    id: "caio",
    name: "Caio Moreno",
    role: "Barbas & tratamentos",
    years: 7,
    photo: img("1605497788044-5a32c7078486", 700),
    skills: ["Barba desenhada", "Pigmentação", "Facial"],
    quote: "Barba bem feita muda a postura do sujeito.",
  },
  {
    id: "rafa",
    name: "Rafa Couto",
    role: "Visagista",
    years: 6,
    photo: img("1647140655214-e4a2d914971f", 700),
    skills: ["Visagismo", "Tesoura", "Cortes clássicos"],
    quote: "Corte certo é o que conversa com o rosto.",
  },
]

// 0 = domingo
export const HOURS: { day: string; open?: [number, number] }[] = [
  { day: "Domingo", open: [9, 13] },
  { day: "Segunda" },
  { day: "Terça", open: [9, 20] },
  { day: "Quarta", open: [9, 20] },
  { day: "Quinta", open: [9, 20] },
  { day: "Sexta", open: [9, 21] },
  { day: "Sábado", open: [8, 18] },
]

export const INFO = {
  address: "Rua do Tropeiro, 1912 — Setor Oeste",
  city: "Goiânia · GO",
  phone: "(62) 99812-1912",
  whatsapp: "5562998121912",
  instagram: "@navalha.barbearia",
  map: "https://www.openstreetmap.org/export/embed.html?bbox=-49.2790%2C-16.6960%2C-49.2590%2C-16.6800&layer=mapnik",
}

export const REVIEWS = [
  { name: "Marcos V.", text: "Melhor barba que já fiz na vida. Toalha quente, bourbon e conversa boa. Virei cliente fixo.", stars: 5 },
  { name: "Henrique A.", text: "Ambiente absurdo, parece filme de faroeste. O Duda fez um degradê perfeito.", stars: 5 },
  { name: "Lucas P.", text: "Agendei pelo site em 1 minuto, fui atendido no horário. Profissionalismo raro.", stars: 5 },
]

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })

export function openNow(d = new Date()) {
  const h = HOURS[d.getDay()].open
  const now = d.getHours() + d.getMinutes() / 60
  return !!h && now >= h[0] && now < h[1]
}

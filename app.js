/* =========================================================================
   HERO'S LEDGER — Implementación de las mecánicas del documento de diseño
   Stack: HTML + CSS + JavaScript vanilla. Persistencia en localStorage.
   ========================================================================= */

const STORAGE_KEY = "heros-ledger-v3";

/* ---------------------------------------------------------------------------
   1. ATRIBUTOS  (STR rojo, INT azul, VIT verde, DIS amarillo, SOC naranja)
--------------------------------------------------------------------------- */
const ATTRIBUTES = [
  { id: "STR", label: "Fuerza", color: "#d43b4a" },
  { id: "INT", label: "Inteligencia", color: "#4cb1ff" },
  { id: "VIT", label: "Vitalidad", color: "#7ecb8e" },
  { id: "DIS", label: "Disciplina", color: "#f2cc45" },
  { id: "SOC", label: "Sociabilidad", color: "#e8923a" },
];
const ATTR_IDS = ATTRIBUTES.map((a) => a.id);
const baseAttributes = () => Object.fromEntries(ATTR_IDS.map((id) => [id, 0]));
const attrInfo = (id) => ATTRIBUTES.find((a) => a.id === id);

/* ---------------------------------------------------------------------------
   5. REPOSITORIO DE QUESTS — 40 misiones (8 por atributo: 2 fácil, 2 media,
   2 difícil, 2 expedición). XP por dificultad = daño al boss.
   Fácil 10 · Media 20 · Difícil 50 · Expedición 100.
--------------------------------------------------------------------------- */
const DIFFICULTY_XP = { facil: 10, media: 20, dificil: 50, expedicion: 100 };
const DIFFICULTY_LABEL = { facil: "Fácil", media: "Media", dificil: "Difícil", expedicion: "Expedición" };

const QUEST_REPO = [
  // STR — Fuerza (hábitos físicos)
  { id: "str_f1", attr: "STR", diff: "facil", name: "Calienta los músculos", habit: "Haz 10 minutos de estiramiento o calentamiento.", icon: "🤸", minutes: 10 },
  { id: "str_f2", attr: "STR", diff: "facil", name: "Sal a caminar", habit: "Camina al menos 20 minutos hoy.", icon: "🥾", minutes: 20 },
  { id: "str_m1", attr: "STR", diff: "media", name: "Entrena con intención", habit: "Completa 30 minutos de ejercicio físico.", icon: "⚔", minutes: 30 },
  { id: "str_m2", attr: "STR", diff: "media", name: "Sin el ascensor", habit: "Usa solo las escaleras durante todo el día.", icon: "🪜" },
  { id: "str_d1", attr: "STR", diff: "dificil", name: "Rompe el límite", habit: "Completa una sesión de entrenamiento de 45 minutos o más.", icon: "🏋", minutes: 45 },
  { id: "str_d2", attr: "STR", diff: "dificil", name: "El cuerpo no descansa", habit: "Haz ejercicio aunque no tengas ganas — mínimo 20 minutos.", icon: "💪", minutes: 20 },
  { id: "str_e1", attr: "STR", diff: "expedicion", name: "La ruta del explorador", habit: "Sal a caminar o correr por una ruta que no conozcas bien.", icon: "🧭" },
  { id: "str_e2", attr: "STR", diff: "expedicion", name: "Un día de guerrero", habit: "Completa dos sesiones físicas distintas en el mismo día.", icon: "🔥" },
  // INT — Inteligencia (hábitos mentales)
  { id: "int_f1", attr: "INT", diff: "facil", name: "Abre un libro", habit: "Lee al menos 10 páginas de cualquier libro.", icon: "📖" },
  { id: "int_f2", attr: "INT", diff: "facil", name: "Aprende algo nuevo", habit: "Busca y lee sobre un tema que no conoces.", icon: "🔭" },
  { id: "int_m1", attr: "INT", diff: "media", name: "Estudio sostenido", habit: "Dedica 30 minutos a estudiar o aprender algo con intención.", icon: "🎓", minutes: 30 },
  { id: "int_m2", attr: "INT", diff: "media", name: "Practica el idioma", habit: "Haz una sesión de práctica de idioma extranjero.", icon: "🗣" },
  { id: "int_d1", attr: "INT", diff: "dificil", name: "Profundiza", habit: "Lee o estudia un tema por más de una hora sin distracciones.", icon: "📚", minutes: 60 },
  { id: "int_d2", attr: "INT", diff: "dificil", name: "Enseña lo que sabes", habit: "Explica algo que dominas a otra persona.", icon: "🧑‍🏫" },
  { id: "int_e1", attr: "INT", diff: "expedicion", name: "El archivo del conocimiento", habit: "Lee sobre un tema durante 3 días consecutivos.", icon: "🗂" },
  { id: "int_e2", attr: "INT", diff: "expedicion", name: "Termina lo que empezaste", habit: "Completa un curso, capítulo o módulo pendiente.", icon: "✅" },
  // VIT — Vitalidad (hábitos de recuperación)
  { id: "vit_f1", attr: "VIT", diff: "facil", name: "Hidrátate", habit: "Bebe al menos 2 litros de agua hoy.", icon: "💧" },
  { id: "vit_f2", attr: "VIT", diff: "facil", name: "Duerme bien", habit: "Acuéstate antes de medianoche esta noche.", icon: "🌙" },
  { id: "vit_m1", attr: "VIT", diff: "media", name: "Come con intención", habit: "Prepara o elige una comida balanceada hoy.", icon: "🥗" },
  { id: "vit_m2", attr: "VIT", diff: "media", name: "Desconéctate una hora", habit: "Apaga pantallas al menos una hora antes de dormir.", icon: "📵" },
  { id: "vit_d1", attr: "VIT", diff: "dificil", name: "Noche completa", habit: "Duerme 7 horas o más esta noche.", icon: "😴" },
  { id: "vit_d2", attr: "VIT", diff: "dificil", name: "Un día sin excesos", habit: "Evita alcohol, comida chatarra y azúcar durante todo el día.", icon: "🍃" },
  { id: "vit_e1", attr: "VIT", diff: "expedicion", name: "La semana del descanso", habit: "Mantén un horario de sueño consistente durante 3 días.", icon: "🛌" },
  { id: "vit_e2", attr: "VIT", diff: "expedicion", name: "Cuida el cuerpo por dentro", habit: "Come balanceado y bebe suficiente agua durante 3 días seguidos.", icon: "🫀" },
  // DIS — Disciplina (hábitos de consistencia)
  { id: "dis_f1", attr: "DIS", diff: "facil", name: "La lista del día", habit: "Escribe tus 3 tareas principales antes de empezar el día.", icon: "📝" },
  { id: "dis_f2", attr: "DIS", diff: "facil", name: "Sin postergación", habit: "Completa una tarea que llevas días evitando.", icon: "✅" },
  { id: "dis_m1", attr: "DIS", diff: "media", name: "Mantén el ritmo", habit: "Cumple tu rutina matutina completa hoy.", icon: "🌅" },
  { id: "dis_m2", attr: "DIS", diff: "media", name: "Termina lo que empezaste", habit: "Completa una tarea sin interrupciones hasta el final.", icon: "🎯" },
  { id: "dis_d1", attr: "DIS", diff: "dificil", name: "Una hora sin distracciones", habit: "Trabaja o estudia 60 minutos con el teléfono fuera de la vista.", icon: "🔕", minutes: 60 },
  { id: "dis_d2", attr: "DIS", diff: "dificil", name: "El día sin excusas", habit: "Cumple todas las tareas que te propusiste al inicio del día.", icon: "🏅" },
  { id: "dis_e1", attr: "DIS", diff: "expedicion", name: "La semana organizada", habit: "Planifica y sigue una rutina durante 3 días consecutivos.", icon: "🗓" },
  { id: "dis_e2", attr: "DIS", diff: "expedicion", name: "El proyecto postergado", habit: "Dedica tiempo cada día durante 3 días a algo que llevas tiempo evitando.", icon: "📦" },
  // SOC — Sociabilidad (hábitos sociales)
  { id: "soc_f1", attr: "SOC", diff: "facil", name: "Reconecta", habit: "Escribe o llama a alguien que no contactas hace tiempo.", icon: "📞" },
  { id: "soc_f2", attr: "SOC", diff: "facil", name: "Preséntate", habit: "Preséntate o inicia una conversación con alguien nuevo.", icon: "👋" },
  { id: "soc_m1", attr: "SOC", diff: "media", name: "Conversación real", habit: "Ten una conversación significativa de más de 15 minutos.", icon: "💬", minutes: 15 },
  { id: "soc_m2", attr: "SOC", diff: "media", name: "Participa", habit: "Interviene activamente en una reunión o clase hoy.", icon: "🙋" },
  { id: "soc_d1", attr: "SOC", diff: "dificil", name: "Habla en público", habit: "Habla frente a un grupo, aunque sea pequeño.", icon: "🎤" },
  { id: "soc_d2", attr: "SOC", diff: "dificil", name: "Lidera la conversación", habit: "Organiza o modera una conversación grupal.", icon: "🗣" },
  { id: "soc_e1", attr: "SOC", diff: "expedicion", name: "El vínculo sostenido", habit: "Interactúa con alguien diferente cada día durante 3 días.", icon: "🤝" },
  { id: "soc_e2", attr: "SOC", diff: "expedicion", name: "Sal de tu zona", habit: "Asiste a un evento social o reunión fuera de tu círculo habitual.", icon: "🎉" },
].map((q) => ({ ...q, xp: DIFFICULTY_XP[q.diff] }));
const questById = (id) => QUEST_REPO.find((q) => q.id === id);
const DAILY_SLOTS = 5;
const COOLDOWN_DAYS = 3;

/* ---------------------------------------------------------------------------
   8. EXPEDICIONES — Arco 1 definido en v2 ("El Misterio de los Animales
   Armados"). Arcos 2 y 3 pendientes de definir (entran a la rotación luego).
--------------------------------------------------------------------------- */
const ARCS = [
  {
    id: "animales",
    title: "El Misterio de los Animales Armados",
    summary: "Mercaderes atacados en la ruta y animales que visten armadura. ¿Quién los arma y para qué?",
    npc: { name: "Jim", role: "Druida nómada", attr: "INT" },
    relic: { name: "Libro de la Magia de Control", lore: "Detalla cómo transferir un alma a una pieza de equipo. Magia prohibida hallada en el laboratorio de la mina." },
    chapters: [
      {
        id: "a1", title: "Capítulo 1 — La Manada en el Camino", level: "Lv. 1-5", tone: "green",
        boss: "3 Lobos con Armadura", key: "Llave del Camino",
        beat: "Los carruajes fueron atacados, pero nada robado — solo faltan las personas.",
        missions: ["Investigar la ruta atacada", "Examinar los carruajes vacíos", "Seguir el grito hasta la manada"],
        lines: [
          "Reportes de mercaderes atacados en la ruta. El gremio me envía a investigar.",
          "Objetos de valor intactos… pero ninguna persona. ¿Qué clase de bestia roba gente y deja el oro?",
          "Un grito entre los árboles. Sigo el sonido y encuentro lobos esperando junto a un carruaje.",
        ],
      },
      {
        id: "a2", title: "Capítulo 2 — La Mina Abandonada", level: "Lv. 6-12", tone: "amber",
        boss: "El Oso Acorazado", key: "Llave de la Mina",
        beat: "Un libro de magia de control, un laboratorio abandonado… y un oso que cierra la escalada.",
        missions: ["El Jabalí de la Entrada", "Punto de decisión", "El Murciélago Despierto", "El Laboratorio y la Revelación", "El Oso y la Huida de la Rata"],
        lines: [
          "Un jabalí con armadura de mercader bloquea la entrada. Un druida llamado Jim aparece y me ayuda a derribarlo: seguía los mismos rumores.",
          "Jim quiere seguir juntos, pero podría cubrir más terreno por separado…",
          "Un murciélago de metro y medio, despertado por el ruido. Jim nota un pendiente colgado a su cuello: magia de control imbuida en metal.",
          "Un laboratorio con armaduras regadas. Sobre la mesa, un libro: transferir un alma a una pieza de equipo. A la salida, una invitación a la Proclamación de los Caballeros del Reino.",
          "Una rata escapa con un pendiente. Tras ella, un oso acorazado sin arma — el guardián final. Lo vencemos y tomamos el libro.",
        ],
        // Escena 2 — Punto de decisión (mecánica reutilizable)
        decision: {
          atMission: 1,
          prompt: "Jim cuenta que los objetos de valor quedaban intactos mientras las personas desaparecían. ¿Cómo avanzas?",
          options: [
            { id: "fuerza", label: "Separarse (Camino de Fuerza)", text: "Exploras solo y hallas el equipo de un soldado atacado. Te llevas unas botas.", reward: { slot: "boots" } },
            { id: "social", label: "Seguir con Jim (Camino Social)", text: "Te quedas con Jim, que comparte su teoría. Entre las piezas de armadura tomas unos guantes (accesorio).", reward: { slot: "accessory" } },
          ],
        },
      },
      { id: "a3", title: "Capítulo 3 — Difícil", level: "Lv. 13-20", tone: "red", boss: "Pendiente de definir", key: "Sello del Misterio", beat: "¿Quién está detrás de la magia de control y para qué? El rastro se vuelve más oscuro.", missions: ["Pendiente de definir", "Pendiente de definir", "Pendiente de definir"], lines: ["Pendiente de definir.", "Pendiente de definir.", "Pendiente de definir."] },
      { id: "a4", title: "Capítulo 4 — Final", level: "Lv. 21+", tone: "violet", boss: "Pendiente de definir", key: "Reliquia del Arco 1", beat: "El misterio de los animales armados debe resolverse aquí.", missions: ["Pendiente de definir", "Pendiente de definir", "Pendiente de definir", "La batalla final"], lines: ["Pendiente.", "Pendiente.", "Pendiente.", "La batalla final."], requiresKeys: 3 },
    ],
  },
  {
    id: "arco2",
    title: "Arco 2 — Próximamente",
    summary: "Temática, capítulos, NPCs y bosses pendientes de definir (backlog v2).",
    npc: { name: "—", role: "Por definir", attr: "SOC" },
    relic: { name: "Reliquia del Arco 2", lore: "Una historia que aún espera ser contada." },
    chapters: [
      { id: "b1", title: "Capítulo 1 — Fácil", level: "Lv. 1-5", tone: "green", boss: "Por definir", key: "Llave 2-1", beat: "Pendiente de definir.", missions: ["Pendiente", "Pendiente", "Pendiente"] },
      { id: "b2", title: "Capítulo 2 — Media", level: "Lv. 6-12", tone: "amber", boss: "Por definir", key: "Llave 2-2", beat: "Pendiente de definir.", missions: ["Pendiente", "Pendiente", "Pendiente"] },
      { id: "b3", title: "Capítulo 3 — Difícil", level: "Lv. 13-20", tone: "red", boss: "Por definir", key: "Llave 2-3", beat: "Pendiente de definir.", missions: ["Pendiente", "Pendiente", "Pendiente"] },
      { id: "b4", title: "Capítulo 4 — Final", level: "Lv. 21+", tone: "violet", boss: "Por definir", key: "Reliquia del Arco 2", beat: "Pendiente de definir.", missions: ["Pendiente", "Pendiente", "Pendiente", "La batalla final"], requiresKeys: 3 },
    ],
  },
  {
    id: "arco3",
    title: "Arco 3 — Próximamente",
    summary: "Temática, capítulos, NPCs y bosses pendientes de definir (backlog v2).",
    npc: { name: "—", role: "Por definir", attr: "VIT" },
    relic: { name: "Reliquia del Arco 3", lore: "Una historia que aún espera ser contada." },
    chapters: [
      { id: "d1", title: "Capítulo 1 — Fácil", level: "Lv. 1-5", tone: "green", boss: "Por definir", key: "Llave 3-1", beat: "Pendiente de definir.", missions: ["Pendiente", "Pendiente", "Pendiente"] },
      { id: "d2", title: "Capítulo 2 — Media", level: "Lv. 6-12", tone: "amber", boss: "Por definir", key: "Llave 3-2", beat: "Pendiente de definir.", missions: ["Pendiente", "Pendiente", "Pendiente"] },
      { id: "d3", title: "Capítulo 3 — Difícil", level: "Lv. 13-20", tone: "red", boss: "Por definir", key: "Llave 3-3", beat: "Pendiente de definir.", missions: ["Pendiente", "Pendiente", "Pendiente"] },
      { id: "d4", title: "Capítulo 4 — Final", level: "Lv. 21+", tone: "violet", boss: "Por definir", key: "Reliquia del Arco 3", beat: "Pendiente de definir.", missions: ["Pendiente", "Pendiente", "Pendiente", "La batalla final"], requiresKeys: 3 },
    ],
  },
];
const arcById = (id) => ARCS.find((a) => a.id === id);

/* ---------------------------------------------------------------------------
   4-5. BOSSES y NPCs
--------------------------------------------------------------------------- */
// 4. BOSSES GENÉRICOS — 10 bosses, 2 por atributo de debilidad (tabla 11).
// HP = nivel del boss × 40. Cura ~20% si no es derrotado ese día.
const BOSSES = [
  { id: "verdugo", name: "El Verdugo de Piedra", epithet: "La Bestia Olvidada de los Páramos de Xal'Thor", type: "Criatura", weakness: "STR", npc: "STR", dropSlots: ["weapon", "armor"], level: 3, hue: 18,
    desc: "Un coloso de piedra ancestral imbuido por una energía maligna. Rompe su coraza con fuerza bruta o el combate se alargará sin fin." },
  { id: "sombra", name: "La Sombra Errante", epithet: "El Espectro de Niebla Eterna", type: "Criatura", weakness: "INT", npc: "INT", dropSlots: ["helmet", "accessory"], level: 5, hue: 210,
    desc: "Una entidad inmaterial que se alimenta de los miedos. Solo el conocimiento revela su núcleo vulnerable." },
  { id: "toro", name: "El Toro Corrupto", epithet: "La Bestia que Acechó los Campos de Sangre", type: "Criatura", weakness: "VIT", npc: "VIT", dropSlots: ["armor", "boots"], level: 7, hue: -35,
    desc: "Un asesino de batalla transformado por la magia de sangre. Sus embestidas brutales exigen una vitalidad férrea para resistir." },
  { id: "cazador", name: "El Cazador Silencioso", epithet: "La Sombra de los Bosques del Norte", type: "Humanoide", weakness: "DIS", npc: "DIS", dropSlots: ["boots", "accessory"], level: 9, hue: 80,
    desc: "Un asesino que acecha desde las copas de los árboles. Solo la disciplina constante anticipa su próximo golpe." },
  { id: "orador", name: "El Orador Maldito", epithet: "Archienemigo de las Palabras Prohibidas", type: "Humanoide", weakness: "SOC", npc: null, dropSlots: ["accessory", "helmet"], level: 11, hue: 145,
    desc: "Un erudito que vendió su alma por los lenguajes de la creación. Sus versos doblegan la voluntad; un aliado fuerte marca la diferencia." },
  { id: "pantano", name: "La Bestia del Pantano", epithet: "El Horror de las Ciénagas Hundidas", type: "Criatura", weakness: "STR", npc: "STR", dropSlots: ["weapon", "armor"], level: 13, hue: 30,
    desc: "Una mole de fango y huesos que arrastra a sus presas al lodo. Golpéala con todo antes de que te hunda." },
  { id: "archivista", name: "El Archivista Caído", epithet: "Guardián de las Bibliotecas Prohibidas", type: "Humanoide", weakness: "INT", npc: "INT", dropSlots: ["helmet", "accessory"], level: 15, hue: 225,
    desc: "Un bibliotecario maldito que protege secretos que nunca debieron leerse. Su mente es su mayor arma y su debilidad." },
  { id: "coloso", name: "El Coloso Oxidado", epithet: "El Autómata que Nunca Descansa", type: "Criatura", weakness: "VIT", npc: "VIT", dropSlots: ["armor", "weapon"], level: 17, hue: -20,
    desc: "Una máquina de guerra antigua que sigue cumpliendo una orden olvidada. Sobrevive a su embate y caerá por su propio óxido." },
  { id: "desertor", name: "El Desertor de la Orden", epithet: "El Caballero que Renegó de su Juramento", type: "Humanoide", weakness: "DIS", npc: "DIS", dropSlots: ["boots", "weapon"], level: 19, hue: 60,
    desc: "Un guerrero entrenado que conoce todas las tretas del campo de batalla. Solo una disciplina superior lo supera." },
  { id: "heraldo", name: "El Heraldo Sin Rostro", epithet: "La Voz de lo que No Tiene Nombre", type: "Humanoide", weakness: "SOC", npc: "narrativo", dropSlots: ["accessory", "helmet"], level: 21, hue: 160,
    desc: "Un mensajero de poderes innombrables. Sus palabras quiebran la cordura; necesitarás aliados de confianza para enfrentarlo." },
].map((b) => ({ ...b, maxHp: b.level * 40, healPct: 0.2, badge: b.type }));
const bossById = (id) => BOSSES.find((b) => b.id === id);

// 5.1 NPCs básicos — uno por atributo. El bonus de cada NPC se amplifica con SOC.
const BASIC_NPCS = [
  { attr: "STR", name: "Guerrero", icon: "⚔", effect: "Daño adicional por cada misión completada.", when: "Boss con mucha vida." },
  { attr: "INT", name: "Sabio", icon: "✦", effect: "+XP de todas las misiones del combate.", when: "Para maximizar XP del día." },
  { attr: "VIT", name: "Sanador", icon: "✚", effect: "Cura PV tras el contraataque del boss.", when: "Cuando tienes PV bajos." },
  { attr: "DIS", name: "Explorador", icon: "▣", effect: "Mejora la rareza de los drops.", when: "Cuando buscas equipo." },
  { attr: "SOC", name: "Bardo", icon: "🎵", effect: "Eleva la moral: aumenta el daño de todas las misiones.", when: "Para potenciar el combate con tus aliados." },
];
const npcByAttr = (attr) => BASIC_NPCS.find((n) => n.attr === attr);

/* ---------------------------------------------------------------------------
   8.2 TUTORIAL — El Registro en el Gremio de Bremont
--------------------------------------------------------------------------- */
// 5 encargos fáciles, uno por atributo (reutilizan el repositorio).
const TUTORIAL_QUESTS = ["str_f1", "int_f1", "vit_f1", "dis_f1", "soc_f1"];

// Boss del tutorial: Lobo Armado. 40 HP; el NPC tutorial amplifica a 8 dmg/misión.
const TUTORIAL_BOSS = {
  id: "lobo_armado", name: "Lobo Armado", epithet: "La bestia que no debería llevar armadura", type: "Bestia",
  badge: "Bestia", weakness: null, npc: "tutorial", level: 1, maxHp: 40, healPct: 0, hue: 35,
  desc: "Un lobo del bosque cercano que, inexplicablemente, viste piezas de armadura. ¿Quién lo armó?",
};
const TUTORIAL_NPC = { name: "Reno", role: "Cazador del Gremio", icon: "🏹", effect: "Amplifica tu daño a 8 por misión completada." };

const GUILD_DIALOGUES = {
  intro: [
    { who: "Maestro del Gremio", text: "Bienvenido a Bremont, prospecto. Un pueblo tranquilo en la ruta comercial… o lo era hasta hace poco." },
    { who: "Maestro del Gremio", text: "Esta es tu ficha de aventurero. Estos cinco rasgos — Fuerza, Inteligencia, Vitalidad, Disciplina y Sociabilidad — son tus atributos. Crecen con lo que haces en la vida real." },
    { who: "Maestro del Gremio", text: "El gremio paga por encargos cumplidos. Cada encargo es una misión: complétala en tu día y tu héroe se fortalece. Empieza con estos cinco." },
  ],
  hook: [
    { who: "Maestro del Gremio", text: "Buen trabajo con los encargos. Pero hay algo más… los pastores reportan ovejas desaparecidas y ruidos extraños en el bosque por las noches." },
    { who: "Maestro del Gremio", text: "Un lobo ha estado merodeando la ruta. Dicen que lleva… armadura. Suena absurdo, lo sé. Tu primera misión oficial: cázalo." },
    { who: "Reno (Cazador)", text: "Te acompaño en esta. Marca tus encargos como ataques y yo amplifico tu golpe. Entre los dos lo derribamos. ¡Vamos!" },
  ],
  victory: [
    { who: "Reno (Cazador)", text: "¡Lo logramos! Pero mira esto… entre las placas de su armadura hay un emblema. Nunca había visto esa marca." },
    { who: "Maestro del Gremio", text: "Déjame ver… No pertenece a ninguna casa conocida. Alguien armó a esa bestia a propósito, y quiero saber quién." },
    { who: "Maestro del Gremio", text: "Tu siguiente encargo será una escolta a la capital — pero guarda ese emblema. Acabas de abrir un misterio mayor. El gremio cuenta contigo, aventurero." },
  ],
  // 9.5 Escena 5 — Cierre en el Gremio (otorga el Rango E)
  rankE: [
    { who: "Maestro del Gremio", text: "Con que magia de control… es una magia prohibida: ocasiona graves daños a sus víctimas. Quien la usa debe ser un brujo peligroso." },
    { who: "Maestro del Gremio", text: "Debo notificar esto al resto del gremio. Tienes suerte de haber salido ileso." },
    { who: "Maestro del Gremio", text: "Por tan peligrosa misión, el gremio te otorga el Rango E como prueba de tu valor. Y con ello, se abren las expediciones del mundo entero." },
  ],
};

// 8. Sistema de Rango de Gremio (identidad narrativa; sube solo con expediciones).
const GUILD_RANKS = ["E", "D", "C", "B", "A", "S"];

/* ---------------------------------------------------------------------------
   6. SETS DE EQUIPO — 4 sets temáticos, 5 piezas cada uno (tablas 19-22).
   Sin bonus de set. Cada pieza: bonus base (siempre) + bonus completo (umbral).
   La Reliquia es exclusiva de expediciones.
--------------------------------------------------------------------------- */
const EQUIP_SLOTS = [
  { id: "weapon", label: "Arma" },
  { id: "armor", label: "Armadura" },
  { id: "accessory", label: "Accesorio" },
  { id: "helmet", label: "Casco" },
  { id: "boots", label: "Botas" },
  { id: "relic", label: "Reliquia" },
];
const SLOT_LABEL = (id) => EQUIP_SLOTS.find((s) => s.id === id)?.label ?? id;

// thr: ["level", n] umbral de nivel · ["attr", "STR", n] umbral de atributo
const EQUIP_SETS = [
  {
    id: "bosque", name: "Set del Bosque", note: "Natural · inicio recomendado",
    pieces: {
      weapon: { name: "Espada de Raíces", thr: ["attr", "STR", 15], base: { STR: 2 }, full: { STR: 4, DIS: 2 } },
      armor: { name: "Coraza de Corteza", thr: ["level", 8], base: { VIT: 2 }, full: { VIT: 4, STR: 1 } },
      accessory: { name: "Amuleto del Claro", thr: ["attr", "INT", 10], base: { INT: 1 }, full: { INT: 3, SOC: 1 } },
      helmet: { name: "Capucha Musgo", thr: ["level", 6], base: { INT: 2 }, full: { INT: 3, DIS: 2 } },
      boots: { name: "Botas del Sendero", thr: ["attr", "DIS", 12], base: { DIS: 2 }, full: { DIS: 4, VIT: 1 } },
    },
  },
  {
    id: "montana", name: "Set de la Montaña", note: "Resistente · niveles medios",
    pieces: {
      weapon: { name: "Hacha de Granito", thr: ["attr", "STR", 18], base: { STR: 2 }, full: { STR: 5, VIT: 1 } },
      armor: { name: "Peto de Roca", thr: ["level", 12], base: { VIT: 3 }, full: { VIT: 5, STR: 2 } },
      accessory: { name: "Cristal de Cima", thr: ["attr", "SOC", 15], base: { SOC: 2 }, full: { SOC: 4, INT: 1 } },
      helmet: { name: "Yelmo de Piedra", thr: ["attr", "VIT", 15], base: { VIT: 2 }, full: { VIT: 4, DIS: 1 } },
      boots: { name: "Botas del Escalador", thr: ["level", 10], base: { DIS: 2 }, full: { DIS: 4, STR: 2 } },
    },
  },
  {
    id: "desierto", name: "Set del Desierto", note: "Ágil · orientado a INT",
    pieces: {
      weapon: { name: "Cimitarra de Arena", thr: ["level", 10], base: { STR: 2 }, full: { STR: 4, INT: 2 } },
      armor: { name: "Túnica del Viajero", thr: ["attr", "DIS", 18], base: { DIS: 2 }, full: { DIS: 4, VIT: 1 } },
      accessory: { name: "Ojo del Halcón", thr: ["attr", "INT", 18], base: { INT: 2 }, full: { INT: 4, SOC: 2 } },
      helmet: { name: "Turbante del Sabio", thr: ["level", 14], base: { INT: 3 }, full: { INT: 5, DIS: 1 } },
      boots: { name: "Sandalias del Nómada", thr: ["attr", "SOC", 12], base: { SOC: 2 }, full: { SOC: 4, DIS: 1 } },
    },
  },
  {
    id: "jungla", name: "Set de la Jungla", note: "Vital · orientado a SOC",
    pieces: {
      weapon: { name: "Lanza del Cazador", thr: ["attr", "STR", 20], base: { STR: 2 }, full: { STR: 4, SOC: 2 } },
      armor: { name: "Escamas del Reptil", thr: ["attr", "VIT", 18], base: { VIT: 3 }, full: { VIT: 5, DIS: 2 } },
      accessory: { name: "Diente de Fiera", thr: ["level", 12], base: { SOC: 2 }, full: { SOC: 4, STR: 2 } },
      helmet: { name: "Máscara Tribal", thr: ["attr", "SOC", 20], base: { SOC: 2 }, full: { SOC: 5, INT: 1 } },
      boots: { name: "Pisada Sigilosa", thr: ["attr", "DIS", 15], base: { DIS: 2 }, full: { DIS: 4, VIT: 2 } },
    },
  },
];
const setById = (id) => EQUIP_SETS.find((s) => s.id === id);

/* ---------------------------------------------------------------------------
   7. HABILIDADES PASIVAS — umbrales 10 · 25 · 50 · 100
--------------------------------------------------------------------------- */
const PASSIVES = {
  STR: [
    { t: 10, name: "Golpe Firme", desc: "+5% de daño contra bosses genéricos." },
    { t: 25, name: "Fuerza Bruta", desc: "+10% de daño. El drop mejora 1 nivel de rareza." },
    { t: 50, name: "Ímpetu", desc: "+15% de daño. Chance de drop doble." },
    { t: 100, name: "Campeón", desc: "Inmunidad al primer golpe. Drop épico semanal." },
  ],
  INT: [
    { t: 10, name: "Mente Aguda", desc: "+5% de XP de todas las quests." },
    { t: 25, name: "Conocimiento", desc: "+10% de XP. Revela la rareza del drop." },
    { t: 50, name: "Sabiduría", desc: "+15% de XP. Bonus en misiones de INT." },
    { t: 100, name: "Archimago", desc: "+25% de XP global. Misiones de INT exclusivas." },
  ],
  VIT: [
    { t: 10, name: "Resistencia", desc: "Un reintento si el héroe es derrotado." },
    { t: 25, name: "Temple", desc: "2 reintentos. Mejores drops de consumibles." },
    { t: 50, name: "Fortaleza", desc: "3 reintentos. Consumibles duran más." },
    { t: 100, name: "Inmortal", desc: "Reintentos ilimitados en bosses genéricos." },
  ],
  DIS: [
    { t: 10, name: "Enfoque", desc: "La racha no decae si fallas 1 día/semana." },
    { t: 25, name: "Constancia", desc: "Tolera 2 fallos/semana. La racha sube más rápido." },
    { t: 50, name: "Disciplina", desc: "Tolera 3 fallos/semana. Enfriamiento a 2 días." },
    { t: 100, name: "Maestría", desc: "La racha nunca decae. Enfriamiento a 1 día." },
  ],
  SOC: [
    { t: 10, name: "Carisma", desc: "El bonus de daño del NPC en combate aumenta +10%." },
    { t: 25, name: "Vínculos", desc: "El NPC elegido ataca dos veces durante el día de combate." },
    { t: 50, name: "Red de Aliados", desc: "Al derrotar un boss, el NPC puede dejar un consumible adicional." },
    { t: 100, name: "Leyenda", desc: "NPCs narrativos reaparecen más seguido con +20% de bonus y diálogo exclusivo." },
  ],
};

/* ---------------------------------------------------------------------------
   8. CONSUMIBLES — recuperación y bonus de combate
--------------------------------------------------------------------------- */
const CONSUMABLES = {
  herb: { name: "Poción de Hierba", cat: "heal", icon: "🧪", effect: "Recupera 25% PV", value: 0.25, maxStock: 10 },
  elixir: { name: "Elixir del Bosque", cat: "heal", icon: "⚗", effect: "Recupera 60% PV", value: 0.6, maxStock: 10 },
  essence: { name: "Esencia de Expedición", cat: "heal", icon: "✨", effect: "Recupera PV completos", value: 1, maxStock: 5 },
  tonic: { name: "Tónico de Batalla", cat: "buff", icon: "🔥", effect: "+20% daño al boss hoy", value: 0.2, maxStock: 5 },
  shield: { name: "Amuleto de Escudo", cat: "buff", icon: "🛡", effect: "Absorbe el ataque nocturno una vez", maxStock: 5 },
};

/* =========================================================================
   ESTADO
   ========================================================================= */
const today = () => new Date().toISOString().slice(0, 10);

function freshState() {
  return {
    name: "Héroe",
    startDate: today(),
    level: 1,
    currentXp: 0,
    totalXp: 0,
    attributes: baseAttributes(),
    // racha
    streakDays: 0,
    streakStep: 0,
    lastActiveDate: null,
    missedRun: 0,
    streakMax: 0,
    // quests diarias
    dailyQuests: [],
    completedToday: [],
    timers: {}, // questId -> { remaining, running, startedAt, done }
    focusAttr: null,
    cooldowns: {}, // questId -> fecha de expiración
    lastReset: null,
    // tutorial (registro en el gremio de Bremont)
    tutorial: { active: true, step: "intro", seenIntro: false }, // step: intro|quests|boss|done
    // boss
    bossMode: "select", // "select" (preparación) | "battle"
    selectedBoss: null, // bossId elegido
    bossDamage: {}, // bossId -> daño acumulado
    bossesDefeated: 0,
    bossesByType: { generic: 0, expedition: 0 },
    selectedNpc: null,
    equippedConsumables: [], // ids hoy
    heroHp: null,
    resting: false,
    battleDone: [], // misiones de combate completadas hoy
    // expediciones
    keys: {}, // arcId -> nº de llaves
    chapterProgress: {}, // chapterId -> nº misiones completadas
    arcWeek: 0,
    completedArcs: [],
    titles: [],
    relics: [],
    chapterChoices: {}, // chapterId -> id de la opción elegida (puntos de decisión)
    narrativeItems: [], // objetos de historia (libro, invitación…) para el Archivo
    // 8. Rango de Gremio (identidad narrativa, sin efecto en stats)
    guildRank: null, // null | "E" | "D" | "C" | "B" | "A" | "S"
    // equipo e inventario
    equipment: {}, // slotId -> {name, rarity, attr, threshold, awakened}
    inventory: {}, // consumableId -> cantidad
    // métricas
    questCompletions: {}, // questId -> count (tasa de completitud)
    totalQuestsDone: 0,
    activityLog: [],
  };
}

let state = load();

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return seedNew();
    return { ...freshState(), ...saved, attributes: { ...baseAttributes(), ...(saved.attributes || {}) } };
  } catch {
    return seedNew();
  }
}

function seedNew() {
  const s = freshState();
  // Inventario inicial para que el jugador pruebe combate
  s.inventory = { herb: 3, elixir: 1, tonic: 1 };
  return s;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* =========================================================================
   1.2 / 1.3  GENERACIÓN DE QUESTS DIARIAS (rotación, enfriamiento, enfoque)
   ========================================================================= */
function laggingAttr() {
  // atributo más rezagado del personaje (equilibrio silencioso)
  return [...ATTR_IDS].sort((a, b) => (state.attributes[a] ?? 0) - (state.attributes[b] ?? 0))[0];
}

function cooldownDays() {
  const dis = totalAttributes().DIS ?? 0;
  if (dis >= 100) return 1;
  if (dis >= 50) return 2;
  return COOLDOWN_DAYS;
}

function availableQuests(attr) {
  return QUEST_REPO.filter((q) => {
    if (attr && q.attr !== attr) return false;
    const cd = state.cooldowns[q.id];
    return !cd || cd <= today();
  });
}

function pickFrom(pool, exclude) {
  const options = pool.filter((q) => !exclude.has(q.id));
  if (!options.length) return null;
  return options[Math.floor(Math.random() * options.length)];
}

function generateDailyQuests() {
  const chosen = [];
  const used = new Set();
  const focus = state.focusAttr;

  for (let slot = 0; slot < DAILY_SLOTS; slot++) {
    let pick = null;
    // Slot 5 (último): siempre prioriza el atributo más rezagado (silencioso)
    if (slot === DAILY_SLOTS - 1) {
      const lag = laggingAttr();
      pick = pickFrom(availableQuests(lag), used) || pickFrom(availableQuests(null), used);
    } else if (focus && slot < 3) {
      // Techo suave: con enfoque, slots 1-3 son del atributo enfocado
      pick = pickFrom(availableQuests(focus), used) || pickFrom(availableQuests(null), used);
    } else {
      pick = pickFrom(availableQuests(null), used);
    }
    if (pick) {
      used.add(pick.id);
      chosen.push(pick.id);
    }
  }
  state.dailyQuests = chosen;
}

function ensureDailyReset() {
  // Durante el tutorial las misiones son fijas (5 encargos del gremio), sin rotación.
  if (isTutorial()) {
    if (!state.dailyQuests.length || state.dailyQuests[0] !== TUTORIAL_QUESTS[0]) {
      state.dailyQuests = [...TUTORIAL_QUESTS];
    }
    return;
  }
  const t = today();
  if (state.lastReset === t && state.dailyQuests.length) return;

  // Antes de regenerar, las misiones completadas ayer entran en enfriamiento.
  state.completedToday.forEach((id) => {
    const exp = new Date();
    exp.setDate(exp.getDate() + cooldownDays());
    state.cooldowns[id] = exp.toISOString().slice(0, 10);
  });

  // Evaluar racha si cambió el día
  if (state.lastReset && state.lastReset !== t) evaluateStreak();

  state.completedToday = [];
  state.battleDone = [];
  state.equippedConsumables = [];
  state.selectedNpc = null;
  state.timers = {}; // nuevos temporizadores cada día
  state.lastReset = t;
  generateDailyQuests();
  save();
}

/* =========================================================================
   2.3  SISTEMA DE RACHAS (escalones con decaimiento gradual)
   ========================================================================= */
const STREAK_STEPS = [
  { day: 1, step: 1, char: 1.0, attr: 1.0 },
  { day: 5, step: 2, char: 1.2, attr: 1.1 },
  { day: 10, step: 3, char: 1.4, attr: 1.2 },
  { day: 20, step: 4, char: 1.8, attr: 1.4 },
  { day: 30, step: 5, char: 2.2, attr: 1.8 },
  { day: 50, step: 6, char: 2.5, attr: 2.0 },
];

function stepForDays(days) {
  let s = STREAK_STEPS[0];
  for (const entry of STREAK_STEPS) if (days >= entry.day) s = entry;
  return s;
}
function stepByNumber(n) {
  return STREAK_STEPS.find((s) => s.step === n) || STREAK_STEPS[0];
}
function currentStreak() {
  return stepByNumber(Math.max(1, state.streakStep || 1));
}

function evaluateStreak() {
  // Se llama al detectar un cambio de día sin que el anterior se completara.
  const tolerance = disStreakTolerance();
  if (!state.completedYesterday) {
    state.missedRun = (state.missedRun || 0) + 1;
    if (state.missedRun > tolerance) {
      // decaimiento gradual: baja un escalón por día roto
      state.streakStep = Math.max(1, (state.streakStep || 1) - 1);
      state.streakDays = stepByNumber(state.streakStep).day;
    }
  }
}

function disStreakTolerance() {
  const dis = totalAttributes().DIS ?? 0;
  if (dis >= 100) return 99; // nunca decae
  if (dis >= 50) return 3;
  if (dis >= 25) return 2;
  if (dis >= 10) return 1;
  return 0;
}

function registerStreakActivity() {
  const t = today();
  if (state.lastActiveDate === t) return; // ya contó hoy
  // día consecutivo o primer día
  state.streakDays = (state.streakDays || 0) + 1;
  state.missedRun = 0;
  state.streakStep = stepForDays(state.streakDays).step;
  state.streakMax = Math.max(state.streakMax || 0, state.streakDays);
  state.lastActiveDate = t;
  state.completedYesterday = true;
}

/* =========================================================================
   ATRIBUTOS, EQUIPO Y TOTALES
   ========================================================================= */
// 1.1 Multiplicador de atributos por nivel = 1 + (Nivel × 0.1).
// Aplica al valor efectivo en combate, NO a los umbrales de pasivas.
function levelMultiplier() {
  return 1 + state.level * 0.1;
}

// Datos de una pieza equipada: set + pieza del catálogo.
function equipPiece(item) {
  const set = setById(item?.set);
  return set?.pieces[item?.slot] || null;
}

// 6.3 escalado por umbral: nivel del personaje O atributo (valor real ganado).
function isAwakened(item) {
  const p = equipPiece(item);
  if (!p) return false;
  if (p.thr[0] === "level") return state.level >= p.thr[1];
  return (state.attributes[p.thr[1]] ?? 0) >= p.thr[2];
}

// Totales base + equipo (sin multiplicador de nivel). Para HP y visualización.
function gearTotals() {
  const totals = { ...baseAttributes(), ...state.attributes };
  Object.values(state.equipment || {}).forEach((item) => {
    if (!item) return;
    if (item.slot === "relic") {
      const v = isAwakened(item) ? 3 : 2;
      ATTR_IDS.forEach((id) => (totals[id] += v));
      return;
    }
    const p = equipPiece(item);
    if (!p) return;
    const bonus = isAwakened(item) ? p.full : p.base;
    Object.entries(bonus).forEach(([a, n]) => (totals[a] += n));
  });
  return totals;
}

// Mantengo el nombre totalAttributes para compatibilidad: base + equipo.
function totalAttributes() {
  return gearTotals();
}

// Valor efectivo de un atributo en combate (con multiplicador de nivel).
function combatAttr(attr) {
  return Math.round((gearTotals()[attr] ?? 0) * levelMultiplier());
}

/* Pasivas activas */
function activePassives() {
  const active = [];
  ATTR_IDS.forEach((attr) => {
    PASSIVES[attr].forEach((p) => {
      if ((state.attributes[attr] ?? 0) >= p.t) active.push({ attr, ...p });
    });
  });
  return active;
}
function hasPassive(attr, threshold) {
  return (state.attributes[attr] ?? 0) >= threshold;
}

function passiveDamageBonus() {
  const s = state.attributes.STR ?? 0;
  if (s >= 100) return 0.15;
  if (s >= 50) return 0.15;
  if (s >= 25) return 0.1;
  if (s >= 10) return 0.05;
  return 0;
}
function passiveXpBonus() {
  const i = state.attributes.INT ?? 0;
  if (i >= 100) return 0.25;
  if (i >= 50) return 0.15;
  if (i >= 25) return 0.1;
  if (i >= 10) return 0.05;
  return 0;
}

/* =========================================================================
   3.2 CURVA DE NIVELES — XP requerido = 100 × Nivel²
   ========================================================================= */
function xpForLevel(level) {
  return 100 * level * level;
}

function gainXp(amount) {
  const streak = currentStreak();
  const total = Math.round(amount * streak.char * (1 + passiveXpBonus()));
  state.currentXp += total;
  state.totalXp += total;
  let leveled = false;
  while (state.currentXp >= xpForLevel(state.level)) {
    state.currentXp -= xpForLevel(state.level);
    state.level += 1;
    leveled = true;
  }
  if (leveled) {
    // 3.5 pop de subida de nivel: +1 HP base y restauración completa de PV
    state.heroHp = maxHeroHp();
    state.resting = false;
    toast(`¡Subiste a Nivel ${state.level}! Multiplicador ×${levelMultiplier().toFixed(1)} · PV restaurados`, "#f2cc45", "⭐");
  }
  return total;
}

function gainAttr(attr, amount) {
  const streak = currentStreak();
  const before = state.attributes[attr] ?? 0;
  const gained = Math.max(1, Math.round(amount * streak.attr));
  state.attributes[attr] = before + gained;
  // pop notification al subir atributo + detectar nuevo umbral de pasiva
  const info = attrInfo(attr);
  const crossed = PASSIVES[attr].find((p) => before < p.t && state.attributes[attr] >= p.t);
  if (crossed) {
    toast(`${attr} +${gained} · Pasiva: ${crossed.name}`, info.color, "✦");
  } else {
    toast(`${info.label} +${gained}`, info.color, attrBadge(attr));
  }
}

function attrBadge(attr) {
  return { STR: "💪", INT: "📘", VIT: "💚", DIS: "🎯", SOC: "🗣" }[attr] || "✦";
}

/* =========================================================================
   TEMPORIZADOR DE MISIONES — solo para misiones de tiempo (q.minutes).
   Las misiones de descanso o de conteo no tienen temporizador.
   ========================================================================= */
function isTimed(q) {
  return Boolean(q && q.minutes);
}

function getTimer(id) {
  const q = questById(id);
  if (!isTimed(q)) return null;
  state.timers ??= {};
  if (!state.timers[id]) {
    state.timers[id] = { remaining: q.minutes * 60, running: false, startedAt: null, done: false };
  }
  return state.timers[id];
}

// segundos restantes en vivo (descuenta el tiempo transcurrido si está corriendo)
function timerRemaining(id) {
  const t = getTimer(id);
  if (!t) return 0;
  if (t.running && t.startedAt) {
    const elapsed = Math.floor((Date.now() - t.startedAt) / 1000);
    return Math.max(0, t.remaining - elapsed);
  }
  return t.remaining;
}

function timerDone(id) {
  const q = questById(id);
  if (!isTimed(q)) return true; // sin temporizador no bloquea
  return getTimer(id).done || timerRemaining(id) <= 0;
}

function startTimer(id) {
  const t = getTimer(id);
  if (!t || t.done) return;
  unlockAudio();
  // Solo un cronómetro activo a la vez: pausa cualquier otro en curso.
  let paused = null;
  Object.keys(state.timers ?? {}).forEach((otherId) => {
    const other = state.timers[otherId];
    if (otherId !== id && other.running) {
      other.remaining = timerRemaining(otherId);
      other.running = false;
      other.startedAt = null;
      paused = questById(otherId);
    }
  });
  if (paused) toast(`Pausado: ${paused.name}. Solo puedes cronometrar una misión a la vez.`, "#f2cc45", "⏸");
  t.running = true;
  t.startedAt = Date.now();
  save();
  render();
}

function pauseTimer(id) {
  const t = getTimer(id);
  if (!t || !t.running) return;
  t.remaining = timerRemaining(id);
  t.running = false;
  t.startedAt = null;
  save();
  render();
}

function resetTimer(id) {
  const q = questById(id);
  if (!isTimed(q)) return;
  state.timers[id] = { remaining: q.minutes * 60, running: false, startedAt: null, done: false };
  save();
  render();
}

// se llama cada segundo: detecta cuando un temporizador llega a cero
function tickTimers() {
  let changed = false;
  Object.keys(state.timers ?? {}).forEach((id) => {
    const t = state.timers[id];
    if (!t.running || t.done) return;
    if (timerRemaining(id) <= 0) {
      t.remaining = 0;
      t.running = false;
      t.startedAt = null;
      t.done = true;
      changed = true;
      const q = questById(id);
      playAlarm();
      toast(`¡Tiempo cumplido! ${q.name} — reclama la misión`, "#7ecb8e", "⏰");
    }
  });
  if (changed) {
    save();
    render();
  } else {
    updateTimerLabels();
  }
}

// actualiza solo los números del temporizador sin re-render completo
function updateTimerLabels() {
  $$("[data-timer-label]").forEach((el) => {
    const id = el.dataset.timerLabel;
    const t = state.timers?.[id];
    if (!t?.running) return;
    el.textContent = formatClock(timerRemaining(id));
    const fill = document.querySelector(`[data-timer-fill="${id}"]`);
    if (fill) {
      const q = questById(id);
      fill.style.width = `${100 - (timerRemaining(id) / (q.minutes * 60)) * 100}%`;
    }
  });
}

function formatClock(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ---- Alarma corta con Web Audio (sin assets) ---- */
let audioCtx = null;
function unlockAudio() {
  try {
    audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
  } catch {}
}
function playAlarm() {
  try {
    unlockAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    // tres pitidos ascendentes
    [880, 1100, 1320].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const start = now + i * 0.22;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.25, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(start);
      osc.stop(start + 0.22);
    });
  } catch {}
}

/* =========================================================================
   COMPLETAR QUEST DIARIA
   ========================================================================= */
function completeQuest(id) {
  if (state.completedToday.includes(id)) return;
  const q = questById(id);
  if (!q) return;
  // Las misiones de tiempo requieren cumplir el temporizador (excepto en el tutorial).
  if (!isTutorial() && isTimed(q) && !timerDone(id)) {
    toast(`Inicia y completa el temporizador de "${q.name}" primero.`, "#f2cc45", "⏳");
    return;
  }
  state.completedToday.push(id);
  state.totalQuestsDone += 1;
  state.questCompletions[id] = (state.questCompletions[id] || 0) + 1;

  registerStreakActivity();
  const xpGained = gainXp(q.xp);
  // Puntos de atributo por dificultad de la misión.
  const attrByDiff = { facil: 1, media: 2, dificil: 4, expedicion: 6 };
  gainAttr(q.attr, attrByDiff[q.diff] ?? 2);

  // El valor XP define el daño al boss activo si hay combate en curso
  state.activityLog.unshift({ t: today(), text: `${q.name} (+${xpGained} XP, ${q.attr})` });
  state.activityLog = state.activityLog.slice(0, 40);

  // chance de drop de consumible (Poción de Hierba — drop frecuente de quests)
  if (!isTutorial() && Math.random() < 0.35) addConsumable("herb", 1, true);

  save();
  render();

  // Tutorial: al completar los 5 encargos, avanza al gancho narrativo.
  if (isTutorial() && state.tutorial.step === "quests" && TUTORIAL_QUESTS.every((qid) => state.completedToday.includes(qid))) {
    onTutorialQuestsComplete();
  }
}

/* =========================================================================
   4. SISTEMA DE BOSSES
   ========================================================================= */
function isTutorial() {
  return Boolean(state.tutorial?.active);
}
function activeBoss() {
  if (isTutorial()) return TUTORIAL_BOSS;
  return bossById(state.selectedBoss) || BOSSES[0];
}
function bossDamageDone() {
  return state.bossDamage[activeBoss().id] || 0;
}
function bossHp() {
  return Math.max(0, activeBoss().maxHp - bossDamageDone() - pendingBattleDamage());
}

// 4.2 Inteligencia del boss (hints por INT)
function bossIntel() {
  const int = totalAttributes().INT ?? 0;
  const boss = activeBoss();
  const wk = attrInfo(boss.weakness);
  const recNpc = boss.npc && boss.npc !== "narrativo" ? npcByAttr(boss.npc)?.name : "un NPC narrativo";
  if (int >= 50) {
    return { tier: "INT ≥ 50", lines: [`Debilidad revelada: ${wk.label} (${boss.weakness}).`, `Drop de set garantizado si usas al NPC ${recNpc} (golpea su debilidad).`] };
  }
  if (int >= 25) {
    return { tier: "INT ≥ 25", lines: ["Información táctica: golpea su debilidad para acortar el combate.", `NPC recomendado: ${recNpc}.`] };
  }
  return { tier: "INT < 25", lines: ["Un enemigo poderoso acecha. Prepárate."] };
}

// daño de una misión de combate (XP base × multiplicadores)
function questBattleDamage(q) {
  // Tutorial: el cazador Reno amplifica el daño a 8 por misión.
  if (isTutorial()) return 8;
  let dmg = q.xp; // el XP de la misión define el daño base (10/20/50/100)
  // el atributo de la misión (valor efectivo con multiplicador de nivel) amplifica
  dmg *= 1 + combatAttr(q.attr) * 0.01;
  // bonus de pasivas de STR
  dmg *= 1 + passiveDamageBonus();
  // bonus del NPC, amplificado por SOC (Carisma +10%, Vínculos ×2)
  let npcBonus = 0;
  if (state.selectedNpc === "STR") npcBonus = 0.2; // Guerrero
  else if (state.selectedNpc === "SOC") npcBonus = 0.15; // Bardo
  if (npcBonus > 0) {
    if (hasPassive("SOC", 10)) npcBonus *= 1.1; // Carisma
    if (hasPassive("SOC", 25)) npcBonus *= 2; // Vínculos (ataca dos veces)
  }
  dmg *= 1 + npcBonus;
  // bonus por golpear la debilidad del boss con el NPC adecuado
  if (state.selectedNpc === activeBoss().weakness) dmg *= 1.25;
  // tónico de batalla equipado
  if (state.equippedConsumables.includes("tonic")) dmg *= 1.2;
  return Math.round(dmg);
}

function todaysBattleQuests() {
  // las misiones del día disponibles para combate = quests diarias completadas
  return state.dailyQuests.map(questById).filter(Boolean);
}

function pendingBattleDamage() {
  return state.battleDone.reduce((sum, id) => {
    const q = questById(id);
    return q ? sum + questBattleDamage(q) : sum;
  }, 0);
}

// 3.3 HP del héroe = 10 (base) + Nivel + (VIT ÷ 10)
function maxHeroHp() {
  return 10 + state.level + Math.floor((gearTotals().VIT ?? 0) / 10);
}
function ensureHeroHp() {
  const max = maxHeroHp();
  if (state.heroHp == null) state.heroHp = max;
  state.heroHp = Math.min(state.heroHp, max);
  if (state.heroHp > max * 0.5) state.resting = false;
}

function markBattleMission(id) {
  if (state.resting) return;
  if (!state.completedToday.includes(id)) {
    // debe completarse como quest real primero (respeta el temporizador)
    completeQuest(id);
    if (!state.completedToday.includes(id)) return; // bloqueada por temporizador
  }
  if (state.battleDone.includes(id)) return;
  state.battleDone.push(id);
  save();
  render();
}

// 4.4 ataque: aplica daño acumulado y el boss contraataca
function attackBoss() {
  ensureHeroHp();
  if (state.resting) return;
  const dmg = pendingBattleDamage();
  if (dmg <= 0) return;
  const boss = activeBoss();
  state.bossDamage[boss.id] = Math.min((state.bossDamage[boss.id] || 0) + dmg, boss.maxHp);
  state.battleDone = [];

  const killed = state.bossDamage[boss.id] >= boss.maxHp;
  // si es la victoria del tutorial, el diálogo de Reno reemplaza al pop de combate
  const tutorialVictory = killed && isTutorial();
  if (killed) {
    defeatBoss();
  } else {
    bossCounterAttack();
  }
  save();
  render();
  if (!tutorialVictory) openCombatPop(dmg);
}

function bossCounterAttack() {
  ensureHeroHp();
  // Tutorial: el Lobo Armado hace 2 de daño por golpe.
  let hit = isTutorial() ? 2 : Math.max(1, Math.round(maxHeroHp() * 0.12));
  state.heroHp = Math.max(0, state.heroHp - hit);
  // NPC Sanador (VIT) cura tras el contraataque
  if (state.selectedNpc === "VIT") {
    state.heroHp = Math.min(maxHeroHp(), state.heroHp + Math.round(maxHeroHp() * 0.15));
  }
  if (state.heroHp <= 0) enterRest();
}

function defeatBoss() {
  const boss = activeBoss();
  // Tutorial: el Lobo Armado deja el emblema y abre la Expedición 1.
  if (isTutorial()) {
    state.bossesDefeated += 1;
    finishTutorialCombat();
    return;
  }
  state.bossesDefeated += 1;
  state.bossesByType.generic += 1;
  toast(`¡${boss.name} derrotado!`, "#d43b4a", "🏆");
  // drop de equipo del set temático según los slots del boss
  dropEquipment(boss);
  // drop de consumible (SOC ≥ 50 Red de Aliados: posible consumible extra)
  addConsumable(Math.random() < 0.5 ? "elixir" : "tonic", 1, true);
  if (hasPassive("SOC", 50) && Math.random() < 0.5) addConsumable("herb", 1, true);
  // resetear daño para que pueda reaparecer otro día
  state.bossDamage[boss.id] = 0;
}

// Ataque devastador nocturno (4.4) — botón "simular cierre de día"
function endOfDayAttack() {
  ensureHeroHp();
  const boss = activeBoss();
  if (bossDamageDone() >= boss.maxHp) {
    toast("El boss ya fue derrotado hoy.", "#7ecb8e", "✓");
    return;
  }
  // Amuleto de escudo absorbe el ataque nocturno
  if (state.equippedConsumables.includes("shield")) {
    state.equippedConsumables = state.equippedConsumables.filter((c) => c !== "shield");
    toast("El Amuleto de Escudo absorbió el ataque nocturno.", "#4cb1ff", "🛡");
  } else {
    const vit = totalAttributes().VIT ?? 0;
    if (vit >= 30) {
      // VIT alta absorbe parcialmente
      state.heroHp = Math.max(1, Math.round(maxHeroHp() * 0.2));
      toast("Tu VIT absorbió parte del ataque devastador.", "#7ecb8e", "💚");
    } else {
      state.heroHp = 0;
      enterRest();
    }
  }
  // El boss se cura entre días (manteniendo el progreso)
  const heal = Math.round(boss.maxHp * boss.healPct);
  state.bossDamage[boss.id] = Math.max(0, (state.bossDamage[boss.id] || 0) - heal);
  save();
  render();
}

// 4.5 Estado de descanso
function enterRest() {
  state.resting = true;
  toast("El héroe cayó. Estado de descanso activado.", "#d43b4a", "💤");
}

function selectNpc(attr) {
  state.selectedNpc = state.selectedNpc === attr ? null : attr;
  save();
  render();
}

function toggleConsumable(id) {
  if (state.equippedConsumables.includes(id)) {
    state.equippedConsumables = state.equippedConsumables.filter((c) => c !== id);
  } else {
    // máximo 1 por tipo por día; aquí 1 por id
    if ((state.inventory[id] || 0) <= 0) return;
    state.equippedConsumables.push(id);
    // los de curación se aplican de inmediato al equipar (antes del combate)
    const c = CONSUMABLES[id];
    if (c.cat === "heal") {
      ensureHeroHp();
      state.heroHp = Math.min(maxHeroHp(), state.heroHp + Math.round(maxHeroHp() * c.value));
      consumeOne(id);
      state.equippedConsumables = state.equippedConsumables.filter((x) => x !== id);
      toast(`${c.name}: PV restaurados.`, "#7ecb8e", c.icon);
    }
  }
  save();
  render();
}

/* =========================================================================
   CONSUMIBLES — stock
   ========================================================================= */
function addConsumable(id, qty, notify) {
  const c = CONSUMABLES[id];
  const cur = state.inventory[id] || 0;
  if (cur >= c.maxStock) {
    // excedente se convierte en XP
    gainXp(40 * qty);
    if (notify) toast(`Stock lleno: ${c.name} → +XP`, "#f2cc45", "💰");
    return;
  }
  state.inventory[id] = Math.min(c.maxStock, cur + qty);
  if (notify) toast(`Obtienes ${c.name}`, "#7ecb8e", c.icon);
}
function consumeOne(id) {
  state.inventory[id] = Math.max(0, (state.inventory[id] || 0) - 1);
}

/* =========================================================================
   EQUIPO — drops desde los sets temáticos
   ========================================================================= */
// Set recomendado según el nivel del personaje (los sets escalan).
function setForLevel() {
  if (state.level >= 14) return "jungla";
  if (state.level >= 10) return "desierto";
  if (state.level >= 6) return "montana";
  return "bosque";
}

function dropEquipment(boss) {
  // elige una de las ranuras temáticas del boss
  const slotId = boss.dropSlots[Math.floor(Math.random() * boss.dropSlots.length)];
  const setId = setForLevel();
  const piece = setById(setId).pieces[slotId];
  const item = { slot: slotId, set: setId, name: piece.name };
  // Flujo de reemplazo simple: el nuevo siempre se equipa (el viejo se descarta)
  state.equipment[slotId] = item;
  toast(`Equipas ${piece.name} · ${setById(setId).name}`, "#f2cc45", "⚔");
}

function addRelic(arc) {
  if (state.relics.find((r) => r.arc === arc.id)) return;
  state.relics.push({ arc: arc.id, name: arc.relic.name, lore: arc.relic.lore, date: today() });
  // La reliquia es exclusiva de expediciones: +todos los stats, no reemplazable.
  state.equipment.relic = { slot: "relic", set: null, name: arc.relic.name };
}

/* =========================================================================
   3. EXPEDICIONES — avanzar capítulos
   ========================================================================= */
function activeArc() {
  return ARCS[state.arcWeek % ARCS.length];
}
function chapterDone(chId) {
  const ch = ARCS.flatMap((a) => a.chapters).find((c) => c.id === chId);
  return (state.chapterProgress[chId] || 0) >= (ch?.missions.length || 99);
}
function arcKeys(arcId) {
  return state.keys[arcId] || 0;
}

function advanceChapter(arc, ch) {
  // requisito de llaves para el capítulo final
  if (ch.requiresKeys && arcKeys(arc.id) < ch.requiresKeys) {
    toast(`Necesitas ${ch.requiresKeys} llaves para abrir este capítulo.`, "#d43b4a", "🔒");
    return;
  }
  const cur = state.chapterProgress[ch.id] || 0;
  // 9.5 Escena 2 — Punto de decisión (mecánica reutilizable)
  if (ch.decision && cur === ch.decision.atMission && !state.chapterChoices[ch.id]) {
    presentDecision(arc, ch);
    return;
  }
  doAdvanceChapter(arc, ch);
}

function doAdvanceChapter(arc, ch) {
  const justDid = state.chapterProgress[ch.id] || 0; // índice de la misión que se completa
  const prog = justDid + 1;
  state.chapterProgress[ch.id] = prog;
  const line = (ch.lines && ch.lines[justDid]) || ch.beat;
  const wasDecision = ch.decision && justDid === ch.decision.atMission;

  if (prog >= ch.missions.length) {
    // capítulo completado → otorga llave (micro-ritual)
    state.keys[arc.id] = arcKeys(arc.id) + 1;
    toast(`Capítulo completado · ${ch.key} obtenida`, "#b18bff", "🗝");
    gainXp(300);
    handleChapterComplete(arc, ch);
    if (arc.chapters.every((c) => chapterDone(c.id))) completeArc(arc);
  } else {
    gainXp(80);
    // 10. Diálogo por quest (granular): una línea por misión completada
    if (!wasDecision) questDialogue(arc, line);
  }
  save();
  render();
}

// 10. Mecánica de diálogos por quest — una línea corta tras cada misión.
function questDialogue(arc, line) {
  showDialogue([{ who: arc.npc?.name && arc.npc.name !== "—" ? arc.npc.name : "Bitácora", text: line, portrait: "📜", place: arc.title }]);
}

// 9.5 Punto de decisión: bifurcación con recompensa de equipo distinta.
function presentDecision(arc, ch) {
  const d = ch.decision;
  showChoice({
    who: "Punto de decisión",
    place: arc.title,
    portrait: "🌿",
    prompt: d.prompt,
    options: d.options.map((o) => ({
      label: o.label,
      onPick: () => {
        state.chapterChoices[ch.id] = o.id;
        grantSlotEquipment(o.reward.slot);
        save();
        showDialogue([{ who: o.id === "fuerza" ? "Héroe" : "Jim", text: o.text, portrait: "📜", place: arc.title }], () => doAdvanceChapter(arc, ch));
      },
    })),
  });
}

function grantSlotEquipment(slotId) {
  const setId = setForLevel();
  const piece = setById(setId).pieces[slotId];
  state.equipment[slotId] = { slot: slotId, set: setId, name: piece.name };
  toast(`Obtienes ${piece.name} · ${setById(setId).name}`, "#f2cc45", "🎁");
}

function addNarrativeItem(name, lore, icon) {
  if (state.narrativeItems.find((n) => n.name === name)) return;
  state.narrativeItems.push({ name, lore, icon, date: today() });
}

// Eventos al completar un capítulo concreto (objetos narrativos, Rango de Gremio).
function handleChapterComplete(arc, ch) {
  if (arc.id === "animales" && ch.id === "a2") {
    addNarrativeItem("Libro de la Magia de Control", "Detalla cómo transferir un alma a una pieza de equipo. Magia prohibida hallada en el laboratorio.", "📕");
    addNarrativeItem("Invitación a la Proclamación", "Invitación a la Proclamación de los Caballeros del Reino, hallada en la mina. ¿De quién era? Gancho abierto.", "✉");
    // 8.1 El Rango E se otorga al completar la introducción (Cap. 2).
    if (!state.guildRank) {
      showDialogue(GUILD_DIALOGUES.rankE, () => {
        state.guildRank = "E";
        toast("¡Rango de Gremio E obtenido!", "#f2cc45", "🎖");
        save();
        render();
      });
    }
  }
}

function completeArc(arc) {
  if (state.completedArcs.includes(arc.id)) return;
  state.completedArcs.push(arc.id);
  state.bossesByType.expedition += 1;
  state.bossesDefeated += 1;
  // título dinámico
  const title = `Guardián de ${arc.title.replace(/^El |^Las |^La /, "")}`;
  if (!state.titles.includes(title)) state.titles.push(title);
  addRelic(arc);
  toast(`¡Arco completado! Título: ${title}`, "#f2cc45", "👑");
}

function rotateArc() {
  state.arcWeek = (state.arcWeek + 1) % ARCS.length;
  save();
  render();
}

/* =========================================================================
   TOAST / POP NOTIFICATIONS
   ========================================================================= */
function toast(text, color, icon) {
  const stack = $("#toast-stack");
  if (!stack) return;
  const el = document.createElement("div");
  el.className = "toast";
  el.style.setProperty("--toast-color", color || "#f2cc45");
  el.innerHTML = `<span class="toast-icon">${icon || "✦"}</span><span>${text}</span>`;
  stack.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 320);
  }, 2600);
}

// Pop-up de combate: muestra el duelo pixel al atacar (en vez de un escenario fijo)
let combatPopTimer = null;
function openCombatPop(dmg) {
  const pop = $("#combat-pop");
  const stage = $("#cp-stage");
  if (!pop || !stage) return;
  const boss = activeBoss();
  const hp = bossHp();
  $("#cp-dmg-label").textContent = `−${fmt(dmg)} PV`;
  $("#cp-boss-name").textContent = boss.name;
  $("#cp-boss-hp").textContent = `${fmt(hp)} / ${fmt(boss.maxHp)} PV`;
  $("#cp-hp-bar").style.width = `${(hp / boss.maxHp) * 100}%`;
  $("#cp-close").textContent = hp <= 0 ? "🏆 ¡Victoria!" : "Continuar";

  pop.classList.remove("hidden");
  // reinicia y dispara la animación del duelo
  stage.classList.remove("is-attacking");
  void stage.offsetWidth;
  stage.classList.add("is-attacking");

  clearTimeout(combatPopTimer);
  combatPopTimer = setTimeout(closeCombatPop, 2600);
}
function closeCombatPop() {
  clearTimeout(combatPopTimer);
  const pop = $("#combat-pop");
  if (pop) pop.classList.add("hidden");
}

/* =========================================================================
   TUTORIAL — diálogos del gremio y flujo de Bremont
   ========================================================================= */
let dialogueBeats = [];
let dialogueIndex = 0;
let dialogueOnDone = null;

function showDialogue(beats, onDone) {
  dialogueBeats = beats;
  dialogueIndex = 0;
  dialogueOnDone = onDone || null;
  $("#gd-choices").style.display = "none";
  $("#gd-actions").style.display = "";
  $("#gd-skip").style.display = isTutorial() ? "" : "none";
  $("#guild-dialogue").classList.remove("hidden");
  renderDialogueBeat();
}
function renderDialogueBeat() {
  const beat = dialogueBeats[dialogueIndex];
  if (!beat) return;
  $("#gd-portrait").textContent = beat.portrait || (/reno/i.test(beat.who) ? "🏹" : /jim/i.test(beat.who) ? "🌿" : "🧙");
  $("#gd-who").textContent = beat.who;
  $("#gd-place").textContent = beat.place || "Gremio de Aventureros · Bremont";
  $("#gd-text").textContent = beat.text;
  $("#gd-progress").textContent = dialogueBeats.length > 1 ? `${dialogueIndex + 1}/${dialogueBeats.length}` : "";
  $("#gd-next").textContent = dialogueIndex === dialogueBeats.length - 1 ? "Entendido" : "Continuar";
}
function advanceDialogue() {
  if (dialogueIndex < dialogueBeats.length - 1) {
    dialogueIndex += 1;
    renderDialogueBeat();
    return;
  }
  $("#guild-dialogue").classList.add("hidden");
  const cb = dialogueOnDone;
  dialogueOnDone = null;
  if (cb) cb();
}

// Modal de decisión (reusa el modal de diálogo con botones de opción).
function showChoice(cfg) {
  $("#gd-portrait").textContent = cfg.portrait || "🌿";
  $("#gd-who").textContent = cfg.who || "Decisión";
  $("#gd-place").textContent = cfg.place || "";
  $("#gd-text").textContent = cfg.prompt;
  $("#gd-progress").textContent = "";
  $("#gd-actions").style.display = "none";
  const box = $("#gd-choices");
  box.style.display = "grid";
  box.innerHTML = "";
  cfg.options.forEach((o) => {
    const b = document.createElement("button");
    b.className = "primary-button gd-choice-btn";
    b.type = "button";
    b.textContent = o.label;
    b.addEventListener("click", () => {
      box.style.display = "none";
      $("#gd-actions").style.display = "";
      $("#guild-dialogue").classList.add("hidden");
      o.onPick();
    });
    box.appendChild(b);
  });
  $("#guild-dialogue").classList.remove("hidden");
}

// Inicia el tutorial al crear un héroe nuevo.
function startTutorial() {
  state.tutorial = { active: true, step: "intro", seenIntro: false };
  state.dailyQuests = [...TUTORIAL_QUESTS];
  state.completedToday = [];
  state.selectedNpc = "tutorial";
  state.bossMode = "battle";
  save();
  showDialogue(GUILD_DIALOGUES.intro, () => {
    state.tutorial.seenIntro = true;
    state.tutorial.step = "quests";
    save();
    goToView("quests-view");
    render();
  });
}

// Tras completar los 5 encargos: gancho narrativo y paso al boss.
function onTutorialQuestsComplete() {
  if (state.tutorial.step !== "quests") return;
  state.tutorial.step = "boss";
  save();
  showDialogue(GUILD_DIALOGUES.hook, () => {
    goToView("boss-view");
    render();
  });
}

// Tras derrotar al Lobo Armado: emblema y fin del tutorial.
function finishTutorialCombat() {
  state.tutorial.step = "victory";
  save();
  closeCombatPop();
  showDialogue(GUILD_DIALOGUES.victory, () => {
    endTutorial();
  });
}

function endTutorial() {
  state.tutorial = { active: false, step: "done", seenIntro: true };
  // El emblema desconocido queda como recuerdo en el Archivo del Héroe.
  if (!state.relics.find((r) => r.arc === "emblema")) {
    state.relics.push({ arc: "emblema", name: "Emblema Desconocido", lore: "Hallado en la armadura del Lobo Armado. El inicio del misterio de los animales armados.", date: today() });
  }
  state.titles.push("Prospecto del Gremio");
  // arranca el juego normal: misiones diarias y selección de jefe
  state.dailyQuests = [];
  state.completedToday = [];
  state.selectedNpc = null;
  state.bossMode = "select";
  state.bossDamage = {};
  ensureHeroHp();
  state.heroHp = maxHeroHp();
  save();
  toast("Tutorial completado · Expedición 1 desbloqueada", "#f2cc45", "🎉");
  goToView("quests-view");
  render();
}

function skipTutorial() {
  $("#guild-dialogue").classList.add("hidden");
  endTutorial();
}

function goToView(viewId) {
  $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.view === viewId));
  $$(".view").forEach((v) => v.classList.toggle("active", v.id === viewId));
}

/* =========================================================================
   RENDER
   ========================================================================= */
const fmt = (n) => new Intl.NumberFormat("es-ES").format(Math.round(n));

// Insignia del Rango de Gremio (identidad narrativa, sin efecto en stats).
function guildRankBadge() {
  if (!state.guildRank) return "";
  return ` <span class="guild-rank" title="Rango de Gremio">${state.guildRank}</span>`;
}

function rankForLevel(lvl) {
  if (lvl >= 21) return "Leyenda";
  if (lvl >= 13) return "Veterano";
  if (lvl >= 6) return "Aventurero";
  return "Aprendiz";
}

function renderTimerPanel(id) {
  const q = questById(id);
  const t = getTimer(id);
  const remaining = timerRemaining(id);
  const total = q.minutes * 60;
  const pct = 100 - (remaining / total) * 100;
  const done = t.done || remaining <= 0;
  const action = done ? "reset" : t.running ? "pause" : "start";
  const actionLabel = done ? "Reiniciar" : t.running ? "Pausar" : remaining < total ? "Reanudar" : "Iniciar";
  return `
    <div class="timer-panel ${done ? "done" : ""} ${t.running ? "running" : ""}">
      <div class="timer-head">
        <strong data-timer-label="${id}">${formatClock(remaining)}</strong>
        <span>${done ? "✓ Tiempo cumplido" : t.running ? "En curso…" : "Sesión cronometrada"}</span>
      </div>
      <div class="timer-track"><span data-timer-fill="${id}" style="width:${pct}%"></span></div>
      <div class="timer-actions">
        <button class="mini-button" data-timer-action="${action}" data-timer-id="${id}" type="button">${actionLabel}</button>
        ${!done && remaining < total ? `<button class="mini-button ghost" data-timer-action="reset" data-timer-id="${id}" type="button">Reset</button>` : ""}
      </div>
    </div>`;
}

function bindTimerButtons() {
  $$("[data-timer-action]").forEach((b) =>
    b.addEventListener("click", () => {
      const id = b.dataset.timerId;
      const action = b.dataset.timerAction;
      if (action === "start") startTimer(id);
      else if (action === "pause") pauseTimer(id);
      else if (action === "reset") resetTimer(id);
    }),
  );
}

function renderQuests() {
  const streak = currentStreak();
  const nextXp = xpForLevel(state.level);
  $("#rank-title").textContent = rankForLevel(state.level);
  $("#xp-label").textContent = `${fmt(state.currentXp)} / ${fmt(nextXp)} XP`;
  $("#xp-bar").style.width = `${Math.min((state.currentXp / nextXp) * 100, 100)}%`;
  $("#streak-days").textContent = state.streakDays || 0;
  $("#streak-detail").textContent = `Día ${state.streakDays || 0} · Escalón ${streak.step}`;
  $("#streak-char-mult").textContent = `×${streak.char.toFixed(1)} XP`;
  $("#streak-attr-mult").textContent = `×${streak.attr.toFixed(1)} ATR`;

  const focusBar = document.querySelector(".focus-bar");
  if (isTutorial()) {
    // Durante el tutorial: sin enfoque; banner del gremio.
    const doneN = TUTORIAL_QUESTS.filter((qid) => state.completedToday.includes(qid)).length;
    focusBar.innerHTML = `
      <div class="tutorial-banner">
        <span class="tb-tag">🛡 Gremio de Bremont · Tutorial</span>
        <strong>Encargos del gremio</strong>
        <p>Completa los 5 encargos (uno por atributo) para registrarte como aventurero. ${doneN}/5 cumplidos.</p>
      </div>`;
  } else {
    focusBar.innerHTML = `
      <span class="level-label">Enfoque del día</span>
      <div id="focus-options" class="focus-options"></div>`;
    $("#focus-options").innerHTML =
      `<button class="focus-pill ${!state.focusAttr ? "active" : ""}" data-focus="none">Libre</button>` +
      ATTRIBUTES.map(
        (a) => `<button class="focus-pill ${state.focusAttr === a.id ? "active" : ""}" data-focus="${a.id}" style="--c:${a.color}">${a.id}</button>`,
      ).join("");
  }

  const pending = state.dailyQuests.filter((id) => !state.completedToday.includes(id)).length;
  $("#pending-count").textContent = `${pending} pendientes`;

  $("#quest-list").innerHTML = state.dailyQuests
    .map((id, i) => {
      const q = questById(id);
      if (!q) return "";
      const done = state.completedToday.includes(id);
      const info = attrInfo(q.attr);
      const timed = isTimed(q) && !isTutorial();
      const ready = !timed || timerDone(id);
      return `
        <article class="quest-card ${done ? "completed" : ""}" style="--c:${info.color}">
          <div>
            <small style="color:${info.color}">${info.label} · ${q.attr} · ${DIFFICULTY_LABEL[q.diff]}${timed ? ` · ⏱ ${q.minutes} min` : ""}</small>
            <h4>${q.icon} ${q.name}</h4>
            <p>${q.habit}</p>
            <div class="reward-row">
              <span>+${q.xp} XP</span>
              <span style="border-color:${info.color};color:${info.color}">${q.attr}</span>
            </div>
          </div>
          ${timed && !done ? renderTimerPanel(id) : ""}
          <button class="complete-button" data-quest="${id}" type="button" ${done || !ready ? "disabled" : ""}>
            ${done ? "Completada ✓" : timed && !ready ? "Esperando temporizador" : "Completar"}
          </button>
        </article>`;
    })
    .join("");

  $$("[data-quest]").forEach((b) => b.addEventListener("click", () => completeQuest(b.dataset.quest)));
  bindTimerButtons();
  $$("[data-focus]").forEach((b) =>
    b.addEventListener("click", () => {
      const v = b.dataset.focus;
      state.focusAttr = v === "none" ? null : v;
      generateDailyQuests();
      save();
      render();
    }),
  );
}

let npcRosterOpen = false;

// Filtro de color del sprite según el jefe (para que se vean distintos sin arte propio)
function bossSpriteFilter(boss, dead) {
  if (dead) return "grayscale(1) brightness(0.5)";
  return `hue-rotate(${boss.hue || 0}deg) saturate(1.1)`;
}

// ---- Modo selección / preparación: compendio de jefes + NPC + ítems ----
function renderBossSelect() {
  $("#boss-roster").innerHTML = BOSSES.map((b) => {
    const info = attrInfo(b.weakness);
    const chosen = state.selectedBoss === b.id;
    const defeated = (state.bossDamage[b.id] || 0) >= b.maxHp;
    return `
      <article class="boss-pick ${chosen ? "chosen" : ""}" data-boss="${b.id}" style="--c:${info.color}">
        <div class="boss-thumb">
          <img src="./assets/pixel-monster.svg" alt="" style="filter:${bossSpriteFilter(b, defeated)}" />
        </div>
        <div class="boss-pick-body">
          <span class="boss-badge">${b.badge}${defeated ? " · derrotado" : ""}</span>
          <strong>${b.name}</strong>
          <em>${b.epithet}</em>
          <span class="weak-chip" style="--c:${info.color}">⚔ Debilidad: ${b.weakness}</span>
        </div>
        <span class="boss-pick-mark">${chosen ? "✓" : ""}</span>
      </article>`;
  }).join("");
  $$("[data-boss]").forEach((el) => el.addEventListener("click", () => selectBoss(el.dataset.boss)));

  // NPC de apoyo (elección simple)
  $("#prep-npc-list").innerHTML = BASIC_NPCS.map((n) => {
    const info = attrInfo(n.attr);
    const active = state.selectedNpc === n.attr;
    return `
      <button class="npc-chip ${active ? "active" : ""}" data-prep-npc="${n.attr}" type="button" style="--c:${info.color}">
        <span class="npc-chip-icon" style="color:${info.color}">${n.icon}</span>
        <span class="npc-chip-name">${n.name}</span>
        <span class="npc-chip-attr">${n.attr}</span>
      </button>`;
  }).join("");
  $$("[data-prep-npc]").forEach((b) =>
    b.addEventListener("click", () => {
      state.selectedNpc = state.selectedNpc === b.dataset.prepNpc ? null : b.dataset.prepNpc;
      save();
      render();
    }),
  );

  // Ítems a la batalla (buffs equipables; las pociones se usan en combate)
  const items = Object.entries(CONSUMABLES).filter(([id]) => (state.inventory[id] || 0) > 0);
  $("#prep-items-pill").textContent = `${state.equippedConsumables.length} ítems`;
  $("#prep-items").innerHTML = items.length
    ? items
        .map(([id, c]) => {
          const eq = state.equippedConsumables.includes(id);
          return `
        <article class="consumable-card ${eq ? "equipped" : ""}">
          <span class="quest-icon">${c.icon}</span>
          <div><strong>${c.name}</strong><p>${c.effect}</p><small>Stock: ${state.inventory[id]}</small></div>
          <button class="mini-button" data-consumable="${id}" type="button">${eq ? "Quitar" : c.cat === "heal" ? "Usar" : "Llevar"}</button>
        </article>`;
        })
        .join("")
    : `<p class="empty-note">Sin ítems. Completa quests y bosses para conseguirlos.</p>`;
  $$("[data-consumable]").forEach((b) => b.addEventListener("click", () => toggleConsumable(b.dataset.consumable)));

  const ready = Boolean(state.selectedBoss);
  $("#start-battle").disabled = !ready;
  $("#start-battle").textContent = ready ? `⚔ Aceptar contrato · ${activeBoss().name}` : "⚔ Aceptar contrato";
  $("#select-hint").classList.toggle("hidden", ready);
}

function selectBoss(id) {
  state.selectedBoss = id;
  save();
  render();
}
function startBattle() {
  if (!state.selectedBoss) return;
  state.bossMode = "battle";
  save();
  render();
}
function backToSelect() {
  state.bossMode = "select";
  save();
  render();
}

function renderBoss() {
  const tut = isTutorial();
  // alterna entre preparación y batalla (durante el tutorial siempre batalla)
  const selectMode = !tut && state.bossMode !== "battle";
  $("#boss-select").classList.toggle("hidden", !selectMode);
  $("#boss-battle").classList.toggle("hidden", selectMode);
  // en tutorial: sin compendio, sin ataque nocturno
  $("#back-to-select").style.display = tut ? "none" : "";
  $("#end-day-button").style.display = tut ? "none" : "";
  if (selectMode) {
    renderBossSelect();
    return;
  }

  ensureHeroHp();
  const boss = activeBoss();
  const hp = bossHp();
  const dead = hp <= 0;
  $("#boss-sprite").style.filter = bossSpriteFilter(boss, dead);
  $("#boss-type").textContent = boss.badge;
  $("#boss-name").textContent = boss.name;
  $("#boss-hp-label").textContent = `${fmt(hp)} / ${fmt(boss.maxHp)} PV`;
  $("#boss-hp-bar").style.width = `${(hp / boss.maxHp) * 100}%`;
  // en tutorial no hay consumibles/preparación
  $("#prep-details").style.display = tut ? "none" : "";

  // tutorial: el boss está bloqueado hasta completar los 5 encargos
  if (tut && state.tutorial.step !== "boss") {
    $("#boss-intel").innerHTML = `<article class="intel-card"><strong>Encargo bloqueado 🔒</strong><p>Completa los 5 encargos del gremio en la pestaña <b>Quests</b>. Entonces el maestro te asignará la caza del Lobo Armado.</p></article>`;
    $("#npc-list").innerHTML = "";
    $("#npc-toggle").style.visibility = "hidden";
    $("#battle-list").innerHTML = `<p class="empty-note">Disponible tras completar los encargos del gremio.</p>`;
    $("#damage-potential").textContent = "";
    $("#attack-button").disabled = true;
    $("#attack-button").textContent = "Completa los encargos primero";
    $("#rest-note").classList.add("hidden");
    return;
  }

  // intel — tarjeta compacta única
  if (tut) {
    $("#boss-intel").innerHTML = `<article class="intel-card"><strong>Primer encargo del gremio</strong><p>${boss.desc}</p></article>`;
  } else {
    const intel = bossIntel();
    $("#boss-intel").innerHTML = `<article class="intel-card"><strong>Intel · ${intel.tier}</strong>${intel.lines.map((l) => `<p>${l}</p>`).join("")}</article>`;
  }

  // NPC de apoyo
  if (tut) {
    // tutorial: NPC fijo (Reno), sin selección
    $("#npc-toggle").style.visibility = "hidden";
    $("#npc-list").innerHTML = `
      <article class="recruit-card active" style="--c:#e8923a">
        <div class="quest-icon" style="color:#e8923a">${TUTORIAL_NPC.icon}</div>
        <div>
          <strong>${TUTORIAL_NPC.name}</strong>
          <p>${TUTORIAL_NPC.effect}</p>
          <small style="color:#e8923a">${TUTORIAL_NPC.role}</small>
        </div>
        <span class="pill npc-active-pill">Activo ✓</span>
      </article>`;
  } else {
    const selected = state.selectedNpc ? npcByAttr(state.selectedNpc) : null;
    const showRoster = npcRosterOpen || !selected;
    $("#npc-toggle").textContent = showRoster ? (selected ? "Ocultar" : "Elegir") : "Cambiar";
    $("#npc-toggle").style.visibility = selected ? "visible" : "hidden";
    const npcCard = (n, active) => {
      const info = attrInfo(n.attr);
      return `
        <article class="recruit-card ${active ? "active" : ""}" style="--c:${info.color}">
          <div class="quest-icon" style="color:${info.color}">${n.icon}</div>
          <div>
            <strong>${n.name}</strong>
            <p>${n.effect}</p>
            <small style="color:${info.color}">Atributo: ${n.attr} · ${n.when}</small>
          </div>
          ${active && !showRoster ? `<span class="pill npc-active-pill">Activo ✓</span>` : `<button class="mini-button" data-npc="${n.attr}" type="button">${active ? "Activo ✓" : "Elegir"}</button>`}
        </article>`;
    };
    $("#npc-list").innerHTML = showRoster
      ? BASIC_NPCS.map((n) => npcCard(n, state.selectedNpc === n.attr)).join("")
      : npcCard(selected, true);
    $$("[data-npc]").forEach((b) =>
      b.addEventListener("click", () => {
        npcRosterOpen = false;
        selectNpc(b.dataset.npc);
      }),
    );
  }

  // consumibles de combate (solo buffs equipables; heal se aplica al instante)
  const buffs = Object.entries(CONSUMABLES).filter(([id, c]) => (state.inventory[id] || 0) > 0);
  $("#consumable-pill").textContent = `${state.equippedConsumables.length} equipados`;
  $("#combat-consumables").innerHTML =
    buffs.length === 0
      ? `<p class="empty-note">Sin consumibles. Completa quests y bosses para conseguirlos.</p>`
      : buffs
          .map(([id, c]) => {
            const eq = state.equippedConsumables.includes(id);
            return `
        <article class="consumable-card ${eq ? "equipped" : ""}">
          <span class="quest-icon">${c.icon}</span>
          <div><strong>${c.name}</strong><p>${c.effect}</p><small>Stock: ${state.inventory[id]}</small></div>
          <button class="mini-button" data-consumable="${id}" type="button">${eq ? "Activo" : c.cat === "heal" ? "Usar" : "Equipar"}</button>
        </article>`;
          })
          .join("");
  $$("[data-consumable]").forEach((b) => b.addEventListener("click", () => toggleConsumable(b.dataset.consumable)));

  // prep summary
  const sample = todaysBattleQuests()[0];
  $("#hero-hp-label").textContent = `${fmt(state.heroHp)} / ${fmt(maxHeroHp())}`;
  $("#dmg-estimate").textContent = sample ? `+${fmt(questBattleDamage(sample))}` : "+0";
  const bonuses = [];
  const selNpc = npcByAttr(state.selectedNpc);
  if (selNpc) bonuses.push(selNpc.name);
  state.equippedConsumables.forEach((id) => bonuses.push(CONSUMABLES[id].name));
  $("#active-bonus").textContent = bonuses.length ? bonuses.join(", ") : "—";
  $("#prep-summary-pill").textContent = `PV ${fmt(state.heroHp)}/${fmt(maxHeroHp())}`;

  // battle missions
  $("#damage-potential").textContent = `+${fmt(pendingBattleDamage())} daño acumulado`;
  $("#battle-list").innerHTML = todaysBattleQuests()
    .map((q) => {
      const info = attrInfo(q.attr);
      const inBattle = state.battleDone.includes(q.id);
      return `
      <article class="battle-card ${inBattle ? "ready" : ""}" style="--c:${info.color}">
        <div class="battle-icon" style="color:${info.color}">${q.icon}</div>
        <div><h4>${q.name}</h4><p>${q.habit}</p></div>
        <strong>${fmt(questBattleDamage(q))}<br>DMG</strong>
        <button class="complete-button" data-battle="${q.id}" type="button" ${inBattle ? "disabled" : ""}>
          ${inBattle ? "En combate ✓" : "Atacar con esta"}
        </button>
      </article>`;
    })
    .join("");
  $$("[data-battle]").forEach((b) => b.addEventListener("click", () => markBattleMission(b.dataset.battle)));

  // "vivo/muerto" según el daño YA aplicado (no el encolado), para poder dar el golpe final.
  const aliveHp = boss.maxHp - bossDamageDone();
  const canAttack = pendingBattleDamage() > 0 && aliveHp > 0 && !state.resting;
  $("#attack-button").disabled = !canAttack;
  $("#attack-button").textContent = state.resting ? "Héroe en descanso 💤" : aliveHp <= 0 ? "Boss derrotado 🏆" : "⚔ Desatar ataque";

  $("#rest-note").classList.toggle("hidden", !state.resting);
  if (state.resting) {
    $("#rest-note").textContent = `El héroe necesita recuperar fuerzas (más del 50% PV) antes de volver al combate. PV: ${fmt(state.heroHp)} / ${fmt(maxHeroHp())}. Usa consumibles para acelerar.`;
  }
}

function renderExpedition() {
  const arc = activeArc();
  $("#expedition-title").textContent = arc.title;
  $("#expedition-summary").textContent = arc.summary;
  const doneCh = arc.chapters.filter((c) => chapterDone(c.id)).length;
  $("#expedition-bar").style.width = `${(doneCh / arc.chapters.length) * 100}%`;
  $("#expedition-progress-label").textContent = `${doneCh} / ${arc.chapters.length} capítulos`;
  $("#keys-pill").textContent = `${arcKeys(arc.id)} llaves`;

  $("#arc-rotation").innerHTML = ARCS.map((a, i) => {
    const active = i === state.arcWeek % ARCS.length;
    return `
      <article class="arc-card ${active ? "active" : ""}">
        <strong>${active ? "▶ Arco Activo" : "⏸ En espera"}</strong>
        <h4>${a.title}</h4>
        <p>${a.summary}</p>
        <small>${arcKeys(a.id)} llaves · ${a.chapters.filter((c) => chapterDone(c.id)).length}/${a.chapters.length} caps</small>
      </article>`;
  }).join("");

  $("#chapter-map").innerHTML = arc.chapters
    .map((ch, idx) => {
      const prog = state.chapterProgress[ch.id] || 0;
      const total = ch.missions.length;
      const complete = prog >= total;
      const prevDone = idx === 0 || chapterDone(arc.chapters[idx - 1].id);
      const keyLock = ch.requiresKeys && arcKeys(arc.id) < ch.requiresKeys;
      const locked = !prevDone || keyLock;
      return `
      <article class="chapter-card ${ch.tone} ${complete ? "complete" : ""} ${locked ? "locked" : ""}">
        <header><strong>${ch.title}</strong><span>${ch.level}</span></header>
        <div class="chapter-progress"><span style="width:${(prog / total) * 100}%"></span></div>
        <small class="chapter-count">${prog} / ${total} misiones</small>
        <ul>${ch.missions.map((m, i) => `<li class="${i < prog ? "done" : ""}">${m}</li>`).join("")}</ul>
        <div class="chapter-boss">⚔ Boss: ${ch.boss}</div>
        <div class="chapter-key">🗝 ${ch.key}${ch.requiresKeys ? ` · requiere ${ch.requiresKeys} llaves` : ""}</div>
        <blockquote>"${ch.beat}"</blockquote>
        <button class="complete-button" data-chapter="${ch.id}" type="button" ${locked || complete ? "disabled" : ""}>
          ${complete ? "Completado ✓" : locked ? "Bloqueado 🔒" : "Avanzar misión"}
        </button>
      </article>`;
    })
    .join("");
  $$("[data-chapter]").forEach((b) =>
    b.addEventListener("click", () => {
      const ch = arc.chapters.find((c) => c.id === b.dataset.chapter);
      advanceChapter(arc, ch);
    }),
  );

  $("#expedition-reward").innerHTML = `
    <article class="rare-reward">
      <span>✦</span>
      <div>
        <strong>${arc.relic.name}</strong>
        <p>Reliquia épica del arco — ${arc.relic.lore}</p>
        <small>NPC narrativo: ${arc.npc.name}, ${arc.npc.role} (${arc.npc.attr})</small>
      </div>
    </article>
    <button class="ghost-button" id="rotate-arc" type="button">Rotar al siguiente arco (semana)</button>`;
  $("#rotate-arc").addEventListener("click", rotateArc);
}

function renderCharacter() {
  const totals = totalAttributes();
  $("#character-name").innerHTML = `${state.name}${guildRankBadge()}`;
  $("#topbar-name").textContent = state.name;
  $("#character-summary").textContent = `Nivel ${state.level} · ${rankForLevel(state.level)}`;
  $("#total-xp").textContent = fmt(state.totalXp);
  $("#completed-total").textContent = state.totalQuestsDone;
  $("#bosses-total").textContent = state.bossesDefeated;
  $("#build-archetype").textContent = topAttrLabel(totals);

  const maxVal = Math.max(10, ...ATTR_IDS.map((id) => totals[id]));
  $("#attribute-list").innerHTML = ATTRIBUTES.map((a) => {
    const base = state.attributes[a.id] ?? 0;
    const total = totals[a.id] ?? 0;
    const bonus = total - base;
    const nextT = [10, 25, 50, 100].find((t) => base < t);
    return `
      <article class="attribute-row" style="--c:${a.color}">
        <div><strong>${a.label}</strong><small style="color:${a.color}">${a.id}${bonus > 0 ? ` · +${bonus} equipo` : ""}</small></div>
        <div class="attribute-meter"><span style="width:${(total / maxVal) * 100}%;background:${a.color}"></span></div>
        <div class="attr-val"><strong>${total}</strong>${nextT ? `<em>→ ${nextT}</em>` : `<em>máx</em>`}</div>
      </article>`;
  }).join("");

  // equipo por ranura (sets con bonus base/completo y umbral)
  $("#equipment-list").innerHTML = EQUIP_SLOTS.map((slot) => {
    const item = state.equipment[slot.id];
    if (!item) {
      const note = slot.id === "relic" ? "Solo reliquias de expedición" : "Ranura vacía";
      return `<article class="equipment-card empty"><span>▢</span><div><strong>${slot.label}</strong><p>${note}</p></div></article>`;
    }
    if (item.slot === "relic") {
      return `
        <article class="equipment-card awakened">
          <span>👑</span>
          <div><strong>${item.name} <em class="rarity epic">Reliquia</em></strong><p>${slot.label} · +todos los stats</p><small>✓ Trofeo de expedición</small></div>
        </article>`;
    }
    const piece = equipPiece(item);
    const set = setById(item.set);
    const awakened = isAwakened(item);
    const cond = piece.thr[0] === "level" ? `Nivel ${piece.thr[1]}` : `${piece.thr[1]} ≥ ${piece.thr[2]}`;
    const bonusTxt = (b) => Object.entries(b).map(([a, n]) => `+${n} ${a}`).join(" ");
    return `
      <article class="equipment-card ${awakened ? "awakened" : ""}">
        <span>⚔</span>
        <div>
          <strong>${item.name} <em class="rarity ${awakened ? "epic" : "common"}">${set.name}</em></strong>
          <p>${slot.label} · base ${bonusTxt(piece.base)}</p>
          <small>${awakened ? `✓ Despertado: ${bonusTxt(piece.full)}` : `Umbral: ${cond} → ${bonusTxt(piece.full)}`}</small>
        </div>
      </article>`;
  }).join("");

  // pasivas
  $("#passive-list").innerHTML = ATTRIBUTES.map((a) => {
    const rows = PASSIVES[a.id]
      .map((p) => {
        const on = (state.attributes[a.id] ?? 0) >= p.t;
        return `<li class="${on ? "on" : ""}"><span class="ptier">${p.t}</span><div><strong>${p.name}</strong><small>${p.desc}</small></div><span class="pcheck">${on ? "✓" : "◇"}</span></li>`;
      })
      .join("");
    return `<article class="passive-group" style="--c:${a.color}"><h4 style="color:${a.color}">${a.label} · ${state.attributes[a.id] ?? 0}</h4><ul>${rows}</ul></article>`;
  }).join("");

  // inventario
  const inv = Object.entries(state.inventory).filter(([, q]) => q > 0);
  $("#inventory-list").innerHTML = inv.length
    ? inv
        .map(([id, q]) => {
          const c = CONSUMABLES[id];
          return `<article class="inv-card"><span>${c.icon}</span><div><strong>${c.name}</strong><small>${c.effect}</small></div><strong class="inv-qty">×${q}</strong></article>`;
        })
        .join("")
    : `<p class="empty-note">Inventario vacío.</p>`;
}

function topAttrLabel(totals) {
  const top = ATTR_IDS.reduce((best, id) => (totals[id] > totals[best] ? id : best), ATTR_IDS[0]);
  const avg = ATTR_IDS.reduce((s, id) => s + totals[id], 0) / ATTR_IDS.length;
  if (totals[top] - avg < 4) return "Equilibrado";
  return { STR: "Guerrero", INT: "Erudito", VIT: "Centinela", DIS: "Asceta", SOC: "Diplomático" }[top];
}

function renderArchive() {
  $("#archive-name").innerHTML = `${state.name}${guildRankBadge()}`;
  $("#archive-title").textContent = state.titles.length ? state.titles[state.titles.length - 1] : "Sin título aún";
  $("#archive-level").textContent = state.level;
  $("#archive-start").textContent = state.startDate;
  $("#archive-streak-max").textContent = state.streakMax || 0;

  $("#arc-history").innerHTML = ARCS.map((a) => {
    const done = state.completedArcs.includes(a.id);
    const active = a.id === activeArc().id;
    const doneCh = a.chapters.filter((c) => chapterDone(c.id)).length;
    const status = done ? "Completado" : active ? "En curso" : doneCh > 0 ? "Pausado" : "Bloqueado";
    return `
      <article class="arc-history-card ${done ? "done" : ""} ${status === "Bloqueado" ? "locked" : ""}">
        <div><strong>${a.title}</strong><small>${status} · ${doneCh}/${a.chapters.length} caps · ${arcKeys(a.id)} llaves</small></div>
        <span>${done ? "👑" : active ? "▶" : doneCh ? "⏸" : "🔒"}</span>
      </article>`;
  }).join("");

  // reliquias especiales (no atadas a un arco) + objetos narrativos (libro, invitación…)
  const specialRelics = state.relics
    .filter((r) => !ARCS.some((a) => a.id === r.arc))
    .map((r) => `<article class="relic-card"><span>🛡</span><div><strong>${r.name}</strong><p>${r.lore}</p><small>Recuerdo · ${r.date}</small></div></article>`)
    .join("");
  const storyItems = (state.narrativeItems || [])
    .map((n) => `<article class="relic-card story"><span>${n.icon}</span><div><strong>${n.name}</strong><p>${n.lore}</p><small>Objeto narrativo · ${n.date}</small></div></article>`)
    .join("");
  $("#relic-gallery").innerHTML =
    storyItems +
    specialRelics +
    ARCS.map((a) => {
      const r = state.relics.find((x) => x.arc === a.id);
      if (r) {
        return `<article class="relic-card"><span>👑</span><div><strong>${r.name}</strong><p>${r.lore}</p><small>${a.title} · ${r.date}</small></div></article>`;
      }
      return `<article class="relic-card silhouette"><span>❔</span><div><strong>Reliquia desconocida</strong><p>Completa "${a.title}" para revelarla.</p></div></article>`;
    }).join("");

  // estadísticas históricas
  const topAttr = ATTR_IDS.reduce((b, id) => ((state.attributes[id] ?? 0) > (state.attributes[b] ?? 0) ? id : b), "STR");
  $("#historic-stats").innerHTML = `
    <div class="hist-grid">
      <div><strong>${state.totalQuestsDone}</strong><span>Quests completadas</span></div>
      <div><strong>${state.streakMax || 0}</strong><span>Racha máxima</span></div>
      <div><strong>${state.bossesDefeated}</strong><span>Bosses derrotados</span></div>
      <div><strong>${state.bossesByType.generic}/${state.bossesByType.expedition}</strong><span>Genéricos / Exped.</span></div>
      <div><strong>${attrInfo(topAttr).label}</strong><span>Atributo más alto</span></div>
      <div><strong>${state.level}</strong><span>Nivel máximo</span></div>
    </div>`;
}

function render() {
  ensureDailyReset();
  $("#level-label").textContent = `Nivel ${state.level}`;
  renderQuests();
  renderBoss();
  renderExpedition();
  renderCharacter();
  renderArchive();
}

/* =========================================================================
   NAVEGACIÓN Y ARRANQUE
   ========================================================================= */
$("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  state.name = $("#user-name").value.trim() || "Héroe";
  if (!state.startDate) state.startDate = today();
  save();
  $("#login-screen").classList.remove("active");
  $("#app-screen").classList.add("active");
  // Héroe nuevo → registro en el gremio (tutorial). Si no, juego normal.
  if (isTutorial() && !state.tutorial.seenIntro) {
    startTutorial();
  } else {
    render();
  }
});

$("#attack-button").addEventListener("click", attackBoss);
$("#end-day-button").addEventListener("click", endOfDayAttack);
$("#gd-next").addEventListener("click", advanceDialogue);
$("#gd-skip").addEventListener("click", skipTutorial);

$("#npc-toggle").addEventListener("click", () => {
  npcRosterOpen = !npcRosterOpen;
  render();
});

$("#start-battle").addEventListener("click", startBattle);
$("#back-to-select").addEventListener("click", backToSelect);

$("#cp-close").addEventListener("click", closeCombatPop);
$("#combat-pop").addEventListener("click", (e) => {
  if (e.target.id === "combat-pop") closeCombatPop();
});

$$(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    $$(".tab").forEach((t) => t.classList.remove("active"));
    $$(".view").forEach((v) => v.classList.remove("active"));
    tab.classList.add("active");
    $(`#${tab.dataset.view}`).classList.add("active");
  });
});

$$(".char-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    $$(".char-tab").forEach((t) => t.classList.remove("active"));
    $$(".char-pane").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    $(`#${tab.dataset.pane}`).classList.add("active");
  });
});

// si ya hay partida, saltar login
const hasSave = Boolean(localStorage.getItem(STORAGE_KEY));
if (hasSave) {
  $("#login-screen").classList.remove("active");
  $("#app-screen").classList.add("active");
}

// el primer gesto del usuario desbloquea el audio de la alarma
window.addEventListener("pointerdown", unlockAudio, { once: true });

// tick de los temporizadores cada segundo
setInterval(tickTimers, 1000);

render();

// reanudar el tutorial si se recargó durante la intro
if (hasSave && isTutorial() && !state.tutorial.seenIntro) {
  startTutorial();
}

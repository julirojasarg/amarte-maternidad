/**
 * Kardex Virtual de Familias - Amarte Maternidad
 * Gestor Integral Clínico-Emocional, Obstétrico y de Acompañamiento
 * Juliana Rojas Argüello · Doula & Asesora de Lactancia (Costa Rica)
 */

// Storage Key
const STORAGE_KEY = "amarte_kardex_families_v1";

// Initial Realistic Data including current real families with hospitals and fees
const INITIAL_SAMPLE_FAMILIES = [
  // 1. NINA
  {
    id: "fam-nina",
    motherName: "Nina",
    partnerName: "",
    babyName: "En camino",
    phone: "8734-5131",
    contactChannel: "whatsapp",
    photo: "imagenes/nina.jpg",
    fum: "2026-01-27",
    fpp: "2026-11-03",
    stage: "gestacion",
    servicePackage: "Acompañamiento Integral Doula & Parto",
    hospital: "Hospital Calderón Guardia",
    totalFee: 200000,
    payments: [],
    supportNetwork: "Pareja y familia cercana",
    notes: "Acompañamiento prenatal integral y parto. FPP estimada: 3 de Noviembre 2026 en Hospital Calderón Guardia.",
    clinicalNotes: [
      {
        id: "note-nina-1",
        date: "2026-09-20",
        tag: "Preparación al Parto",
        title: "Apertura de Expediente & Definición de Objetivos",
        text: "Cronograma de preparación al parto establecido. Se abordaron las etapas del parto, expectativas del nacimiento en el Calderón Guardia y dudas sobre el inicio del trabajo de parto.",
        materials: "Guía PDF 'Hormonas y Fisiología del Parto', Lista de verificación de maleta hospitalaria",
        agreements: "Revisar la guía con pareja y listar dudas para la 1era sesión práctica del 26 de septiembre."
      }
    ],
    appointments: [
      {
        id: "apt-nina-1",
        date: "2026-09-26",
        time: "10:00",
        title: "Primera Sesión de Preparación",
        notes: "Sesión 1: Fisiología, biomecánica y posturas de dilatación",
        status: "pendiente"
      },
      {
        id: "apt-nina-2",
        date: "2026-10-10",
        time: "10:00",
        title: "Segunda Sesión de Preparación",
        notes: "Sesión 2: Medidas de confort, rebozo y manejo del dolor",
        status: "pendiente"
      },
      {
        id: "apt-nina-3",
        date: "2026-10-24",
        time: "10:00",
        title: "Tercera Sesión de Preparación",
        notes: "Sesión 3: Plan de parto, rol del acompañante y pautas de traslado al Calderón Guardia",
        status: "pendiente"
      },
      {
        id: "apt-nina-4",
        date: "2026-10-31",
        time: "10:00",
        title: "Posible Sesión de Guardia",
        notes: "Sesión complementaria de cierre / guardia previa a FPP (3 Nov)",
        status: "pendiente"
      }
    ],
    createdAt: "2026-09-01"
  },

  // 2. KELSEY
  {
    id: "fam-kelsey",
    motherName: "Kelsey",
    partnerName: "",
    babyName: "En camino",
    phone: "8792-2150",
    contactChannel: "whatsapp",
    photo: "",
    fum: "2026-03-10",
    fpp: "2026-12-15", // Rango 13-16 Dic
    stage: "gestacion",
    servicePackage: "Acompañamiento Integral Doula & Parto",
    hospital: "Hospital San Vicente de Paúl",
    totalFee: 200000,
    payments: [],
    supportNetwork: "Red de apoyo familiar",
    notes: "Acompañamiento prenatal y parto. Parto planeado en Hospital San Vicente de Paúl (Heredia). FPP: 13-16 Dic 2026.",
    clinicalNotes: [
      {
        id: "note-kelsey-1",
        date: "2026-09-20",
        tag: "Preparación al Parto",
        title: "Coordinación y Plan de Acompañamiento",
        text: "Cronograma de fechas de preparación acordado. Revisión de protocolos de acompañamiento en el Hospital San Vicente de Paúl.",
        materials: "Guía PDF de Parto Respetado, Infografía de Biomecánica & Fitball",
        agreements: "Conseguir fitball de 65cm para iniciar ejercicios biomecánicos en la sesión 1 (10 Octubre)."
      }
    ],
    appointments: [
      {
        id: "apt-kelsey-1",
        date: "2026-10-10",
        time: "14:00",
        title: "Primera Sesión de Preparación",
        notes: "Sesión 1: Fisiología del parto, respiración y expectativas",
        status: "pendiente"
      },
      {
        id: "apt-kelsey-2",
        date: "2026-11-07",
        time: "10:00",
        title: "Segunda Sesión de Preparación",
        notes: "Sesión 2: Biomecánica pélvica, posturas en fitball y masaje lumbosacro",
        status: "pendiente"
      },
      {
        id: "apt-kelsey-3",
        date: "2026-11-21",
        time: "10:00",
        title: "Tercera Sesión de Preparación",
        notes: "Sesión 3: Elaboración de plan de parto y apoyo continuo en trabajo de parto",
        status: "pendiente"
      },
      {
        id: "apt-kelsey-4",
        date: "2026-12-12",
        time: "10:00",
        title: "Posible Sesión de Guardia",
        notes: "Posible sesión de valoración y guardia previa a FPP (13-16 Dic)",
        status: "pendiente"
      }
    ],
    createdAt: "2026-09-01"
  },

  // 3. PRISCILLA (Pri)
  {
    id: "fam-priscilla",
    motherName: "Priscilla (Pri)",
    partnerName: "",
    babyName: "En camino",
    phone: "8624-6944",
    contactChannel: "whatsapp",
    photo: "",
    fum: "2026-02-25",
    fpp: "2026-12-02",
    stage: "gestacion",
    servicePackage: "Preparación al Parto Intensiva",
    hospital: "Hospital San Carlos",
    totalFee: 100000,
    payments: [],
    supportNetwork: "Pareja y acompañante",
    notes: "Sesión intensiva de preparación para el parto. Parto planeado en Hospital San Carlos. FPP: 2 de Diciembre 2026.",
    clinicalNotes: [
      {
        id: "note-pri-1",
        date: "2026-09-23",
        tag: "Sesión Intensiva",
        title: "Programación de Taller Intensivo",
        text: "Registro en Kardex. Agendada sesión intensiva de preparación para el 26 de octubre. Enfoque integral: medidas de confort, biomecánica pélvica y lactancia temprana.",
        materials: "Guía Rápida de Medidas de Confort en PDF, Guía de Lactancia & Calostro",
        agreements: "Llevar ropa cómoda y borrador de plan de parto el 26 de octubre."
      }
    ],
    appointments: [
      {
        id: "apt-pri-1",
        date: "2026-10-26",
        time: "10:00",
        title: "Sesión de Preparación para Parto Intensiva",
        notes: "Taller intensivo: biomecánica, posturas, manejo no farmacológico del dolor, plan de parto y lactancia inicial",
        status: "pendiente"
      }
    ],
    createdAt: "2026-09-23"
  }
];

// App State
let families = [];
let currentView = "table"; // "table" | "kanban" | "calendar" | "accounting"
let searchQuery = "";
let stageFilter = "all";
let currentKardexFamilyId = null;
let currentCalendarDate = new Date();
let draggedFamilyId = null;

// ================= INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  renderCurrentView();
  updateMetrics();
  initCalendar();
  lucide.createIcons();
});

// Load data from LocalStorage or seed with real active families
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const mockIdsToRemove = [
      "fam-valeria-mora",
      "fam-sofia-chinchilla",
      "fam-mariana-gonzalez",
      "fam-camila-navarro"
    ];
    
    if (raw) {
      let stored = JSON.parse(raw);
      
      // Filter out mock / non-existing families
      stored = stored.filter(f => !mockIdsToRemove.includes(f.id));

      // Ensure Nina, Kelsey, and Priscilla (real families) are included and updated
      const requiredFamilies = {
        "fam-nina": { hospital: "Hospital Calderón Guardia", totalFee: 200000, photo: "imagenes/nina.jpg", stage: "gestacion" },
        "fam-kelsey": { hospital: "Hospital San Vicente de Paúl", totalFee: 200000, stage: "gestacion" },
        "fam-priscilla": { hospital: "Hospital San Carlos", totalFee: 100000, stage: "gestacion" }
      };

      Object.keys(requiredFamilies).forEach(reqId => {
        let fam = stored.find(f => f.id === reqId);
        if (!fam) {
          const sample = INITIAL_SAMPLE_FAMILIES.find(f => f.id === reqId);
          if (sample) stored.push(sample);
        } else {
          // Update hospital and fee if not set or default
          if (!fam.hospital || fam.hospital === "Por confirmar") {
            fam.hospital = requiredFamilies[reqId].hospital;
          }
          if (!fam.totalFee) {
            fam.totalFee = requiredFamilies[reqId].totalFee;
          }
          if (requiredFamilies[reqId].photo && (!fam.photo || fam.photo !== requiredFamilies[reqId].photo)) {
            fam.photo = requiredFamilies[reqId].photo;
          }
          if (requiredFamilies[reqId].stage && !fam.stage) {
            fam.stage = requiredFamilies[reqId].stage;
          }
          if (!fam.payments) fam.payments = [];
        }
      });
      
      families = stored;
      saveData();
    } else {
      families = [...INITIAL_SAMPLE_FAMILIES];
      saveData();
    }
  } catch (err) {
    console.error("Error loading localStorage:", err);
    families = [...INITIAL_SAMPLE_FAMILIES];
  }
}

// Persist data
function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(families));
  } catch (err) {
    console.error("Error saving localStorage:", err);
  }
}

// ================= OBSTETRIC CALCULATIONS ENGINE =================

/**
 * Calculates FPP (Naegele: FUM + 280 days), Weeks and Days, Trimester and Suggested Stage
 */
function getObstetricDetails(fumStr, fppStr) {
  const now = new Date();
  let fumDate = fumStr ? new Date(fumStr + "T00:00:00") : null;
  let fppDate = fppStr ? new Date(fppStr + "T00:00:00") : null;

  // If we have FUM and no FPP, calculate FPP (+280 days)
  if (fumDate && !fppDate) {
    fppDate = new Date(fumDate.getTime() + 280 * 24 * 60 * 60 * 1000);
  }

  // If we have FPP and no FUM, reverse calculate FUM (-280 days)
  if (fppDate && !fumDate) {
    fumDate = new Date(fppDate.getTime() - 280 * 24 * 60 * 60 * 1000);
  }

  if (!fumDate || isNaN(fumDate.getTime())) {
    return {
      weeksDecimal: 0,
      weeks: 0,
      days: 0,
      displayWeeks: "Sin FUM/FPP",
      fppFormatted: fppDate ? formatDate(fppDate) : "No definida",
      fumFormatted: "No definida",
      trimester: "No determinado",
      daysRemaining: 0,
      suggestedStage: "gestacion",
      progressPct: 0
    };
  }

  // Gestational Age in days
  const diffTime = now.getTime() - fumDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const weeks = Math.floor(diffDays / 7);
  const days = Math.max(0, diffDays % 7);
  const weeksDecimal = parseFloat((diffDays / 7).toFixed(1));

  // Trimester & Suggested Stage
  let trimester = "1er Trimestre";
  let suggestedStage = "gestacion";

  if (weeks < 13) {
    trimester = "1er Trimestre";
    suggestedStage = "gestacion";
  } else if (weeks < 28) {
    trimester = "2do Trimestre";
    suggestedStage = "gestacion";
  } else if (weeks < 37) {
    trimester = "3er Trimestre";
    suggestedStage = "gestacion";
  } else if (weeks <= 42) {
    trimester = "A Término (37-42 sem)";
    suggestedStage = "termino";
  } else {
    trimester = "Postérmino (>42 sem)";
    suggestedStage = "termino";
  }

  // Days remaining until FPP
  const remainingTime = fppDate ? fppDate.getTime() - now.getTime() : 0;
  const daysRemaining = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

  // Progress percentage (based on 40 weeks = 280 days)
  const progressPct = Math.min(100, Math.max(0, Math.round((diffDays / 280) * 100)));

  return {
    weeksDecimal: weeksDecimal > 0 ? weeksDecimal : 0,
    weeks: Math.max(0, weeks),
    days: Math.max(0, days),
    displayWeeks: diffDays >= 0 ? `${weeks}.${days} sem` : "0.0 sem",
    fppFormatted: fppDate ? formatDate(fppDate) : "Por calcular",
    fppIso: fppDate ? fppDate.toISOString().split("T")[0] : "",
    fumFormatted: formatDate(fumDate),
    fumIso: fumDate.toISOString().split("T")[0],
    trimester,
    daysRemaining,
    suggestedStage,
    progressPct
  };
}

// Live form calculation triggers
function calculateFromFUM(fumValue) {
  if (!fumValue) return;
  const fumDate = new Date(fumValue + "T00:00:00");
  const fppDate = new Date(fumDate.getTime() + 280 * 24 * 60 * 60 * 1000);
  const fppInput = document.getElementById("formFpp");
  if (fppInput) {
    fppInput.value = fppDate.toISOString().split("T")[0];
  }
  updateModalGestationalPreview(fumValue, fppInput.value);
}

function calculateFromFPP(fppValue) {
  if (!fppValue) return;
  const fppDate = new Date(fppValue + "T00:00:00");
  const fumDate = new Date(fppDate.getTime() - 280 * 24 * 60 * 60 * 1000);
  const fumInput = document.getElementById("formFum");
  if (fumInput && !fumInput.value) {
    fumInput.value = fumDate.toISOString().split("T")[0];
  }
  updateModalGestationalPreview(fumInput ? fumInput.value : null, fppValue);
}

function updateModalGestationalPreview(fum, fpp) {
  const details = getObstetricDetails(fum, fpp);
  const displayEl = document.getElementById("calcWeeksDisplay");
  const badgeEl = document.getElementById("calcStageSuggestedBadge");
  const stageSelect = document.getElementById("formStage");

  if (details.weeks > 0) {
    displayEl.textContent = `${details.weeks} semanas y ${details.days} días (${details.trimester})`;
    badgeEl.textContent = getStageLabel(details.suggestedStage);
    badgeEl.className = `inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${getStageBadgeClasses(details.suggestedStage)}`;
    
    // Auto-select stage if user hasn't overridden
    if (stageSelect && !document.getElementById("formFamilyId").value) {
      stageSelect.value = details.suggestedStage;
    }
  } else {
    displayEl.textContent = "Ingresa FUM o FPP para calcular";
    badgeEl.textContent = "Pendiente";
    badgeEl.className = "inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-warm-100 text-warm-700";
  }
}

// Weekly development guide knowledge
const WEEKLY_GUIDE_DATA = {
  default: {
    fruit: "Un melón cantaloupe (~2.1 kg)",
    baby: "El bebé practica movimientos respiratorios, traga líquido amniótico y sus órganos están madurando rápidamente.",
    mom: "Es normal sentir mayor peso pélvico, fatiga ocasional y contracciones de preparación. Mantener buena hidratación.",
    doula: "Enfoque en posturas pélvicas asimétricas, masajes con aceites relajantes y preparación emocional del plan de parto."
  }
};

function getWeekGuide(weeks) {
  if (weeks <= 12) {
    return {
      fruit: "Un limón o ciruela (~14 g)",
      baby: "Todos los órganos vitales ya están formados y empiezan a funcionar. Comienza a moverse activamente en el útero.",
      mom: "Cambios hormonales intensos, náuseas o fatiga. Es momento clave para nutrir el descanso y la hidratación.",
      doula: "Escucha activa de miedos y expectativas iniciales, sugerencias nutricionales suaves y acompañamiento empático."
    };
  } else if (weeks <= 27) {
    return {
      fruit: "Una papaya o berenjena (~600 g a 1 kg)",
      baby: "El bebé escucha la voz de mamá y papá. Desarrolla el reflejo de succión y responde a estímulos sonoros y táctiles.",
      mom: "Suele ser el trimestre con mayor vitalidad y energía. El abdomen crece notablemente.",
      doula: "Inicio de talleres de preparación al parto, ejercicios de suelo pélvico y conexión de la pareja con el bebé."
    };
  } else if (weeks < 37) {
    return {
      fruit: "Un melón o piña (~2.2 kg)",
      baby: "Pulmones prácticamente listos. El bebé acumula grasita protectora y adopta su posición cefálica.",
      mom: "Presión en la pelvis, contracciones de Braxton Hicks y posibles molestias lumbares. Vital descansar con almohadas de soporte.",
      doula: "Biomecánica con fitball, rebozo mexicano para relajación de ligamentos y definición detallada del plan de parto."
    };
  } else {
    return {
      fruit: "Una sandía (~3.0 a 3.5 kg)",
      baby: "¡Completamente maduro y listo para nacer! Sus huesos craneales son flexibles para descender por el canal del parto.",
      mom: "Fase de nido y espera activa. Las contracciones pueden volverse más regulares en cualquier momento.",
      doula: "Guardia activa 24/7. Repaso de señales de parto activo, medidas de confort no farmacológico y soporte continuo."
    };
  }
}

// ================= VIEW NAVIGATION =================
function switchView(viewName) {
  currentView = viewName;
  
  // Update Tab Styling
  const tabs = {
    table: document.getElementById("tabTable"),
    kanban: document.getElementById("tabKanban"),
    calendar: document.getElementById("tabCalendar"),
    accounting: document.getElementById("tabAccounting")
  };

  const sections = {
    table: document.getElementById("viewTable"),
    kanban: document.getElementById("viewKanban"),
    calendar: document.getElementById("viewCalendar"),
    accounting: document.getElementById("viewAccounting")
  };

  Object.keys(tabs).forEach(key => {
    if (tabs[key] && sections[key]) {
      if (key === viewName) {
        tabs[key].className = "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs bg-white text-brand-700 border border-brand-200/50 shrink-0";
        sections[key].classList.remove("hidden");
      } else {
        tabs[key].className = "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all text-warm-700 hover:text-brand-600 hover:bg-white/60 shrink-0";
        sections[key].classList.add("hidden");
      }
    }
  });

  renderCurrentView();
  lucide.createIcons();
}

function renderCurrentView() {
  if (currentView === "table") {
    renderTable();
  } else if (currentView === "kanban") {
    renderKanban();
  } else if (currentView === "calendar") {
    renderCalendar();
  } else if (currentView === "accounting") {
    renderAccounting();
  }
  updateMetrics();
}

// ================= SEARCH & FILTERS =================
function handleSearch(val) {
  searchQuery = val.trim().toLowerCase();
  const clearBtn = document.getElementById("clearSearchBtn");
  if (clearBtn) {
    if (searchQuery.length > 0) {
      clearBtn.classList.remove("hidden");
    } else {
      clearBtn.classList.add("hidden");
    }
  }
  renderCurrentView();
}

function clearSearch() {
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  searchQuery = "";
  document.getElementById("clearSearchBtn").classList.add("hidden");
  renderCurrentView();
}

function handleFilterStage(stage) {
  stageFilter = stage;
  renderCurrentView();
}

function getFilteredFamilies() {
  return families.filter(fam => {
    // Stage Filter
    if (stageFilter !== "all") {
      if (stageFilter === "puerperio" || stageFilter === "lactancia") {
        const isPuerpOrLact = fam.stage === "puerperio" || fam.stage === "lactancia" || 
          (fam.servicePackage && fam.servicePackage.toLowerCase().includes("lactancia"));
        if (!isPuerpOrLact) return false;
      } else if (fam.stage !== stageFilter) {
        return false;
      }
    }

    // Search Query Filter
    if (searchQuery) {
      const q = searchQuery;
      const matchMother = fam.motherName && fam.motherName.toLowerCase().includes(q);
      const matchPartner = fam.partnerName && fam.partnerName.toLowerCase().includes(q);
      const matchBaby = fam.babyName && fam.babyName.toLowerCase().includes(q);
      const matchPhone = fam.phone && fam.phone.includes(q);
      const matchHospital = fam.hospital && fam.hospital.toLowerCase().includes(q);
      const matchNotes = fam.notes && fam.notes.toLowerCase().includes(q);
      const matchService = fam.servicePackage && fam.servicePackage.toLowerCase().includes(q);
      return matchMother || matchPartner || matchBaby || matchPhone || matchHospital || matchNotes || matchService;
    }

    return true;
  });
}

// ================= METRICS & STATS =================
function updateMetrics() {
  const total = families.length;
  const gestacion = families.filter(f => f.stage === "gestacion").length;
  const termino = families.filter(f => f.stage === "termino").length;

  // Aquellas que son sesiones de asesoría de lactancia o etapa de postparto cuentan como puerperio
  const isPuerperioOrLactancia = (f) => {
    return f.stage === "puerperio" || 
           f.stage === "lactancia" || 
           (f.servicePackage && f.servicePackage.toLowerCase().includes("lactancia"));
  };

  const puerperio = families.filter(isPuerperioOrLactancia).length;
  const lactancia = families.filter(f => f.stage === "lactancia" || (f.servicePackage && f.servicePackage.toLowerCase().includes("lactancia"))).length;

  // Upcoming appointments count in next 14 days
  const now = new Date();
  const next14Days = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  let upcomingCount = 0;

  families.forEach(f => {
    if (f.appointments && Array.isArray(f.appointments)) {
      f.appointments.forEach(apt => {
        if (apt.date) {
          const aptDate = new Date(apt.date + "T00:00:00");
          if (aptDate >= new Date(now.setHours(0,0,0,0)) && aptDate <= next14Days) {
            upcomingCount++;
          }
        }
      });
    }
  });

  // Update DOM elements
  document.getElementById("statTotalFamilies").textContent = total;
  document.getElementById("statGestacion").textContent = gestacion;
  document.getElementById("statTermino").textContent = termino;
  document.getElementById("statPuerperio").textContent = puerperio;
  document.getElementById("statUpcomingAppointments").textContent = upcomingCount;

  // Kanban Stage Badge Counters
  if (document.getElementById("badgeCountGestacion")) {
    document.getElementById("badgeCountGestacion").textContent = gestacion;
    document.getElementById("badgeCountTermino").textContent = termino;
    document.getElementById("badgeCountPuerperio").textContent = puerperio;
    document.getElementById("badgeCountLactancia").textContent = lactancia;
  }
}

// ================= VIEW 1: TABLE RENDERER =================
function renderTable() {
  const tbody = document.getElementById("familiesTableBody");
  const emptyState = document.getElementById("tableEmptyState");
  const countEl = document.getElementById("filteredFamiliesCount");
  const list = getFilteredFamilies();

  countEl.textContent = `${list.length} ${list.length === 1 ? 'familia' : 'familias'}`;
  tbody.innerHTML = "";

  if (list.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  // Sort by gestational weeks descending (closest to delivery first)
  list.sort((a, b) => {
    const obA = getObstetricDetails(a.fum, a.fpp);
    const obB = getObstetricDetails(b.fum, b.fpp);
    return obB.weeksDecimal - obA.weeksDecimal;
  });

  list.forEach(fam => {
    const obs = getObstetricDetails(fam.fum, fam.fpp);
    const nextApt = getNextAppointment(fam);

    const tr = document.createElement("tr");
    tr.className = "hover:bg-brand-50/40 transition-colors group cursor-pointer";
    tr.onclick = (e) => {
      // Prevent opening modal when clicking specific action buttons
      if (e.target.closest(".no-kardex-click")) return;
      openKardexModal(fam.id);
    };

    const waNumber = formatPhoneForWA(fam.phone);
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola ${fam.motherName.split(" ")[0]}! 💕 Te saluda Juli de Amarte Maternidad. ¿Cómo te has sentido hoy?`)}`;

    tr.innerHTML = `
      <td class="py-3.5 px-4">
        <div class="flex items-center gap-3">
          ${fam.photo ? `
            <img src="${fam.photo}" onerror="this.onerror=null; this.src='nina.jpg';" alt="${fam.motherName}" class="w-10 h-10 rounded-xl object-cover shrink-0 border border-brand-200 shadow-xs" />
          ` : `
            <div class="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 font-bold font-heading text-sm flex items-center justify-center shrink-0 border border-brand-200">
              ${fam.motherName.charAt(0)}
            </div>
          `}
          <div>
            <div class="font-bold text-warm-900 group-hover:text-brand-600 transition-colors">
              ${fam.motherName}
            </div>
            <div class="text-xs text-warm-600 flex items-center gap-1.5 mt-0.5">
              ${fam.partnerName ? `<span>Pareja: ${fam.partnerName}</span> · ` : ''}
              <span class="text-brand-600 font-medium">Bebé: ${fam.babyName || 'En camino'}</span>
            </div>
          </div>
        </div>
      </td>

      <td class="py-3.5 px-4 no-kardex-click">
        <div class="flex items-center gap-1.5">
          <a href="${waLink}" target="_blank" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors" title="Abrir WhatsApp directo">
            <i data-lucide="message-circle" class="w-3.5 h-3.5 text-emerald-600"></i>
            <span>${fam.phone || 'Sin tel'}</span>
          </a>
        </div>
      </td>

      <td class="py-3.5 px-4 text-center text-xs text-warm-700 font-medium">
        ${obs.fumFormatted}
      </td>

      <td class="py-3.5 px-4 text-center">
        <div class="font-bold text-xs text-warm-900">${obs.fppFormatted}</div>
        ${obs.daysRemaining > 0 && fam.stage !== 'puerperio' && fam.stage !== 'lactancia' ? `
          <div class="text-[10px] text-amberStage-700 font-medium">${obs.daysRemaining} días restantes</div>
        ` : ''}
      </td>

      <td class="py-3.5 px-4 text-center">
        ${fam.stage === 'puerperio' || fam.stage === 'lactancia' ? `
          <span class="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-lavender-100 text-lavender-800">
            Nacido / Posparto
          </span>
        ` : `
          <div class="inline-flex flex-col items-center">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${obs.weeks >= 37 ? 'bg-amberStage-100 text-amberStage-800 border border-amberStage-200' : 'bg-brand-100 text-brand-700 border border-brand-200'}">
              ${obs.displayWeeks}
            </span>
            <span class="text-[10px] text-warm-600 mt-0.5">${obs.trimester}</span>
          </div>
        `}
      </td>

      <td class="py-3.5 px-4 text-center">
        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getStageBadgeClasses(fam.stage)}">
          ${getStageIcon(fam.stage)}
          ${getStageLabel(fam.stage)}
        </span>
      </td>

      <td class="py-3.5 px-4">
        ${nextApt ? `
          <div class="text-xs">
            <div class="font-bold text-warm-900 flex items-center gap-1">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-sage-600"></i>
              ${formatDateShort(nextApt.date)} (${nextApt.time})
            </div>
            <div class="text-warm-600 truncate max-w-[150px] text-[11px]">${nextApt.title}</div>
          </div>
        ` : `
          <span class="text-xs text-warm-600 italic">Sin cita agendada</span>
        `}
      </td>

      <td class="py-3.5 px-4">
        <p class="text-xs text-warm-700 truncate max-w-[160px]" title="${fam.supportNetwork || 'No registrada'}">
          ${fam.supportNetwork || 'No registrada'}
        </p>
      </td>

      <td class="py-3.5 px-4 text-right no-kardex-click">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="openKardexModal('${fam.id}')" class="p-1.5 hover:bg-brand-100 text-brand-600 rounded-lg transition-colors" title="Ver Expediente Kardex 360°">
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
          <button onclick="openAppointmentModalForFamily('${fam.id}')" class="p-1.5 hover:bg-sage-100 text-sage-700 rounded-lg transition-colors" title="Agendar Cita">
            <i data-lucide="calendar-plus" class="w-4 h-4"></i>
          </button>
          <button onclick="openEditFamilyModal('${fam.id}')" class="p-1.5 hover:bg-warm-200 text-warm-700 rounded-lg transition-colors" title="Editar Datos">
            <i data-lucide="edit-2" class="w-4 h-4"></i>
          </button>
          <button onclick="deleteFamilyConfirm('${fam.id}')" class="p-1.5 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors" title="Eliminar">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  lucide.createIcons();
}

// ================= VIEW 2: KANBAN BOARD RENDERER =================
function renderKanban() {
  const colGestacion = document.getElementById("kanbanColGestacion");
  const colTermino = document.getElementById("kanbanColTermino");
  const colPuerperio = document.getElementById("kanbanColPuerperio");
  const colLactancia = document.getElementById("kanbanColLactancia");

  colGestacion.innerHTML = "";
  colTermino.innerHTML = "";
  colPuerperio.innerHTML = "";
  colLactancia.innerHTML = "";

  const list = getFilteredFamilies();

  list.forEach(fam => {
    const obs = getObstetricDetails(fam.fum, fam.fpp);
    const nextApt = getNextAppointment(fam);

    const card = document.createElement("div");
    card.draggable = true;
    card.ondragstart = (e) => handleDragStart(e, fam.id);
    card.className = "bg-white p-3.5 rounded-2xl border border-brand-200/70 shadow-xs hover:shadow-md transition-all cursor-grab active:cursor-grabbing space-y-2.5 group";
    card.onclick = (e) => {
      if (e.target.closest(".no-card-click")) return;
      openKardexModal(fam.id);
    };

    const waNumber = formatPhoneForWA(fam.phone);
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola ${fam.motherName.split(" ")[0]}! 💕 Te saluda Juli de Amarte Maternidad.`)}`;

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-2.5">
          ${fam.photo ? `
            <img src="${fam.photo}" onerror="this.onerror=null; this.src='nina.jpg';" alt="${fam.motherName}" class="w-9 h-9 rounded-xl object-cover shrink-0 border border-brand-200 shadow-xs" />
          ` : `
            <div class="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 font-bold font-heading text-xs flex items-center justify-center shrink-0 border border-brand-200">
              ${fam.motherName.charAt(0)}
            </div>
          `}
          <div>
            <h4 class="font-bold text-sm text-warm-900 group-hover:text-brand-600 transition-colors">
              ${fam.motherName}
            </h4>
            <p class="text-[11px] text-warm-600 font-medium">
              ${fam.partnerName ? `Pareja: ${fam.partnerName}` : 'Mamá gestante'} · <span class="text-brand-600 font-semibold">${fam.babyName || 'Bebé'}</span>
            </p>
          </div>
        </div>
        <a href="${waLink}" target="_blank" class="no-card-click p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors border border-emerald-200 shrink-0" title="WhatsApp">
          <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
        </a>
      </div>

      <!-- Obstetric Badge or Stage details -->
      <div class="flex items-center justify-between text-xs pt-1 border-t border-warm-100">
        ${fam.stage === 'gestacion' || fam.stage === 'termino' ? `
          <span class="font-bold text-brand-700 px-2 py-0.5 rounded-md bg-brand-50 border border-brand-100">
            ${obs.displayWeeks}
          </span>
          <span class="text-[11px] text-warm-600 font-medium">
            FPP: ${obs.fppFormatted}
          </span>
        ` : `
          <span class="font-medium text-warm-700 text-[11px]">
            ${fam.hospital || 'Parto atendido'}
          </span>
          <span class="text-[11px] text-warm-600 font-semibold">
            ${fam.servicePackage ? fam.servicePackage.split(" ")[0] : 'Posparto'}
          </span>
        `}
      </div>

      <!-- Next Appointment Pill -->
      ${nextApt ? `
        <div class="bg-warm-50 p-2 rounded-xl border border-warm-200/60 flex items-center justify-between text-[11px] text-warm-800">
          <span class="flex items-center gap-1 font-semibold text-sage-700 truncate">
            <i data-lucide="calendar" class="w-3 h-3 text-sage-600 shrink-0"></i>
            ${formatDateShort(nextApt.date)} ${nextApt.time}
          </span>
          <span class="text-warm-600 truncate max-w-[90px]">${nextApt.title.split("&")[0]}</span>
        </div>
      ` : `
        <div class="text-[10px] text-warm-600 italic">Sin próxima cita</div>
      `}

      <!-- Actions on Hover -->
      <div class="pt-1 flex items-center justify-between text-xs border-t border-brand-100/50 no-card-click">
        <span class="text-[10px] text-warm-600">
          ${fam.clinicalNotes ? fam.clinicalNotes.length : 0} notas
        </span>
        <div class="flex items-center gap-1">
          <button onclick="openAppointmentModalForFamily('${fam.id}')" class="p-1 hover:bg-sage-50 text-sage-600 rounded" title="Agendar Cita">
            <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i>
          </button>
          <button onclick="openKardexModal('${fam.id}')" class="p-1 hover:bg-brand-50 text-brand-600 rounded font-semibold text-[11px] flex items-center gap-0.5">
            <span>Kardex</span> <i data-lucide="chevron-right" class="w-3 h-3"></i>
          </button>
        </div>
      </div>
    `;

    if (fam.stage === "gestacion") colGestacion.appendChild(card);
    else if (fam.stage === "termino") colTermino.appendChild(card);
    else if (fam.stage === "puerperio") colPuerperio.appendChild(card);
    else if (fam.stage === "lactancia") colLactancia.appendChild(card);
  });

  lucide.createIcons();
}

// Kanban Drag and Drop
function handleDragStart(e, familyId) {
  draggedFamilyId = familyId;
  e.dataTransfer.setData("text/plain", familyId);
}

function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add("drag-over");
}

function handleDragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
}

function handleDrop(e, targetStage) {
  e.preventDefault();
  e.currentTarget.classList.remove("drag-over");
  if (!draggedFamilyId) return;

  const fam = families.find(f => f.id === draggedFamilyId);
  if (fam && fam.stage !== targetStage) {
    fam.stage = targetStage;
    saveData();
    renderCurrentView();
    showToast(`Familia movida a etapa: ${getStageLabel(targetStage)}`);
  }
  draggedFamilyId = null;
}

// ================= VIEW 3: CALENDAR RENDERER =================
function initCalendar() {
  currentCalendarDate = new Date();
}

function prevCalendarMonth() {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
  renderCalendar();
}

function nextCalendarMonth() {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
  renderCalendar();
}

function currentCalendarMonth() {
  currentCalendarDate = new Date();
  renderCalendar();
}

function renderCalendar() {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  document.getElementById("calendarMonthTitle").textContent = `${monthNames[month]} ${year}`;

  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon ...
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  // Previous Month Days (Grayed)
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayCell = document.createElement("div");
    dayCell.className = "p-1.5 min-h-[70px] sm:min-h-[85px] rounded-xl bg-warm-50/50 text-warm-400 text-xs border border-transparent";
    dayCell.innerHTML = `<span class="font-medium">${daysInPrevMonth - i}</span>`;
    grid.appendChild(dayCell);
  }

  // Current Month Days
  for (let day = 1; day <= daysInMonth; day++) {
    const cellDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isToday = isCurrentMonth && today.getDate() === day;

    const dayCell = document.createElement("div");
    dayCell.className = `p-1.5 min-h-[70px] sm:min-h-[85px] rounded-xl border transition-all flex flex-col justify-between cursor-pointer hover:border-brand-300 hover:bg-brand-50/30 ${
      isToday ? 'bg-brand-50/70 border-brand-400 font-bold' : 'bg-white border-brand-100/70'
    }`;
    dayCell.onclick = () => openNewAptForDate(cellDateStr);

    // Header of cell
    let cellHtml = `
      <div class="flex items-center justify-between">
        <span class="text-xs ${isToday ? 'text-brand-600 font-extrabold' : 'text-warm-800 font-semibold'}">${day}</span>
        ${isToday ? '<span class="text-[9px] bg-brand-500 text-white px-1.5 py-0.2 rounded-full font-bold">Hoy</span>' : ''}
      </div>
      <div class="space-y-1 mt-1 overflow-hidden">
    `;

    // Check for FPPs matching this date
    families.forEach(f => {
      const obs = getObstetricDetails(f.fum, f.fpp);
      if (obs.fppIso === cellDateStr && (f.stage === 'gestacion' || f.stage === 'termino')) {
        cellHtml += `
          <div class="px-1.5 py-0.5 rounded-md bg-amberStage-100 text-amberStage-900 border border-amberStage-200 text-[10px] font-bold truncate flex items-center gap-1" title="FPP de ${f.motherName}">
            <span>⭐️ FPP: ${f.motherName.split(" ")[0]}</span>
          </div>
        `;
      }
    });

    // Check for Appointments on this date
    families.forEach(f => {
      if (f.appointments && Array.isArray(f.appointments)) {
        f.appointments.forEach(apt => {
          if (apt.date === cellDateStr) {
            cellHtml += `
              <div class="px-1.5 py-0.5 rounded-md bg-brand-100 text-brand-800 border border-brand-200 text-[10px] font-semibold truncate flex items-center gap-1" title="${apt.title} - ${f.motherName} (${apt.time})">
                <span class="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>
                <span>${apt.time} ${f.motherName.split(" ")[0]}</span>
              </div>
            `;
          }
        });
      }
    });

    cellHtml += `</div>`;
    dayCell.innerHTML = cellHtml;
    grid.appendChild(dayCell);
  }

  // Render Upcoming Appointments Sidebar
  renderUpcomingAppointmentsSidebar();
  lucide.createIcons();
}

function renderUpcomingAppointmentsSidebar() {
  const container = document.getElementById("calendarUpcomingList");
  container.innerHTML = "";

  // Collect all appointments across all families
  const allAppointments = [];
  families.forEach(fam => {
    if (fam.appointments && Array.isArray(fam.appointments)) {
      fam.appointments.forEach(apt => {
        allAppointments.push({
          ...apt,
          familyId: fam.id,
          motherName: fam.motherName,
          phone: fam.phone
        });
      });
    }
  });

  // Sort chronologically
  allAppointments.sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`) - new Date(`${b.date}T${b.time || '00:00'}`));

  const now = new Date();
  now.setHours(0,0,0,0);

  const upcoming = allAppointments.filter(a => new Date(a.date + "T00:00:00") >= now);

  if (upcoming.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-warm-600">
        <i data-lucide="calendar-check" class="w-8 h-8 mx-auto text-warm-400 mb-2"></i>
        <p class="text-xs font-semibold">No hay citas programadas próximamente</p>
      </div>
    `;
    return;
  }

  upcoming.slice(0, 8).forEach(apt => {
    const waNumber = formatPhoneForWA(apt.phone);
    const reminderMsg = `¡Hola ${apt.motherName.split(" ")[0]}! 💕 Te saluda Juli de Amarte Maternidad. Te recuerdo con mucho cariño nuestra sesión de *${apt.title}* programada para el *${formatDateLong(apt.date)}* a las *${apt.time}*. ¡Nos vemos pronto!`;
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(reminderMsg)}`;

    const card = document.createElement("div");
    card.className = "p-3 rounded-xl bg-warm-50 border border-brand-200/60 hover:bg-white transition-all space-y-1.5";
    card.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div>
          <h5 class="font-bold text-xs text-warm-900">${apt.title}</h5>
          <p class="text-[11px] text-warm-600 font-medium">Familia: <span class="font-bold text-brand-700">${apt.motherName}</span></p>
        </div>
        <span class="text-[10px] px-2 py-0.5 rounded-md font-bold bg-sage-100 text-sage-800 border border-sage-200">
          ${apt.time}
        </span>
      </div>

      <div class="flex items-center justify-between text-[11px] pt-1 text-warm-700">
        <span class="flex items-center gap-1 font-semibold text-brand-600">
          <i data-lucide="clock" class="w-3 h-3"></i> ${formatDateShort(apt.date)}
        </span>
        <a href="${waLink}" target="_blank" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-[10px] transition-colors" title="Enviar recordatorio por WhatsApp">
          <i data-lucide="send" class="w-3 h-3 text-emerald-600"></i> Recordatorio
        </a>
      </div>
      ${apt.notes ? `<p class="text-[10px] text-warm-600 italic truncate">${apt.notes}</p>` : ''}
    `;
    container.appendChild(card);
  });
}

function openNewAptForDate(dateStr) {
  openAppointmentModal();
  const dateInput = document.getElementById("formAptDate");
  if (dateInput) dateInput.value = dateStr;
}

// ================= MODAL 1: REGISTRAR / EDITAR FAMILIA =================
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result;
    setPhotoPreview(base64);
  };
  reader.readAsDataURL(file);
}

function setPhotoPreview(photoUrl) {
  const hiddenInput = document.getElementById("formPhoto");
  const preview = document.getElementById("formPhotoPreview");
  const clearBtn = document.getElementById("clearPhotoBtn");
  
  if (photoUrl) {
    if (hiddenInput) hiddenInput.value = photoUrl;
    if (preview) preview.innerHTML = `<img src="${photoUrl}" class="w-full h-full object-cover" alt="Preview" />`;
    if (clearBtn) clearBtn.classList.remove("hidden");
  } else {
    if (hiddenInput) hiddenInput.value = "";
    if (preview) preview.innerHTML = `<i data-lucide="image" class="w-5 h-5 text-warm-400"></i>`;
    if (clearBtn) clearBtn.classList.add("hidden");
    const fileInput = document.getElementById("formPhotoFile");
    if (fileInput) fileInput.value = "";
    lucide.createIcons();
  }
}

function clearPhotoInput() {
  setPhotoPreview("");
}

function openFamilyModal() {
  document.getElementById("familyForm").reset();
  document.getElementById("formFamilyId").value = "";
  document.getElementById("familyModalTitle").textContent = "Registrar Nueva Familia";
  document.getElementById("saveFamilyBtnText").textContent = "Guardar Expediente";
  document.getElementById("calcWeeksDisplay").textContent = "Ingresa FUM o FPP para calcular";
  document.getElementById("calcStageSuggestedBadge").textContent = "Pendiente";
  setPhotoPreview("");
  document.getElementById("familyModal").classList.remove("hidden");
  lucide.createIcons();
}

function openFamilyModalWithStage(stage) {
  openFamilyModal();
  const stageSelect = document.getElementById("formStage");
  if (stageSelect) stageSelect.value = stage;
}

function openEditFamilyModal(id) {
  const fam = families.find(f => f.id === id);
  if (!fam) return;

  document.getElementById("formFamilyId").value = fam.id;
  document.getElementById("familyModalTitle").textContent = `Editar Expediente: ${fam.motherName}`;
  document.getElementById("saveFamilyBtnText").textContent = "Actualizar Expediente";

  document.getElementById("formMotherName").value = fam.motherName || "";
  document.getElementById("formPartnerName").value = fam.partnerName || "";
  document.getElementById("formBabyName").value = fam.babyName || "";
  document.getElementById("formContactChannel").value = fam.contactChannel || "whatsapp";
  document.getElementById("formPhone").value = fam.phone || "";
  document.getElementById("formFum").value = fam.fum || "";
  document.getElementById("formFpp").value = fam.fpp || "";
  document.getElementById("formStage").value = fam.stage || "gestacion";
  document.getElementById("formServicePackage").value = fam.servicePackage || "Acompañamiento Integral Doula & Parto";
  document.getElementById("formHospital").value = fam.hospital || "";
  document.getElementById("formTotalFee").value = fam.totalFee !== undefined ? fam.totalFee : 200000;
  document.getElementById("formSupportNetwork").value = fam.supportNetwork || "";
  document.getElementById("formNotes").value = fam.notes || "";
  setPhotoPreview(fam.photo || "");

  updateModalGestationalPreview(fam.fum, fam.fpp);
  document.getElementById("familyModal").classList.remove("hidden");
  lucide.createIcons();
}

function closeFamilyModal() {
  document.getElementById("familyModal").classList.add("hidden");
}

function saveFamily(e) {
  e.preventDefault();
  const id = document.getElementById("formFamilyId").value;
  const motherName = document.getElementById("formMotherName").value.trim();
  const partnerName = document.getElementById("formPartnerName").value.trim();
  const babyName = document.getElementById("formBabyName").value.trim();
  const contactChannel = document.getElementById("formContactChannel").value;
  const phone = document.getElementById("formPhone").value.trim();
  const photo = document.getElementById("formPhoto") ? document.getElementById("formPhoto").value : "";
  const fum = document.getElementById("formFum").value;
  const fpp = document.getElementById("formFpp").value;
  const stage = document.getElementById("formStage").value;
  const servicePackage = document.getElementById("formServicePackage").value;
  const hospital = document.getElementById("formHospital").value.trim();
  const totalFee = parseFloat(document.getElementById("formTotalFee").value) || 200000;
  const supportNetwork = document.getElementById("formSupportNetwork").value.trim();
  const notes = document.getElementById("formNotes").value.trim();

  if (id) {
    // Edit existing
    const fam = families.find(f => f.id === id);
    if (fam) {
      fam.motherName = motherName;
      fam.partnerName = partnerName;
      fam.babyName = babyName;
      fam.contactChannel = contactChannel;
      fam.phone = phone;
      fam.photo = photo;
      fam.fum = fum;
      fam.fpp = fpp;
      fam.stage = stage;
      fam.servicePackage = servicePackage;
      fam.hospital = hospital;
      fam.totalFee = totalFee;
      fam.supportNetwork = supportNetwork;
      fam.notes = notes;
      showToast(`Expediente de ${motherName} actualizado.`);
    }
  } else {
    // Create new
    const newId = "fam-" + Date.now();
    const newFamily = {
      id: newId,
      motherName,
      partnerName,
      babyName,
      contactChannel,
      phone,
      photo,
      fum,
      fpp,
      stage,
      servicePackage,
      hospital,
      totalFee,
      payments: [],
      supportNetwork,
      notes,
      clinicalNotes: [
        {
          id: "note-" + Date.now(),
          date: new Date().toISOString().split("T")[0],
          text: "Apertura de Kardex Virtual y valoración inicial.",
          tag: "Preparación"
        }
      ],
      appointments: [],
      createdAt: new Date().toISOString().split("T")[0]
    };
    families.unshift(newFamily);
    showToast(`Familia ${motherName} registrada con éxito.`);
  }

  saveData();
  closeFamilyModal();
  renderCurrentView();
}

function deleteFamilyConfirm(id) {
  const fam = families.find(f => f.id === id);
  if (!fam) return;
  if (confirm(`¿Estás segura de eliminar el expediente completo de "${fam.motherName}"? Esta acción no se puede deshacer.`)) {
    families = families.filter(f => f.id !== id);
    saveData();
    renderCurrentView();
    showToast(`Expediente eliminado.`);
    if (currentKardexFamilyId === id) {
      closeKardexModal();
    }
  }
}

// ================= MODAL 2: EXPEDIENTE KARDEX 360° =================
function openKardexModal(familyId, defaultTab = "resumen") {
  currentKardexFamilyId = familyId;
  const fam = families.find(f => f.id === familyId);
  if (!fam) return;

  const obs = getObstetricDetails(fam.fum, fam.fpp);

  // Header Elements (Avatar & Name)
  const avatarEl = document.getElementById("kardexHeaderAvatar");
  if (avatarEl) {
    if (fam.photo) {
      avatarEl.innerHTML = `<img src="${fam.photo}" onerror="this.onerror=null; this.src='nina.jpg';" alt="${fam.motherName}" class="w-full h-full object-cover" />`;
      avatarEl.className = "w-14 h-14 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-brand-200";
    } else {
      avatarEl.innerHTML = fam.motherName.charAt(0);
      avatarEl.className = "w-12 h-12 rounded-2xl bg-brand-500 text-white font-heading font-bold text-xl flex items-center justify-center shadow-sm shrink-0";
    }
  }

  const nameEl = document.getElementById("kardexHeaderName");
  if (nameEl) nameEl.textContent = fam.motherName;

  const subtitleEl = document.getElementById("kardexHeaderSubtitle");
  if (subtitleEl) subtitleEl.textContent = `Mamá: ${fam.motherName} ${fam.partnerName ? `· Pareja: ${fam.partnerName}` : ''} · Bebé: ${fam.babyName || 'En camino'}`;
  
  const stageBadge = document.getElementById("kardexHeaderStageBadge");
  if (stageBadge) {
    stageBadge.textContent = `${getStageIcon(fam.stage)} ${getStageLabel(fam.stage)}`;
    stageBadge.className = `px-2.5 py-0.5 rounded-full text-xs font-bold ${getStageBadgeClasses(fam.stage)}`;
  }

  // WhatsApp Button Link
  const waNumber = formatPhoneForWA(fam.phone);
  const waBtn = document.getElementById("kardexWhatsappBtn");
  if (waBtn) waBtn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola ${fam.motherName.split(" ")[0]}! 💕 Te saluda Juli de Amarte Maternidad.`)}`;

  // Tab 1: General & Obstetric values (safe element setters)
  const setElText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = (val !== undefined && val !== null) ? val : "";
  };

  setElText("kdWeeks", obs.displayWeeks);
  setElText("kdTrimester", obs.trimester);
  setElText("kdFpp", obs.fppFormatted);
  setElText("kdDaysRemaining", obs.daysRemaining > 0 ? `Faltan ~${obs.daysRemaining} días` : (obs.daysRemaining === 0 ? '¡Fecha hoy!' : `Pasaron ${Math.abs(obs.daysRemaining)} días`));
  setElText("kdFum", obs.fumFormatted);
  setElText("kdHospital", fam.hospital || "No especificado");
  setElText("kdHospitalDetail", fam.hospital || "Por confirmar");
  setElText("kdService", fam.servicePackage || "Acompañamiento Doula");
  setElText("kdProgressPct", `${obs.progressPct}%`);
  
  const progBar = document.getElementById("kdProgressBar");
  if (progBar) progBar.style.width = `${obs.progressPct}%`;

  setElText("kdContact", `${(fam.contactChannel || 'whatsapp').toUpperCase()}: +506 ${fam.phone || 'N/D'}`);
  setElText("kdPartner", fam.partnerName || "No registrado");
  setElText("kdSupport", fam.supportNetwork || "Sin red de apoyo especificada aún.");
  setElText("kdNotesGeneral", fam.notes || "Sin notas generales registradas.");

  // Render Tabs Counts & Content
  const aptCountEl = document.getElementById("kardexAptCount");
  if (aptCountEl) aptCountEl.textContent = fam.appointments ? fam.appointments.length : 0;
  
  const notesCountEl = document.getElementById("kardexNotesCount");
  if (notesCountEl) notesCountEl.textContent = fam.clinicalNotes ? fam.clinicalNotes.length : 0;
  
  resetClinicalNoteForm();
  renderKardexAppointments(fam);
  renderKardexNotes(fam);
  renderKardexPayments(fam);
  renderKardexWeekGuide(obs.weeks);

  // Switch to requested tab
  switchKardexTab(defaultTab || "resumen");

  const modalEl = document.getElementById("kardexDetailModal");
  if (modalEl) modalEl.classList.remove("hidden");
  lucide.createIcons();
}

function closeKardexModal() {
  const modalEl = document.getElementById("kardexDetailModal");
  if (modalEl) modalEl.classList.add("hidden");
  currentKardexFamilyId = null;
}

function switchKardexTab(tabName) {
  const tabs = {
    resumen: { btn: document.getElementById("ktabResumen"), pane: document.getElementById("kardexTabResumen") },
    citas: { btn: document.getElementById("ktabCitas"), pane: document.getElementById("kardexTabCitas") },
    notas: { btn: document.getElementById("ktabNotas"), pane: document.getElementById("kardexTabNotas") },
    finanzas: { btn: document.getElementById("ktabFinanzas"), pane: document.getElementById("kardexTabFinanzas") },
    guia: { btn: document.getElementById("ktabGuia"), pane: document.getElementById("kardexTabGuia") }
  };

  Object.keys(tabs).forEach(key => {
    if (tabs[key] && tabs[key].btn && tabs[key].pane) {
      if (key === tabName) {
        tabs[key].btn.className = "px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white text-brand-700 shadow-xs border border-brand-200/50 shrink-0";
        tabs[key].pane.classList.remove("hidden");
      } else {
        tabs[key].btn.className = "px-3.5 py-1.5 text-xs font-bold rounded-lg text-warm-700 hover:text-brand-600 hover:bg-white shrink-0";
        tabs[key].pane.classList.add("hidden");
      }
    }
  });
  lucide.createIcons();
}

function renderKardexAppointments(fam) {
  const container = document.getElementById("kardexAppointmentsList");
  container.innerHTML = "";

  if (!fam.appointments || fam.appointments.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-warm-600 bg-warm-50 rounded-2xl">
        <p class="text-xs font-semibold">No hay citas registradas para esta familia.</p>
        <button onclick="openAppointmentModalForCurrentFamily()" class="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i> Programar primera sesión
        </button>
      </div>
    `;
    return;
  }

  // Sort chronological
  fam.appointments.sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`) - new Date(`${b.date}T${b.time || '00:00'}`));

  fam.appointments.forEach((apt, idx) => {
    const waNumber = formatPhoneForWA(fam.phone);
    const reminderMsg = `¡Hola ${fam.motherName.split(" ")[0]}! 💕 Te saluda Juli de Amarte Maternidad. Te recuerdo nuestra cita de *${apt.title}* para el *${formatDateLong(apt.date)}* a las *${apt.time}*.`;
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(reminderMsg)}`;

    const isPast = new Date(apt.date + "T23:59:59") < new Date();

    const div = document.createElement("div");
    div.className = `p-3.5 rounded-2xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
      isPast ? 'bg-warm-50/70 border-brand-100 text-warm-600' : 'bg-white border-brand-200 shadow-xs'
    }`;

    div.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-xl ${isPast ? 'bg-warm-200 text-warm-700' : 'bg-brand-50 text-brand-600'} flex items-center justify-center font-bold text-sm shrink-0">
          <i data-lucide="${isPast ? 'check-circle' : 'calendar'}" class="w-5 h-5"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h5 class="font-bold text-xs sm:text-sm text-warm-900">${apt.title}</h5>
            <span class="text-[10px] px-2 py-0.5 rounded-md font-semibold ${isPast ? 'bg-warm-200 text-warm-700' : 'bg-sage-100 text-sage-800'}">
              ${isPast ? 'Realizada' : 'Programada'}
            </span>
          </div>
          <p class="text-xs text-warm-600 mt-0.5">
            📅 ${formatDateLong(apt.date)} · ⏰ ${apt.time}
          </p>
          ${apt.notes ? `<p class="text-xs text-warm-800 font-medium mt-1 bg-warm-100/60 px-2 py-1 rounded-lg">📍 ${apt.notes}</p>` : ''}
        </div>
      </div>

      <div class="flex items-center gap-2 no-print">
        ${!isPast ? `
          <a href="${waLink}" target="_blank" class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-1 border border-emerald-200">
            <i data-lucide="send" class="w-3.5 h-3.5"></i> Recordar
          </a>
        ` : ''}
        <button onclick="deleteAppointment('${fam.id}', '${apt.id}')" class="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg text-xs" title="Eliminar cita">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;

    container.appendChild(div);
  });
}

// ================= TAB 3: BITÁCORA DE SESIONES & MATERIALES =================

function appendMaterialChip(chipText) {
  const input = document.getElementById("newNoteMaterials");
  if (!input) return;
  const current = input.value.trim();
  if (!current) {
    input.value = chipText;
  } else if (!current.toLowerCase().includes(chipText.toLowerCase())) {
    input.value = current + ", " + chipText;
  }
  input.focus();
}

function resetClinicalNoteForm() {
  const form = document.getElementById("clinicalNoteForm");
  if (form) form.reset();
  
  const idInput = document.getElementById("noteFormId");
  if (idInput) idInput.value = "";

  const dateInput = document.getElementById("newNoteDate");
  if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];

  const badge = document.getElementById("noteEditingBadge");
  if (badge) badge.classList.add("hidden");

  const cancelBtn = document.getElementById("cancelEditNoteBtn");
  if (cancelBtn) cancelBtn.classList.add("hidden");

  const btnText = document.getElementById("saveNoteBtnText");
  if (btnText) btnText.textContent = "Guardar Entrada en Bitácora";

  const titleHeader = document.getElementById("noteFormHeaderTitle");
  if (titleHeader) titleHeader.innerHTML = `<i data-lucide="book-open" class="w-4 h-4"></i> Bitácora de Sesión: Contenidos & Materiales`;

  lucide.createIcons();
}

function getTagBadgeStyle(tag) {
  switch (tag) {
    case "Preparación al Parto":
    case "Preparación":
      return "bg-brand-100 text-brand-800 border-brand-200";
    case "Biomecánica & Masaje":
    case "Biomecánica":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Medidas de Confort & Rebozo":
      return "bg-amber-100 text-amber-900 border-amber-200";
    case "Plan de Parto & Derechos":
    case "Plan de Parto":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Lactancia Materna":
    case "Lactancia":
      return "bg-rose-100 text-rose-800 border-rose-200";
    case "Soporte Emocional & Miedos":
    case "Emocional":
      return "bg-teal-100 text-teal-800 border-teal-200";
    case "Visita Posparto & Cuidados":
    case "Posparto":
      return "bg-lavender-100 text-lavender-800 border-lavender-200";
    case "Sesión Intensiva":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Alerta / Valoración Médica":
    case "Alerta":
      return "bg-rose-100 text-rose-800 border-rose-300 font-bold";
    default:
      return "bg-warm-100 text-warm-800 border-warm-200";
  }
}

function renderKardexNotes(fam) {
  const container = document.getElementById("kardexNotesList");
  container.innerHTML = "";

  if (!fam.clinicalNotes || fam.clinicalNotes.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-warm-600 bg-warm-50 rounded-2xl border border-dashed border-brand-200">
        <div class="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-2">
          <i data-lucide="book-open" class="w-5 h-5"></i>
        </div>
        <p class="text-xs font-bold text-warm-800">No hay entradas en la bitácora aún.</p>
        <p class="text-[11px] text-warm-500 mt-0.5">Usa el formulario superior para registrar la primera sesión y los materiales compartidos.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  // Show notes sorted by date descending (newest first)
  const sortedNotes = [...fam.clinicalNotes].sort((a, b) => new Date(b.date || '2000-01-01') - new Date(a.date || '2000-01-01'));

  sortedNotes.forEach(n => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 sm:p-5 rounded-2xl border border-brand-200 shadow-xs space-y-3 hover:border-brand-300 transition-all";
    
    div.innerHTML = `
      <!-- Card Header -->
      <div class="flex items-start justify-between gap-3">
        <div class="space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2.5 py-0.5 rounded-md font-bold text-[11px] border ${getTagBadgeStyle(n.tag)}">
              ${n.tag || 'General'}
            </span>
            <span class="text-xs font-semibold text-warm-600 flex items-center gap-1">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-sage-600"></i>
              ${formatDateLong(n.date)}
            </span>
          </div>
          <h5 class="text-sm sm:text-base font-bold text-warm-900">${n.title || 'Nota de Seguimiento'}</h5>
        </div>
        
        <div class="flex items-center gap-1.5 no-print shrink-0">
          <button onclick="editClinicalNote('${fam.id}', '${n.id}')" class="p-1.5 rounded-lg text-warm-600 hover:text-brand-600 hover:bg-brand-50 border border-warm-200/60 hover:border-brand-200 transition-all" title="Editar entrada de bitácora">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button onclick="deleteClinicalNote('${fam.id}', '${n.id}')" class="p-1.5 rounded-lg text-warm-400 hover:text-rose-600 hover:bg-rose-50 border border-warm-200/60 hover:border-rose-200 transition-all" title="Eliminar entrada">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- Content Text -->
      <div class="text-xs sm:text-sm text-warm-800 leading-relaxed whitespace-pre-line bg-warm-50/50 p-3.5 rounded-xl border border-brand-100/60">
        ${n.text}
      </div>

      <!-- Materials Box (if any) -->
      ${n.materials ? `
        <div class="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80 flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <i data-lucide="package-check" class="w-4 h-4"></i>
          </div>
          <div class="flex-1 text-xs">
            <span class="font-bold text-emerald-900 block mb-0.5">📦 Materiales & Recursos Entregados / Recomendados:</span>
            <p class="text-emerald-800 font-medium">${n.materials}</p>
          </div>
        </div>
      ` : ''}

      <!-- Agreements Box (if any) -->
      ${n.agreements ? `
        <div class="bg-amberStage-50/70 p-3 rounded-xl border border-amberStage-200/80 flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-amberStage-100 text-amberStage-800 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <i data-lucide="check-square" class="w-4 h-4"></i>
          </div>
          <div class="flex-1 text-xs">
            <span class="font-bold text-amberStage-900 block mb-0.5">🤝 Acuerdos & Prácticas para Casa:</span>
            <p class="text-amberStage-800 font-medium">${n.agreements}</p>
          </div>
        </div>
      ` : ''}
    `;

    container.appendChild(div);
  });

  lucide.createIcons();
}

function saveClinicalNote(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (!currentKardexFamilyId) return;

  const fam = families.find(f => f.id === currentKardexFamilyId);
  if (!fam) return;

  const noteId = document.getElementById("noteFormId") ? document.getElementById("noteFormId").value : "";
  const date = (document.getElementById("newNoteDate") && document.getElementById("newNoteDate").value) || new Date().toISOString().split("T")[0];
  const tag = (document.getElementById("newNoteTag") && document.getElementById("newNoteTag").value) || "Preparación al Parto";
  const rawTitle = document.getElementById("newNoteTitle") ? document.getElementById("newNoteTitle").value.trim() : "";
  const title = rawTitle || `${tag} (${formatDateShort(date)})`;
  const text = document.getElementById("newNoteText") ? document.getElementById("newNoteText").value.trim() : "";
  const materials = document.getElementById("newNoteMaterials") ? document.getElementById("newNoteMaterials").value.trim() : "";
  const agreements = document.getElementById("newNoteAgreements") ? document.getElementById("newNoteAgreements").value.trim() : "";

  if (!text) {
    showToast("⚠️ Por favor escribe las notas o contenidos de la sesión.");
    const textEl = document.getElementById("newNoteText");
    if (textEl) textEl.focus();
    return;
  }

  if (!fam.clinicalNotes) fam.clinicalNotes = [];

  if (noteId) {
    // Edit existing note
    const existingIndex = fam.clinicalNotes.findIndex(n => n.id === noteId);
    if (existingIndex !== -1) {
      fam.clinicalNotes[existingIndex] = {
        ...fam.clinicalNotes[existingIndex],
        date,
        tag,
        title,
        text,
        materials,
        agreements,
        updatedAt: new Date().toISOString()
      };
      showToast("✅ Entrada de bitácora actualizada con éxito.");
    } else {
      fam.clinicalNotes.push({
        id: noteId,
        date,
        tag,
        title,
        text,
        materials,
        agreements,
        createdAt: new Date().toISOString()
      });
      showToast("✅ Entrada guardada en la bitácora.");
    }
  } else {
    // Create new note
    const newNote = {
      id: "note-" + Date.now(),
      date,
      tag,
      title,
      text,
      materials,
      agreements,
      createdAt: new Date().toISOString()
    };
    fam.clinicalNotes.push(newNote);
    showToast("✅ Nueva entrada guardada en la bitácora.");
  }

  saveData();
  resetClinicalNoteForm();
  renderKardexNotes(fam);
  const countEl = document.getElementById("kardexNotesCount");
  if (countEl) countEl.textContent = fam.clinicalNotes.length;
  lucide.createIcons();
}

function editClinicalNote(familyId, noteId) {
  const fam = families.find(f => f.id === familyId);
  if (!fam || !fam.clinicalNotes) return;

  const note = fam.clinicalNotes.find(n => n.id === noteId);
  if (!note) return;

  // Ensure Tab 3 is active
  switchKardexTab("notas");

  // Populate fields
  const idInput = document.getElementById("noteFormId");
  if (idInput) idInput.value = note.id;

  const dateInput = document.getElementById("newNoteDate");
  if (dateInput) dateInput.value = note.date || new Date().toISOString().split("T")[0];

  const tagInput = document.getElementById("newNoteTag");
  if (tagInput) tagInput.value = note.tag || "Preparación al Parto";

  const titleInput = document.getElementById("newNoteTitle");
  if (titleInput) titleInput.value = note.title || "";

  const textInput = document.getElementById("newNoteText");
  if (textInput) textInput.value = note.text || "";

  const materialsInput = document.getElementById("newNoteMaterials");
  if (materialsInput) materialsInput.value = note.materials || "";

  const agreementsInput = document.getElementById("newNoteAgreements");
  if (agreementsInput) agreementsInput.value = note.agreements || "";

  // Switch UI to edit mode
  const badge = document.getElementById("noteEditingBadge");
  if (badge) badge.classList.remove("hidden");

  const cancelBtn = document.getElementById("cancelEditNoteBtn");
  if (cancelBtn) cancelBtn.classList.remove("hidden");

  const btnText = document.getElementById("saveNoteBtnText");
  if (btnText) btnText.textContent = "Actualizar Entrada";

  const titleHeader = document.getElementById("noteFormHeaderTitle");
  if (titleHeader) titleHeader.innerHTML = `<i data-lucide="edit-3" class="w-4 h-4 text-amberStage-600"></i> Editando: ${note.title || note.tag || 'Sesión'}`;

  // Scroll to form smoothly
  const formEl = document.getElementById("clinicalNoteForm");
  if (formEl) formEl.scrollIntoView({ behavior: "smooth", block: "start" });
  if (textInput) textInput.focus();
  lucide.createIcons();
}

function cancelEditClinicalNote() {
  resetClinicalNoteForm();
  showToast("Edición cancelada.");
}

function deleteClinicalNote(familyId, noteId) {
  const fam = families.find(f => f.id === familyId);
  if (!fam || !fam.clinicalNotes) return;

  if (confirm("¿Deseas eliminar esta entrada de la bitácora?")) {
    fam.clinicalNotes = fam.clinicalNotes.filter(n => n.id !== noteId);
    saveData();
    resetClinicalNoteForm();
    renderKardexNotes(fam);
    document.getElementById("kardexNotesCount").textContent = fam.clinicalNotes.length;
    showToast("Entrada eliminada.");
    lucide.createIcons();
  }
}

function renderKardexWeekGuide(weeks) {
  const guide = getWeekGuide(weeks);
  document.getElementById("guideWeekTitle").textContent = `Semana ${weeks > 0 ? weeks : 34} de Gestación`;
  document.getElementById("guideFruitSize").textContent = `Tamaño aproximado: ${guide.fruit}`;
  document.getElementById("guideBabyDev").textContent = guide.baby;
  document.getElementById("guideMomDev").textContent = guide.mom;
  document.getElementById("guideDoulaTips").textContent = guide.doula;
}

function editCurrentKardexFamily() {
  if (!currentKardexFamilyId) return;
  const famId = currentKardexFamilyId;
  closeKardexModal();
  openEditFamilyModal(famId);
}

// ================= MODAL 3: AGENDAR CITAS =================
function openAppointmentModal() {
  populateFamilySelector();
  document.getElementById("appointmentForm").reset();
  document.getElementById("formAptId").value = "";
  
  // Set default date to tomorrow and time to 10:00
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById("formAptDate").value = tomorrow.toISOString().split("T")[0];
  document.getElementById("formAptTime").value = "10:00";

  document.getElementById("appointmentModal").classList.remove("hidden");
  lucide.createIcons();
}

function openAppointmentModalForFamily(familyId) {
  openAppointmentModal();
  const select = document.getElementById("formAptFamilyId");
  if (select) select.value = familyId;
}

function openAppointmentModalForCurrentFamily() {
  if (currentKardexFamilyId) {
    openAppointmentModalForFamily(currentKardexFamilyId);
  } else {
    openAppointmentModal();
  }
}

function closeAppointmentModal() {
  document.getElementById("appointmentModal").classList.add("hidden");
}

function populateFamilySelector() {
  const select = document.getElementById("formAptFamilyId");
  select.innerHTML = "";
  families.forEach(f => {
    const opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = `${f.motherName} (${getStageLabel(f.stage)})`;
    select.appendChild(opt);
  });
}

function saveAppointment(e) {
  e.preventDefault();
  const familyId = document.getElementById("formAptFamilyId").value;
  const date = document.getElementById("formAptDate").value;
  const time = document.getElementById("formAptTime").value;
  const title = document.getElementById("formAptTitle").value;
  const notes = document.getElementById("formAptNotes").value.trim();

  const fam = families.find(f => f.id === familyId);
  if (!fam) return;

  if (!fam.appointments) fam.appointments = [];

  const newApt = {
    id: "apt-" + Date.now(),
    date,
    time,
    title,
    notes,
    status: "pendiente"
  };

  fam.appointments.push(newApt);
  saveData();
  closeAppointmentModal();
  renderCurrentView();

  if (currentKardexFamilyId === familyId) {
    renderKardexAppointments(fam);
    document.getElementById("kardexAptCount").textContent = fam.appointments.length;
  }

  showToast(`Cita agendada para ${fam.motherName}.`);
}

function deleteAppointment(familyId, aptId) {
  const fam = families.find(f => f.id === familyId);
  if (!fam || !fam.appointments) return;

  if (confirm("¿Deseas cancelar y eliminar esta cita?")) {
    fam.appointments = fam.appointments.filter(a => a.id !== aptId);
    saveData();
    renderCurrentView();
    if (currentKardexFamilyId === familyId) {
      renderKardexAppointments(fam);
      document.getElementById("kardexAptCount").textContent = fam.appointments.length;
    }
    showToast("Cita eliminada.");
    lucide.createIcons();
  }
}

// ================= VIEW 4: ACCOUNTING & PAYMENTS RENDERER =================
function renderAccounting() {
  const tbody = document.getElementById("accountingTableBody");
  const transactionsContainer = document.getElementById("accountingTransactionsList");
  tbody.innerHTML = "";
  transactionsContainer.innerHTML = "";

  let totalContracted = 0;
  let totalPaid = 0;
  const allTransactions = [];

  families.forEach(fam => {
    const fee = parseFloat(fam.totalFee) || 0;
    totalContracted += fee;

    let famPaid = 0;
    if (fam.payments && Array.isArray(fam.payments)) {
      fam.payments.forEach(p => {
        const amt = parseFloat(p.amount) || 0;
        famPaid += amt;
        allTransactions.push({
          ...p,
          familyId: fam.id,
          motherName: fam.motherName,
          phone: fam.phone
        });
      });
    }
    totalPaid += famPaid;
    const famPending = Math.max(0, fee - famPaid);

    // Determine payment status badge
    let statusBadge = "";
    if (famPaid >= fee && fee > 0) {
      statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <i data-lucide="check-circle-2" class="w-3 h-3"></i> Pagado 100%
      </span>`;
    } else if (famPaid > 0) {
      statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amberStage-100 text-amberStage-800 border border-amberStage-200">
        <i data-lucide="clock" class="w-3 h-3"></i> Abono Parcial (${Math.round((famPaid / (fee || 1)) * 100)}%)
      </span>`;
    } else {
      statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
        <i data-lucide="alert-circle" class="w-3 h-3"></i> Pendiente
      </span>`;
    }

    const tr = document.createElement("tr");
    tr.className = "hover:bg-brand-50/40 transition-colors";
    tr.innerHTML = `
      <td class="py-3.5 px-4">
        <div class="flex items-center gap-2.5">
          ${fam.photo ? `
            <img src="${fam.photo}" onerror="this.onerror=null; this.src='nina.jpg';" alt="${fam.motherName}" class="w-8 h-8 rounded-xl object-cover shrink-0 border border-brand-200 shadow-xs" />
          ` : `
            <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold font-heading text-xs flex items-center justify-center shrink-0">
              ${fam.motherName.charAt(0)}
            </div>
          `}
          <div>
            <div class="font-bold text-warm-900">${fam.motherName}</div>
            <div class="text-[11px] text-warm-600 font-medium">${fam.phone || 'Sin tel'}</div>
          </div>
        </div>
      </td>

      <td class="py-3.5 px-4">
        <div class="text-xs font-semibold text-warm-800">${fam.servicePackage || 'Acompañamiento Doula'}</div>
        <div class="text-[11px] text-brand-700 font-medium">📍 ${fam.hospital || 'Por confirmar'}</div>
      </td>

      <td class="py-3.5 px-4 text-right font-bold text-warm-900 text-xs sm:text-sm">
        ${formatColones(fee)}
      </td>

      <td class="py-3.5 px-4 text-right font-bold text-emerald-700 text-xs sm:text-sm">
        ${formatColones(famPaid)}
      </td>

      <td class="py-3.5 px-4 text-right font-bold ${famPending > 0 ? 'text-amberStage-700' : 'text-warm-500'} text-xs sm:text-sm">
        ${formatColones(famPending)}
      </td>

      <td class="py-3.5 px-4 text-center">
        ${statusBadge}
      </td>

      <td class="py-3.5 px-4 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="openPaymentModalForFamily('${fam.id}')" class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors" title="Registrar Abono">
            <i data-lucide="plus" class="w-3 h-3"></i> Abono
          </button>
          <button onclick="openKardexModal('${fam.id}')" class="p-1 hover:bg-brand-100 text-brand-600 rounded-lg transition-colors" title="Ver Expediente">
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  const totalPending = Math.max(0, totalContracted - totalPaid);
  const collectionRate = totalContracted > 0 ? Math.round((totalPaid / totalContracted) * 100) : 0;

  // Update Summary KPI Cards
  document.getElementById("finTotalContracted").textContent = formatColones(totalContracted);
  document.getElementById("finTotalPaid").textContent = formatColones(totalPaid);
  document.getElementById("finTotalPending").textContent = formatColones(totalPending);
  document.getElementById("finCollectionRate").textContent = `${collectionRate}% recaudado`;
  document.getElementById("finProgressText").textContent = `${collectionRate}%`;
  document.getElementById("finProgressBar").style.width = `${collectionRate}%`;

  // Render Transaction Ledger
  if (allTransactions.length === 0) {
    transactionsContainer.innerHTML = `
      <div class="p-6 text-center text-warm-600 bg-warm-50 rounded-xl">
        <i data-lucide="receipt" class="w-7 h-7 mx-auto text-warm-400 mb-1.5"></i>
        <p class="text-xs font-semibold">No se han registrado abonos aún.</p>
        <p class="text-[11px] text-warm-500 mt-0.5">Usa el botón "Registrar Abono / Pago" cuando una mamá te realice un pago.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  // Sort transactions by date descending
  allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  allTransactions.forEach(t => {
    const div = document.createElement("div");
    div.className = "p-3 bg-warm-50 rounded-xl border border-warm-200/60 flex flex-wrap items-center justify-between gap-3 text-xs";
    div.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
          <i data-lucide="badge-dollar-sign" class="w-5 h-5"></i>
        </div>
        <div>
          <div class="font-bold text-warm-900">${t.motherName} · <span class="text-emerald-700 font-extrabold text-sm">${formatColones(t.amount)}</span></div>
          <div class="text-[11px] text-warm-600">
            📅 ${formatDateLong(t.date)} · <span class="font-semibold text-warm-800">${t.method || 'SINPE Móvil'}</span>
          </div>
          ${t.notes ? `<div class="text-[10px] text-warm-700 bg-white px-2 py-0.5 rounded border border-warm-200/50 mt-1 inline-block">${t.notes}</div>` : ''}
        </div>
      </div>

      <button onclick="deletePayment('${t.familyId}', '${t.id}')" class="text-warm-400 hover:text-rose-500 p-1 rounded" title="Eliminar este abono">
        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
      </button>
    `;
    transactionsContainer.appendChild(div);
  });

  lucide.createIcons();
}

function renderKardexPayments(fam) {
  const container = document.getElementById("kardexPaymentsList");
  if (!container) return;
  container.innerHTML = "";

  const fee = parseFloat(fam.totalFee) || 0;
  let famPaid = 0;

  if (fam.payments && Array.isArray(fam.payments)) {
    fam.payments.forEach(p => {
      famPaid += (parseFloat(p.amount) || 0);
    });
  }

  const famPending = Math.max(0, fee - famPaid);
  const famRate = fee > 0 ? Math.min(100, Math.round((famPaid / fee) * 100)) : 0;

  // Update tab cards
  const finTotalEl = document.getElementById("kdFinTotal");
  const finPaidEl = document.getElementById("kdFinPaid");
  const finPendingEl = document.getElementById("kdFinPending");
  const finPercentEl = document.getElementById("kdFinPercent");
  const finBarEl = document.getElementById("kdFinProgressBar");

  if (finTotalEl) finTotalEl.textContent = formatColones(fee);
  if (finPaidEl) finPaidEl.textContent = formatColones(famPaid);
  if (finPendingEl) finPendingEl.textContent = formatColones(famPending);
  if (finPercentEl) finPercentEl.textContent = `${famRate}% pagado (${famPaid >= fee ? 'Cancelado' : 'Saldo pendiente'})`;
  if (finBarEl) finBarEl.style.width = `${famRate}%`;

  if (!fam.payments || fam.payments.length === 0) {
    container.innerHTML = `
      <div class="p-5 text-center text-warm-600 bg-warm-50 rounded-xl">
        <p class="text-xs font-semibold">Sin abonos registrados para esta familia.</p>
        <button onclick="openPaymentModalForCurrentFamily()" class="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i> Registrar primer abono
        </button>
      </div>
    `;
    return;
  }

  fam.payments.forEach(p => {
    const div = document.createElement("div");
    div.className = "p-3 rounded-xl bg-white border border-brand-200 flex items-center justify-between gap-3 text-xs shadow-xs";
    div.innerHTML = `
      <div>
        <div class="font-bold text-warm-900 flex items-center gap-2">
          <span class="text-emerald-700 font-extrabold text-sm">${formatColones(p.amount)}</span>
          <span class="px-2 py-0.2 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">${p.method}</span>
        </div>
        <div class="text-[11px] text-warm-600 mt-0.5">
          📅 ${formatDateLong(p.date)} ${p.notes ? `· <span>${p.notes}</span>` : ''}
        </div>
      </div>
      <button onclick="deletePayment('${fam.id}', '${p.id}')" class="text-warm-400 hover:text-rose-500 p-1 rounded no-print" title="Eliminar abono">
        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
      </button>
    `;
    container.appendChild(div);
  });
}

// ================= MODAL 4: REGISTRAR / EDITAR ABONO =================
function openPaymentModal() {
  populatePaymentFamilySelector();
  document.getElementById("paymentForm").reset();
  document.getElementById("formPaymentId").value = "";
  document.getElementById("formPaymentDate").value = new Date().toISOString().split("T")[0];
  document.getElementById("paymentModal").classList.remove("hidden");
  lucide.createIcons();
}

function openPaymentModalForFamily(familyId) {
  openPaymentModal();
  const select = document.getElementById("formPaymentFamilyId");
  if (select) select.value = familyId;
}

function openPaymentModalForCurrentFamily() {
  if (currentKardexFamilyId) {
    openPaymentModalForFamily(currentKardexFamilyId);
  } else {
    openPaymentModal();
  }
}

function closePaymentModal() {
  document.getElementById("paymentModal").classList.add("hidden");
}

function populatePaymentFamilySelector() {
  const select = document.getElementById("formPaymentFamilyId");
  select.innerHTML = "";
  families.forEach(f => {
    const opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = `${f.motherName} (Total: ${formatColones(f.totalFee || 200000)})`;
    select.appendChild(opt);
  });
}

function savePayment(e) {
  e.preventDefault();
  const familyId = document.getElementById("formPaymentFamilyId").value;
  const amount = parseFloat(document.getElementById("formPaymentAmount").value) || 0;
  const date = document.getElementById("formPaymentDate").value;
  const method = document.getElementById("formPaymentMethod").value;
  const notes = document.getElementById("formPaymentNotes").value.trim();

  if (amount <= 0) {
    alert("Por favor ingresa un monto válido mayor a cero.");
    return;
  }

  const fam = families.find(f => f.id === familyId);
  if (!fam) return;

  if (!fam.payments) fam.payments = [];

  const newPayment = {
    id: "pay-" + Date.now(),
    amount,
    date,
    method,
    notes
  };

  fam.payments.push(newPayment);
  saveData();
  closePaymentModal();
  renderCurrentView();

  if (currentKardexFamilyId === familyId) {
    renderKardexPayments(fam);
  }

  showToast(`Abono de ${formatColones(amount)} registrado para ${fam.motherName}.`);
}

function deletePayment(familyId, paymentId) {
  const fam = families.find(f => f.id === familyId);
  if (!fam || !fam.payments) return;

  if (confirm("¿Deseas eliminar este registro de abono?")) {
    fam.payments = fam.payments.filter(p => p.id !== paymentId);
    saveData();
    renderCurrentView();
    if (currentKardexFamilyId === familyId) {
      renderKardexPayments(fam);
    }
    showToast("Abono eliminado.");
    lucide.createIcons();
  }
}

// ================= BACKUP / EXPORT / IMPORT =================
function exportToJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(families, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `Amarte_Maternidad_Kardex_${new Date().toISOString().split("T")[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Backup JSON descargado con éxito.");
}

function exportToCSV() {
  if (families.length === 0) {
    showToast("No hay registros para exportar.");
    return;
  }

  const headers = ["Nombre Mamá", "Pareja", "Bebé", "Teléfono", "Canal", "Etapa", "FUM", "FPP", "Semanas Calculadas", "Hospital", "Servicio", "Honorarios Pactados", "Total Pagado", "Saldo Pendiente", "Red de Apoyo", "Notas"];
  
  const rows = families.map(f => {
    const obs = getObstetricDetails(f.fum, f.fpp);
    let paid = 0;
    if (f.payments) f.payments.forEach(p => paid += (parseFloat(p.amount) || 0));
    const fee = f.totalFee || 0;
    const pending = Math.max(0, fee - paid);

    return [
      `"${f.motherName || ''}"`,
      `"${f.partnerName || ''}"`,
      `"${f.babyName || ''}"`,
      `"${f.phone || ''}"`,
      `"${f.contactChannel || ''}"`,
      `"${getStageLabel(f.stage)}"`,
      `"${f.fum || ''}"`,
      `"${f.fpp || ''}"`,
      `"${obs.displayWeeks}"`,
      `"${f.hospital || ''}"`,
      `"${f.servicePackage || ''}"`,
      `"${fee}"`,
      `"${paid}"`,
      `"${pending}"`,
      `"${(f.supportNetwork || '').replace(/"/g, '""')}"`,
      `"${(f.notes || '').replace(/"/g, '""')}"`
    ].join(",");
  });

  const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent([headers.join(","), ...rows].join("\n"));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", csvContent);
  downloadAnchor.setAttribute("download", `Amarte_Maternidad_Familias_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Archivo CSV generado para Excel.");
}

function importFromJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (Array.isArray(parsed)) {
        families = parsed;
        saveData();
        renderCurrentView();
        showToast("¡Datos restaurados correctamente!");
      } else {
        alert("El archivo JSON no tiene el formato esperado.");
      }
    } catch (err) {
      alert("Error al leer el archivo JSON: " + err.message);
    }
  };
  reader.readAsText(file);
}

function resetSampleData() {
  if (confirm("¿Deseas restaurar los datos iniciales de Amarte Maternidad?")) {
    families = [...INITIAL_SAMPLE_FAMILIES];
    saveData();
    renderCurrentView();
    showToast("Datos cargados.");
  }
}

// ================= HELPERS & UTILITIES =================
function formatColones(num) {
  const n = parseFloat(num) || 0;
  return "₡" + n.toLocaleString("es-CR");
}

function getNextAppointment(fam) {
  if (!fam.appointments || fam.appointments.length === 0) return null;
  const now = new Date();
  now.setHours(0,0,0,0);
  
  const upcoming = fam.appointments
    .filter(a => new Date(a.date + "T00:00:00") >= now)
    .sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`) - new Date(`${b.date}T${b.time || '00:00'}`));

  return upcoming.length > 0 ? upcoming[0] : null;
}

function getStageLabel(stage) {
  switch (stage) {
    case "gestacion": return "Gestación";
    case "termino": return "A Término (37+)";
    case "puerperio": return "Puerperio";
    case "lactancia": return "Lactancia";
    default: return "Gestación";
  }
}

function getStageIcon(stage) {
  switch (stage) {
    case "gestacion": return "🌸";
    case "termino": return "⏳";
    case "puerperio": return "👶";
    case "lactancia": return "🤱";
    default: return "🌸";
  }
}

function getStageBadgeClasses(stage) {
  switch (stage) {
    case "gestacion":
      return "bg-brand-100 text-brand-800 border border-brand-200";
    case "termino":
      return "bg-amberStage-100 text-amberStage-800 border border-amberStage-300";
    case "puerperio":
      return "bg-lavender-100 text-lavender-800 border border-lavender-200";
    case "lactancia":
      return "bg-sage-100 text-sage-800 border border-sage-200";
    default:
      return "bg-brand-100 text-brand-800 border border-brand-200";
  }
}

function formatDate(dateObj) {
  if (!dateObj || isNaN(dateObj.getTime())) return "N/D";
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"];
  return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
}

function formatDateShort(dateStr) {
  if (!dateStr) return "N/D";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return dateStr;
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

function formatDateLong(dateStr) {
  if (!dateStr) return "N/D";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return dateStr;
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  return `${days[d.getDay()]}, ${d.getDate()} de ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatPhoneForWA(phoneStr) {
  if (!phoneStr) return "50685522806";
  const cleaned = phoneStr.replace(/\D/g, "");
  if (cleaned.startsWith("506")) return cleaned;
  return `506${cleaned}`;
}

function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const msgEl = document.getElementById("toastMessage");
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  toast.classList.remove("opacity-0", "translate-y-20", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-20", "pointer-events-none");
  }, 3000);
}


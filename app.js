/**
 * Amarte Maternidad - Interactivity & Logic
 * amarte.maternidad.cr | Juliana Rojas Argüello
 */

// Official WhatsApp Contact (Costa Rica: +506 8552-2806)
const WHATSAPP_PHONE = "50685522806";

// Product Catalog with local images from imagenes/ & handmade crochet line
const productsData = [
  // Línea Crochet & Apego (Productos y fotos reales locales - DISPONIBLES)
  {
    id: "prod-crochet-1",
    name: "Pulpo de Apego & Mordedor Sensorial en Crochet",
    category: "crochet",
    inStock: true,
    badge: "Hecho a mano con amor",
    price: 12500,
    priceFormatted: "₡12,500",
    image: "imagenes/crochet-pulpo.jpg",
    btnText: "Personalizar y pedir por WhatsApp",
    inquiryMsg: "¡Hola Juli! 💕 Me gustaría personalizar y pedir el *Pulpo de Apego & Mordedor Sensorial en Crochet* (₡12,500). ¿Qué colores y combinaciones tienen disponibles?",
    description: "Tejido artesanal en hilo de algodón hipoalergénico con aro de madera natural suave para dentición y tentáculos en espiral que evocan el cordón umbilical, aportando calma, autorregulación y apego seguro."
  },
  {
    id: "prod-crochet-2",
    name: "Juguetes y Colgantes para Gimnasio de Estimulación en Crochet",
    category: "crochet",
    inStock: true,
    badge: "Estimulación temprana",
    price: 18000,
    priceFormatted: "₡18,000",
    image: "imagenes/crochet-juguetes.jpg",
    btnText: "Pedir por WhatsApp",
    inquiryMsg: "¡Hola Juli! 💕 Me interesa adquirir el *Set de Juguetes y Colgantes para Gimnasio de Estimulación en Crochet* (₡18,000). ¿Me podrías indicar los detalles para coordinar la entrega?",
    description: "Set de colgantes sensoriales tejidos a mano (jirafa, elefante, león y cuentas de madera natural) diseñados para favorecer el agarre, la coordinación motriz y el juego libre y seguro de tu bebé."
  },
  {
    id: "prod-crochet-3",
    name: "Guirnalda con Nombre Personalizado en Crochet",
    category: "crochet",
    inStock: true,
    badge: "Personalizado",
    price: 15000,
    priceFormatted: "₡15,000",
    image: "imagenes/crochet-nombres.jpg",
    btnText: "Encargar con nombre por WhatsApp",
    inquiryMsg: "¡Hola Juli! 💕 Quisiera encargar una *Guirnalda con Nombre Personalizado en Crochet*. ¿Cómo podemos coordinar las letras, colores y detalles?",
    description: "Letras tejidas a mano en tonos neutros y cálidos con detalles de estrellitas. Ideal para la decoración del cuarto del bebé, sesiones de fotos de recién nacido o regalo de baby shower."
  },

  // Lactancia (Sin Stock)
  {
    id: "prod-1",
    name: "Almohada de Lactancia Ergonómica",
    category: "lactancia",
    inStock: false,
    price: 32500,
    priceFormatted: "₡32,500",
    image: "imagenes/almohada de lactancia.png",
    description: "Cojín ergonómico de soporte para mamá y bebé. Reduce la tensión en hombros y espalda durante la toma."
  },
  {
    id: "prod-2",
    name: "Extractor de Leche Eléctrico Manos Libres",
    category: "lactancia",
    inStock: false,
    price: 48000,
    priceFormatted: "₡48,000",
    image: "imagenes/extractor electrico.png",
    description: "Extractor eléctrico portátil y silencioso con tecnología manos libres. Múltiples niveles de succión y estimulación."
  },
  {
    id: "prod-3",
    name: "Extractor de Leche Manual Anatómico",
    category: "lactancia",
    inStock: false,
    price: 24000,
    priceFormatted: "₡24,000",
    image: "imagenes/extractor de leche.png",
    description: "Diseño ergonómico de fácil agarre para extracciones suaves, cómodas y discretas en cualquier lugar."
  },
  {
    id: "prod-4",
    name: "Recolector de Leche Materna de Silicona (Tipo Haakaa)",
    category: "lactancia",
    inStock: false,
    price: 11500,
    priceFormatted: "₡11,500",
    image: "imagenes/haaka.png",
    description: "100% silicona de grado médico. Recolecta el reflejo de eyección de leche de forma natural sin desperdiciar una sola gota."
  },
  {
    id: "prod-7",
    name: "Calentador Rápido de Biberones y Leche",
    category: "lactancia",
    inStock: false,
    price: 26500,
    priceFormatted: "₡26,500",
    image: "imagenes/calentador de biberones.png",
    description: "Calentamiento uniforme al baño maría para preservar todos los nutrientes y anticuerpos de la leche materna."
  },
  {
    id: "prod-11",
    name: "Collar de Lactancia y Dentición en Silicona",
    category: "lactancia",
    inStock: false,
    price: 8500,
    priceFormatted: "₡8,500",
    image: "imagenes/collar de lactancia.png",
    description: "Accesorio seguro para mamá que estimula el enfoque del bebé durante la toma y calma las encías."
  },

  // Posparto (Sin Stock)
  {
    id: "prod-5",
    name: "Kit de Recuperación Posparto Integral",
    category: "posparto",
    inStock: false,
    price: 42000,
    priceFormatted: "₡42,000",
    image: "imagenes/kit posparto.png",
    description: "Incluye botella peri ergonómica, compresas de gel frío/calor, sales herbales y guía de autocuidado postparto."
  },
  {
    id: "prod-12",
    name: "Pack de Pañales Ecológicos Reutilizables",
    category: "posparto",
    inStock: false,
    price: 22000,
    priceFormatted: "₡22,000",
    image: "imagenes/pañales reutilizables.png",
    description: "Ajustables y lavables con tela hipoalergénica transpirable. Amigables con el medio ambiente y la piel."
  },
  {
    id: "prod-13",
    name: "Pijama Suave de Maternidad y Lactancia",
    category: "posparto",
    inStock: false,
    price: 29500,
    priceFormatted: "₡29,500",
    image: "imagenes/pijamas.png",
    description: "Confección en algodón suave con fácil acceso frontal para amamantar con comodidad de día y de noche."
  },

  // Bienestar & Porteo (Sin Stock)
  {
    id: "prod-6",
    name: "Fular Ergonómico de Porteo Suave",
    category: "bienestar",
    inStock: false,
    price: 28000,
    priceFormatted: "₡28,000",
    image: "imagenes/fular.png",
    description: "Tejido elástico de alta calidad para llevar a tu bebé piel con piel, fomentando el apego seguro y la postura ergonómica."
  },
  {
    id: "prod-8",
    name: "Monitor de Bebé con Cámara HD & Visión Nocturna",
    category: "bienestar",
    inStock: false,
    price: 45000,
    priceFormatted: "₡45,000",
    image: "imagenes/camara.png",
    description: "Cámara inteligente de alta definición con audio bidireccional y sensor de temperatura para tu tranquilidad."
  },
  {
    id: "prod-9",
    name: "Chupón Anatómico de Silicona Médica",
    category: "bienestar",
    inStock: false,
    price: 6500,
    priceFormatted: "₡6,500",
    image: "imagenes/chupon silicona.png",
    description: "Fabricado en una sola pieza de silicona ultra suave que respeta el desarrollo natural del paladar del bebé."
  },
  {
    id: "prod-10",
    name: "Chupón Calmante Ergonómico",
    category: "bienestar",
    inStock: false,
    price: 5800,
    priceFormatted: "₡5,800",
    image: "imagenes/chupon.png",
    description: "Diseño ligero con escudo curvado y orificios de ventilación para evitar irritaciones en la piel delicada."
  },
  {
    id: "prod-14",
    name: "Espejo Retrovisor de Seguridad para Carro",
    category: "bienestar",
    inStock: false,
    price: 13500,
    priceFormatted: "₡13,500",
    image: "imagenes/espejo para carro.png",
    description: "Visión panorámica de 360° para vigilar a tu bebé en la silla a contramarcha con total seguridad al conducir."
  }
];

// State
let cart = JSON.parse(localStorage.getItem('amarte_cart')) || [];

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('todos');
  updateCartUI();
  setupEventListeners();
  setupFAQ();
  setupStickyNav();
});

// Format Currency
function formatCRC(amount) {
  return '₡' + amount.toLocaleString('es-CR');
}

// Render Products with filtering (solo productos disponibles en stock)
function renderProducts(category = 'todos') {
  const container = document.getElementById('products-grid');
  if (!container) return;

  // Filtrar solo los productos disponibles en stock
  const availableProducts = productsData.filter(p => p.inStock !== false);

  const filtered = category === 'todos' 
    ? availableProducts 
    : availableProducts.filter(p => p.category === category);

  container.innerHTML = filtered.map(product => {
    let categoryLabel = 'Bienestar';
    if (product.category === 'crochet') categoryLabel = 'Crochet & Apego';
    else if (product.category === 'lactancia') categoryLabel = 'Lactancia';
    else if (product.category === 'posparto') categoryLabel = 'Posparto';

    const isAvailable = product.inStock !== false;

    const specialBadge = isAvailable
      ? (product.badge ? `<span class="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300/60 mb-2">🧶 ${product.badge}</span>` : `<span class="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300/60 mb-2">✅ En stock</span>`)
      : `<span class="inline-block bg-neutral-100 text-neutral-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-neutral-300/60 mb-2">⏳ Sin stock</span>`;

    // If product has custom WhatsApp button text (like Crochet items)
    const customWhatsAppBtn = isAvailable && product.btnText
      ? `
        <div class="mt-3 w-full">
          <button 
            onclick="buyDirectWhatsApp('${product.name}', '${product.priceFormatted}', \`${product.inquiryMsg || ''}\`)"
            class="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-full font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <svg class="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span class="truncate">${product.btnText}</span>
          </button>
        </div>
      `
      : '';

    const actionsHtml = isAvailable
      ? `
        <div class="flex items-center justify-between gap-3 pt-3">
          <div>
            <span class="text-xs text-[#8A7874] block">Precio</span>
            <span class="font-bold text-xl text-[#362B28]">${product.priceFormatted}</span>
          </div>
          <div class="flex items-center gap-2">
            <button 
              onclick="addToCart('${product.id}')"
              class="inline-flex items-center gap-2 bg-[#D96579] hover:bg-[#C24D61] text-white px-3.5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Añadir al carrito"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span>Añadir</span>
            </button>
            ${!product.btnText ? `
              <button 
                onclick="buyDirectWhatsApp('${product.name}', '${product.priceFormatted}')"
                class="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                title="Pedir directo por WhatsApp"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </button>
            ` : ''}
          </div>
        </div>
        ${customWhatsAppBtn}
      `
      : `
        <div class="flex items-center justify-between gap-3 pt-3">
          <div>
            <span class="text-xs text-[#8A7874] block">Precio</span>
            <span class="font-bold text-xl text-neutral-400 line-through">${product.priceFormatted}</span>
          </div>
          <div>
            <button 
              onclick="buyDirectWhatsApp('${product.name}', '${product.priceFormatted}', '¡Hola Juli! 💕 Quisiera consultar cuándo tendrán disponible nuevamente el producto: *${product.name}*.')"
              class="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3.5 py-2 rounded-full font-medium text-xs transition-all border border-neutral-300/80 cursor-pointer"
              title="Consultar disponibilidad por WhatsApp"
            >
              <span>Consultar stock</span>
            </button>
          </div>
        </div>
      `;

    return `
      <div class="bg-white rounded-3xl overflow-hidden border ${isAvailable ? 'border-[#F5C2C7]/40 shadow-soft shadow-card-hover' : 'border-neutral-200/80 opacity-90'} flex flex-col justify-between group transition-all duration-300">
        <div>
          <div class="relative overflow-hidden aspect-square bg-[#FAF5EE] flex items-center justify-center p-3">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              class="w-full h-full object-contain ${isAvailable ? 'group-hover:scale-105' : 'filter grayscale-[25%] opacity-80'} transition-transform duration-500 drop-shadow-sm rounded-2xl"
              loading="lazy"
            />
            <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#D96579] font-medium text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-[#F5C2C7]/30">
              ${categoryLabel}
            </span>
            ${!isAvailable ? `
              <span class="absolute bottom-4 right-4 bg-neutral-800/80 backdrop-blur-sm text-white font-semibold text-[11px] px-3 py-1 rounded-full shadow-md">
                Sin stock
              </span>
            ` : ''}
          </div>
          <div class="p-6 pb-2">
            ${specialBadge}
            <h3 class="font-heading font-semibold text-lg text-[#362B28] mb-2 leading-snug ${isAvailable ? 'group-hover:text-[#D96579]' : ''} transition-colors">
              ${product.name}
            </h3>
            <p class="text-sm text-[#6B5B57] leading-relaxed mb-4">
              ${product.description}
            </p>
          </div>
        </div>
        
        <div class="p-6 pt-0 flex flex-col border-t border-[#FAF5EE] mt-auto">
          ${actionsHtml}
        </div>
      </div>
    `;
  }).join('');
}

// Filter button logic
window.filterProducts = function(category, element) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('bg-[#D96579]', 'text-white', 'shadow-md');
    btn.classList.add('bg-white', 'text-[#53433F]', 'hover:bg-[#FDE8EB]');
  });
  if (element) {
    element.classList.remove('bg-white', 'text-[#53433F]', 'hover:bg-[#FDE8EB]');
    element.classList.add('bg-[#D96579]', 'text-white', 'shadow-md');
  }
  renderProducts(category);
};

// Cart Actions
window.addToCart = function(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  if (product.inStock === false) {
    showToast(`⚠️ "${product.name}" se encuentra actualmente sin stock.`);
    return;
  }

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`✨ Añadido al carrito: "${product.name}"`);
};

window.removeFromCart = function(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
};

window.updateQuantity = function(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
  }
};

function saveCart() {
  localStorage.setItem('amarte_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const countElements = document.querySelectorAll('.cart-count');
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  countElements.forEach(el => {
    el.textContent = totalCount;
    if (totalCount > 0) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });

  // Drawer items
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartEmptyState = document.getElementById('cart-empty');
  const cartFooter = document.getElementById('cart-footer');
  const cartTotalAmount = document.getElementById('cart-total-amount');

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '';
    cartEmptyState.classList.remove('hidden');
    if (cartFooter) cartFooter.classList.add('hidden');
  } else {
    cartEmptyState.classList.add('hidden');
    if (cartFooter) cartFooter.classList.remove('hidden');

    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      return `
        <div class="flex items-center gap-4 py-4 border-b border-[#FAF5EE]">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-2xl object-contain bg-[#FAF5EE] p-1 border border-[#F5C2C7]/30 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="font-medium text-sm text-[#362B28] truncate">${item.name}</h4>
            <p class="text-xs text-[#D96579] font-semibold mt-0.5">${formatCRC(item.price)} c/u</p>
            <div class="flex items-center gap-2 mt-2">
              <button onclick="updateQuantity('${item.id}', -1)" class="w-6 h-6 rounded-full bg-[#FAF5EE] hover:bg-[#FDE8EB] text-[#362B28] flex items-center justify-center text-xs font-bold transition-colors">
                -
              </button>
              <span class="text-xs font-bold text-[#362B28] px-1">${item.quantity}</span>
              <button onclick="updateQuantity('${item.id}', 1)" class="w-6 h-6 rounded-full bg-[#FAF5EE] hover:bg-[#FDE8EB] text-[#362B28] flex items-center justify-center text-xs font-bold transition-colors">
                +
              </button>
            </div>
          </div>
          <div class="text-right flex flex-col items-end justify-between self-stretch">
            <button onclick="removeFromCart('${item.id}')" class="text-gray-400 hover:text-red-500 transition-colors p-1" title="Eliminar">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
            <span class="text-sm font-bold text-[#362B28]">${formatCRC(itemTotal)}</span>
          </div>
        </div>
      `;
    }).join('');

    if (cartTotalAmount) {
      cartTotalAmount.textContent = formatCRC(total);
    }
  }
}

// Drawer Visibility
window.toggleCart = function() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (!drawer || !backdrop) return;

  const isOpen = !drawer.classList.contains('translate-x-full');

  if (isOpen) {
    drawer.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'auto';
  } else {
    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  }
};

// Direct Product Order via WhatsApp
window.buyDirectWhatsApp = function(productName, priceFormatted, customMessage = '') {
  let message = customMessage;
  if (!message) {
    message = `¡Hola Juli! 💕🌸\n\nQuisiera consultar disponibilidad y adquirir el siguiente producto de la tienda de *Amarte Maternidad*:\n\n• *${productName}* (${priceFormatted})\n\n¿Me podrías brindar los datos para coordinar el pago por SINPE Móvil y el envío? ¡Gracias!`;
  }
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// Checkout entire cart via WhatsApp
window.checkoutViaWhatsApp = function() {
  if (cart.length === 0) return;

  let message = `¡Hola Juli! (*Amarte Maternidad*) 💕🌸\n\nQuisiera realizar el siguiente pedido desde la tienda web:\n\n`;
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `• ${item.quantity}x ${item.name} - ${formatCRC(itemTotal)}\n`;
  });

  message += `\n*Total a pagar:* ${formatCRC(total)}\n\n¿Podrías confirmarme disponibilidad y datos para el pago por SINPE Móvil y envío? ¡Muchas gracias!`;

  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// WhatsApp Inquiries for Official Services & Packages
window.openServiceWhatsApp = function(serviceName, modality = '') {
  let detail = modality ? `${serviceName} (${modality})` : serviceName;
  const message = `¡Hola Juli! 💕🌸\n\nEstoy interesada/o en recibir información y agendar el servicio de: *${detail}* en *Amarte Maternidad*.\n\n¿Podrías contarme sobre disponibilidad de fechas y cómo podemos coordinar? ¡Muchas gracias!`;
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// Toast message
function showToast(text) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast bg-[#362B28] text-white px-5 py-3 rounded-full text-sm font-medium shadow-xl flex items-center gap-3 border border-white/10';
  toast.innerHTML = `<span>${text}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// FAQ Accordion
function setupFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach(other => other.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });
}

// Sticky Nav Shadow
function setupStickyNav() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-md', 'py-3');
      navbar.classList.remove('py-4');
    } else {
      navbar.classList.remove('shadow-md', 'py-3');
      navbar.classList.add('py-4');
    }
  });
}

// Mobile Menu
window.toggleMobileMenu = function() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  menu.classList.toggle('hidden');
};

// Event Listeners setup
function setupEventListeners() {
  const backdrop = document.getElementById('cart-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', toggleCart);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

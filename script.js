
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSidebar();
  initCharts();
  renderDashboardData();
  renderMovimientos();
  renderAccounts();
  renderFAQ();
  initSettings();
});

/* --- DATA & MOCKS --- */
const MOVS_DATA = [
  { id: 'TRX-9812', concept: 'Spotify Premium', cat: 'Suscripciones', date: '2025-12-14', amount: -15.99, state: 'Completo' },
  { id: 'TRX-9811', concept: 'Transferencia recibida', cat: 'Ingreso', date: '2025-12-14', amount: 500.00, state: 'Completo' },
  { id: 'TRX-9810', concept: 'Supermercado Central', cat: 'Alimentación', date: '2025-12-13', amount: -124.50, state: 'Completo' },
  { id: 'TRX-9809', concept: 'Uber Ride', cat: 'Transporte', date: '2025-12-12', amount: -24.00, state: 'Pendiente' },
  { id: 'TRX-9808', concept: 'Pago de Nomina', cat: 'Salario', date: '2025-12-10', amount: 3200.00, state: 'Completo' },
  { id: 'TRX-9807', concept: 'Amazon Purchase', cat: 'Compras', date: '2025-12-09', amount: -89.90, state: 'Completo' },
  { id: 'TRX-9806', concept: 'Restaurante plaza', cat: 'Comida', date: '2025-12-08', amount: -65.00, state: 'Completo' },
  { id: 'TRX-9805', concept: 'Gasolinera Shell', cat: 'Transporte', date: '2025-12-05', amount: -50.00, state: 'Completo' },
  { id: 'TRX-9804', concept: 'Netflix', cat: 'Suscripciones', date: '2025-12-05', amount: -12.99, state: 'Completo' },
  { id: 'TRX-9803', concept: 'Freelance Design', cat: 'Ingreso', date: '2025-12-01', amount: 450.00, state: 'Completo' },
];

const ACCOUNTS_DATA = [
  { name: 'Principal Bank', type: 'Débito', num: '**** 4512', balance: 4250.00, holder: 'GABOI DEV', style: 'bank-card-bg-1' },
  { name: 'Savings Pro', type: 'Ahorro', num: '**** 8821', balance: 12500.00, holder: 'GABOI DEV', style: 'bank-card-bg-2' },
  { name: 'Crypto Wallet', type: 'Inversión', num: '**** 9910', balance: 3420.50, holder: 'GABOI DEV', style: 'bank-card-bg-3' }
];

const FAQ_DATA = [
  { q: '¿Cómo exporto mis reportes?', a: 'Ve a la sección de Reportes y haz clic en el botón de descarga en la esquina superior derecha.' },
  { q: '¿Puedo agregar múltiples cuentas?', a: 'Sí, en la sección "Mis Cuentas" puedes agregar hasta 5 cuentas bancarias diferentes.' },
  { q: '¿Es seguro este panel?', a: 'Sí, utilizamos encriptación de grado militar para todos tus datos. Aunque esto es una demo frontend.' }
];

/* --- NAVIGATION --- */
function initNavigation() {
  const links = document.querySelectorAll('.sidebar-nav a');
  const sections = document.querySelectorAll('.page');
  const title = document.getElementById('pageTitle');

  // Handle URL hash if present
  // ...

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-page');

      // Active State
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Show Section
      sections.forEach(sec => sec.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');

      // Update Title
      title.textContent = link.querySelector('span').textContent;

      // Close mobile sidebar if open
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  // Global showPage function
  window.showPage = (id) => {
    const link = document.querySelector(`.sidebar-nav a[data-page="${id}"]`);
    if (link) link.click();
  };
}

function initSidebar() {
  const toggle = document.getElementById('sidebarToggle');
  const close = document.getElementById('sidebarClose');
  const sidebar = document.getElementById('sidebar');

  // Create backdrop dynamically
  const backdrop = document.createElement('div');
  backdrop.className = 'sidebar-backdrop';
  document.body.appendChild(backdrop);

  const toggleFn = () => {
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    } else {
      sidebar.classList.add('open');
      backdrop.classList.add('show');
    }
  };

  toggle.addEventListener('click', toggleFn);
  close.addEventListener('click', toggleFn);
  backdrop.addEventListener('click', toggleFn); // Close when clicking outside

  // Close on nav click (mobile)
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    a.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    });
  });
}


/* --- CHARTS --- */
function initCharts() {
  // CONFIG GLOBAL
  Chart.defaults.color = '#9aa0a6';
  Chart.defaults.font.family = "'Inter', sans-serif";

  // 1. MAIN CHART (Area)
  const ctx1 = document.getElementById('mainChart').getContext('2d');
  const grad = ctx1.createLinearGradient(0, 0, 0, 300);
  grad.addColorStop(0, 'rgba(79, 142, 247, 0.5)');
  grad.addColorStop(1, 'rgba(79, 142, 247, 0)');

  new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ['01 Dic', '05 Dic', '08 Dic', '12 Dic', '15 Dic', '18 Dic', '22 Dic'],
      datasets: [{
        label: 'Balance',
        data: [1200, 1900, 1500, 2800, 3200, 4100, 4250],
        borderColor: '#4f8ef7',
        backgroundColor: grad,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#16181d'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });

  // 2. DONUT CHART
  const ctx2 = document.getElementById('donutChart').getContext('2d');
  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['Comida', 'Transp.', 'Suscrip.', 'Otros'],
      datasets: [{
        data: [35, 20, 15, 30],
        backgroundColor: ['#ff5b5b', '#4f8ef7', '#f1c40f', '#2ecc71'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { boxWidth: 12 } }
      },
      cutout: '70%'
    }
  });

  // 3. YEAR BAR CHART (Reportes page need to init lazy or here if hidden ok)
  const ctx3 = document.getElementById('yearChart').getContext('2d');
  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [{
        label: 'Ingresos',
        data: [3, 4, 3.5, 5, 4.8, 6, 5.5, 7, 6.8, 7.5, 8, 9],
        backgroundColor: '#2ecc71',
        borderRadius: 4
      }, {
        label: 'Gastos',
        data: [2, 2.5, 2.8, 3, 3.5, 4, 3.8, 4.5, 4, 5, 5.5, 5],
        backgroundColor: '#ff5b5b',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
      scales: {
        y: { grid: { color: 'rgba(255,255,255,0.05)' } },
        x: { grid: { display: false } }
      }
    }
  });
}

/* --- RENDER FUNCTIONS --- */

function renderDashboardData() {
  const tbody = document.getElementById('dashboardTableBody');
  const recent = MOVS_DATA.slice(0, 5);

  tbody.innerHTML = recent.map(m => `
    <tr>
      <td>
        <div style="font-weight:500;">${m.concept}</div>
        <small style="color:var(--text-muted)">${m.id}</small>
      </td>
      <td>${m.cat}</td>
      <td>${m.date}</td>
      <td style="color: ${m.amount > 0 ? 'var(--success)' : '#fff'}">
        ${m.amount > 0 ? '+' : ''}$${Math.abs(m.amount).toFixed(2)}
      </td>
      <td><span style="background:rgba(46,204,113,0.15); color:#2ecc71; padding:2px 8px; border-radius:4px; font-size:0.8rem;">${m.state}</span></td>
    </tr>
  `).join('');
}

function renderMovimientos() {
  const tbody = document.getElementById('movimientosFullBody');
  const render = (data) => {
    tbody.innerHTML = data.map(m => `
      <tr>
        <td style="color:var(--text-muted)">${m.id}</td>
        <td><strong>${m.concept}</strong></td>
        <td>${m.cat}</td>
        <td>Banco Principal</td>
        <td>${m.date}</td>
        <td class="text-right" style="color: ${m.amount > 0 ? 'var(--success)' : '#fff'}">
          ${m.amount > 0 ? '+ ' : '- '}$${Math.abs(m.amount).toFixed(2)}
        </td>
        <td><div style="display:inline-block; width:8px; height:8px; background:${m.state === 'Completo' ? 'var(--success)' : 'var(--warning)'}; border-radius:50%; margin-right:6px;"></div>${m.state}</td>
      </tr>
    `).join('');
  }

  // Initial render
  render(MOVS_DATA);

  // Search filter
  const input = document.getElementById('movSearch');
  const select = document.getElementById('movFilter');

  const filterFn = () => {
    const term = input.value.toLowerCase();
    const type = select.value;

    const filtered = MOVS_DATA.filter(m => {
      const matchText = m.concept.toLowerCase().includes(term) || m.id.toLowerCase().includes(term);
      const matchType = type === 'all'
        ? true
        : type === 'income' ? m.amount > 0 : m.amount < 0;
      return matchText && matchType;
    });

    render(filtered);
  };

  input.addEventListener('keyup', filterFn);
  select.addEventListener('change', filterFn);
}

function renderAccounts() {
  const grid = document.getElementById('accountsGrid');
  grid.innerHTML = ACCOUNTS_DATA.map(acc => `
    <div class="bank-card ${acc.style}">
      <div class="card-top">
        <div class="chip"></div>
        <div class="card-logo">VISA</div>
      </div>
      <div class="card-number">${acc.num}</div>
      <div class="card-bottom">
        <div class="card-holder">
          <div class="label">Titular</div>
          <div class="name">${acc.holder}</div>
        </div>
        <div class="card-balance">
          <div class="label">Saldo</div>
          <div class="amount">$${acc.balance.toLocaleString()}</div>
        </div>
      </div>
    </div>
  `).join('');

  // Add "New Card" placeholder
  grid.innerHTML += `
    <button class="bank-card" style="background:transparent; border:2px dashed var(--border); box-shadow:none; align-items:center; justify-content:center; cursor:pointer;" onclick="showToast('Función no disponible en demo', 'info')">
      <i class="ri-add-circle-line" style="font-size:3rem; color:var(--text-muted); opacity:0.5;"></i>
      <span style="color:var(--text-muted); margin-top:10px;">Agregar Nueva</span>
    </button>
  `;
}

function renderFAQ() {
  const list = document.getElementById('faqList');
  list.innerHTML = FAQ_DATA.map(item => `
    <div class="faq-item">
      <div class="faq-header" onclick="this.parentElement.classList.toggle('open')">
        ${item.q}
        <i class="ri-arrow-down-s-line"></i>
      </div>
      <div class="faq-body">${item.a}</div>
    </div>
  `).join('');
}

function initSettings() {
  const toggle = document.getElementById('themeToggle');
  // Simple toast trigger
  toggle.addEventListener('click', () => {
    showToast('Modo claro no disponible aún (es muy brillante)', 'info');
  });
}

/* --- UTILS --- */
window.showToast = (msg, type = 'success') => {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  let icon = 'ri-checkbox-circle-line';
  if (type === 'info') icon = 'ri-information-line';

  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="${icon}"></i> <span>${msg}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

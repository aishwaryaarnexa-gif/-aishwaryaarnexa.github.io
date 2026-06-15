/* ============================================================
   BOOKING PAGE JAVASCRIPT — Multi-step + Payment Gateway
   ============================================================ */

// ── STATE ──
let state = {
  type: 'trek',
  packageId: 'himalayan',
  packageName: 'Himalayan Escape Trek',
  basePrice: 12999,
  days: 7,
  guests: 1,
  date: '',
  endDate: '',
  discount: 0,
  paymentMethod: 'upi',
  selectedWallet: 'Paytm',
  selectedBank: null,
};

// ── INIT FROM URL PARAMS ──
(function initFromURL() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  const id = params.get('id');

  if (type === 'villa') {
    setType('villa');
    const villaMap = {
      'summit':     { name: 'The Summit Villa', price: 18999, days: 1, img: 'images/villa_luxury.png', id: 'villa-summit' },
      'forest-villa':{ name: 'Forest Retreat Villa', price: 12499, days: 1, img: 'images/villa_interior.png', id: 'villa-forest' },
      'stargazer':  { name: 'Stargazer Luxury Camp', price: 8999, days: 1, img: 'images/camping_night.png', id: 'villa-star' },
    };
    if (id && villaMap[id]) {
      const v = villaMap[id];
      selectPackage('villa', id, v.name, v.price, v.days);
      // highlight the right option
      setTimeout(() => {
        document.querySelectorAll('.pkg-option').forEach(o => o.classList.remove('selected'));
        document.querySelectorAll('.pkg-check').forEach(c => { c.style.opacity = 0; c.style.transform = 'scale(0.5)'; });
        const el = document.getElementById(`pkg-${v.id}`);
        if (el) { el.classList.add('selected'); }
        const chk = document.getElementById(`check-${v.id}`);
        if (chk) { chk.style.opacity = 1; chk.style.transform = 'scale(1)'; }
      }, 100);
    }
  } else if (type === 'trek' && id) {
    const trekMap = {
      'himalayan': { name: 'Himalayan Escape Trek', price: 12999, days: 7 },
      'forest':    { name: 'Forest Trail Adventure', price: 4999, days: 2 },
      'sunrise':   { name: 'Sunrise Peak Expedition', price: 9499, days: 5 },
      'valley':    { name: 'Valley Waterfall Trek', price: 7499, days: 4 },
      'coorg':     { name: 'Coorg Coffee Trail Trek', price: 3999, days: 1 },
      'ladakh':    { name: 'Ladakh Stargazing Expedition', price: 22999, days: 12 },
    };
    if (trekMap[id]) {
      const t = trekMap[id];
      selectPackage('trek', id, t.name, t.price, t.days);
      setTimeout(() => {
        document.querySelectorAll('.pkg-option').forEach(o => o.classList.remove('selected'));
        document.querySelectorAll('.pkg-check').forEach(c => { c.style.opacity = 0; c.style.transform = 'scale(0.5)'; });
        const el = document.getElementById(`pkg-${id}`);
        if (el) { el.classList.add('selected'); }
        const chk = document.getElementById(`check-${id}`);
        if (chk) { chk.style.opacity = 1; chk.style.transform = 'scale(1)'; }
      }, 100);
    }
  }
  updateSummary();
})();

// ── SET TYPE (Trek/Villa) ──
function setType(type) {
  state.type = type;
  document.getElementById('type-trek-btn').classList.toggle('active', type === 'trek');
  document.getElementById('type-villa-btn').classList.toggle('active', type === 'villa');
  document.getElementById('trek-options').classList.toggle('hidden', type !== 'trek');
  document.getElementById('villa-options').classList.toggle('hidden', type !== 'villa');

  const dateLabel = document.getElementById('date-label');
  const guestsLabel = document.getElementById('guests-label');
  const endDateWrap = document.getElementById('end-date-wrap');

  if (type === 'villa') {
    dateLabel.textContent = 'Check-in Date';
    guestsLabel.textContent = 'Number of Guests';
    endDateWrap.style.display = 'block';
    document.getElementById('summary-badge').textContent = 'Villa';
    document.getElementById('summary-badge').style.background = 'var(--grad-villa)';
  } else {
    dateLabel.textContent = 'Trek Start Date';
    guestsLabel.textContent = 'Number of Trekkers';
    endDateWrap.style.display = 'none';
    document.getElementById('summary-badge').textContent = 'Trek';
    document.getElementById('summary-badge').style.background = 'var(--grad-primary)';
  }

  // Auto-select first option for that type
  if (type === 'trek') {
    selectPackage('trek', 'himalayan', 'Himalayan Escape Trek', 12999, 7);
    document.getElementById('pkg-himalayan')?.classList.add('selected');
    document.getElementById('check-himalayan').style.opacity = 1;
    document.getElementById('check-himalayan').style.transform = 'scale(1)';
  } else {
    selectPackage('villa', 'summit', 'The Summit Villa', 18999, 1);
    document.getElementById('pkg-villa-summit')?.classList.add('selected');
    document.getElementById('check-villa-summit').style.opacity = 1;
    document.getElementById('check-villa-summit').style.transform = 'scale(1)';
  }
}

// ── SELECT PACKAGE ──
const pkgImages = {
  himalayan: 'images/hero_mountain.png',
  forest:    'images/forest_trail.png',
  sunrise:   'images/sunrise_peak.png',
  valley:    'images/waterfall_trek.png',
  coorg:     'images/group_trekking.png',
  ladakh:    'images/camping_night.png',
  summit:    'images/villa_luxury.png',
  'forest-villa': 'images/villa_interior.png',
  stargazer: 'images/camping_night.png',
  cascade:   'images/waterfall_trek.png',
};

function selectPackage(type, id, name, price, days) {
  // Deselect all in current type
  const optionsId = type === 'trek' ? 'trek-options' : 'villa-options';
  document.getElementById(optionsId)?.querySelectorAll('.pkg-option').forEach(o => {
    o.classList.remove('selected');
  });
  document.querySelectorAll('.pkg-check').forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'scale(0.5)';
  });

  // Select new
  const el = document.getElementById(`pkg-${type === 'villa' ? 'villa-' + id : id}`) ||
             document.getElementById(`pkg-${id}`);
  if (el) el.classList.add('selected');
  const chkId = type === 'villa' ? `check-villa-${id}` : `check-${id}`;
  const chk = document.getElementById(chkId) || document.getElementById(`check-${id}`);
  if (chk) { chk.style.opacity = '1'; chk.style.transform = 'scale(1)'; }

  // Update state
  state.packageId = id;
  state.packageName = name;
  state.basePrice = price;
  state.days = days;
  state.type = type;

  // Update summary image
  const img = document.getElementById('summary-img');
  if (img) img.src = pkgImages[id] || pkgImages['himalayan'];

  updateSummary();
}

// ── GUEST UPDATE ──
function updateGuests(val) {
  state.guests = parseInt(val);
  updateSummary();
}

// ── DATE LISTENERS ──
const bookDate = document.getElementById('book-date');
if (bookDate) {
  bookDate.addEventListener('change', (e) => {
    state.date = e.target.value;
    updateSummary();
  });
  // Set min date to today
  bookDate.min = new Date().toISOString().split('T')[0];
}
const bookEndDate = document.getElementById('book-end-date');
if (bookEndDate) {
  bookEndDate.addEventListener('change', (e) => {
    state.endDate = e.target.value;
    updateSummary();
  });
}

// ── UPDATE SUMMARY ──
function updateSummary() {
  const isVilla = state.type === 'villa';
  const nights = isVilla && state.date && state.endDate ?
    Math.max(1, Math.ceil((new Date(state.endDate) - new Date(state.date)) / 86400000)) : 1;

  const multiplier = isVilla ? nights : state.guests;
  const base = state.basePrice * multiplier;
  const fee = Math.round(base * 0.05);
  const tax = Math.round(base * 0.18);
  const total = base + fee + tax - state.discount;

  // Update elements
  setText('summary-pkg-name', state.packageName);
  setText('s-base', `₹${state.basePrice.toLocaleString('en-IN')} × ${multiplier}`);
  setText('s-fee', `₹${fee.toLocaleString('en-IN')}`);
  setText('s-tax', `₹${tax.toLocaleString('en-IN')}`);
  setText('s-total', `₹${total.toLocaleString('en-IN')}`);

  if (state.date) {
    const d = new Date(state.date);
    setText('summary-date-display', `📅 ${d.toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'})}`);
  } else {
    setText('summary-date-display', '📅 Select a date');
  }
  setText('summary-guests-display', `👥 ${state.guests} ${state.guests === 1 ? 'Person' : 'Persons'}`);
  setText('summary-duration-display', isVilla ? `🌙 ${nights} Night${nights > 1 ? 's' : ''}` : `⏱️ ${state.days} Days`);

  // Update payment amount displays
  const totalStr = total.toLocaleString('en-IN');
  ['upi-amount','card-amount','nb-amount','wallet-amount'].forEach(id => setText(id, totalStr));
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ── COUPON CODE ──
const COUPONS = {
  'SUMMIT10': 10,
  'TREK20':   20,
  'VILLA15':  15,
  'NEWUSER':  25,
};
function applyCoupon() {
  const input = document.getElementById('coupon-input');
  const code = input?.value.trim().toUpperCase();
  if (!code) { showToast('Please enter a promo code', 'error'); return; }

  const discount = COUPONS[code];
  if (discount) {
    const base = state.basePrice * (state.type === 'villa' ? 1 : state.guests);
    state.discount = Math.round(base * discount / 100);
    const discRow = document.getElementById('discount-row');
    if (discRow) discRow.style.display = 'flex';
    setText('s-discount', `-₹${state.discount.toLocaleString('en-IN')}`);
    showToast(`🎉 ${discount}% discount applied! Saving ₹${state.discount.toLocaleString('en-IN')}`, 'success');
    updateSummary();
    input.value = '';
    input.placeholder = `${code} applied ✓`;
    input.style.borderColor = 'var(--clr-success)';
    input.disabled = true;
  } else {
    showToast('Invalid promo code. Try SUMMIT10 or TREK20', 'error');
    input.style.borderColor = 'var(--clr-danger)';
    setTimeout(() => input.style.borderColor = '', 2000);
  }
}

// ── STEP NAVIGATION ──
function goToStep(step) {
  // Validate before leaving step
  if (step === 2) {
    if (!document.getElementById('book-date')?.value) {
      showToast('Please select a date', 'error');
      return;
    }
  }
  if (step === 3) {
    const fname = document.getElementById('b-fname')?.value.trim();
    const email = document.getElementById('b-email')?.value.trim();
    const phone = document.getElementById('b-phone')?.value.trim();
    const emname = document.getElementById('b-emname')?.value.trim();
    const terms = document.getElementById('b-terms')?.checked;
    if (!fname || !email || !phone || !emname) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    if (!email.includes('@')) { showToast('Please enter a valid email address', 'error'); return; }
    if (!terms) { showToast('Please accept the Terms & Conditions', 'error'); return; }
  }

  document.querySelectorAll('.booking-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step-${step}`)?.classList.add('active');

  // Update progress bar
  for (let i = 1; i <= 3; i++) {
    const stepEl = document.getElementById(`progress-${i}`);
    const lineEl = document.getElementById(`pline-${i}`);
    if (i < step) {
      stepEl?.classList.add('done'); stepEl?.classList.remove('active');
      lineEl?.classList.add('done');
    } else if (i === step) {
      stepEl?.classList.add('active'); stepEl?.classList.remove('done');
    } else {
      stepEl?.classList.remove('active','done');
      lineEl?.classList.remove('done');
    }
  }

  // Scroll to top of form
  document.getElementById('booking-page')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── PAYMENT TABS ──
function switchPayTab(type) {
  state.paymentMethod = type;
  document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${type}`)?.classList.add('active');
  document.querySelectorAll('.pay-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`panel-${type}`)?.classList.add('active');
}

function selectBank(bank) {
  state.selectedBank = bank;
  document.querySelectorAll('.bank-btn').forEach(b => b.classList.remove('active'));
  const map = { SBI: 'bank-sbi', HDFC: 'bank-hdfc', ICICI: 'bank-icici', Axis: 'bank-axis' };
  document.getElementById(map[bank])?.classList.add('active');
  const sel = document.getElementById('bank-select');
  if (sel) {
    const opts = [...sel.options];
    const match = opts.find(o => o.text.includes(bank === 'SBI' ? 'State Bank' : bank));
    if (match) sel.value = match.value;
  }
}

function selectWallet(wallet) {
  state.selectedWallet = wallet;
  document.querySelectorAll('.wallet-btn').forEach(b => b.classList.remove('active'));
  const map = { Paytm: 'wallet-paytm', PhonePe: 'wallet-phonepe', 'Amazon Pay': 'wallet-amazon', Freecharge: 'wallet-freecharge' };
  document.getElementById(map[wallet])?.classList.add('active');
}

// ── CARD FORMATTING ──
function formatCard(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
  const icon = document.getElementById('card-type-icon');
  if (!icon) return;
  if (val.startsWith('4')) icon.textContent = '💳';
  else if (val.startsWith('5')) icon.textContent = '🟠';
  else if (val.startsWith('34') || val.startsWith('37')) icon.textContent = '🟢';
  else icon.textContent = '💳';
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 3) val = val.substring(0, 2) + ' / ' + val.substring(2);
  input.value = val;
}

// ── PROCESS PAYMENT ──
function processPayment(method) {
  // Basic validation
  if (method === 'card') {
    const num = document.getElementById('card-num')?.value.replace(/\s/g, '');
    const exp = document.getElementById('card-expiry')?.value;
    const cvv = document.getElementById('card-cvv')?.value;
    const name = document.getElementById('card-name')?.value.trim();
    if (!num || num.length < 16) { showToast('Please enter a valid card number', 'error'); return; }
    if (!exp || exp.length < 4) { showToast('Please enter the expiry date', 'error'); return; }
    if (!cvv || cvv.length < 3) { showToast('Please enter the CVV', 'error'); return; }
    if (!name) { showToast('Please enter the name on card', 'error'); return; }
  }
  if (method === 'upi') {
    const upiId = document.getElementById('upi-id')?.value.trim();
    // Allow if QR mode or UPI ID entered
    if (upiId && !upiId.includes('@')) { showToast('Please enter a valid UPI ID (e.g. name@upi)', 'error'); return; }
  }
  if (method === 'netbanking') {
    const bank = document.getElementById('bank-select')?.value;
    if (!bank) { showToast('Please select your bank', 'error'); return; }
  }

  state.paymentMethod = method;
  showOTPModal();
}

// ── OTP MODAL ──
function showOTPModal() {
  const modal = document.getElementById('otp-modal');
  if (modal) modal.classList.add('show');
  document.getElementById('otp-0')?.focus();
}

function moveOTP(input, nextIdx) {
  if (input.value.length >= 1) {
    const next = document.getElementById(`otp-${nextIdx}`);
    if (next) next.focus();
  }
  // Auto verify if all filled
  const allFilled = [...Array(6)].every((_, i) => {
    const el = document.getElementById(`otp-${i}`);
    return el && el.value.length === 1;
  });
  if (allFilled) setTimeout(verifyOTP, 300);
}

function backOTP(input, prevIdx, event) {
  if (event.key === 'Backspace' && !input.value) {
    const prev = document.getElementById(`otp-${prevIdx}`);
    if (prev) prev.focus();
  }
}

function verifyOTP() {
  const otp = [...Array(6)].map((_, i) => document.getElementById(`otp-${i}`)?.value || '').join('');
  if (otp !== '123456') {
    showToast('Incorrect OTP. Demo OTP is 123456', 'error');
    document.querySelectorAll('.otp-input').forEach(i => {
      i.style.borderColor = 'var(--clr-danger)';
      i.value = '';
    });
    document.getElementById('otp-0')?.focus();
    return;
  }

  closeModal('otp-modal');
  setTimeout(showSuccessModal, 400);
}

// ── SUCCESS MODAL ──
function showSuccessModal() {
  const refNum = 'SS-2026-' + Math.floor(Math.random() * 9000 + 1000);
  const email = document.getElementById('b-email')?.value || 'your email';
  const fname = document.getElementById('b-fname')?.value || '';
  const lname = document.getElementById('b-lname')?.value || '';
  const methodLabels = {
    upi: 'UPI Payment',
    card: 'Credit/Debit Card',
    netbanking: 'Net Banking',
    wallet: `${state.selectedWallet} Wallet`,
  };

  const dateStr = state.date ? new Date(state.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'TBD';

  setText('booking-id-display', refNum);
  setText('r-pkg', state.packageName);
  setText('r-date', dateStr);
  setText('r-guests', `${state.guests} Person${state.guests > 1 ? 's' : ''}`);
  setText('r-amount', document.getElementById('s-total')?.textContent || '—');
  setText('r-method', methodLabels[state.paymentMethod] || state.paymentMethod);
  setText('r-email', email);

  const modal = document.getElementById('success-modal');
  if (modal) modal.classList.add('show');
}

// ── DOWNLOAD RECEIPT ──
function downloadReceipt() {
  const refNum = document.getElementById('booking-id-display')?.textContent;
  const content = `
============================================
  SUMMIT & STAYS — BOOKING CONFIRMATION
============================================

Booking ID   : ${refNum}
Package      : ${document.getElementById('r-pkg')?.textContent}
Travel Date  : ${document.getElementById('r-date')?.textContent}
Guests       : ${document.getElementById('r-guests')?.textContent}
Amount Paid  : ${document.getElementById('r-amount')?.textContent}
Payment Via  : ${document.getElementById('r-method')?.textContent}
Booked On    : ${new Date().toLocaleDateString('en-IN')}

============================================
  CONTACT US: hello@summitstays.in
  Phone: +91 98765 43210
  www.summitstays.in
============================================

Thank you for choosing Summit & Stays!
Your adventure awaits. ⛰️
  `.trim();

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${refNum}-receipt.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Receipt downloaded!', 'success');
}

// ── INIT ──
updateSummary();

const form = document.getElementById('contactForm');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const phoneEl = document.getElementById('phone');
const messageEl = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const messageError = document.getElementById('messageError');
const successMessage = document.getElementById('successMessage');

// const dataList = document.getElementById('dataList');
const dataTable = document.getElementById('dataTable').querySelector('tbody');


const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^08[0-9]{8,11}$/;

function resetErrors() {
  nameError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  messageError.textContent = '';
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  resetErrors();
  successMessage.hidden = true;

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const phone = phoneEl.value.trim();
  const message = messageEl.value.trim();

  let valid = true;

  if (name.length < 3) {
    nameError.textContent = 'Nama minimal 3 karakter';
    valid = false;
  }
  if (!emailPattern.test(email)) {
    emailError.textContent = 'Masukkan email valid';
    valid = false;
  }
  if (!phonePattern.test(phone)) {
    phoneError.textContent = 'Nomor harus diawali 08 dan minimal 10 digit';
    valid = false;
  }
  if (message.length < 10) {
    messageError.textContent = 'Pesan minimal 10 karakter';
    valid = false;
  }

  if (!valid) return;

  // === Jika valid ===
  successMessage.hidden = false;
  successMessage.textContent = 'Pesan berhasil dikirim!';

  // Hapus baris placeholder jika masih ada
  if (dataTable.children.length === 1 && dataTable.children[0].children[0].colSpan === 4) {
    dataTable.innerHTML = '';
  }

  // Tambahkan baris baru ke tabel
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${name}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td>${message}</td>
    <td style="text-align:center;">
    <button class="action-btn" title="Hapus">🗑️</button>
  </td>
  `;
  dataTable.prepend(newRow); // tampil paling atas

  // Tambahkan event listener ke tombol hapus
newRow.querySelector('.action-btn').addEventListener('click', function () {
  newRow.remove();

  // Jika semua baris sudah dihapus, tampilkan placeholder
  if (dataTable.children.length === 0) {
    dataTable.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;">Belum ada pesan terkirim.</td>
      </tr>
    `;
  }
});

  // Reset form
  form.reset();

  setTimeout(() => {
    successMessage.hidden = true;
  }, 2000);
});

// Bersihkan pesan error saat mengetik
[nameEl, emailEl, phoneEl, messageEl].forEach(el => {
  el.addEventListener('input', () => {
    const errEl = document.getElementById(el.id + 'Error');
    if (errEl) errEl.textContent = '';
  });
});

const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const dialog = document.getElementById('modelDialog');
const toast = document.getElementById('toast');
let toastTimer;

document.getElementById('year').textContent = new Date().getFullYear();
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const modelDetails = {
  F36: {
    title: 'TAILG F36',
    text: 'دراجة بتصميم عصري، بمحرك مُعلن بقدرة 1200 واط وبطارية 72V 22Ah وسرعة قصوى مُعلنة تصل إلى 65 كم/س. يرجى التأكد من المواصفات الفعلية والتوفّر لدى الموزّع.'
  },
  F35: {
    title: 'TAILG F35',
    text: 'خيار عملي للمشاوير اليومية، بمحرك مُعلن بقدرة 500 واط وبطارية 60V 20Ah ومدى مُعلن يصل إلى 60 كم في الظروف المناسبة. يرجى التأكد من المواصفات الفعلية والتوفّر لدى الموزّع.'
  }
};
document.querySelectorAll('.details-btn').forEach(button => {
  button.addEventListener('click', () => {
    const model = modelDetails[button.dataset.model];
    document.getElementById('dialogTitle').textContent = model.title;
    document.getElementById('dialogText').textContent = model.text;
    document.getElementById('dialogContact').onclick = () => {
      document.getElementById('modelSelect').value = button.dataset.model;
      dialog.close();
    };
    dialog.showModal();
  });
});
document.getElementById('dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
}
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const model = document.getElementById('modelSelect').value;
  if (!name || !phone) return showToast('يرجى إدخال الاسم ورقم الهاتف.');
  // Replace this demo number with the client's verified WhatsApp number.
  const whatsappNumber = '967781920000';
  const message = `مرحباً، أنا ${name}. أريد الاستفسار عن دراجات تايلج. الموديل: ${model}. رقم التواصل: ${phone}`;
  const url = `https://wa.me/${776869125}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  showToast('تم تجهيز رسالة الاستفسار في واتساب. هذا نموذج تجريبي.');
});

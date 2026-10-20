(() => {
  'use strict';

  const STORAGE_KEY = 'flower.garden.greeting.20-10.v2';
  const card = document.getElementById('wishCard');
  const reading = document.getElementById('cardReading');
  const editor = document.getElementById('cardEditor');
  const editButton = document.getElementById('editCard');
  const status = document.getElementById('cardStatus');
  const recipient = document.getElementById('cardRecipient');
  const title = document.getElementById('cardTitle');
  const message = document.getElementById('cardMessage');
  const signature = document.getElementById('cardSignature');
  const inputs = {
    recipient: document.getElementById('recipientInput'),
    title: document.getElementById('titleInput'),
    message: document.getElementById('messageInput'),
    signature: document.getElementById('signatureInput')
  };
  function readText(element) {
    if (!element) return '';
    const copy = element.cloneNode(true);
    copy.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    return copy.textContent.trim();
  }
  let greeting = {
    recipient: readText(recipient),
    title: readText(title),
    message: message ? [...message.querySelectorAll('p')].map(readText).join('\n\n') : '',
    signature: readText(signature)
  };

  function renderGreeting() {
    if (recipient) recipient.textContent = greeting.recipient;
    if (title) title.textContent = greeting.title;
    if (signature) signature.textContent = greeting.signature;
    if (message) {
      message.replaceChildren(...greeting.message.split(/\n\s*\n/).map(text => {
        const paragraph = document.createElement('p');
        paragraph.className = 'message';
        paragraph.textContent = text;
        return paragraph;
      }));
    }
  }

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Object.entries(inputs).every(([key, input]) =>
      input && typeof saved[key] === 'string' && saved[key].trim() && saved[key].length <= input.maxLength)) {
      greeting = Object.fromEntries(Object.keys(inputs).map(key => [key, saved[key].trim()]));
      renderGreeting();
    }
  } catch {
    // Keep original
  }

  function showReading() {
    if (editor) editor.hidden = true;
    if (reading) reading.hidden = false;
    if (card) {
      card.setAttribute('aria-labelledby', 'cardTitle');
      card.scrollTop = 0;
    }
  }

  if (editButton && editor) {
    editButton.addEventListener('click', () => {
      Object.entries(inputs).forEach(([key, input]) => {
        if (input) {
          input.value = greeting[key];
          input.setCustomValidity('');
        }
      });
      if (reading) reading.hidden = true;
      editor.hidden = false;
      if (status) status.textContent = '';
      card.setAttribute('aria-labelledby', 'editorTitle');
      card.scrollTop = 0;
      if (inputs.recipient) inputs.recipient.focus({ preventScroll: true });
    });

    const cancelBtn = document.getElementById('cancelEdit');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        showReading();
        editButton.focus({ preventScroll: true });
      });
    }

    Object.values(inputs).forEach(input => {
      if (input) input.addEventListener('input', () => input.setCustomValidity(''));
    });

    editor.addEventListener('submit', event => {
      event.preventDefault();
      Object.values(inputs).forEach(input => {
        if (input) input.setCustomValidity(input.value.trim() ? '' : 'Bạn viết vài chữ vào đây nhé.');
      });
      if (!editor.reportValidity()) return;
      greeting = Object.fromEntries(Object.entries(inputs).map(([key, input]) => [key, input ? input.value.trim() : '']));
      renderGreeting();
      showReading();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(greeting));
        if (status) status.textContent = 'Đã lưu lời chúc của bạn.';
      } catch {
        if (status) status.textContent = 'Đã cập nhật thiệp. Trình duyệt chưa cho phép lưu để dùng lần sau.';
      }
      editButton.focus({ preventScroll: true });
    });
  }

  if (card) {
    card.addEventListener('close', () => {
      showReading();
      if (status) status.textContent = '';
    });
  }
})();

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');


function saveToLS(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

function loadFromLS(key) {
  const json = localStorage.getItem(key);

  try {
    const data = JSON.parse(json);
    return data;
  } catch (err) {
    console.log(err);
    return json;
  }
}

form.addEventListener('input', e => {
  e.preventDefault();
  const formData = new FormData(form);

  const data = {
    email: formData.get('email'),
    message: formData.get('message'),
  };

  saveToLS(STORAGE_KEY, data);
});

document.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLS(STORAGE_KEY);

  if (data) {
    form.elements.email.value = data.email;
    form.elements.message.value = data.message;
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const formdata = new FormData(form);
  const email = formdata.get('email');
  const message = formdata.get('message');

  const trimEmail = email.trim();
  const trimMessage = message.trim();

  if (trimEmail === '' || trimMessage === '') {
    alert('All form fields must be filled in');
    return;
  }


  localStorage.removeItem(STORAGE_KEY);
  e.target.reset();
});

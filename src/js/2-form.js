// 1. Глобальний об'єкт formData
const formData = {
  email: "",
  message: ""
};

const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");

if (form) {
  // Відновлення даних із localStorage при завантаженні сторінки
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      
      formData.email = parsedData.email || "";
      formData.message = parsedData.message || "";

      if (form.elements.email) form.elements.email.value = formData.email;
      if (form.elements.message) form.elements.message.value = formData.message;
    } catch (error) {
      console.error("Error parsing localStorage data", error);
    }
  }

  // 2. Слухач input: значення зберігаються у formData БЕЗ .trim()
  form.addEventListener("input", (event) => {
    const { name, value } = event.target;
    
    formData[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  });

  // 3. Слухач submit з перевіркою валідації
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Перевірка: якщо хоча б одне поле порожнє (або з одних пробілів)
    if (!formData.email.trim() || !formData.message.trim()) {
      alert("Fill in all fields"); // Повідомлення про заповнення
      return; // Блокуємо подальше виконання (логування, очищення тощо)
    }

    // ЛОГУВАННЯ ВІДБУВАЄТЬСЯ ТІЛЬКИ ПІСЛЯ УСПІШНОЇ ВАЛІДАЦІЇ
    console.log("Submitted formData:", formData);

    // Очищення сховища, форми та скидання об'єкта до початкового стану
    localStorage.removeItem(STORAGE_KEY);
    form.reset();

    formData.email = "";
    formData.message = "";
  });
}
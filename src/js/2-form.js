// 1. Глобальний об'єкт formData
const formData = {
  email: "",
  message: ""
};

const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");

if (form) {
  // 2. Завантаження даних з localStorage при завантаженні сторінки
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

  // 3. Слухач input (без .trim(), щоб зберігати точний вміст полів)
  form.addEventListener("input", (event) => {
    const { name, value } = event.target;
    
    formData[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  });

  // 4. Слухач submit з перевіркою на заповненість полів
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Перевіряємо, чи і email, і message не є порожніми (або не складаються лише з пробілів)
    if (!formData.email.trim() || !formData.message.trim()) {
      alert("Fill in all fields"); // Або інше повідомлення про заповнення полів
      return; // Блокуємо подальше виконання (логування, очищення)
    }

    // Логування відбувається ТІЛЬКИ після успішної валідації
    console.log("Submitted formData:", formData);

    // Очищення сховища, форми та скидання об'єкта
    localStorage.removeItem(STORAGE_KEY);
    form.reset();

    formData.email = "";
    formData.message = "";
  });
}
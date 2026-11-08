// 1. Глобальний об'єкт formData
const formData = {
  email: "",
  message: ""
};

const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");

if (form) {
  // 2. Завантаження даних з localStorage (і в інпути, і в formData)
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

  // 3. Слухач input (оновлює і localStorage, і глобальний formData)
  form.addEventListener("input", (event) => {
    const { name, value } = event.target;
    
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  });

  // 4. Слухач submit (вивід у консоль, очищення сховища, скидання форми і formData)
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Submitted formData:", formData);

    localStorage.removeItem(STORAGE_KEY);
    form.reset();

    formData.email = "";
    formData.message = "";
  });
}
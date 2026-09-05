const SHEET_URL = "https://script.google.com/macros/s/AKfycbyTJQV8AFYWTjHyrrmP6LzMVsJ-rnHepFVx_z4z3KJRO1cbltgOYMCxqFL3OE4y-Nxq/exec";

const form = document.getElementById("lead-form");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  try {
    await fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({ nome, email }),
    });

    message.textContent = "Recebido! Em breve entraremos em contato.";
    message.classList.remove("hidden", "error");
    message.classList.add("success");
    form.reset();

  } catch (error) {
    console.error("Erro ao enviar:", error);
    message.textContent = "Ops, algo deu errado. Tente novamente.";
    message.classList.remove("hidden", "success");
    message.classList.add("error");

  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Garantir Vaga";
  }
});
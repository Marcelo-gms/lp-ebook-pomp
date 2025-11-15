const textToCpy = document.querySelector("#textToCopy");
const btnCopy = document.querySelector("#btnCopy");
const btnGenerateQr = document.querySelector("#btnGenerateQr");
const containerQr = document.querySelector("#containerQr");
const loading = document.querySelector("#loading");
const info = document.querySelector("#info");
const containerImg = document.querySelector("#containerImg");
const toastCopy = document.querySelector("#toastCopy");
const containerEmail = document.querySelector("#containerEmail");
const btnStepEmail = document.querySelector("#btnStepEmail");
const email = document.querySelector("#email");
const validateEmail = document.querySelector("#validateEmail");

async function getQrcode() {
  try {
    hiddeElement(containerEmail);
    showElement(loading);

    const response = await fetch(
      "https://marce6411.c44.integrator.host/payment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
        }),
      }
    );
    const { res } = await response.json();

    const img = document.createElement("img");
    img.alt = "qr code";
    img.src = `data:image/jpeg;base64,${res.encodedImage}`;
    containerImg.appendChild(img);

    textToCpy.innerText = res.payload;

    hiddeElement(loading);
    showElement(containerQr);
  } catch (error) {
    console.log("Erro: ", error);
  }
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);

    showElement(toastCopy);

    const idTimer = setTimeout(() => {
      hiddeElement(toastCopy);
      clearTimeout(idTimer);
    }, 2000);
    console.log("Text copied to clipboard successfully!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

function hiddeElement(el) {
  el?.classList.remove("flex");
  el?.classList.add("hidden");
}

function showElement(el) {
  el?.classList.remove("hidden");
  el?.classList.add("flex");
}

btnStepEmail.addEventListener("click", () => {
  hiddeElement(info);
  showElement(containerEmail);
});
btnCopy.addEventListener("click", () => copyToClipboard(textToCpy.innerText));
btnGenerateQr.addEventListener("click", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailRegex.test(email.value)) {
    showElement(validateEmail);
    email.classList.add("shadow-md", "border-red-500", "shadow-red-500");
    const idTimer = setTimeout(() => {
      hiddeElement(validateEmail);
      email.classList.remove("shadow-md", "border-red-500", "shadow-red-500");
      clearTimeout(idTimer);
    }, 2500);

    return;
  }
  getQrcode();
});

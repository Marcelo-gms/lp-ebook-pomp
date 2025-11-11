const textToCpy = document.querySelector("#textToCopy");
const btnCopy = document.querySelector("#btnCopy");
const btnGenerateQr = document.querySelector("#btnGenerateQr");
const containerQr = document.querySelector("#containerQr");
const loading = document.querySelector("#loading");
const info = document.querySelector("#info");
const containerImg = document.querySelector("#containerImg");
const toastCopy = document.querySelector("#toastCopy");

async function getQrcode() {
  try {
    hiddeElement(info);
    showElement(loading);
    const response = await fetch("http://localhost:3000/payment", {
      method: "POST",
    });
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
  el.classList.remove("flex");
  el.classList.add("hidden");
}

function showElement(el) {
  el.classList.remove("hidden");
  el.classList.add("flex");
}

btnCopy.addEventListener("click", () => copyToClipboard(textToCpy.innerText));
btnGenerateQr.addEventListener("click", getQrcode);

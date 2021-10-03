document.addEventListener("DOMContentLoaded", () => {

const checkTextArea = document.getElementById("value");
const infoTextArea = document.getElementById("info");
const sendButton = document.getElementById("send");
const openButton = document.getElementById("open");

const serverIp = "18.216.205.170";
const regExp = /[^(\d+(.\d+)?)]/g;

const EMPTY_STRING = "";
const MIN_WORDS_COUNT = 2;
const MAX_PERCENTAGE = 100;

checkTextArea.addEventListener("keyup", (e) => {
  const wordsArray = e.target.value.split(" ");
  const wordsCounter = wordsArray.length;

  if (wordsCounter > MIN_WORDS_COUNT) {
    if (wordsArray[MIN_WORDS_COUNT] !== EMPTY_STRING) {
      sendButton.disabled = false;
      sendButton.title = EMPTY_STRING;
    } else {
      sendButton.disabled = true;
      sendButton.title = "Enter at least 3 words!";
    }

    if (e.code === "Enter") {
      sendButton.disabled = false;
      sendButton.title = EMPTY_STRING;
      sendButton.click();
    }
  }
});

sendButton.addEventListener("click", async () => {
  const payload = "name=" + encodeURIComponent(checkTextArea.value);
  try {
    const response = await fetch(`http://${serverIp}:8080/cgi-bin/script.cgi`, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: payload
    });
    const text = await response.text();

    const answerNumber = MAX_PERCENTAGE - parseInt( text.replace(regExp, EMPTY_STRING) );
    document.querySelector("#opacity").classList.add("opacity");
    document.querySelector("#result").innerHTML = `${answerNumber}% unique`;
  } catch (e) {
    throw new Error(e.message);
  }
});

openButton.addEventListener("click", async () => {
  infoTextArea.innerText = EMPTY_STRING;
  try {
    const response = await fetch(`http://${serverIp}:8080/cgi-bin/text.cgi`);
    const text = await response.text();
    
    infoTextArea.innerHTML = text;
    infoTextArea.disabled = true;
    infoTextArea.style.color = 'black';
  } catch (e) {
    throw new Error(e.message);
  }
});

});

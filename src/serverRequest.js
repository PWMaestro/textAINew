document.addEventListener("DOMContentLoaded", function () {
  const textAreaCheckNode = document.getElementById('value'); // textarea for send button
  const textAreaInfoNode = document.getElementById("info") // textarea for open database
  const sendButton = document.getElementById("send"); // button send
  const openButton = document.getElementById("open") // button open
  const WORDS_NUMBER = 2;
  
  const regexp = /[^(\d+(.\d+)?)]/g;

  textAreaCheckNode.addEventListener("keyup", (e) => {
    let arrayWords = e.target.value.split(" ");
    let counterWords = arrayWords.length;

    if (arrayWords[WORDS_NUMBER] !== "") {
      if (counterWords > WORDS_NUMBER) {
        sendButton.disabled = false;
        sendButton.title = "";
      } else {
        sendButton.disabled = true;
        sendButton.title = "Enter at least 3 words!";
      }
    }

    if (counterWords > WORDS_NUMBER && e.code === "Enter") {
      sendButton.disabled = false;
      sendButton.title = "";
      sendButton.click();
    }
  });

  sendButton.addEventListener("click", async function () {
    const payload = "name=" + encodeURIComponent(document.getElementById("value").value);
    try {
      const response = await fetch(
        "http://18.216.205.170:8080/cgi-bin/script.cgi",
        {
          method: 'POST',
          headers: {'Content-Type': "application/x-www-form-urlencoded"},
          body: payload
        }
      );
      const text = await response.text();
      const answerNumber = 100 - parseInt(text.replace(regexp, ""));
      
      console.log(answerNumber);
      document.querySelector("#opacity").classList.add("opacity");
      document.querySelector("#result").innerHTML = `${answerNumber}% unique`;
    } catch (e) {
      throw new Error(e.message);
    }
  });

  openButton.addEventListener("click",  async function () {
    try {
      const response = await fetch("http://18.216.205.170:8080/cgi-bin/text.cgi");
      const text = await response.text();

      textAreaInfoNode.innerHTML = text;
      textAreaInfoNode.disabled = true;
      textAreaInfoNode.style.color = 'black';
      openButton.disabled = true;
    } catch (e) {
      throw new Error(e.message);
    }
  })
});

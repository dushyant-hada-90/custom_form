document.getElementById("myForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const responseEl = document.getElementById("response");
  const spinner = document.getElementById("spinner");

  // Show spinner and clear previous messages
  spinner.style.display = "block";
  responseEl.innerText = "";

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTDjfpRimcOnjgWh2Y3WRgikDgRcEgpHoiOPxfAMA6Z08-PSKkAhPQ9FpQPCJTctJgCg/exec";

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.result === "success") {
      responseEl.innerText = "✅ Submitted successfully!";
      // this.reset();
    } else {
      responseEl.innerText = "❌ Error: " + result.message;
    }
  } catch (error) {
    responseEl.innerText = "❌ Couldn't update Google Sheet";
    console.error(error);
  } finally {
    // Hide spinner after response
    spinner.style.display = "none";
  }
});

document.getElementById("myForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTDjfpRimcOnjgWh2Y3WRgikDgRcEgpHoiOPxfAMA6Z08-PSKkAhPQ9FpQPCJTctJgCg/exec"; // must end with /exec

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: formData
    });

    const result = await response.text();

    if (response.ok) {
      document.getElementById("response").innerText = "✅ Submitted: " + result;
      this.reset();
    } else {
      document.getElementById("response").innerText = "❌ Error: " + result;
    }
  } catch (error) {
    document.getElementById("response").innerText = "⚠️ Network error. Check URL or permissions.";
    console.error(error);
  }
});

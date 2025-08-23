# 📝 AI-Powered Form Builder

This project helps **non-technical users** create custom web forms (e.g., recruitment, feedback, registration) by interacting with **Gemini AI**.

The workflow is:

1. User describes what form they need.
2. Gemini generates an HTML+CSS layout (based on TailwindCSS).
3. The app previews the form for the user.
4. If the user wants changes, they give feedback → regenerate.
5. Once accepted, the form is **converted into a real `<form>` element** with a **Google Sheets integration script** (so submissions go directly to a provided Sheet).
6. Final code (HTML + `script.js`) is returned to the user for deployment.

---

## 🚀 Features

* Conversational form creation (natural language input).
* TailwindCSS-styled HTML output for consistent design.
* Preview before finalization.
* Regeneration loop for modifications.
* Automatic conversion of AI output into valid `<form>`.
* **Google Sheets integration** (no need for external database).
* User-friendly UI for non-tech people.

---

## 📂 Folder Structure

```bash
ai-form-builder/
│
├── backend/
│   ├── server.js          # Express server (handles Gemini API calls + post-processing)
│   ├── gemini.js          # Gemini API wrapper
│   ├── sheets.js          # Google Sheets integration helper
│   └── utils/
│       ├── htmlProcessor.js   # Converts AI HTML into proper <form>
│       └── promptTemplates.js # Stores Gemini prompt templates
│
├── frontend/
│   ├── public/
│   │   └── index.html     # Base entry point
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── components/
│   │   │   ├── FormInput.jsx   # Input for "what form do you want?"
│   │   │   ├── Preview.jsx     # Shows live preview of generated form
│   │   │   ├── Regenerate.jsx  # Lets user request modifications
│   │   │   └── Export.jsx      # Shows final HTML + script.js download
│   │   └── styles/
│   │       └── globals.css     # TailwindCSS global styles
│   └── package.json
│
├── examples/
│   ├── recruitment_form.html
│   ├── feedback_form.html
│   └── event_registration.html
│
├── README.md              # Project documentation
└── package.json           # Root package config (if monorepo style)
```

---

## 🛠️ Action Plan

### Phase 1 — Setup

1. Initialize repo → `npm init` (backend) + `vite create` (frontend React).
2. Add **TailwindCSS** to frontend.
3. Setup **Express.js** backend with routes:

   * `/generate` → send prompt to Gemini, return HTML.
   * `/finalize` → convert to `<form>` + inject Google Sheets script.

---

### Phase 2 — Gemini Integration

1. Write `gemini.js` → function `generateForm(prompt)` that calls Gemini API.
2. Store prompts in `promptTemplates.js` (e.g., base template: "Generate an HTML form styled with TailwindCSS for...").
3. Return raw HTML+CSS to frontend for preview.

---

### Phase 3 — Frontend Workflow

1. **FormInput.jsx** → user describes form.
2. **Preview\.jsx** → shows Gemini-generated form inside iframe/div.
3. **Regenerate.jsx** → lets user provide feedback → send modified prompt → regenerate.
4. **Export.jsx** → after approval, request backend to finalize & provide downloadable HTML + `script.js`.

---

### Phase 4 — Post-Processing

1. In `htmlProcessor.js`, parse Gemini’s HTML → wrap `<form>`.
2. Add `name`, `email`, `message`, etc. fields based on context.
3. Insert hidden input for Google Sheet ID.
4. Output final HTML + `script.js`.

---

### Phase 5 — Google Sheets Integration

1. In `sheets.js`, create helper snippet that sends form data:

   ```javascript
   const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
   const form = document.getElementById("myForm");
   form.addEventListener("submit", e => {
     e.preventDefault();
     fetch(scriptURL, { method: "POST", body: new FormData(form) })
       .then(() => alert("Submitted successfully!"))
       .catch(() => alert("Error submitting form."));
   });
   ```
2. User provides **Google Script ID** → injected into final code.

---

### Phase 6 — Testing

* Generate common use cases: recruitment, feedback, registration.
* Verify that responses get logged in Google Sheet.
* Ensure form validation (required fields, email format).

---

### Phase 7 — Polish

* Add **“Save Draft”** so users can revisit their design later.
* Add **Gallery of Templates** (common forms pre-built).
* Allow **custom themes** (dark mode, corporate style, etc.).

---

## ✅ Example Workflow

1. User types:

   > "I want a recruitment form for college cultural committee with name, email, department, year, and why do you want to join?"

2. Gemini generates HTML preview with TailwindCSS.

3. User reviews → says:

   > "Add a dropdown for department instead of text input."

4. Regeneration produces updated preview.

5. User approves.

6. Backend finalizes:

   * Wraps with `<form>`
   * Injects Google Sheets script (with user’s Sheet ID).

7. Final HTML + `script.js` is downloadable.

---

## 🛤️ Roadmap

* [ ] Core pipeline (Gemini → Preview → Finalize).
* [ ] Add drag-and-drop upload of existing HTML for refinement.
* [ ] Add AI-based **validation rules** (e.g., phone number, email regex).
* [ ] Add **multi-step form wizard** support.
* [ ] Optionally integrate **Stitch (if API comes)** for design polish.



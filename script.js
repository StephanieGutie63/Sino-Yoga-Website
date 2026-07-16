const form = document.getElementById("newsletterform");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = form.elements["fullName"].value.trim();
    const email = form.elements["email"].value.trim();
    const language = form.elements["language"].value;
    const age = form.elements["age"].value;
    const gender = form.elements["gender"].value;
    const experience = form.elements["experience"].value;
    const membership = form.elements["membership"].value;

    message.textContent = "";

    const nameRegex = /^[A-Za-z\s'-]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(fullName)) {
        message.textContent = "Please enter a valid full name.";
        message.style.color = "red";
        return;
    }

    if (!emailRegex.test(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "red";
        return;
    }

    if (!language || !age || !gender || !experience || !membership) {
        message.textContent = "Please complete all required fields.";
        message.style.color = "red";
        return;
    }

    const formData = new FormData(form);

    message.textContent = "Submitting...";
    message.style.color = "black";

    try {
        await fetch("https://script.google.com/macros/s/AKfycbyf2GsvYX3fHnwCQpOtL-L_0fQ85XIrLDUcPl9WTmnTPzTY9gHThLjTW3nXtmG9hjjW1w/exec", {
            method: "POST",
            body: formData,
            mode: "no-cors"
        });

        message.textContent = "🎉 Thank you for subscribing!";
        message.style.color = "green";

        form.reset();

    } catch (error) {
        message.textContent = "Your form is valid, but it could not be submitted.";
        message.style.color = "orange";
        console.error(error);
    }
});
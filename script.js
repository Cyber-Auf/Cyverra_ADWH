document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submit
  
    const form = e.target;
    const name = form.name.value;
  
    // Hide form
    form.style.display = "none";
  
    // Show thank you message with user's name
    document.getElementById("thank-name").textContent = `Thank you, ${name}!`;
    document.getElementById("thank-you-message").style.display = "block";
  
    // Send form data to FormSubmit manually
    fetch("https://formsubmit.co/ajax/auffarooqui75@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        address: form.address.value,
        gender: form.gender.value,
        category: form.category.value,
        _captcha: false,
        _template: "table",
        _subject: "New Form Submission from Website"
      })
    }).then(response => response.json())
      .then(data => {
        console.log("Email sent!", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  });
  
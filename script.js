document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submit
  
    const form = e.target;
    const name = form.name.value;
  
    // Show loading spinner
    document.getElementById("loading-spinner").style.display = "block";
  
    // Hide form
    form.style.display = "none";
  
    // Show thank you message with user's name
    document.getElementById("thank-name").textContent = `Thank you, ${name}!`;
    document.getElementById("thank-you-message").style.display = "block";
  
    // Send form data to FormSubmit manually
    fetch("https://formsubmit.co/ajax/8b9ace7bb4ff71caf5f55d0b19fb0ac7", {
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
    })
      .then(response => response.json())
      .then(data => {
        console.log("Email sent!", data);
        
        // Reset the form fields
        form.reset();
  
        // Hide the loading spinner after submission
        document.getElementById("loading-spinner").style.display = "none";
      })
      .catch(error => {
        console.error("Error:", error);
  
        // Hide the loading spinner after error
        document.getElementById("loading-spinner").style.display = "none";
  
        // Show an error message to the user
        alert("There was an issue submitting your form. Please try again later.");
      });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts-container");
  
    // Define the list of media files
    const mediaFiles = [
      'image1.jpg',
      'video1.mp4'
    ];
  
    mediaFiles.forEach(file => {
      const fileExtension = file.split('.').pop().toLowerCase();
      const mediaPath = `posts/${file}`;
      let mediaElement;
  
      if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        mediaElement = document.createElement('img');
        mediaElement.src = mediaPath;
        mediaElement.alt = `Image: ${file}`;
      } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
        mediaElement = document.createElement('video');
        mediaElement.src = mediaPath;
        mediaElement.controls = true;
      }
  
      if (mediaElement) {
        postsContainer.appendChild(mediaElement);
      }
    });
  });
  
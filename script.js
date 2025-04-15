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
  
    const mediaFiles = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'video1.mp4'];
    const shareURL = encodeURIComponent("https://your-website-url.com"); // Your URL here
  
    mediaFiles.forEach((file) => {
      const ext = file.split('.').pop().toLowerCase();
      const mediaPath = `posts/${file}`;
      let mediaElement;
  
      if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
        mediaElement = document.createElement('img');
        mediaElement.src = mediaPath;
      } else if (['mp4', 'webm', 'ogg'].includes(ext)) {
        mediaElement = document.createElement('video');
        mediaElement.src = mediaPath;
        mediaElement.controls = true;
      }
  
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
  
      if (mediaElement) {
        mediaElement.classList.add('post-media');
        postDiv.appendChild(mediaElement);
      }
  
      const buttonsDiv = document.createElement('div');
      buttonsDiv.classList.add('buttons');
  
      // 👍 Like Button
      const likeButton = document.createElement('button');
      likeButton.innerHTML = "👍 Like";
      likeButton.className = "action-btn";
      likeButton.onclick = () => likeButton.classList.toggle("liked");
  
      // 💬 Comment Button + Comment List
      const commentButton = document.createElement('button');
      commentButton.innerHTML = "💬 Comment";
      commentButton.className = "action-btn";
  
      const commentList = document.createElement('ul');
      commentList.className = "comment-list";
  
      commentButton.onclick = () => {
        const comment = prompt("📝 Write your comment:");
        if (comment) {
          const commentItem = document.createElement('li');
          commentItem.textContent = comment;
          commentItem.className = "comment-item";
          commentList.appendChild(commentItem);
        }
      };
  
      // 🔗 Share Button + Dropdown
      const shareButton = document.createElement('button');
      shareButton.innerHTML = "🔗 Share";
      shareButton.className = "action-btn";
  
      const dropdown = document.createElement("div");
      dropdown.className = "share-dropdown";
      dropdown.style.display = "none";
  
      const platforms = {
        "WhatsApp": `https://wa.me/?text=${shareURL}`,
        "Facebook": `https://facebook.com/sharer/sharer.php?u=${shareURL}`,
        "Twitter": `https://twitter.com/intent/tweet?url=${shareURL}`,
        "Telegram": `https://t.me/share/url?url=${shareURL}`,
        "Copy Link": "#"
      };
  
      Object.entries(platforms).forEach(([name, link]) => {
        const a = document.createElement("a");
        a.href = link;
        a.target = "_blank";
        a.textContent = name;
        a.className = "share-option";
  
        if (name === "Copy Link") {
          a.onclick = (e) => {
            e.preventDefault();
            navigator.clipboard.writeText("https://your-website-url.com");
            alert("🔗 Link copied!");
          };
        }
  
        dropdown.appendChild(a);
      });
  
      shareButton.onclick = () => {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      };
  
      buttonsDiv.append(likeButton, commentButton, shareButton, dropdown);
      postDiv.appendChild(buttonsDiv);
      postDiv.appendChild(commentList);  // Attach the comment display list
      postsContainer.appendChild(postDiv);
    });
  });
  
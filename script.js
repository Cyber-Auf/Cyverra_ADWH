document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;

  document.getElementById("loading-spinner").style.display = "block";
  form.style.display = "none";

  document.getElementById("thank-name").textContent = `Thank you, ${form.name.value}!`;
  document.getElementById("thank-you-message").style.display = "block";

  const formData = new FormData(form); // Important: Use FormData not JSON

  // Add extra params if needed
  formData.append("_captcha", "false");
  formData.append("_template", "table");
  formData.append("_subject", "New Form Submission from Website");

  fetch("https://formsubmit.co/ajax/8b9ace7bb4ff71caf5f55d0b19fb0ac7", {
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log("Email sent!", data);
      form.reset();
      document.getElementById("loading-spinner").style.display = "none";
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("loading-spinner").style.display = "none";
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
  function generateQR() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
  
    if (!file) {
      alert("Please upload a file first.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileData = e.target.result;
  
      // Encode file data as Base64
      const base64Data = btoa(fileData);
  
      // Generate QR code using third-party API or your own method
      const qrData = `data:${file.type};base64,${base64Data}`;
  
      // Clear previous QR
      document.getElementById("qrResult").innerHTML = "";
  
      // Create QR image using Google API
      const qrImage = document.createElement("img");
      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=250x250`;
      qrImage.alt = "QR Code";
      qrImage.style = "margin-top: 20px;";
  
      // Download button
      const downloadBtn = document.createElement("a");
      downloadBtn.href = qrImage.src;
      downloadBtn.download = "document_qr.png";
      downloadBtn.innerText = "Download QR";
      downloadBtn.style = "display: block; margin-top: 20px; background: #222; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;";
  
      document.getElementById("qrResult").appendChild(qrImage);
      document.getElementById("qrResult").appendChild(downloadBtn);
    };
  
    reader.readAsBinaryString(file);
  }
  
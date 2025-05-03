const form = document.getElementById("feedback-form");
const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");
const commentList = document.getElementById("comment-list");

// Load comments from localStorage
document.addEventListener("DOMContentLoaded", loadComments);

// Function to load all saved comments
function loadComments() {
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.forEach(({ name, comment }) => {
    displayComment(name, comment);
  });
}

// Function to display a comment
function displayComment(name, comment) {
  const commentCard = document.createElement("div");
  commentCard.className =
    "bg-indigo-50 dark:bg-gray-800 p-4 rounded-lg shadow relative";

  commentCard.innerHTML = `
    <p class="font-semibold text-indigo-700 dark:text-indigo-300">${name}</p>
    <p class="text-gray-700 dark:text-gray-300 mt-1">${comment}</p>
    <button class="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onclick="deleteComment(event)">
      Hapus
    </button>
  `;

  commentList.appendChild(commentCard);
}

// Function to handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (name && comment) {
    // Display comment in the list
    displayComment(name, comment);

    // Save comment to localStorage
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    savedComments.push({ name, comment });
    localStorage.setItem("comments", JSON.stringify(savedComments));

    // Clear form
    nameInput.value = "";
    commentInput.value = "";
  }
});

// Function to delete a comment
function deleteComment(event) {
  const commentCard = event.target.closest("div");
  const name = commentCard.querySelector("p").textContent;
  const comment = commentCard.querySelectorAll("p")[1].textContent;

  // Remove comment from DOM
  commentList.removeChild(commentCard);

  // Remove comment from localStorage
  let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments = savedComments.filter(
    (item) => item.name !== name || item.comment !== comment
  );
  localStorage.setItem("comments", JSON.stringify(savedComments));
}

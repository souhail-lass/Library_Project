// Html Elements

const accountBtn = document.getElementById("accountBtn");
const accountModal = document.getElementById("accountModal");
const overlay = document.getElementById("overlay");
const addBookModal = document.getElementsByClassName("addBookModal");
const addBookBtn = document.getElementById("addBookBtn");
const addBookForm = document.getElementById("add-book-form");
const booksGrid = document.getElementById("grid-books");
const subButton = document.querySelector(".btn-submit");
const removeButton = document.querySelector("#removeButton");

// Data Storage

let myLibrary = [];

// the constructor...

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Add to library & Render it

const addBookToLibrary = () => {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let isRead = document.querySelector("#isRead").checked;
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  render(newBook);
};

// Open book form

const openAddBook = () => {
  addBookForm.reset();
  addBookForm.classList.add("active");
  overlay.classList.add("active");
};

// Close book form

const closeAddBook = () => {
  addBookForm.classList.remove("active");
  overlay.classList.remove("active");
};

const render = (newBook) => {
  booksGrid.innerHTML =
    booksGrid.innerHTML +
    `
		<div class="styleBook">
			<p>" ${newBook.title} "</p>
			<p>${newBook.author}</p>
			<p>${newBook.pages} pages</p>
			<div class="button-grp">
				<button id ="readButton" onclick="toggleReadState(this)" class=${
          newBook.isRead ? "btn-light-green" : "btn-light-red"
        }>  ${newBook.isRead ? "Read" : "Not Read"}</button>
				<button id ="removeButton" onclick="removeBook(this)" >Remove</button>
			</div>
		</div>`;
  let storeData=JSON.stringify(newBook);
  localStorage.setItem(`"Book ${i+1}"`,`${storeData}`);
  closeAddBook();
};

const toggleReadState = (e) => {
  if (e.className == "btn-light-green") {
    e.className = "btn-light-red";
    e.innerText = "Not Read";
  } else {
    e.className = "btn-light-green";
    e.innerText = "Read";
  }
};

const removeBook = (e) => {e.parentNode.parentNode.remove()};

addBookBtn.onclick = openAddBook;
overlay.onclick = closeAddBook;

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
});

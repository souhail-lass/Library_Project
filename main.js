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
	render();
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

const render = () => {
	booksGrid.innerHTML = "";
	for (let i = 0; i < myLibrary.length; i++) {
		let libraryEL = myLibrary[i];
		let book = document.createElement("div");
		document.body.appendChild(book);
		book.innerHTML = `
        <p>" ${libraryEL.title} "</p>
        <p>${libraryEL.author}</p>
        <p>${libraryEL.pages} pages</p>
        <div class="button-grp">
            <button id ="readButton" onclick="toggleReadState(${i})" class=${
			libraryEL.isRead ? "btn-light-green" : "btn-light-red"}>  ${libraryEL.isRead ? "Read" : "Not Read"}</button>
            <button id ="removeButton" onclick="removeBook(${i})" >Remove</button>
        </div>`;
		book.className = "styleBook";
		let readButton = book.querySelector("#readButton");
		booksGrid.appendChild(book);
		closeAddBook();
	}
};

const toggleReadState = (i) => {
	myLibrary[i].isRead = !myLibrary[i].isRead; 
    render();
};

const removeBook = (i) => {
    myLibrary.splice(i,1);       
    render();
};

addBookBtn.onclick = openAddBook;
overlay.onclick = closeAddBook;

addBookForm.addEventListener("submit", (event) => {
	event.preventDefault();
	addBookToLibrary();
});

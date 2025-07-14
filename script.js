let myLibrary = [];

//Constructor for Book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Use prototype so that every instance of the prototypee "Book" will have this function
Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

//Function for "ToggleRead"
function toggleRead(index) {
    myLibrary[index].toggleRead();
    render();
}


//Function to render books
function render() {
    let libraryEl = document.querySelector("#library");
    libraryEl.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let bookEl = document.createElement("div");
        bookEl.setAttribute("class", "book-card");
        bookEl.innerHTML = `
            <div class="card-header">
                <h3 class="title">${book.title}</h3>
                <h5 class="author">by ${book.author}</h5>
            <div>
            <div class="card-body">
            <p>${book.pages} pages</p>
            <p class="read-status">${book.read ? "Read" : "Not Read Yet"}</p>
            <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
            <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle Read</button>
        </div>
        `;
        libraryEl.appendChild(bookEl);
    }
}


// Function to remove books
function removeBook(index) {
    myLibrary.splice(index, 1);
    render();   // this is used here to rerender so that the removed book will disappear and only the left books will appear
}

//Function to add new books
function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;

    let newBook = new Book(title, author, pages, read);  // Creates a new book with the constructor
    myLibrary.push(newBook);  //Puts the book to the array
    render();
}


// Make the form appear when user clicks the "New Book" button
let newBookbtn = document.querySelector("#new-book-btn");
newBookbtn.addEventListener("click", function() {
    let newBookForm = document.querySelector("#new-book-form");
    newBookForm.style.display = "block";
})


//To retrieve the object and render it again and preventing Default because "submit" automatically sends to the backend and we don't have it yet.
document.querySelector("#new-book-form").addEventListener("submit", function(event){
    event.preventDefault();
    addBookToLibrary();
})
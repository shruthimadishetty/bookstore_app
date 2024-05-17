document.getElementById("bookForm").addEventListener("submit", function(event){
    event.preventDefault();
    addBook();
});

// Load saved data when page loads
window.onload = function() {
    loadBooks();
};

function addBook(){
    var bookName = document.getElementById("bookName").value;
    var authorName = document.getElementById("authorName").value;
    var bookPrice = document.getElementById("bookPrice").value;
    var bookFile = document.getElementById("bookFile").files[0].name;
    var fileURL = URL.createObjectURL(document.getElementById("bookFile").files[0]);

    var table = document.getElementById("bookTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = bookName;
    cell2.innerHTML = authorName;
    cell3.innerHTML = bookPrice;
    cell4.innerHTML = `<a href="${fileURL}" target="_blank">${bookFile}</a>`;
    cell5.innerHTML = `<button class="edit-btn" onclick='editBook(this)'>Edit</button> <button class="delete-btn" onclick='deleteBook(this)'>Delete</button>`;

    // Save data to localStorage
    saveBook(bookName, authorName, bookPrice, bookFile);

    document.getElementById("bookForm").reset();
}

function editBook(row){
    var selectedRow = row.parentNode.parentNode;
    document.getElementById("bookName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("authorName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("bookPrice").value = selectedRow.cells[2].innerHTML;
    selectedRow.remove();
}

function deleteBook(row){
    var selectedRow = row.parentNode.parentNode;
    selectedRow.remove();
}

// Save book data to localStorage
function saveBook(name, author, price, file) {
    var books = JSON.parse(localStorage.getItem('books')) || [];
    var book = { name: name, author: author, price: price, file: file };
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

// Load saved books from localStorage
function loadBooks() {
    var books = JSON.parse(localStorage.getItem('books')) || [];
    var table = document.getElementById("bookTable");
    books.forEach(function(book) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = book.name;
        cell2.innerHTML = book.author;
        cell3.innerHTML = book.price;
        cell4.innerHTML = `<a href="#" onclick="window.open('${book.file}', '_blank')">${book.file}</a>`;
        cell5.innerHTML = `<button class="edit-btn" onclick='editBook(this)'>Edit</button> <button class="delete-btn" onclick='deleteBook(this)'>Delete</button>`;
    });
}

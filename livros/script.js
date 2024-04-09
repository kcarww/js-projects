let books = [];

// Função para carregar os livros do localStorage
function loadBooksFromStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
        displayBooks(books);
    }
}

// Função para salvar os livros no localStorage
function saveBooksToStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

// Chamada da função para carregar os livros ao carregar a página
window.onload = loadBooksFromStorage;

// Restante do código permanece igual

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;

    const newBook = { title, author, genre, year };
    books.push(newBook);
    displayBooks(books);
    saveBooksToStorage(); // Salva os livros no localStorage

    // Clear input fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('year').value = '';
}

function searchBook() {
    const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
    const results = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm) ||
        book.year.toLowerCase().includes(searchTerm)
    );
    displayBooks(results);
}

function sortBooks() {
    const sortBy = document.getElementById('sort').value;
    books.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    });
    displayBooks(books);
}

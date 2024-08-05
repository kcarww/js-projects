document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const bookList = document.getElementById('book-list');

    bookForm.addEventListener('submit', addBook);
    document.addEventListener('DOMContentLoaded', displayBooks);

    function getBooks() {
        return JSON.parse(localStorage.getItem('books')) || [];
    }

    function setBooks(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    function displayBooks() {
        const books = getBooks();
        books.forEach((book, index) => addBookToList(book, index));
    }

    function addBook(e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;
        const year = document.getElementById('year').value;
        const rating = document.getElementById('rating').value;

        const book = { title, author, genre, year, rating, ratings: [] };
        const books = getBooks();
        books.push(book);
        setBooks(books);
        
        addBookToList(book, books.length - 1);
        bookForm.reset();
    }

    function addBookToList(book, index) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${book.title} by ${book.author}, Genre: ${book.genre}, Year: ${book.year}, Rating: ${book.rating}
            <button onclick="showRatingForm(${index})">Add Rating</button>
            <form class="rating-form" id="rating-form-${index}">
                <input type="number" id="new-rating-${index}" min="1" max="5" required>
                <button type="submit">Submit</button>
            </form>
        `;
        bookList.appendChild(li);

        const ratingForm = li.querySelector(`#rating-form-${index}`);
        ratingForm.addEventListener('submit', (e) => updateRating(e, index));
    }

    window.showRatingForm = function(index) {
        const ratingForm = document.getElementById(`rating-form-${index}`);
        ratingForm.style.display = 'block';
    }

    function updateRating(e, index) {
        e.preventDefault();
        
        const newRating = document.getElementById(`new-rating-${index}`).value;
        const books = getBooks();
        const book = books[index];

        book.ratings.push(Number(newRating));
        book.rating = calculateAverageRating(book.ratings);

        setBooks(books);
        bookList.innerHTML = '';
        displayBooks();
    }

    function calculateAverageRating(ratings) {
        const sum = ratings.reduce((a, b) => a + b, 0);
        return (sum / ratings.length).toFixed(2);
    }
});


// Load books
const loadBook = () => {
    const searchBar = document.getElementById('search-value');
    const searchText = searchBar.value;
    const fetchUrl = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(fetchUrl)
    .then(response => response.json())
    .then(data => showBooks(data));
    searchBar.value = '';
}

// Show books
const showBooks = (books) => {
    const booksContainer = document.getElementById('books-container');
    const searchQueries = document.getElementById('search-queries');
    booksContainer.textContent = '';
    searchQueries.textContent = '';
    const allBooks = books.docs;
    searchQueries.innerHTML = `
    <p class="bg-primary text-white mx-2 py-2 px-4 rounded-pill">Total Result: ${books.num_found}</p>
    <p class="bg-primary text-white mx-2 py-2 px-4 rounded-pill">Search query: ${books.q}</p>
    <p class="bg-primary text-white mx-2 py-2 px-4 rounded-pill">Result shows: ${books.docs.length}</p>
    `;
    allBooks.forEach(book => {
          // Author name validation
          let authorName = book.author_name;
          if (authorName === undefined) {
              authorName = 'Not found author name';
          } else {
              authorName = book.author_name;
          }
  
          // Publish year validation
          let publishYear = book.first_publish_year;
          if (publishYear === undefined) {
              publishYear = 'Not found publish year';
          } else {
              publishYear = book.first_publish_year;
          }
          
          // Publisher validation
          let publisher = book.publisher;;
          if (publisher === undefined) {
              publisher = 'Not found publisher';
          } else {
              publisher = book.publisher;
          }
  
          const booksBody = document.createElement('div');
          booksBody.classList.add('col');
          booksBody.innerHTML = `
            <div class="card">
              <img src="https://covers.openlibrary.org/b/id/8706224-M.jpg" class="card-img-top border border-secondary" alt="..." width="100%" height="270px">
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="mt-3">Author name: ${authorName}</p>
                <p>First publish year: ${publishYear}</p>
                <p>Publish by: ${publisher}</p>
              </div>
            </div>
          `;
      booksContainer.appendChild(booksBody);
    });
}

// Loader 
const loader = loaderVisibility => {
    document.getElementById('loader').style.display = loaderVisibility;
};
// Blank alert
const blankAlert = alertVisibility => {
    document.getElementById('alert').style.display = alertVisibility;
};
// No result alert
const noResult = noResultVisibility =>{
    document.getElementById('no-result').style.display = noResultVisibility;
};
// Result
const result = resultVisibility => {
    document.getElementById('result').style.display = resultVisibility;
};
// Load books
const loadBook = () => {
    const searchBar = document.getElementById('search-value');
    const searchText = searchBar.value;
    result('none');
    noResult('none');
      if (searchBar.value !== '') {
        // Load books by fetch
        blankAlert('none');
        loader('block');
        const fetchUrl = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(fetchUrl)
        .then(response => response.json())
        .then(data => showBooks(data));
      } else {
        // Blank alert show
        blankAlert('block');
        loader('none');
      }
    // Search input value after search complete
    searchBar.value = '';
}

// Show books
const showBooks = books => {
    const booksContainer = document.getElementById('books-container');
    const searchQueries = document.getElementById('search-queries');
    booksContainer.textContent = '';
    const allBooks = books.docs;
    // No result alert
    if (books.num_found === 0) {
        noResult('block');
        loader('none');
    } else {
    // Show results
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
              authorName = book.author_name[0];
          }
  
          // Publish year validation
          let publishYear = book.first_publish_year;
          if (publishYear === undefined) {
              publishYear = 'Not found publish year';
          } else {
              publishYear = book.first_publish_year;
          }
          
          // Publisher validation
          let publisher = book.publisher;
          if (publisher === undefined) {
              publisher = 'Not found publisher';
          } else {
              publisher = book.publisher[0];
          }
          
          // Set cover image
          let coverImage = book.cover_i;
          if (coverImage === undefined) {
              coverImage = 'https://images.reverb.com/image/upload/s--jbteVJS4--/t_card-square/v1561378170/fljqjjr3nik3juodhijc.jpg';
          } else {
              coverImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
          }

          // Show books   
          const booksBody = document.createElement('div');
          booksBody.classList.add('col');
          booksBody.innerHTML = `
            <div class="card shadow-lg">
              <img src="${coverImage}" class="card-img-top border border-secondary" alt="..." width="100%" height="270px">
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="mt-3">Author name: ${authorName}</p>
                <p>First publish year: ${publishYear}</p>
                <p>Publish by: ${publisher}</p>
              </div>
            </div>
          `;
      // Append books
      booksContainer.appendChild(booksBody);
    });
    loader('none');
    result('block');
    noResult('none');
    };
};

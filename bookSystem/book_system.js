let books = [];

function addBook() {
        const bookName = document.getElementById('bookName').value;
        const authorName = document.getElementById('authorName').value;
        const bookDescription = document.getElementById('bookDescription').value;
        const pagesNumber = parseInt(document.getElementById('pagesNumber').value);
        if (bookName && authorName && bookDescription && !isNaN(pagesNumber)) {
            const book = {
                name: bookName,
                authorName: authorName,
                bookDescription: bookDescription,
                pagesNumber: pagesNumber
            };
            books.push(book);
            showbooks();
            clearInputs();
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    }

function showbooks() {
    const booksDiv = books.map((book, index) => `<h1>Número do livro: ${index + 1}</h1>
        <p><strong>Nome do Livro: </strong>${book.name}</p>
        <p><strong>Nome do Autor:</strong> ${book.authorName}</p>
        <p><strong>Descrição do Livro:</strong> ${book.bookDescription}</p>
        <p><strong>Nº de Páginas:</strong> ${book.pagesNumber} página(s)</p>
        <button onclick="editbook(${index})">Editar</button>`
    );
    document.getElementById('books').innerHTML = booksDiv.join('');
}

function editbook(index) {
    const book = books[index];
    document.getElementById('bookName').value = book.name;
    document.getElementById('authorName').value = book.authorName;
    document.getElementById('bookDescription').value = book.bookDescription;
    document.getElementById('pagesNumber').value = book.pagesNumber;
    books.splice(index, 1); // Remove a entrada antiga
    showbooks(); // Atualiza a lista
  }

  function clearInputs() {
    document.getElementById('bookName').value = '';
    document.getElementById('authorName').value = '';
    document.getElementById('bookDescription').value = '';
    document.getElementById('pagesNumber').value = '';
}


    
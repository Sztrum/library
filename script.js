const myLibrary = [
    ['Book-1', 'My Dad', 10, true],
    ['Book-2', 'My mom', 20, false],
    ['Book-3', 'My sister', 33, true],
];

let index = 0;

function Book(title, author, max_page, readed) {
    this.title = title;
    this.author = author;
    this.max_page = max_page;
    this.readed = readed;
}

function addBook(book_params) {
    myLibrary.push(book_params);
    displayBooks(book_params);
}

function displayBooks(book_params) {
    let status = '';
    (book_params.readed == true) ?  status = "Not yet readed" : status = "Readed";
    (book_params.readed == true) ?  book_params.readed = "Readed" : book_params.readed = "Not yet readed";

    if(myLibrary.length > 0){
            document.querySelector('.library-output').innerHTML += `
            <div data-title="${book_params.title}" class="table">
                <div class="row">
                    ${book_params.title}
                </div>
                <div class="row">
                    ${book_params.author}
                </div>
                <div class="row">
                    ${book_params.max_page}
                </div>
                <div data-status="${book_params.readed}" class="row">
                    ${book_params.readed}
                </div>
                <div class="status btn d-f ai-c jc-c">${status}</div>
                <div class="remove btn d-f ai-c jc-c">Remove</div>
            </div>
            `;
        
            index++;
    }

    removeBook();
    changestatus();
}

function removeBook() {
    const remove = document.querySelectorAll('.remove');
    remove.forEach(removeelement => {
        removeelement.addEventListener('click', () =>{
            const target = removeelement.parentElement.getAttribute('data-title');
            myLibrary.splice(target, 1);
            
            document.querySelector(`[data-title='${target}']`).remove();
            console.log(myLibrary);
        });
    });
}

function changestatus() {
    const statusElements = document.querySelectorAll('.status');

    statusElements.forEach(statusElement => {
        statusElement.addEventListener('click', () => {
            const target = statusElement.parentElement.getAttribute('data-title');
            const index = myLibrary.findIndex(book => book[0] === target);

            if (index !== -1) {
                myLibrary[index][3] = !myLibrary[index][3];
                statusElement.innerHTML = myLibrary[index][3] ? 'Readed' : 'Not yet readed';
                arrayLibrary();
            }

            console.log(myLibrary);
        });
    });
}

const btn = document.querySelector('#add_book');
const message = document.querySelector('#message');

function arrayLibrary() {
    index = 0;
    document.querySelector('.library-output').innerHTML = '';
    for (let index = 0; index < myLibrary.length; index++) {
        const element = myLibrary[index];
        displayBooks(new Book(element[0],element[1],element[2],element[3]));
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    arrayLibrary();
});

btn.addEventListener('click', () =>{
    const title = document.querySelector('#title')
    const author = document.querySelector('#author')
    const pages = document.querySelector('#pages')
    const readed = document.querySelector('#readed')

    if(title.value !== '' && author.value !== '' && pages.value !== ''){
        const newBook = new Book(title.value,author.value,pages.value,readed.checked);
        addBook(newBook);
        title.value = "";
        author.value = "";
        pages.value = "";
        readed.checked = false;
        message.innerHTML = '';
    }else{
        message.innerHTML = 'Error';
    }
});

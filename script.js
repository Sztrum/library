let myLibrary = [
    ['Book-1', 'My Dad', 10, true],
    ['Book-2', 'My mom', 20, false],
    ['Book-3', 'My sister', 33, true],
];

let index = 0;

class Book {
    constructor(title, author, max_page, readed){
        this.title = title;
        this.author = author;
        this.max_page = max_page;
        this.readed = readed;
    }

    addBook(){
        console.log(myLibrary);
        myLibrary.push([this.title,this.author,this.max_page,this.readed]);
        this.displayBooks(myLibrary);
    }

    displayBooks() {
        console.log(myLibrary);
        let status = '';
        (this.readed == true) ?  status = "Not yet readed" : status = "Readed";
        (this.readed == true) ?  this.readed = "Readed" : this.readed = "Not yet readed";
    
        if(myLibrary.length > 0){
            const libraryOutput = document.querySelector('.library-output');

            const bookElement = document.createElement('div');
            bookElement.setAttribute('data-title', this.title);
            bookElement.classList.add('table');
    
            bookElement.innerHTML = `
                <div class="row">${this.title}</div>
                <div class="row">${this.author}</div>
                <div class="row">${this.max_page}</div>
                <div data-status="${this.readed}" class="row">${this.readed}</div>
                <div class="status btn d-f ai-c jc-c">${status}</div>
                <div class="remove btn d-f ai-c jc-c">Remove</div>
            `;
    
            libraryOutput.prepend(bookElement);
            index++;
        }
            
        this.removeBook();
        this.changestatus();
    }
    
    removeBook() {
        const remove = document.querySelectorAll('.remove');
        remove.forEach(removeelement => {
            removeelement.addEventListener('click', () =>{
                const target = removeelement.parentElement.getAttribute('data-title');

                myLibrary = myLibrary.filter(book => book[0] !== target);

                document.querySelector(`[data-title='${target}']`).remove();
                console.log(myLibrary);
            });
        });
    }
    
    changestatus() {
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

}



const btn = document.querySelector('#add_book');
const message = document.querySelector('#message');

function arrayLibrary() {
    index = 0;
    document.querySelector('.library-output').innerHTML = '';
    for (let index = 0; index < myLibrary.length; index++) {
        const element = myLibrary[index];
        const newBook = new Book(element[0], element[1], element[2], element[3]);
        newBook.displayBooks();
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
        newBook.addBook();
        title.value = "";
        author.value = "";
        pages.value = "";
        readed.checked = false;
        message.innerHTML = '';
    }else{
        message.innerHTML = 'Error';
    }
});

//This is a function that is finding the author who matches the ID
//Parameters
    // Array of author objects in the authers array
    // Each author has an ID 
//return match the author with that ID

function findAuthorById(authors, id) {
  return authors.find(authors => authors.id === id);
}

// This function will find books by Id
// Parameters
    //Look at the Books objects
    //String ID
//return book based on matching ID
function findBookById(books, id) {
  return books.find(books => books.id === id)
}


function partitionBooksByBorrowedStatus(books) {
  const booksCheckedOut = getBooksCheckedOut(books);
  const booksAreBack = getBooksAreBack(books);
  const results = []

  results.push(booksCheckedOut);
  results.push(booksAreBack);

  return results
}


//Helper Text
const getBooksCheckedOut = (books) => {
  return books.filter((book) => book.borrows.some((transaction) => !transaction.returned )); 
};

const getBooksAreBack = (books) => {
  return books.filter((book) => book.borrows.every((transaction) => transaction.returned));
};

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const result = [];
  // loop through borrows array, find borrower, and push formatted results to result array
  borrows.forEach(borrow => {
    // test for a maximum of 10 borrowers in the array
    if (result.length >= 10) return;

    const borrower = accounts.find(account => account.id === borrow.id);
    const formattedBorrow = {
      ...borrow,
      ...borrower,
    };
    result.push(formattedBorrow);
  });
  console.log(result);
  return result;
}
module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

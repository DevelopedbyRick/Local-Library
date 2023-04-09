const { partitionBooksByBorrowedStatus } = require("./books");

function getTotalBooksCount(books) {
  let count = 0;
  return books.length}

function getTotalAccountsCount(accounts) {
  let count = 0;
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const booksOut = partitionBooksByBorrowedStatus(books);
  return booksOut[0].length;
}


//Function that gets five of the most common genres
//parameters 
    //book objects
//return the name of the genre & the count of books in that genre 
function getMostCommonGenres(books) {
  //create a new array that gets the most commom genres with reduce
  const result = books.reduce((accum, book) => {
    //get genre oc current book
    const genre = book.genre;

    //get the object in accum that has name === genre
    const genreInfo = accum.find((element) => element.name === genre);
    // if an object was not found, create a new one and push it into accum
    if (!genreInfo) {
      const newGenreInfo = {
        name: genre,
        count: 1,
      };
      accum.push(newGenreInfo);
    } else {
      // if object was found, then add 1 to count
      genreInfo.count++;
    }

    return accum;
  }, []);

  // sort the array by count from greatest to least
  result.sort((genreA, genreB) => genreB.count - genreA.count);

  // limit array to 5
  result.splice(5);

  return result;
}

///////////////////////////////////

//Finding out what are the most popular books
//parameters 
    //book objects
//return five objects that contain the most popular books 
function getMostPopularBooks(books) {
  // create a new array of most popular books with map (map method create a new array)
  const results = books.map((book) => {
    const popularInformation = {
      name: book.title,
      count: book.borrows.length,
    }
    return popularInformation;
  });
  //sort new array by count: greatest ot least
  results.sort((titleA, titleB) => titleB.count - titleA.count);

  //limit to 5 elements
  results.splice(5);

  return results;
}

//////////////////////////////////
//Finding out the most popular author based on how many times their books have been checked out
//parameters
    //book objects
    //author objects
//return most popular authors
function getMostPopularAuthors(books, authors) {
//create a new array that has the most popular author by book
const results = authors.map((author) => {
  const fullName = '${author.name.first} ${author.name.last}';
  const booksByAuthor = getBooksByAuthorId(books, author.id);
  const totalBorrows = booksByAuthor.reduce((accum, book) => accum + book.borrow.length, 0);
  const allAuthorInfo = {
    name: fullName,
    count: totalBorrows,
  }; 
  
return allAuthorInfo;
  });

  //sort new array by count: greatest to least
  results.sort((authorA, authorB) => authorB.count - authorA.count);

  //limit to 5 elements
  results.splice(5);

  return results;
}


function getMostPopularAuthors(books, authors) {
  //Use _sortNSlice helper function to sort by highest and truncate to just top 5
  return _sortNSlice(
    //map through each author in authors
    authors.map(({ name: { first, last }, id }) => ({
      name: `${first} ${last}`, //name is just our current author's name
      count: _authorBorrows(books, id), //uses helper function to determine the number of times this authorId is found in each book's borrows arrays
    }))
  );
}



//helper function to sort and truncate to just first 5 items
function _sortNSlice(arr, slicer = 5) {
  const newArr = [...arr];
  return newArr
    .sort(({ count: count1 }, { count: count2 }) => count2 - count1)
    .slice(0, slicer);
}

//helper function to more cleanly determine each author's total number of borrows across all books
function _authorBorrows(books, id) {
  return books.reduce((totalBorrows, { authorId, borrows }) => {
    if (authorId === id) totalBorrows += arrayItemCount(borrows);
    return totalBorrows;
  }, 0);
}

//helper function to easily count up any type of item array based on the length of said array
function arrayItemCount(item) {
  return item.length;
}


//Helper Functions
//Takes an array of books and author ID and returns an array of books written by that author
const getBooksByAuthorId = (books, authorID) => {
  return books.filter((book) => book.authorID === authorID);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

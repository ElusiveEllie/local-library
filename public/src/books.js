function findAuthorById(authors, id) {
  // Return author where ID matches
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  // Return book where ID matches
  return books.find(book => book.id === id);
}

function findAccountById(accounts, id) {
  // Return acount where ID matches
  return accounts.find(account => account.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // Create array of arrays
  const bookStatuses = [[], []];
  const checkedOut = bookStatuses[0];
  const returned = bookStatuses[1];
  // Push to returned array if book is returned, checkedOut array otherwise
  books.forEach(book => book.borrows[0].returned ? returned.push(book) : checkedOut.push(book));
  return bookStatuses;
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  // Limit borrows to 10
  const lastTenBorrows = []
  borrows.forEach(borrow => lastTenBorrows.length < 10 ? lastTenBorrows.push(borrow) : null)
  // Map array to have accounts and returned status
  return lastTenBorrows.map(borrow => {
    return {...findAccountById(accounts, borrow.id), returned: borrow.returned}
  })
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

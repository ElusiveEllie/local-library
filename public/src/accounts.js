function findAccountById(accounts, id) {
  // Return account where ID matches
  return accounts.find((account) => account.id === id);
}

function findAuthorById(authors, id) {
  // Return author where ID matches
  return authors.find((author) => author.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    // Reduce last names to lower case and sort alphabetically
    accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1
  );
}

function getBorrows(books) {
  const borrowers = [];
  // Create array with just the borrows for all books
  books.forEach((book) => {
    const { borrows } = book;
    borrows.forEach((borrow) => borrowers.push(borrow));
  });
  return borrowers;
}

function getTotalNumberOfBorrows(account, books) {
  // Use helper function to make array with all borrows
  const borrows = getBorrows(books);
  // Filter out borrows from other accounts
  const filteredBorrows = borrows.filter((borrow) => borrow.id === account.id);
  // Return count of filtered list
  return filteredBorrows.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  // Filter books to only ones that are currently borrowed by account
  const accountHeldBooks = books.filter((book) => {
    return !book.borrows[0].returned && book.borrows[0].id === account.id;
  });
  // For each book, add author to object
  accountHeldBooks.forEach((book) => {
    book["author"] = findAuthorById(authors, book.authorId);
  });
  return accountHeldBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

function findAuthorById(authors, id) {
  // Return author where ID matches
  return authors.find((author) => author.id === id);
}

function getTotalBooksCount(books) {
  // Return length of books array
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // Return length of accounts array
  return accounts.length;
}

function getBorrowedBooks(books) {
  // Return array of books that are currently borrowed
  return books.filter((book) =>
    book.borrows.some((borrow) => !borrow.returned)
  );
}

function getBooksBorrowedCount(books) {
  // Return length of borrowed books array
  return getBorrowedBooks(books).length;
}

function getFiveHighestCounts(unsortedArray) {
  //Sort Array by count, higher numbers first
  const sortedArray = unsortedArray.sort(
    (optionA, optionB) => optionB.count - optionA.count
  );
  // Limit sorted array to length of 5
  const fiveHighest = sortedArray.slice(0, 5);
  return fiveHighest;
}

function getKeyCount(object, key) {
  // Map object to array of keys
  const keyArray = object.map((item) => item[key]);
  // make Object counting each time key appears
  const keyCount = keyArray.reduce((result, keyAppearance) => {
    result[keyAppearance] ||= 0;
    result[keyAppearance] += 1;
    return result;
  }, {});
  return keyCount;
}

function getMostCommonGenres(books) {
  // Use helper function to get object with count of each genre
  const genreCount = getKeyCount(books, "genre");
  const genreCountsArray = [];
  // Push to array the genres and their counts in proper format
  for (const genre in genreCount) {
    genreCountsArray.push({ name: genre, count: genreCount[genre] });
  }
  // Use helper function to get just the five highest counts
  return getFiveHighestCounts(genreCountsArray);
}

function getMostPopularBooks(books) {
  // Map books to array of books and the amount of times they were borrowed
  const bookPopularities = books.map(({ title, borrows }) => {
    return { name: title, count: borrows.length };
  });
  // Use helper function to get just the five highest counts
  return getFiveHighestCounts(bookPopularities);
}

function getMostPopularAuthors(books, authors) {
  // Reduce to object of author IDs and the borrows they have
  const authorBorrows = books.reduce((result, book) => {
    result[book.authorId] ||= 0;
    result[book.authorId] += book.borrows.length;
    return result;
  }, {});
  const authorIdBorrowsArray = [];
  // Push to array the authorIds and their borrow counts in proper format
  for (const authorId in authorBorrows) {
    // Convert authorId to number since it was a key
    authorIdBorrowsArray.push({
      id: Number(authorId),
      count: authorBorrows[authorId],
    });
  }
  // Use helper function to get just the five highest counts
  const sortedAuthorIds = getFiveHighestCounts(authorIdBorrowsArray);
  // Re-map array to have name of author instead of authorID
  return sortedAuthorIds.map((author) => {
    const authorName = findAuthorById(authors, author.id).name;
    return {
      name: `${authorName.first} ${authorName.last}`,
      count: author.count,
    };
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

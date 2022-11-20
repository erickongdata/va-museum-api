/* eslint no-nested-ternary: 0 */

function sortFilterBookmarks(bookmarks, sorting, filtering) {
  // filter bookmarks
  let bookmarksFiltered;
  if (filtering === '') {
    bookmarksFiltered = [...bookmarks];
  } else {
    bookmarksFiltered = bookmarks.filter((book) =>
      book.artist.toLowerCase().includes(filtering.toLowerCase())
    );
  }
  // Sort bookmarks
  if (sorting === 'added-rev') {
    return bookmarksFiltered.reverse();
  }
  if (sorting === 'artist-az') {
    return bookmarksFiltered.sort((a, b) =>
      a.artist === b.artist ? 0 : a.artist < b.artist ? -1 : 1
    );
  }
  if (sorting === 'artist-za') {
    return bookmarksFiltered.sort((a, b) =>
      a.artist === b.artist ? 0 : a.artist < b.artist ? 1 : -1
    );
  }
  if (sorting === 'date') {
    return bookmarksFiltered.sort((a, b) => {
      const regExpress = /(\d){4}/; // Find year in string
      const aDate = parseInt(a.date.match(regExpress), 10);
      const bDate = parseInt(b.date.match(regExpress), 10);
      return aDate - bDate;
    });
  }
  if (sorting === 'date-rev') {
    return bookmarksFiltered.sort((a, b) => {
      const regExpress = /(\d){4}/; // Find year in string
      const aDate = parseInt(a.date.match(regExpress), 10);
      const bDate = parseInt(b.date.match(regExpress), 10);
      return bDate - aDate;
    });
  }
  return bookmarksFiltered;
}

export default sortFilterBookmarks;

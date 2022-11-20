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
  if (sorting === 'date-rev') {
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
  return bookmarksFiltered;
}

export default sortFilterBookmarks;

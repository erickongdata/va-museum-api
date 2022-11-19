/* eslint no-nested-ternary: 0 */

function sortFilterBookmarks(bookmarks, sorting) {
  const bookmarksIn = [...bookmarks];
  if (sorting === 'date-rev') {
    return bookmarksIn.reverse();
  }
  if (sorting === 'artist-az') {
    return bookmarksIn.sort((a, b) =>
      a.artist === b.artist ? 0 : a.artist < b.artist ? -1 : 1
    );
  }
  if (sorting === 'artist-za') {
    return bookmarksIn.sort((a, b) =>
      a.artist === b.artist ? 0 : a.artist < b.artist ? 1 : -1
    );
  }
  return bookmarksIn;
}

export default sortFilterBookmarks;

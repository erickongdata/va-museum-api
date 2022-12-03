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
  if (sorting === 'date' || sorting === 'date-rev') {
    const centuryBc = /\d+(st|nd|rd|th).*?century.*?bc/i; // format: 1st century BC or 14th century BC
    const century = /\d+(st|nd|rd|th).*?century/i; // format: 1st or 14th century
    const yearBc = /\d+.*?bc/i; // format: 134 BC or 134BC
    const year = /\d{4}/; // format: 1988
    const yearShort = /\d+/; // format: 123 or 289 AD
    return bookmarksFiltered.sort((a, b) => {
      const aDate =
        parseInt(a.date.match(centuryBc), 10) * -100 ||
        parseInt(a.date.match(century), 10) * 100 ||
        parseInt(a.date.match(yearBc), 10) * -1 ||
        parseInt(a.date.match(year), 10) ||
        parseInt(a.date.match(yearShort), 10) ||
        9999;
      const bDate =
        parseInt(b.date.match(centuryBc), 10) * -100 ||
        parseInt(b.date.match(century), 10) * 100 ||
        parseInt(b.date.match(yearBc), 10) * -1 ||
        parseInt(b.date.match(year), 10) ||
        parseInt(b.date.match(yearShort), 10) ||
        9999;
      return sorting === 'date' ? aDate - bDate : bDate - aDate;
    });
  }
  return bookmarksFiltered;
}

export default sortFilterBookmarks;

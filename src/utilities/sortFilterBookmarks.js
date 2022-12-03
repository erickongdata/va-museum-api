/* eslint no-nested-ternary: 0 */

function dateConvertToNumber(dateString) {
  const centuryBc = /\d+(st|nd|rd|th).*?century.*?bc/i; // format: 1st century BC or 14th century BC
  const century = /\d+(st|nd|rd|th).*?century/i; // format: 1st or 14th century
  const yearBc = /\d+.*?bc/i; // format: 134 BC or 134BC
  const year = /\d{4}/; // format: 1988
  const yearShort = /\d+/; // format: 123 or 289 AD

  return (
    parseInt(dateString.match(centuryBc), 10) * -100 ||
    parseInt(dateString.match(century), 10) * 100 ||
    parseInt(dateString.match(yearBc), 10) * -1 ||
    parseInt(dateString.match(year), 10) ||
    parseInt(dateString.match(yearShort), 10) ||
    9999
  );
}

function sortFilterBookmarks(bookmarks, sorting, filtering) {
  // filter bookmarks
  const bookmarksFiltered =
    filtering === ''
      ? [...bookmarks]
      : bookmarks.filter((book) =>
          book.artist.toLowerCase().includes(filtering.toLowerCase())
        );

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
    return bookmarksFiltered.sort((a, b) => {
      const aDate = dateConvertToNumber(a.date);
      const bDate = dateConvertToNumber(b.date);
      return sorting === 'date' ? aDate - bDate : bDate - aDate;
    });
  }
  return bookmarksFiltered;
}

export default sortFilterBookmarks;

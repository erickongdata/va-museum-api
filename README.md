# V&A Art Collection

A website where you can search the art collection of the Victoria and Albert museum.

Created with React and Firebase.

Developed and end-to-end tested with Cypress.

## Features:

### Search

- Search the collection using the
  museum's API.

  Documentation at:

  https://api.vam.ac.uk/docs

  https://developers.vam.ac.uk/

- Search parameters and pagination changes the query string in the address URL.

### Display items

- Display search results in Gallery or List layout.

- Search results are paginated, navigate using the arrow buttons. Also clicking on the page number allows you to type in the page number.

- An Item page that shows the detailed information of each art object. The URL address of an item page has the format ../item/O1259772 where 'O1259772' is the system number of the object.

- Clicking on the image in the Item page displays the image at fullscreen.

### Save favourites

- Bookmark objects by clicking on the bookmark icon next to each image.

- My Gallery page presents all your bookmarked objects.

- Home page shows recently bookmarked items and featured artists.

### Create an account

- To save and view your bookmarks on multiple devices, create an account on the sign-up page.

- Users and bookmarks are handled with Firebase/Cloud Firestore.

### Misc

- The navigation bar 'User icon' shows the user status and name.

- Navigation icons are "Go back", "Go to top of screen", "Home page", "My Gallery Page" and "User status and navigation links to Login and Create new account pages".

![](./screenshots/va_01_s.jpeg)

![](./screenshots/va_02_s.jpeg)

![](./screenshots/va_03_s.jpeg)

![](./screenshots/va_05_s.jpeg)

![](./screenshots/va_04_s.jpeg)

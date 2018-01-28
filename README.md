# Tool for text annotation

* Click `Choose File` button to choose the data file
* The data file must a json array contains many documents, each document is an object that has `content` attribute

```javascript
{
  "content": "Some content"
}
```

* The `categories.json` file contains all the tags that we want to use. It has the form

```javascript
{
  "address": {
    "color": "#00acc1", // Color of text
    "shortcut": "D" // Keyboard shortcut
  },
  "surrounding": {
    "color": "#d32f2f",
    "shortcut": "E"
  }
}
```

* We can add new tag with color and shortcut by adding new entry to this file.
* Click previous or next to navigate between different document.
* After we have done, click `Save` and choose a location to save the data.
* Click `Reset` if we want to erase the tags on current document.
* First install `NodeJS` then run `npm install` or `yarn` to install dependencies.
* To run the project, run `npm start` or `yarn start`

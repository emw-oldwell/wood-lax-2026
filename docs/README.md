# Documents folder

Drop tournament packets, hotel confirmations, registration forms, medical/insurance docs, etc. here.

After adding a file (e.g. `tournament-info-philly-phinest.pdf`), open `../data.js` and add an entry to the `documents` array:

```js
documents: [
  {
    name: "Philly's Phinest tournament packet",
    file: "/docs/tournament-info-philly-phinest.pdf",
    category: "Tournament info",
    notes: "Schedule, venue map, parking info"
  },
],
```

The Docs tab on the site will pick it up on the next deploy.

# Calculator

The Odin Project Foundations project by Asliddin Tirkashev, RNU group 4230Z.

[Live project](https://asliddintirkashev4-cloud.github.io/odin-calculator/) · [Assignment](https://www.theodinproject.com/lessons/foundations-calculator)

## Run

Serve this folder with `python3 -m http.server 8765` and open http://localhost:8765. No build step or external dependencies are needed.

Run the logic tests with `npm test` or `node --test calculator.test.cjs`.

## Files

`index.html` defines the interface. `style.css` uses Flexbox for the layout. The logic file contains the rules and validation; `app.js` connects them to DOM events and rendering.

## Plan

Keep the current display, first number and pending operator as state. An operator calculates a complete pair before storing the next operator. An incomplete pair waits for a number. Equals finishes one pair. Clear resets every field. Decimals, backspace, sign change and keyboard input use the same state functions as the buttons.

## Check in the browser

Try 12 + 7 - 1 = 18, 2 + + without calculating, 0.1 + 0.2 = 0.3, 8 / 0 and recovery with a new number. Check that a new digit after equals starts fresh and that a second decimal point is blocked.

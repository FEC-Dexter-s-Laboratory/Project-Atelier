# Overview
The Overview component includes the navbar at the top, as well as the main overview for a specific product.

## Mitchell Wintrow [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/kevinzhugao/)](https://www.linkedin.com/in/mitchell-wintrow-87b180216/) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/Daniel-Ghaly)](https://github.com/mrrobotisreal)

!['Overview Recording'](overview.gif)

## Table of Contents
- Navbar
- Main Overview

### Navbar
The left half of the navbar contains the company logo, while the right half contains the search input, search button, and cart button. If input is added
and then the search button is clicked, it will open a new window to Google with the input already searched and pulled up. When the cart button is clicked,
a modal will pop up that displays what items are currently in the cart, including the name of the product, the style, the size, how many of each item has
been added to the cart, and the total price of all items at the bottom. Each item in the cart also has a button underneath it, so that the item can be
removed. All of this data persists.

### Main Overview
It displays a single main image that has the ability to be expanded for a closer look, and inside that expanded view it also has the ability to
zoom in 2.5x for an even closer look. Overlayed on top of the main image on the left, are thumbnails containing other photos of the specific product,
and these thumbnails are organized vertically with carousel functionality and highlighting to show which photo is currently selected.
On the right is where the rating of the current product is displayed at the top, with a link to the reviews section for that product
if any reviews exist. Under that is also the category of the product, the title, the price - which also displays sale prices if it is on sale,
and the name of the currently selected style. Beneath that information is the area where other styles for the same product are able to be chosen,
with a checkmark over whichever style is currently selected, and below that are the dropdown menus for selecting size and quantity,
as well as a button to add to the cart and a button to favorite the item and save it for later. Finally, we have the product description
and features displayed underneath everything previously described.
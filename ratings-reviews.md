### Kamran Masood [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/kevinzhugao)](https://github.com/kamasood)

!['Ratings & Reviews Recording'](ratings-reviews.gif)

The Ratings & Reviews module provides a breakdown of ratings and characteristics of the currently displayed product, alongside a filterable and sortable list of available reviews. By clicking on any of the individual rating sidebars, a filter for reviews of that rating is toggled in the review list. Additionally, the review list can be sorted via the dropdown menu above and can be expanded by clicking the conditionally rendered "More Reviews" button below. This functionality provides significant customization of the displayed reviews. 

The module also provides deep functionality in the "Add Review" modal, which validates all required user data prior to submission and conditionally renders characteristic rating selectors for a given product. This form allows a user to upload local photos, sending asynchronous Axios calls to a hosting API and submitting a hosted URL to the site's review data API.

These features were created using a stack of React, Axios, Express, Styled-Components, MomentJS, and the Cloudinary API. 

<!-- ![](ratings&reviews.gif) -->

#Oh Sew Much
###https://mrb91002-ohsewmuch.herokuapp.com/

A transactional retail site geared toward women who are in the market to purchase a handmade toy as a gift for a young child.

This project was a collaborative effort between Matthew Benavides and Chad Latham. We divided the work to be done using Github issues and milestones and also pair programmed through critical features.

##Primary user:
Primary user Jeanette. Jeanette is paranoid and doesn't want to sign in to the site or receive our newsletter. She will still be able to purchase her handmade toys without logging in, but if she does log in, she will receive points towards discounts on future purchases and the ability to track her order history.

A logged in user will have access to their order history. A user will only be logged in from the landing page - via a view my order history button - or through the purchase summary page.

This project is designed for a small manufacturer or hand sewn goods. It is intended to be a retail outlet for goods to be sold with credit card processsing by Square.

##What problem does it solve?
It solves the problem of getting a small business owner's products to market without paying a fee to 3rd party retailers. It also gives the business owner the ability to add products to the catalog without having to directly modify the website.

This problem is experienced by many small business owners who cannot continually pay to have their site modified by web developers when product changes occur.

Our project solves this problem by storing the catalog in a database and providing an admin interface for the business owners to manage their product catalog. It also addresses the ability to sell directly by incorporating credit card processing using Square's API and no local storage of credit card information.

##What external API's does the site use?
This site uses the Square API for credit card processing and Lob for address verification.

##What technologies does the project utilize?
It also uses several primary technologies including: JSON Web Tokens, ReactJS, PostgreSQL, Material-UI and Materialize, Babel with Brunch, Axios HTTP Library, Secure iFrames and 3rd party credit card processing.

##What was the most valuable piece of user feedback you received?
- Keeping the registration form simple to not scare away new users.
- Keeping the product and site display in plain view.

##What was the biggest technical challenge you had to overcome?
Integrating the payment processing system with React. Square uses JavaScript and secure iFrames to capture the credit card data without storing it on our servers. To initialize those iFrames and prevent memory leaks due to browser events outside the React Synthetic Event system, tying various function calls to the lifecycle hooks provided by React was an intricate and undocumented process.

##What lessons did your team learn as a result of your collaboration?
Having a clear outline of style and functionality and the steps to implement that functionality keeps the team on track.

##Images
###Index Page Top:
![Image of Index Page Top]
(./app/assets/images/IndexPageTop.jpg)

###Index Page Bottom:
![Image of Index Page Bottom]
(./app/assets/images/IndexPageBottom.jpg)

###Registration Page:
![Image of Registration Page]
(./app/assets/images/RegistrationPage.jpg)

###Login Page:
![Image of Login Page]
(./app/assets/images/LoginPage.jpg)

###Cart Page:
![Image of Cart Page]
(./app/assets/images/CartPage.jpg)

###Payment Page:
![Image of Payment Page]
(./app/assets/images/PaymentPage.jpg)

###Thank You Page:
![Image of Thank You Page]
(./app/assets/images/ThankYouPage.jpg)

# Basic Features

- [x] A user should be able to see products
- [x] A logged in user should be able to
  - [x] see the items in their cart
  - [x] add a new product to their cart
  - [x] remove an item from their cart
  - [ ] create an order
- [x] A user should be able to see their orders
- [ ] A user should be able to create an account
- [x] A user should be able to see their past orders
- [ ] A non-logged in user should be able to add to their cart and have those items added to their cart after authenticating
- [x] A user should be able to review a product
- [ ] A user should be able to update their profile
- [ ] An administrator should be able to add a new product

# Bonus Features

- [ ] A user should be able to search for products
- [ ] A user should be able to create a wish list
- [ ] A user should be able to checkout using stripe
- [ ] A user should be able to add a shipping address
- [ ] A user should be able to upload an avatar to their profile
- [ ] An administrator should be able to add a coupon code
- [ ] A user should be able to use a coupon code

# grace-shopper-team-three

TIER 1: MVP SHOPPING EXPERIENCE
AS A CUSTOMER/VISITOR, I WANT TO BE ABLE TO:
[ ] - access a deployed version of the website so I can browse and purchase products.
[x] - view all available products so I can pick from a variety.
[x] - view the details for an individual product (including product descriptions, photos and optionally, reviews), so that I can determine whether that particular item fits my needs
[x] - add a product to my cart so I can collect my desired products in one place.
[x] - edit my cart if I change my mind:
[x] - change the quantity of a product in my cart.
[x] - remove a product in my cart.
[x] - No one else should be able to edit my cart except me.
[x] - "checkout" the items in my cart so I can purchase my desired goods.

Think of a typical user experience on popular websites from a guest user and logged-in user perspective.
[x] - simulate the experience of checking out with a simple confirmation page.
[] -create an account so I can have a logged-in experience.

AS A LOGGED-IN CUSTOMER, I WANT TO BE ABLE TO:
[] - have a persistent cart so I can revisit and pick up where I left off.
[] - Logged-in-user across multiple devices: I'm logged in on my mobile device and add some items to my cart. When I open the browser on my laptop and log in, I want to see those items in my cart.
[] - No one else should be able to edit my cart except me.

AS AN ADMINISTRATOR, I WANT TO BE ABLE TO:
[] - have validated data to ensure reliability.
[] - i.e. each customer that creates an account should only be able to do so once with a single email address.
[] - have full rights to make backend requests to add, edit, and remove products.
[] - No one else should have access to view user information.

[]AS AN ENGINEER, I WANT TO:
[x] - have a well-seeded database so that I am able to simulate a number of different scenarios for the user stories below.
[x] - Likewise, add a bunch of users with products in their carts so editing the cart can be worked on without already having the “add to cart” functionality built out.
[i think done?] - user data to be secure so that no one can unrightfully manipulate information.

TIER 2: E-COMMERCE ESSENTIALS
AS A CUSTOMER, I WANT TO BE ABLE TO:
[ ] - see all products that belong to a certain category.
[ ] - explore an aesthetically pleasing website so I can easily navigate around and enjoy the experience (UI/UX).
[ ] - This includes front-end data validations. For example, if certain fields of a form are required and must be in a specific format, this is obvious to the user.
[ ] - have a persistent cart so I can revisit and pick up where I left off.

There are two more experiences to consider here. Explore your favorite websites to see what the intended behavior is for the following cases:
[ ] - Guest-only: I don't want to create an account, but I want my cart to persist between browser refreshes.
[ ] - Guest-to-logged-in-user: Initially, I'm not logged in, and I add items to my cart. When I eventually log in, I want to see those same items I added when I was logged in still in my cart, in addition to the items I may have had in my cart from a previous logged in session.

AS A LOGGED-IN CUSTOMER, I WANT TO BE ABLE TO:
[ ] - see my order history so I can remember my previously purchased items and their prices at the time of purchase.
[ ] - view and edit my user profile so I can update my information when necessary.

AS AN ADMINISTRATOR, I WANT TO BE ABLE TO:
[ ] - allow customers to have a variety of payment method options in order to increase checkout conversion.
[ ] - Begin by integrating Stripe
[ ] - For client side, use Stripe's prebuilt Checkout Links to an external site. form, ideally with the "Custom" strategy. We recommend react-stripe-checkout Links to an external site. in this case. Build a custom form and communicate with Stripe & your server via Stripe.js Links to an external site..
[ ] - For server side, use the stripe Links to an external site. npm library (API docs here Links to an external site., tutorial here Links to an external site.) to accept tokens from your front-end app and send charges via the Stripe API.
[ ] - have access to a dashboard with the following functionality:
[ ] - create and edit products with name, description, price and one or more photos, so that visitors can see the latest info on what we have to offer
[ ] - create categories for items, so that users can continue to have useful filters as our inventory grows in variety
[ ] - manage the availability of a product, so that users will know whether or not they can purchase that product
[ ] - view a list of all orders and be able to filter orders by status (Created, Processing, Cancelled, Completed), so that I can more easily find the orders I'm interested in
[ ] - change the status of the order (Created -> Processing, Processing -> Cancelled || Completed), so that others will know what stage of the process the order is in
[ ] - promote other user accounts to have admin status, so that new administrators can have the same privileges I have
[ ] - delete a user, so users who should not be able to log in anymore cannot
[ ] - AS AN ENGINEER, I WANT:
[ ] - continuous integration and delivery (deployment) Links to an external site. of the codebase so that there are lower rates of release failure.

TIER 3: EXTRA FEATURES & FLAIR
AS AN ADMINISTRATOR, I WANT TO BE ABLE TO:
[ ] - trigger password reset for a user (that is, the next time they successfully log in with their old password, they are prompted for a new one), so that I can be proactive in getting users to change their passwords after a period of time
[ ] - ensure accurate product inventory so that we can be sure only available products are sold.
[ ] - For example, when a customer purchases an item, the quantity available is appropriately deducted.
[ ] - Likewise, if a customer attempts to purchase a higher quantity of an item that is available, they will be alerted/notified that there isn't enough inventory.
[ ] - offer customers discounts through promo codes so that we can incentivize purchases.
[ ] - AS A CUSTOMER, I WANT TO BE ABLE TO:
[ ] - log in through third-party authentication so I can avoid creating an account specific to the website. For example, Google OAuth.
[ ] - RECEIVE NOTIFICATIONS
[ ] - receive an email confirmation when placing an order so that I can easily reference it when needed without visiting my account.
[ ] - be notified when certain events occur so that I am informed of my actions.
[ ] - For example, when I add a product to my cart, there is a toast notification that pops up in the corner of the page with an appropriate message for that action.
[ ] - HAVE A USER-FRIENDLY EXPERIENCE
[ ] - filter through all products.
[ ] - This is an opportunity to dive into a "search" input field. You can filter all products using vanilla JavaScript, or look into Algolia (search-as-a-service).
[ ] - browse through all products in a digestible way so that I am not overwhelmed with an endless list of products.
[ ] - Dive into pagination here!
[ ] - This goes back to the initial seed in Tier 1. If you have a database seeded with thousands of products, there shouldn't be any blockers in order to tackle this user story. It also begs the question of whether we should fetch all of the products from the database or limit the response in intervals (e.g. 25 at a time) and show more only through a user action (e.g. clicking a “Next”/”Show More” button).
[ ] - Keep in mind, if you already have the product filter feature built out, can you get pagination to work on the results as well?
[ ] - view featured products so that I can get inspiration.
[ ] - For example, display the five most purchased products within a given period of time (i.e. yesterday or last week), or the most recently added products.
[ ] - add products to a wishlist so that I can differentiate products I would like to purchase now (cart) versus products I might be interested in purchasing in the future (wishlist).
[ ] - HAVE A SEAMLESS EXPERIENCE
[ ] - navigate the website successfully regardless of whether or not I am handicapped so that my experience isn't hampered.
[ ] - This is a great opportunity to dive into ADA Compliance (screen-reader friendliness, keyboard navigation, colorblind-friendly, etc.).
[ ] - A11y ChecklistLinks to an external site.
[ ] - view a display to know when content is loading or there is an error so that I can manage my expectations.
[ ] - For example, loading spinners while the frontend is waiting for a backend response.
[ ] - As a customer, if I visit a product page that doesn't exist, notify me that it doesn't and bring me to all products. Likewise, if I visit a page that outright doesn't exist, navigate me to the landing page.

TIER 4: EVEN MORE
AS A CUSTOMER, I WANT TO BE ABLE TO:
post products to my social media accounts so that I can share with my friends/followers.
For example, integrating Facebook to create a post of a product's name, description, photo and link.
receive recommended products so that I can have a customized user experience and get inspiration.
For example, based on products viewed (similar products; matching "tags").
AS AN ADMINISTRATOR, I WANT TO BE ABLE TO:
visualize relevant KPIs (key performance indicators) in the admin dashboard so that I can make educated business decisions.
For example, a line graph of total sales over time.

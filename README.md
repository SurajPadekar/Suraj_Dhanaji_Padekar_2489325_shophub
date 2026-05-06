
# ShopHub

ShopHub is a React-based e-commerce storefront built with Create React App. It fetches products from the Fake Store API, supports login with demo credentials, lets users browse product categories, add items to a cart, and view a protected cart page with an order summary.

## Features

- Login page with demo credentials
- Products page that loads items from `https://fakestoreapi.com/products`
- Category filtering and product listing
- Add-to-cart functionality with quantity controls
- Protected cart page only accessible after login
- Cart summary with subtotal, tax estimate, and total

## Demo Credentials

- Email: `demo@shop.com`
- Password: `demo123`

## Setup

1. Clone the repository
	```bash
	git clone <repository-url>
	cd Suraj_Dhanaji_Padekar_2489325_shophub
	```
2. Install dependencies
	```bash
	npm install
	```
3. Start the development server
	```bash
	npm start
	```
4. Open the app at
	```bash
	http://localhost:3000
	```

## Build for Production

```bash
npm run build
```

## Environment Variables

This project does not require any additional environment variables to run locally. The app uses the public Fake Store API for product data.

If you want to configure a custom API endpoint in the future, create a `.env` file at the project root and add variables like:

```env
REACT_APP_API_URL=https://your-api-endpoint.com
```

## Deployed App

Deployed app: `https://REPLACE_WITH_DEPLOYED_APP_URL`

> Replace the URL above with the actual deployed site once available.

## Repository

GitHub repo: `https://github.com/SurajPadekar/Suraj_Dhanaji_Padekar_2489325_shophub`

## Notes

- The cart page is protected and redirects to login if the user is not authenticated.
- Login state is stored in browser `localStorage` using a simple demo token.


# 🍔 Stellar Burger

**Stellar Burger** is a web application that simulates a restaurant ordering system. Users can create custom burgers using drag-and-drop functionality, place orders, and view their personal order history alongside public order activity in real time.

## Features

-  **Build Your Burger**: Drag and drop ingredients to build your perfect burger.
-  **Order Simulation**: Submit your order and simulate a preparation process, complete with real-time feedback via WebSocket.
-  **Personal Account**: Create an account to manage your orders and profile.
-  **Live Order Feed**: View live updates of all user orders using WebSocket connection.
-  **User-Specific History**: Access and track your own order history through your account.

##  Tech Stack

- **TypeScript**
- **React**
- **Redux**
- **WebSocket**
- **React DnD (Drag and Drop)**
- **Jest** for unit testing
- **Cypress** for end-to-end testing

##  Deployment

The project is deployed using **GitHub Pages**.

🔗 [Live Demo](https://irinarakhimova.github.io/Stellar_burgers/#/)


##  Installation

```bash
git clone https://github.com/your-username/stellar-burger.git
cd stellar-burger
npm install
npm start 
```
##  Testing

- **Run unit tests:**
```npm test```

- **Run end-to-end tests:**
```npx cypress open```

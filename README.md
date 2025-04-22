# POS
# POS Application (Point of Sale System)

## Overview

This project is a Point of Sale (POS) application designed to handle customer transactions efficiently. It provides features like invoice generation, bill tracking, and customer management.

## Features

* **🛒 Invoice Generation:** Create detailed customer invoices with ease.
* **💳 Billing Management:** Track, store, and manage comprehensive billing records.
* **📊 Customer Data Handling:** Securely store and retrieve customer details and their transaction history.
* **🖨️ Print Invoices:** Generate printable receipts for customers using the `react-to-print` library.
* **🔄 Real-time Data Fetching:** Fetch and display bill information dynamically via API calls.
* **🎨 Clean UI:** Enjoy a smooth and responsive user interface built with the Ant Design component library.

## Technologies Used

* **Frontend:**
    * **React.js:** A JavaScript library for building user interfaces.
    * **Redux:** A predictable state management library.
    * **Axios:** A promise-based HTTP client for making API requests.
    * **Ant Design:** A rich set of UI components for React.
    * **react-to-print:** A React component for print functionality.
* **Backend:**
    * **Node.js:** A JavaScript runtime environment.
    * **Express:** A minimal and flexible Node.js web application framework.
* **Database:**
    * **MongoDB:** A NoSQL database for storing application data, including bills.

## Installation

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/Rohitthorave12/POS-APP.git
    cd POS-application
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

    This command installs all the necessary frontend and backend dependencies listed in the `package.json` files.

3.  **Start the Server:**

    ```bash
    npm start
    ```

    This command typically starts both the frontend development server and the backend API server concurrently (depending on your `scripts` configuration in `package.json`). Ensure the backend is running to handle API requests from the frontend. You might need to navigate to separate `client` and `backend` directories and run `npm start` in each if they are set up that way.

## Usage

1.  **Navigate to the POS dashboard:** Once the frontend application is running, open your web browser and navigate to the specified URL (usually `http://localhost:3000` or a similar address).
2.  **Click on Invoice List to view bills:** Use the application's navigation to access the page displaying the list of bills fetched from the backend.
3.  **Select a bill to view details:** Click on a specific bill in the list to view its detailed information.
4.  **Print the invoice for customers using the Print button:** Locate the "Print" button associated with a bill and click it to generate a printable version of the invoice. This functionality is powered by the `react-to-print` library.

## API Endpoints

The backend API provides the following endpoints for interacting with bill data:

* **`GET /api/bills/get-bills`**: Fetches all bills stored in the database.
* **`POST /api/bills/create-bill`**: Adds a new bill to the database. The request body should contain the necessary bill data in JSON format.
* **`DELETE /api/bills/:id`**: Deletes a specific bill from the database based on its unique ID. Replace `:id` with the actual ID of the bill to be deleted.


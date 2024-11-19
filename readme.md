# Roxiler System Assessment Frontend-Backend

**Submitted by:**  
**Name:** Abhinav Anil Thube  
**PRN:** 121B1B249  
**Institution:** PCCOE  

---

## Backend Task

### Data Source
- **Third Party API URL:** `https://s3.amazonaws.com/roxiler.com/product_transaction.json`  
- **Request Method:** `GET`  
- **Response Format:** `JSON`  

---

### API Endpoints and Requirements

1. **Initialize Database API**
   - **Description:** Fetches data from the third-party API and seeds the database with the required structure.
   - **Instruction:** Design an efficient table/collection structure for storing transaction data.

---

2. **Transactions Listing API**
   - **Endpoint:** `/sales`
   - **Method:** `GET`
   - **Description:**
     - Returns a paginated list of transactions.
     - Supports search functionality on `title`, `description`, or `price`.
     - If the search parameter is empty, returns all records for the given page.
   - **Parameters:**
     - `month` (January to December)
     - `search_q` (optional, for searching transactions)
     - `page` (pagination, default: `1`)
   - **Output:** Transactions for the selected month.

---

3. **Statistics API**
   - **Endpoint:** `/statistics`
   - **Method:** `GET`
   - **Description:** Returns the following statistics for the selected month:
     - Total sale amount.
     - Total number of sold items.
     - Total number of unsold items.
   - **Parameters:** `month`


---

4. **Bar Chart API**
   - **Endpoint:** `/bar-chart`
   - **Method:** `GET`
   - **Description:** Provides data for the bar chart, categorized by price range for the selected month.
   - **Price Ranges:**
     - 0-100, 101-200, 201-300, 301-400, 401-500, 501-600, 601-700, 701-800, 801-900, and 901-above.
   - **Parameters:** `month`


---

5. **Pie Chart API**
   - **Endpoint:** `/pie-chart`
   - **Method:** `GET`
   - **Description:** Fetches unique categories and the number of items in each category for the selected month.
   - **Example Output:**
     - `X Category`: 20 items
     - `Y Category`: 5 items
     - `Z Category`: 3 items
   - **Parameters:** `month`


---

6. **Combined API**
   - **Endpoint:** `/combined-data`
   - **Method:** `GET`
   - **Description:** Combines the responses of `/statistics`, `/bar-chart`, and `/pie-chart` into a single JSON object.
   - **Parameters:** `month`

---

## Frontend Task

### Features and Requirements

1. **Transactions Table**
   - Uses the `/sales` API to list transactions in a table.
   - Features:
     - Dropdown to select months (January to December).  
     - Default selected month: March.
     - Supports search functionality (by `title`, `description`, or `price`).
     - Pagination:
       - **Next Button:** Loads the next page's data.
       - **Previous Button:** Loads the previous page's data.
   ![Roxiler System](./frontend/screen%20shots/transaction.jpg)


---

2. **Transactions Statistics**
   - Uses the `/statistics` API.
   - Displays:
     - Total sales amount.
     - Total sold items.
     - Total unsold items.
   - Updates dynamically based on the selected month.
![Roxiler System](./frontend/screen%20shots/statistics.jpg)


---

3. **Transactions Bar Chart**
   - Uses the `/bar-chart` API.
   - Displays the distribution of items across price ranges.
   - Updates dynamically based on the selected month.
   ![Roxiler System](./frontend/screen%20shots/barChart.jpg)


---

4. **Transactions Pie Chart**
   - Uses the `/pie-chart` API.
   - Displays unique categories and their corresponding item counts.
   - Updates dynamically based on the selected month.
   ![Roxiler System](./frontend/screen%20shots/PieChart.jpg)


---

## Instructions
1. **Backend Setup:**
   - Run `npm install` to install dependencies.
   - Use the `serve` script to start the backend server.
   - Ensure the database is seeded using the Initialize Database API.

2. **Frontend Setup:**
   - Run `npm install` to install dependencies.
   - Use `npm start` to start the frontend server.
   - Ensure the frontend is correctly configured to point to the backend API.

3. **Testing:**
   - Verify all APIs are functional and return correct responses.
   - Ensure the frontend displays accurate data based on API responses.

---

## Developer Notes
- **Name:** Abhinav Anil Thube  
- **PRN:** 121B1B249  
- **GitHub Repository:** [(https://github.com/Abhithube01/Roxiler-121B1B249)]  

--- 

Feel free to reach out for any queries!

const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant Management API",
      version: "1.0.0",
      description: `
Welcome to the Restaurant Management API!  
This API allows you to manage **users, managers, restaurants, menus, and orders** in a real-time restaurant system.

🔹 **Features:**
- Role-Based Access Control: Manager, Waiter, Chef, Cashier
- Automatic Calculations: SubTotal & TotalAmount auto-calculated
- Table Status Management: Updated based on order operations
- JWT Authentication: Secure token-based access
- Bcrypt: make User Password are more Protected
- Ownership Validation: GET, PUT, DELETE operations validate restaurant ownership

## 🔐 Authentication & Security (JWT + bcrypt)

### 🔑 JWT Authentication
- After successful login, server generates a **JWT token**
- Token is required for all protected APIs

**Authorization Header Format:**
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

**How to use in Swagger UI:**
1. Call Login API
2. Copy JWT token from response
3. Click **Authorize 🔒** (top-right)
4. Paste token (**without writing Bearer**)

---

### 🔒 bcrypt Password Protection
- Passwords are **never stored in plain text**
- Passwords are hashed using **bcrypt**
- Login uses \`bcrypt.compare()\` for verification

**Flow:**
\`\`\`
Password → bcrypt.hash() → Database
Login → bcrypt.compare() → JWT Token
\`\`\`

---

## 👤 USER LOGIN CREDENTIALS ⚠️

⚠️ **IMPORTANT – READ THIS FIRST!**

Your **User account** is created with the following credentials:

**Username (Email):** \`user@gmail.com\`  
**Password:** \`user@123\`

### 🧪 How to Use
1. Call \`/auth/user/login\`
2. Get JWT token
3. Authorize Swagger
4. Access User APIs





🔹 **Role Permissions:**

 1) Manager:Full access to own restaurant. Can manage users, restaurants, menu categories,
menu items, orders, and order items, Cannot access other restaurants' data.

 2) Waiter:
Can view tables, orders, and items; can create orders and order items. 
Cannot edit/delete orders.  

 3) Chef: Can view orders and items; can update order status ('preparing' or 'served'). Cannot create/edit orders. 

 4) Cashier: Can view orders and items; can update order status to 'paid' and table status to 'free'. Cannot create/edit orders.  

🔹 **Automatic Behaviors:**
- Orders: Table status set to 'occupied' on creation, 'free' when paid.
- Order Items: SubTotal = Quantity × MenuItemPrice; TotalAmount auto-updates on change.
- Restaurant Isolation: All operations filtered by RestaurantID from JWT token. Unauthorized access returns 403 Forbidden.

📚 **Student Guide & Documentation**



    Full guide with setup, frontend integration, and API usage
 [API Quick Reference (Markdown)](http://localhost:3000/docs/api-reference.html)
    Quick reference table with endpoints, methods, and role access

🚀 **Getting Started:**
1. Login via /users/login to get JWT token.
2. Click "Authorize" in Swagger UI and paste token.
3. Test endpoints using "Try it out".

💡 **Key Learning Points:**
- JWT Authentication for all protected endpoints
- Restaurant isolation using RestaurantID from token
- Role-based permissions enforcement
- Automatic SubTotal & TotalAmount calculations
- Proper error handling (401, 403, 404, etc.)

🎯 **Project Deliverables Checklist:**
- CRUD for users, managers, restaurants, menu categories/items, orders, order items
- Role-based navigation and access control
- SubTotal & TotalAmount auto-calculation
- Responsive UI & proper frontend integration
      `,
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            UserID: { type: "integer", example: 1 },
            UserName: { type: "string", example: "John Doe" },
            Email: { type: "string", example: "john@example.com" },
            Password: { type: "string", example: "********" },
            IsActive: { type: "integer", example: 1 },
            Created: { type: "string", format: "date-time" },
            Modified: { type: "string", format: "date-time" },
          },
          required: ["UserName", "Email", "Password"],
        },
    
     
        Restaurant: {
          type: "object",
          properties: {
            table_id: { type: "integer", example: 1 },
            table_number: { type: "string", example: "1" },
            capacity: { type: "string", example: "2" },
            status: { type: "string", example: "Padding" },
            
          },
          required: ["table_id", "table_number", "capacity"],
        },
   
        
        MenuCategory: {
          type: "object",
          properties: {
            category_id: { type: "integer", example: 1 },
            name: { type: "integer", example: "starters" },
            status: { type: "string", example: "active" },
          },
          required: ["category_id","name","status"],
        },
        MenuItem: {
          type: "object",
          properties: {
            itemID: { type: "integer", example: 1 },
            category_id: { type: "integer", example: 1 },
            name: { type: "string", example: "Margherita Pizza" },
            description: { type: "string", example: "Classic cheese pizza" },
            price: { type: "number", example: 249.0 },
            image: { type: "integer", example: "https:///abdvcgsw.jpg" },
          },
          required: ["item_id", "category_id", "name"],
        },
        Order: {
          type: "object",
          properties: {
            OrderID: { type: "integer", example: 1 },
            coustomer_id: { type: "integer", example: 1 },
            waiter_id: { type: "integer", example: 1 },
            total_Amount: { type: "number", example: 499.0 },
            status: { type: "string", format: "served" },
            created_at: { type: "string", format: "date-time" },
          },
          required: ["orderID", "coustomerID", "waiterid", "TotalAmount"],
        },
        
        OrderItem: {
          type: "object",
          properties: {
            OrderItemID: { type: "integer", example: 1 },
            OrderID: { type: "integer", example: 1 },
            ItemID: { type: "integer", example: 2 },
            Quantity: { type: "integer", example: 2 },
            Price: { type: "number", example: 498.0 },
          },
          required: ["OrderID", "ItemID", "Quantity", "Price"],
        },
         Payment: {
          type: "object",
          properties: {
            payment_id: { type: "integer", example: 1 },
            OrderID: { type: "integer", example: 1 },
            cashier_id: { type: "integer", example: 2 },
            payment_method: { type: "integer", example: 2 },
            amount: { type: "number", example: 498.0 },
            payment_status: { type: "string", format: "paid" },
            created_at: { type: "string", format: "date-time" },

          },
          required: ["paymentID", "orderID", "cashier_id", "amount"],
        },
      },
       
    },
    
    security: [{ bearerAuth: [] }],
  },

  apis: [path.join(__dirname, "../routes/*.js")],
});

module.exports = swaggerSpec;

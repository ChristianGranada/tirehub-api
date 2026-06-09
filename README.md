TireHub API

Backend API inspired by ServiceTitan, designed for tire retreading companies to manage clients, work orders, tires, and production processes.

Project Overview

TireHub is a management platform focused on the tire retreading industry. The goal is to digitize and centralize operational processes such as:

Client management
Work order creation
Tire tracking
Production scheduling
User authentication and authorization

This API serves as the backend layer of the platform and provides RESTful endpoints for managing business data.

Technologies Used
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT Authentication
bcryptjs
Git & GitHub
Project Structure
config/
controllers/
models/
routes/

app.js
package.json
README.md
Current Models
Client

Represents a company or customer that sends tires for retreading.

Fields:

companyName
nit
contactName
phone
email
address
active
Tire

Represents an individual tire.

Fields:

internalCode
brand
size
serialNumber
status
client
WorkOrder

Represents a production order associated with a client and one or more tires.

Fields:

client
tire
observations
status
cost
User

Represents system users.

Fields:

nombre
email
password
rol

Roles:

usuario
admin

Passwords are securely hashed using bcrypt before storage.

Authentication

JWT-based authentication has been implemented.

Register User

POST

/api/auth/register

Request Example:

{
  "nombre": "Cristian Granada",
  "email": "cristian@email.com",
  "password": "123456"
}

Response:

{
  "exitoso": true,
  "mensaje": "Usuario registrado exitosamente",
  "token": "jwt_token"
}
Client Endpoints
Get All Clients
GET /api/clients
Get Client By ID
GET /api/clients/:id
Create Client
POST /api/clients
Update Client
PUT /api/clients/:id
Delete Client
DELETE /api/clients/:id
Tire Endpoints
Get All Tires
GET /api/tires
Get Tire By ID
GET /api/tires/:id
Create Tire
POST /api/tires
Update Tire
PUT /api/tires/:id
Delete Tire
DELETE /api/tires/:id
Work Order Endpoints
Get All Work Orders
GET /api/work-orders
Get Work Order By ID
GET /api/work-orders/:id
Create Work Order
POST /api/work-orders
Update Work Order
PUT /api/work-orders/:id
Delete Work Order
DELETE /api/work-orders/:id
Future Development

Planned features include:

Role-based permissions
Production scheduling module
Tire process tracking
Progress indicators
Rejection codes management
Inspection records
Dashboard and analytics
Notifications
Angular frontend
Multi-user environment
Author

Cristian Granada

Software Development Student

TireHub Project
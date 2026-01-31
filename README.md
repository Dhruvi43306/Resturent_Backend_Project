
# 🍽️ Restaurant Management System — Backend

<p align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">
</p>

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" />
  <br>
  <br>
  <code><strong>Production-Ready API</strong></code> • <code><strong>RBAC Protected</strong></code> • <code><strong>Layered Architecture</strong></code>
</div>

---
## 💎 System Role Based
<div align="center">
<table>
  <tr>
    <td align="center"><b>Manager</b><br><h3>Handle Resturent</h3></td>
    <td align="center"><b>Chef</b><br><h3>Handle Cooking</h3></td>
    <td align="center"><b>Waiter</b><br><h3>Serve the Cook</h3></td>
    <td align="center"><b>Cashier</b><br><h3>Send the Bill for Coustomer</h3></td>
  </tr>
</table>
</div>

---
## 🔐 Security & Logic Flow
The backend follows a strict execution pipeline to ensure data integrity and secure access.



### 🔄 Internal Processing Pipeline
```mermaid
graph TD
    A[🔒 Request + JWT] --> B{🛡️ Auth Middleware}
    B -->|Verified| C[👤 Role Validator]
    C -->|Authorized| D[🛣️ Express Route]
    D --> E[⚙️ Service Layer]
    E --> F[🎮 Model]
    F --> G[🗄️ MySQL Model]

    G -->|Bcrypt Check| H[(Database)]
    
    style A fill:#f9f,stroke:#333
    style H fill:#4479A1,stroke:#fff,color:#fff
    style B fill:#ff9,stroke:#333

# Visitor Analytics

A full-stack web application that visualizes visitor analytics using **Django REST Framework** (backend) and **Angular** (frontend).

---
## 🚀 Setup Instructions

### ✅ Backend (Django + DRF)

1.Navigate to the backend directory:
   ```bash
   cd backend
   ```
2.Create and activate a virtual environment:
  ```bash
  python -m venv venv
 # Windows
 venv\Scripts\activate
 # macOS/Linux
 source venv/bin/activate
 ```
3.Install dependencies:
```bash
pip install -r requirements.txt
```
4.Run migrations:
```bash
python manage.py migrate
```
5.Create a superuser (optional for admin access):
```bash
python manage.py createsuperuser
```
6.Start the server:
```bash
python manage.py runserver
```
API will run at: http://localhost:8000
### ✅ Frontend (Angular)

1.Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2.Install dependencies:
```bash
npm install
```
3.Start the Angular development server:
```bash
ng serve
```
App will run at: http://localhost:4200
### 🧪 Features

- 📊 Dashboard with visitor charts  
- 📅 Filtering by date, floor, and report type  
- 🔐 JWT-based user login  
- 🚫 Protected dashboard route (only accessible to authenticated users)  
- 📱 Responsive UI for all devices  
### 📦 Dependencies

#### 🔙 Backend:
- Django
- Django REST Framework
- django-cors-headers
- mysqlclient 

#### 🔜 Frontend:
- Angular 18+
- Bootstrap 5
- Angular Material
- ng2-charts
- jwt-decode





# Tutoring Management System (TMS)

## 📝 Project Overview
This full-stack application is a personal project designed to streamline the management of private tutoring services. It provides a professional solution for organizing student records, teacher specialties, and lesson schedules in one centralized system.

The application allows users to perform full **CRUD** operations (Create, Read, Update, Delete), ensuring that all educational data is managed efficiently and accurately.



## 🚀 Key Features & Requirements
This project strictly follows the technical requirements for a complete web application:
* **Backend Architecture**: Developed with **Spring Boot** using a layered approach.
* **Database Management**: Uses **PostgreSQL** with a schema of 4 interconnected tables.
* **Data Relationships**: Implements Many-to-One and One-to-Many relationships between Teachers, Students, Courses, and Lessons.
* **Testing & Reliability**: Verified with a suite of **JUnit 5** tests for both business logic and data persistence.
* **Modern Interface**: Features a dynamic frontend built with **React.js** for optimal user experience (UX).

## 🛠️ Tech Stack
### Backend
* **Language**: Java 25
* **Framework**: Spring Boot 4.0.1
* **Database**: PostgreSQL 16+
* **Persistence**: Spring Data JPA / Hibernate
* **Testing**: JUnit 5, Mockito

### Frontend
* **Library**: React.js 18+
* **Styling**: Tailwind CSS
* **API Client**: Axios

## 📂 Project Structure
```text
Tutoring-Management-System/
│
├── backend/                 
│   ├── src/
│   │   ├── main/java/       (Controllers, Services, Entities)
│   │   ├── main/resources/  (application.properties, schema.sql)
│   │   └── test/            (JUnit tests)
│   ├── pom.xml              (Maven dependencies)
│   ├── mvnw                 (Maven Wrapper for Windows/Linux)
│   ├── mvnw.cmd             (Maven Wrapper for Windows)
│   
├── frontend/               
│   ├── src/                 (Components and App.jsx)
│   ├── public/              (Images, logos)
│   ├── package.json         (React Frameworks)
│   ├── vite.config.js       (Config Vite)
│   
└── README.md              
```
## ⚙️ Local Setup
To run this project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/yourusername/tutoring-management-system.git](https://github.com/yourusername/tutoring-management-system.git)
   ```
### 🗄️ Database Setup
1. Create a **PostgreSQL** database named `tutoring_db`.
2. Update the `application.properties` file located in `backend/src/main/resources/` with your local database credentials:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
### 🚀 Run the Backend
Navigate to the backend directory and start the Spring Boot application:
```bash
cd backend
./mvnw spring-boot:run
```

### 💻 Run the Frontend
Open a new terminal window, navigate to the frontend directory, and start the React development server:
```bash
cd frontend
npm install
npm run dev

```

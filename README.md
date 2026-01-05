# Tutoring Management System (TMS)

## Project Overview
This full-stack application is a professional solution designed to streamline the management of private tutoring services. It centralizes student records, teacher specialties, and lesson schedules into one cohesive system.

Built with a focus on security and user experience, the system enables educational organizations to maintain accurate data and improve communication between staff and parents.


## Key Features & Requirements

* **Advanced Dashboard**: Dynamic charts providing a statistical overview of students, teachers, and active courses.
* **Role-Based Access Control (RBAC)**:
   * **Admin**: Full control over the system, user management, and global scheduling.
   * **Teacher**: Personalized views for their own classes, students, and daily schedules.
* **Appointment Management System**:
   * **Internal Agenda**: Staff can manage parent-teacher meetings.
   * **Public Booking**: A dedicated, non-authenticated page for parents to request meetings.
* **Secure Authentication**:
    * Password encryption using **BCrypt**.
    * Functional **Forgot Password** workflow allowing teachers to request a reset from the Admin.
* **Attendance Tracking**: Digital attendance logs with detailed historical reports for every student.
* **Modern UI/UX**: Responsive design built with **Tailwind CSS**, featuring **Shadcn UI** components and real-time **Sonner** notifications.
 
## Tech Stack

### Backend
* **Language**: Java 25
* **Framework**: Spring Boot 4.0.1
* **Security**: Spring Security (Basic Auth + BCrypt)
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
   git clone [https://github.com/AndreasAvgou/Tutoring-Management-System.git](https://github.com/AndreasAvgou/Tutoring-Management-System.git)
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







<div align="center">
  
  <img src="https://github.com/user-attachments/assets/e8bbcff9-4201-4149-b298-e893ae0ddc84" alt="Tutoring-Management-System" width="30%">

  # Tutoring System 

  <p>
    <img src="https://img.shields.io/badge/Java-25-orange?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java"/>
    <img src="https://img.shields.io/badge/Spring_Boot-4.0.1-brightgreen?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot"/>
    <img src="https://img.shields.io/badge/PostgreSQL-18+-blue?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
    <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
    <a href="https://github.com/AndreasAvgou/Tutoring-Management-System/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-purple?style=for-the-badge" alt="License"/>
    </a>
  </p>

  <video src="https://github.com/user-attachments/assets/1770ce90-3b8c-4e7f-a40d-d48bad7e629d" width="750" controls></video>

</div>

## 🌟 Overview

This full-stack application is a professional solution designed to streamline the management of private tutoring services. It centralizes student records, teacher specialties, and lesson schedules into one cohesive system.

Built with a focus on security and user experience, the system enables educational organizations to maintain accurate data and improve communication between staff and parents.


## 📘 Features & Requirements

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
 
## 🧰 Tech Stack

### Backend
* **Language**: Java 25 (LTS)
* **Framework**: Spring Boot 4.0.1
* **Security**: Spring Security (Basic Auth + BCrypt)
* **Database**: PostgreSQL 18+
* **Persistence**: Spring Data JPA / Hibernate
* **Testing**: JUnit 5, Mockito

### Frontend
* **Library**: React.js 18+ (Vite)
* **Styling**: Tailwind CSS, Shadcn UI
* **Icons**: Lucide React
* **API Client**: Axios

## 🗂 Structure

```text
Tutoring-Management-System/
│
├── backend/                  
│   ├── src/
│   │   ├── main/java/        (Controllers, Services, Entities, Security Config)
│   │   ├── main/resources/   (application.properties, schema.sql)
│   │   └── test/             (JUnit tests)
│   ├── .gitignore            (Backend ignore rules)
│   ├── mvnw                  (Maven Wrapper for Linux/macOS)
│   ├── mvnw.cmd              (Maven Wrapper for Windows)
│   └── pom.xml               (Project Object Model & Dependencies)
│
├── frontend/
│   ├── public/               (Tutoring-Management-System.svg)
│   ├── src/
│   │   ├── components/       (Reusable Logic & UI & Shadcn base components: Button, Card, etc.)
│   │   ├── views/            (AttendanceView, CoursesView, StudentsView, TeachersView, PublicBookingPage, SettingsView)
│   │   ├── App.jsx           (Main Logic)
│   │   ├── main.jsx          (Entry Point)
│   │   └── index.css         (Tailwind Styles)
│   ├── .gitignore            (Git ignore rules)
│   ├── components.json       (Shadcn UI Configuration)
│   ├── eslint.config.js      (Linting Rules)
│   ├── index.html            (HTML Entry Point)
│   ├── jsconfig.json         (Path Mapping Configuration)
│   ├── package.json          (Scripts & Dependencies)
│   ├── package-lock.json     (Dependency Lock)
│   ├── tailwind.config.js    (Tailwind CSS Configuration)
│   └── vite.config.js        (Development & Build Tool)
│
└── README.md
```

## 🚀 Setup & Installation

To run this project locally, follow these steps:

**Clone the Repository**:

```powershell
git clone [https://github.com/AndreasAvgou/Tutoring-Management-System.git](https://github.com/AndreasAvgou/Tutoring-Management-System.git)
```
   
### 1️⃣ Database Setup (PostgreSQL)

The system requires PostgreSQL (v18+) to manage data.
1. **Download & Install**: Download PostgreSQL from the [official website](https://www.postgresql.org/download/). During installation, set a password for the default `postgres` user.

2. **Create Database**: Open **pgAdmin 4** or your terminal and run the following command to create the database:

 ```sql
 CREATE DATABASE tutoring_db;
  ```

3. Open `backend/src/main/resources/application.properties` and update it with your local credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tutoring_db
spring.datasource.username=your_username 
spring.datasource.password=your_password
```
    
### 2️⃣ Run the Backend (Spring Boot)

Navigate to the backend directory and start the Spring Boot application:

 ```powershell
cd backend
```
```powershell
mvn spring-boot:run
```

The API will be available at http://localhost:8080/api

### 3️⃣ Run the Frontend (React + Vite)

Open a new terminal window, navigate to the frontend directory, and start the React development server:

```powershell
cd frontend
npm install
```
```powershell
npm install @tailwindcss/vite -D
npm run dev
```

The app will be available at http://localhost:5173

| Role | Username | Password |
| ---------- | ---------- | ---------- |
| Administrator | admin   | admin123 |


## 💡 Troubleshooting 

### 1. Fix Missing Tailwind Styles (Vite 7 + Tailwind v4)
If the app loads but looks like "plain HTML" (no styling), the Tailwind compiler is likely disconnected. Run this command again:

```powershell
npm install @tailwindcss/vite -D
```
### 2. Force Cache Clear
If your CSS changes are not appearing, force Vite to rebuild the cache:

```powershell
npx vite --force
```

### 3. Database error

* **Port Check**: Ensure PostgreSQL is running on port `5432` (the default).
* **Automatic Table Creation**: You don't need to create tables manually. The backend is configured to create them automatically the first time you run the Spring Boot application.
* **Permissions**: If you get an "Access Denied" error, double-check that the username and password in your properties file match what you set during the PostgreSQL installation.

### 4. Apache Maven & Java Environment Variables

If you see an error like `'mvn' is not recognized` or Maven fails to start, you need to add Maven and Java to your system's Environment Variables:

1. **Set JAVA_HOME**:
   - Ensure you have **JDK 25** installed.
   - Add a new System Variable: `JAVA_HOME` with the path to your JDK folder (e.g., `C:\Program Files\Java\jdk-25`).
2. **Configure Path Variable**:
   - Find the **Path** variable in System Variables and click **Edit**.
   - Add the path to your Apache Maven `bin` folder (e.g., `C:\apache-maven\bin`).
   - Add the path to your JDK `bin` folder (e.g., `%JAVA_HOME%\bin`).
3. **Verify**: Open a new terminal and type:

   ```powershell
   mvn -version
   java -version
    ```

## 📜 License

This application is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.





















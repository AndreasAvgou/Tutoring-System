-- 1. Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    specialty VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    role VARCHAR(50)
);

-- 2. Users Table (BCrypt Passwords)
-- One-to-One with Teachers
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Length 255 for BCrypt hash
    role VARCHAR(50),
    teacher_id BIGINT UNIQUE,
    CONSTRAINT fk_user_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);

-- 3. Students Table 
CREATE TABLE IF NOT EXISTS students (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20)
);

-- 4. Courses Table 
-- Many-to-One with Teacher
CREATE TABLE IF NOT EXISTS courses (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    day_of_week VARCHAR(50),
    lesson_time VARCHAR(50),
    teacher_id BIGINT,
    CONSTRAINT fk_course_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL
);

-- 5. Student_Courses Table 
-- Many-to-Many Students and Courses
CREATE TABLE IF NOT EXISTS student_courses (
    student_id BIGINT,
    course_id BIGINT,
    PRIMARY KEY (student_id, course_id),
    CONSTRAINT fk_jt_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_jt_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 6. Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL,
    present BOOLEAN DEFAULT FALSE,
    student_id BIGINT,
    course_id BIGINT,
    CONSTRAINT fk_attendance_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_attendance_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 7. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    notes TEXT,
    start_date_time TIMESTAMP NOT NULL,
    end_date_time TIMESTAMP,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, CONFIRMED, CANCELLED
    student_id BIGINT,
    teacher_id BIGINT,
    CONSTRAINT fk_app_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL,
    CONSTRAINT fk_app_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL
);

-- 8. Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
    id BIGSERIAL PRIMARY KEY,
    scheduled_time TIMESTAMP NOT NULL,
    duration_minutes INTEGER,
    status VARCHAR(50) DEFAULT 'SCHEDULED',
    course_id BIGINT,
    student_id BIGINT,
    CONSTRAINT fk_lesson_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT fk_lesson_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 9. Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id BIGINT PRIMARY KEY DEFAULT 1,
    institution_name VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    address VARCHAR(255),
    CONSTRAINT check_single_row CHECK (id = 1) 
);

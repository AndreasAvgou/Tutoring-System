-- 1. Teachers Table: Stores information about the instructors
CREATE TABLE IF NOT EXISTS teachers (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    specialty VARCHAR(100)
);

-- 2. Students Table: Stores information about the students
CREATE TABLE IF NOT EXISTS students
(
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    grade_level VARCHAR(50) -- Represents the academic level
);

-- 3. Courses Table: Defines subjects and links them to a specific teacher
-- Relationship: Many Courses can be taught by One Teacher (Many-to-One)
CREATE TABLE IF NOT EXISTS courses
(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    teacher_id BIGINT,
    CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL
);

-- 4. Lessons Table: Manages appointments between students and courses
-- Relationship: Links Students and Courses (Many-to-One for both)
CREATE TABLE IF NOT EXISTS lessons (
    id BIGSERIAL PRIMARY KEY,
    appointment_date TIMESTAMP NOT NULL,
    duration_minutes INTEGER,
    status VARCHAR(50) DEFAULT 'SCHEDULED', -- Status can be SCHEDULED, COMPLETED, or CANCELLED
    student_id BIGINT,
    course_id BIGINT,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
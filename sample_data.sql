-- Προσθήκη Καθηγητών
INSERT INTO teachers (full_name, specialty, email) VALUES 
('Νίκος Παπαδόπουλος', 'Μαθηματικά', 'nikos@example.com'),
('Ελένη Γεωργίου', 'Φυσική', 'eleni@example.com');

-- Προσθήκη Μαθητών
INSERT INTO students (full_name, class_level, phone) VALUES 
('Γιάννης μικρός', 'Β Λυκείου', '6900000000'),
('Μαρία Σιδέρη', 'Γ Λυκείου', '6911111111');

-- Προσθήκη Μαθημάτων
INSERT INTO courses (title, description) VALUES 
('Άλγεβρα', 'Βασικές αρχές εξισώσεων'),
('Μηχανική', 'Νόμοι του Νεύτωνα');
USE employees;

INSERT INTO department
    (name)

VALUES
    ('Admin'),
    ('Legal'),
    ('Accounting'),
    ('Legal'),
    ('Public Relations');

INSERT INTO role
    (title, salary, department_id)

VALUES
    ('Legal Secretary', 45000, 1),
    ('Paralegal', 50000, 2),
    ('Accountant', 90000, 3),
    ('Attorney', 200000, 4),
    ('HR Manager', 85000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)

VALUES
    ('Betty', 'Boop', 1, NULL),
    ('Roger', 'Rabbit', 2, NULL),
    ('Charlie', 'Brown', 3, NULL),
    ('Bart', 'Simpson', 4, NULL),
    ('Squidward', 'Tentacles', 5, NULL)
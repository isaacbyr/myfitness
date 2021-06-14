CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(75) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE foodLog (
    id SERIAL PRIMARY KEY,
    food_name VARCHAR(50) NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(20),
    protein DECIMAL NOT NULL,
    calories DECIMAL NOT NULL,
    user_id INT,
    FOREIGN KEY(user_id)
        REFERENCES users(id) ON DELETE cascade ON UPDATE cascade
);
CREATE TABLE workoutlog (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    muscle_group VARCHAR(20) NOT NULL,
    excercise VARCHAR(20) NOT NULL,
    reps INTEGER NOT NULL,
    num_sets INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    notes VARCHAR(40) DEFAULT '--',
	user_id INT,
    FOREIGN KEY(user_id)
        REFERENCES users(id) ON DELETE cascade ON UPDATE cascade
);

CREATE TABLE IF NOT EXISTS parking_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guest_name TEXT NOT NULL,
    room_number INTEGER NOT NULL,
    license_plate TEXT NOT NULL,
    parking_spot INTEGER NOT NULL,
    check_in_date TEXT NOT NULL,
    check_out_date TEXT NOT NULL,
    parking_fee INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
-- You can definitly improve this login system by adding more security features like hashing the password, adding salt, and implementing token-based authentication.
INSERT OR IGNORE INTO users (
    id,
    username,
    password
)
VALUES (
    1,
    'username',
    'password'
);
-- Drop tables if they exist
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS matchs;

-- Create concerts table
CREATE TABLE concerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    available_tickets INT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

-- Create bookings table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    match_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    number_of_tickets INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (match_id) REFERENCES matchs(id)
);

-- Insert sample concert data
INSERT INTO concerts (title, venue, date, price, available_tickets, image_url) VALUES
('INDONESIA VS BAHRAIN', 'GELORA BUNG KARNO', '2025-03-15 19:00:00', 500000.00, 14234, '/images/idnvsbhr.jpg'),
('ARAB SAUDI VS INDONESIA',  'LUSAIL STADIUM, New Jersey', '2025-04-01 20:00:00', 450000.00, 36750, '/images/idnvsarb.jpeg'),
('INDONESIA VS JEPANG', 'JAKARTA INTERNATIONAL STADIUM', '2025-05-20 19:30:00', 750000.00, 81000, '/images/idnvsjpg.jpg'),
('CHINA VS INDONESIA', 'QINGDAO YOUTH STADIUM', '2025-06-10 18:00:00', 300000.00, 180, '/images/idnvschn.jpg'),
('INDONESIA VS VIETNAM', 'GELORA BUNG KARNO', '2025-07-05 19:00:00', 250000.00, 250, '/images/idnvsviet.jpeg'),
('INDONESIA VS ARGENTINA', 'GELORA BUNG KARNO', '2025-08-15 20:00:00', 3000000.00, 220, '/images/idnvsarg.jpeg');

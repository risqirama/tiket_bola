<?php
header('Content-Type: text/plain');
include_once '../config/database.php';

echo "Checking database connection and data...\n\n";

try {
    // Check  table
    $result = $conn->query("SELECT COUNT(*) as count FROM matchs");
    $row = $result->fetch_assoc();
    echo "Number of matchs in database: " . $row['count'] . "\n\n";

    // Show all match
    $result = $conn->query("SELECT * FROM matchs");
    echo "match details:\n";
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row['id'] . "\n";
        echo "Title: " . $row['title'] . "\n";
        echo "Artist: " . $row['artist'] . "\n";
        echo "Available tickets: " . $row['available_tickets'] . "\n";
        echo "Price: $" . $row['price'] . "\n";
        echo "------------------------\n";
    }

    // Check bookings table structure
    $result = $conn->query("SHOW COLUMNS FROM bookings");
    echo "\nBookings table structure:\n";
    while ($row = $result->fetch_assoc()) {
        echo $row['Field'] . " - " . $row['Type'] . "\n";
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

$conn->close();
?>

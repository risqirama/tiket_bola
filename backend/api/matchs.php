<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../config/database.php';

try {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        
        $query = "SELECT * FROM matchs WHERE id = ?";
        $stmt = $conn->prepare($query);
        
        if (!$stmt) {
            throw new Exception("Failed to prepare query: " . $conn->error);
        }
        
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $match = $result->fetch_assoc();
        
        if ($match) {
            echo json_encode($matchs);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "match not found"));
        }
    } else {
        $query = "SELECT * FROM matchs";
        $result = $conn->query($query);
        
        if (!$result) {
            throw new Exception("Failed to fetch matchs: " . $conn->error);
        }
        
        $matchs = array();
        while ($row = $result->fetch_assoc()) {
            $matchs[] = $row;
        }
        
        echo json_encode($matchs);
    }
} catch (Exception $e) {
    error_log("Error in matchs.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(array("message" => "Error fetching match data: " . $e->getMessage()));
}

$conn->close();
?>

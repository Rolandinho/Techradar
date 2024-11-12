<?php
// Inkludera din db-konfiguration
require_once('db.php'); // Anslutning till db via db.js

// Säkerställ att POST-data är mottagen
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $category = $_POST['category'];
    $status = $_POST['status'];
    $description = $_POST['description'];

    // Validera inkommande data
    if (empty($title) || empty($category) || empty($status) || empty($description)) {
        http_response_code(400); // Fel: dålig begäran
        echo json_encode(["message" => "Alla fält är obligatoriska."]);
        exit;
    }

    // Förbered SQL-frågan
    $query = "INSERT INTO radar_entries (title, category, status, description) VALUES (?, ?, ?, ?)";

    // Använd prepared statement för säkerhet
    $stmt = $db->prepare($query);
    $stmt->bind_param("ssss", $title, $category, $status, $description);

    // Kör SQL-frågan och kontrollera om det lyckades
    if ($stmt->execute()) {
        http_response_code(200); // OK
        echo json_encode(["message" => "Radar entry tillagd!"]);
    } else {
        http_response_code(500); // Internt serverfel
        echo json_encode(["message" => "Fel vid tillägg av radar entry."]);
    }

    // Stäng statement
    $stmt->close();
}
?>

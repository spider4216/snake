<?php

$filename = 'scores.json';
$path = __DIR__ . '/points/';
$fullPath = $path . $filename;

if (file_exists($fullPath)) {
    $content = file_get_contents($fullPath);
    echo json_encode($content);
}

echo false;

?>
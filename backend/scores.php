<?php

$score = $_POST['score'];
$name = $_POST['name'];

$filename = 'scores.json';
$path = __DIR__ . '/points/';
$fullPath = $path . $filename;

$content = '';

if (file_exists($fullPath)) {
    $content = file_get_contents($fullPath);
}

$contentArray = json_decode($content, true);
$contentArray[] = [
    'name' => $name,
    'score' => $score,
];


if(file_put_contents($fullPath, json_encode($contentArray))) {
    echo 'true';
} else {
    echo 'false';
}

?>
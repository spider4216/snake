<?php

$name = $_POST['name'];

$filename = 'scores.json';
$path = __DIR__ . '/points/';
$fullPath = $path . $filename;

if (!file_exists($fullPath)) {
    return false;
}

$content = file_get_contents($fullPath);

if (empty($content)) {
    return false;
}

$contentARR = json_decode($content, true);

$result = [];
$pattern = '/^'. $name .'/';

foreach ($contentARR as $element) {
    if (preg_match($pattern, $element['name'])) {
        $result[] = [
            'name' => $element['name'],
            'score' => $element['score'],
        ];
    }
}

if (empty($result)) {
    return false;
}

echo json_encode($result);

?>
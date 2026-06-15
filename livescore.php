<?php

header('Content-Type: application/json');

$matches = [
    "4627904" => "15/06/2026",
    "4703528" => "16/06/2026",
    "4627932" => "17/06/2026"
];

$allGames = [];

foreach ($matches as $matchId => $date) {

    $url = "https://webws.365scores.com/web/games/allscores/?" .
        http_build_query([
            "appTypeId" => 5,
            "langId" => 1,
            "timezoneName" => "Asia/Kolkata",
            "userCountryId" => 80,
            "sports" => 1,
            "startDate" => $date,
            "endDate" => $date,
            "showOdds" => "true",
            "withTop" => "true"
        ]);

    $json = @file_get_contents($url);

    if (!$json) {
        continue;
    }

    $data = json_decode($json, true);

    if (!isset($data['games'])) {
        continue;
    }

    foreach ($data['games'] as $game) {
        if ((string)$game['id'] === (string)$matchId) {
            $allGames[] = $game;
        }
    }
}

echo json_encode([
    "games" => $allGames
]);

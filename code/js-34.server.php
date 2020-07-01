<?php

header('content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

function curlRequest($url) {

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13');
    $resultData = curl_exec($curl);
    curl_close($curl);

    return $resultData;

}

$url = $_GET['url'];

$data = curlRequest('https://suo.im/api.htm?url=' . $url . '&key=XXXXXXXXXXXXXXXX');

die(json_encode([
    'url' => $data
]));

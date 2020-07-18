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

$kw = rawurlencode($_GET['kw']);

$data = curlRequest('https://jikipedia.com/search?phrase=' . $kw);

preg_match_all('/对不起！小鸡词典暂未收录该词条\.\.\./', $data, $error_data);

if(count($error_data[0]) > 0) {
    die(json_encode([
        'status'    => 0,
        'data'      => '暂未收录'
    ]));
}

preg_match_all('/plaintext:"(.*?)"/', $data, $match_data);

if(count($match_data[0]) === 0) {
    die(json_encode([
        'status'    => 0,
        'data'      => '未知错误'
    ]));
}

die(json_encode([
    'status'    => 1,
    'data'      => $match_data[1][0]
]));
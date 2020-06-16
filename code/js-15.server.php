<?php

header('content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

// CURL请求
function curlRequest($url) {

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13');
    $resultData = curl_exec($curl);
    curl_close($curl);

    return $resultData;

}

$kw = rawurlencode($_GET['kw']);

$data = curlRequest('https://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=zh_CN&q=' . trim($kw));

echo $data;
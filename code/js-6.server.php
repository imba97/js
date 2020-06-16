<?php
 
header('content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');
 
function curlRequest($ipUrl) {
 
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $ipUrl);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13');
    $resultData = curl_exec($curl);
    curl_close($curl);
 
    return $resultData;
 
}
 
$kw = rawurlencode($_GET['kw']);
 
$data = curlRequest('https://baike.baidu.com/item/' . $kw);
 
$resultJsonArray = array(
    'status'  => 0,
    'content' => '无百科或其他错误'
);
 
preg_match_all('/百度百科错误页/', $data, $pregError);
 
if($pregError[0][0] !== NULL) {
    $resultJsonArray['status'] = 1;
    $resultJsonArray['content'] = '这个我是懂的，但我没有查到，这很可能是C国搞的鬼。';
    die(json_encode($resultJsonArray));
}
 
preg_match_all('/<meta name="description" content="(.*)"/', $data, $pregData);
 
if(isset($pregData) && $pregData[1][0] !== NULL) {
    $resultJsonArray['status']  = 1;
    $resultJsonArray['content'] = $pregData[1][0];
}
 
die(json_encode($resultJsonArray));
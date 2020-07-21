<?php

header('content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);
$rankingDataModify = $redis->get('rankingDataModify');
if($rankingDataModify === date('Ymd', time())) {
    $redis->close();
    die($redis->get('rankingData'));
}

function curlRequest($url)
{

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

define('DS', DIRECTORY_SEPARATOR);
define('__ROOT__', realpath('./'));

$imageDirName = 'ranking_images';
$imageDirPath = __ROOT__ . DS . $imageDirName;

if(!is_dir($imageDirPath)) mkdir($imageDirPath);

function getImage($imageUrl) {

    global $imageDirPath;
    global $imageDirName;

    preg_match('/[a-z0-9]{40}\.(jpe?g|png|webp)$/', $imageUrl, $imageFileNamePreg);
    $imagePath = $imageDirPath . DS . $imageFileNamePreg[0];

    if(!file_exists($imagePath)) {
        $imageData = curlRequest($imageUrl);
        $imageFile = fopen($imagePath, 'w');
        fwrite($imageFile, $imageData);
        fclose($imageFile);
    }

    return '//' . $_SERVER['SERVER_NAME'] . preg_replace('/[a-zA-Z0-9_]+\.php$/', '', $_SERVER['PHP_SELF']) . $imageDirName . '/' . $imageFileNamePreg[0];
}

$videosInfoTemp = array();
$videosSort = array();
$videosInfo = array();

getChannelInfo(1);

function getChannelInfo($page) {
    global $videosInfoTemp;
    global $videosSort;

    $channelUrl = 'https://api.bilibili.com/x/space/channel/video?mid=2198461&cid=132081&pn=1&ps=100&order=0&jsonp=jsonp';
    $data = curlRequest($channelUrl);
    $arr = json_decode($data, true);
    if(count($arr['data']['list']['archives']) === 0) {
        return false;
    }
    foreach($arr['data']['list']['archives'] as $videoInfo) {
        $videosInfoTemp['a'.$videoInfo['aid']] = [
            'aid'       => $videoInfo['aid'],
            'pic'       => getImage($videoInfo['pic']),
            'title'     => $videoInfo['title'],
            'view'      => $videoInfo['stat']['view'],
            'like'      => $videoInfo['stat']['like'],
            'coin'      => $videoInfo['stat']['coin'],
            'favorite'  => $videoInfo['stat']['favorite'],
        ];
        // 播放 = 1分； 点赞 = 2分； 硬币 = 5分； 收藏 = 3分；
        $videosSort['a'.$videoInfo['aid']] = $videoInfo['stat']['view'] + ($videoInfo['stat']['like'] * 2) + ($videoInfo['stat']['coin']*5) + ($videoInfo['stat']['favorite']*3);
    }
    if(count($arr['data']['list']['archives']) < 100) return false;
    getChannelInfo(++$page);
}

array_multisort($videosSort, SORT_DESC);
foreach($videosSort as $key => $val) {
    $videosInfo[] = $videosInfoTemp[$key];
}

$resultJsonData = json_encode($videosInfo);
$resultModifyTime = date('Ymd', time());

$redis->set('rankingDataModify', $resultModifyTime);
$redis->set('rankingData', $resultJsonData);
$redis->close();

die($resultJsonData);

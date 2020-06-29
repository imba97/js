<?php

header('content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

sleep(3);

die(json_encode([
  'success' => rand(0, 1)
]));
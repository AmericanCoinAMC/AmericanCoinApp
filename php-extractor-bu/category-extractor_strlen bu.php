<?php

/**
 * Created by PhpStorm.
 * User: cem
 * Date: 05-Aug-16
 * Time: 11:44 AM
 */

require_once('domparser/simple_html_dom.php');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$key = $request -> key;

if($key == 'L&klcm^r89AAgdTr852uyYt5'){
    $sourceName = $request -> sourceName;
    $url = $request -> url;
    $selector = $request -> selector;


    $html = file_get_html($url);

    $content = $html -> find($selector,0);

    if($content == NULL){
        if($sourceName == 'Prodavinci'){
            $html = file_get_contents($url);
            $html = gzdecode($html);
            $html = str_get_html($html);
            $content = $html -> find($selector,0);
        }
    }

    $urlArray = [];

    foreach($content->find('a') as $element){
        if($sourceName == 'Caraota Digital' && strlen($element -> href) > 80){
            $urlArray[] = $element -> href;
        }else if($sourceName == 'La Patilla' && strlen($element -> href) > 80){
            $urlArray[] = $element -> href;
        }else if($sourceName == 'Globovisión' && strlen($element -> href) > 50){
            $urlArray[] = 'http://globovision.com' . $element -> href;
        }else if($sourceName == 'El Nacional' && strlen($element -> href) > 40){
            $pos = strpos($element -> href,'.json');
            if($pos === false){
                $urlArray[] = 'http://www.el-nacional.com' . $element -> href;
            }
        }else if($sourceName == 'El Universal' && strlen($element -> href) > 50){
            $url = str_replace('#eu-listComments', '', $element -> href);
            $urlArray[] = $url;
        }else if($sourceName == 'RunRunes' && strlen($element -> href) > 50){
            $urlArray[] = $element -> href;
        }else if($sourceName == 'Analítica' && strlen($element -> href) > 50){
            $urlArray[] = $element -> href;
        }else if($sourceName == 'Tal Cual' && strlen($element -> href) > 50){
            $urlArray[] = 'http://www.talcualdigital.com' . $element -> href;
        } else if($sourceName == 'El Nuevo Herald' && strlen($element -> href) > 80){
            $url = str_replace('#navlink=SecList', '', $element -> href);
            $url = str_replace('#navlink=Lead', '', $url);
            $urlArray[] = $url;
        }
    }

    $duplicatesRemoval = array_unique($urlArray);

    $cleanArray = array_values($duplicatesRemoval);


    $result = array(
        'result' => $cleanArray
    );


    echo json_encode($result);
}else{
    $result = array(
        'result' => 'INVALID_KEY'
    );

    echo json_encode($result);
}


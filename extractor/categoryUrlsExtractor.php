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
    $url = $request -> url;
    $sourceName = $request -> sourceName;
    $parentSelector = $request -> parentSelector;
    $childSelector = $request -> childSelector;

    $urlArray = [];

    $html = file_get_html($url);

    if($sourceName == 'El Pitazo'){
        $content = $html -> find($childSelector,1);
    }else{
        $content = $html -> find($childSelector,0);
    }

    if($content == NULL){
        if($sourceName == 'Prodavinci'){
            /*
             * For gzipped content
             * */
            $html = file_get_contents($url);
            $html = gzdecode($html);
            $html = str_get_html($html);
            $content = $html->find($parentSelector, 0)->find($childSelector, 0);
        }
    }


    foreach($content->find('a') as $element){
        if($sourceName == 'Caraota Digital'){
            $pos = strpos($element -> href,'category');
            if($pos === false){
                $urlArray[] = $element -> href;
            }
        }else if($sourceName == 'La Patilla'){
            $pos = strpos($element -> href,'secciones');
            if($pos === false){
                $urlArray[] = $element -> href;
            }
        }else if($sourceName == 'Globovisión'){
            $pos = strpos($element -> href,'twitter');
            if($pos === false){
                if(strlen($element -> href) > 5){
                    $urlArray[] = 'http://globovision.com' . $element -> href;
                }
            }

        }else if($sourceName == 'El Nacional'){
            $pos = strpos($element -> href,'http');
            if($pos !== false){
                $urlArray[] = $element -> href;
            }
        }else if($sourceName == 'El Universal'){
            $pos = strpos($element -> href,'http');
            if($pos !== false){
                $url = str_replace('#eu-listComments', '', $element -> href);
                $urlArray[] = $url;
            }
        }else if($sourceName == 'NotiTotal'){
            $pos = strpos($element -> href,'category');
            if($pos === false){
                $urlArray[] = $element -> href;
            }
        }else if($sourceName == 'RunRunes'){
            $pos = strpos($element -> href,'category');
            if($pos === false){
                $pos = strpos($element -> href,'author');
                if($pos === false){
                    $urlArray[] = $element -> href;
                }
            }
        }else if($sourceName == 'El Pitazo'){
            $urlArray[] = $element -> href;
        }else if($sourceName == 'El Nuevo Herald'){
            $pos = strpos($element -> href,'article');
            if($pos !== false){
                $url = str_replace('#navlink=SecList', '', $element -> href);
                $url = str_replace('#navlink=Lead', '', $url);
                $urlArray[] = $url;
            }
        }else if($sourceName == 'Últimas Noticias'){
            $pos = strpos($element -> href,'http');
            if($pos !== false){
                $urlArray[] = $element -> href;
            }
        }
    }

    $duplicatesRemoval = array_unique($urlArray);
    $cleanArray = array_values($duplicatesRemoval);

    echo json_encode(array(
        'result' => 'SUCCESS',
        'value' => $cleanArray
    ));
}else{
    echo json_encode(array(
        'result' => 'ERROR',
        'value' => 'INVALID_KEY'
    ));
}


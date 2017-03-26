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

if($key == 'Aa252a1aaBM551100rRtaKjP'){
    $url = $request -> url;
    $sourceName = $request -> sourceName;
    $parentSelector = $request -> parentSelector;
    $childSelector = $request -> childSelector;


    $html = file_get_html($url);

    $content = $html -> find($childSelector,0);

    if($content == NULL){
        if($sourceName == 'Prodavinci'){
            $html = file_get_contents($url);
            $html = gzdecode($html);
            $html = str_get_html($html);
            $content = $html -> find($childSelector,0);
        }
    }

    /*
     * Converts extraction into a String
     * */

    $content = (string)$content;
    $content = trim($content);

    /*
     * Removes Styles
     * */
    $content = preg_replace('/style=(["\'])[^\1]*?\1/i', '', $content);


    /*
     * Removes Other attributes
     * */

    $content = preg_replace('/data-para-count=(["\'])[^\1]*?\1/i', '', $content);
    $content = preg_replace('/data-total-count=(["\'])[^\1]*?\1/i', '', $content);
    $content = preg_replace('/tabindex=(["\'])[^\1]*?\1/i', '', $content);


    /*
     * Removes useless scripts
     * */

    $content = preg_replace('#<style(.*?)>(.*?)</style>#is', '', $content);
    $content = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $content);
    $content = preg_replace('#<noscript(.*?)>(.*?)</noscript>#is', '', $content);



    /*
     * Removes asides
     * */

    $content = preg_replace('#<aside(.*?)>(.*?)</aside>#is', '', $content);
    $content = preg_replace('#<ins(.*?)>(.*?)</ins>#is', '', $content);

    $content = str_replace('src="//','src="http://',$content);

    $content = str_replace('<iframe src="http://','<iframe src="https://',$content);
    $content = str_replace('<iframe  src="http://','<iframe src="https://',$content);

    if($sourceName == 'El Universal'){
        $content = utf8_encode($content);
    }

    elseif($sourceName == 'Venezolana de Televisión' || $sourceName == 'Prodavinci'){
        $content = preg_replace('#<img(.*?)>(.*?)#is', '', $content);
    }

    $content = str_replace('<a','<a target="_blank" ',$content);

    $content = str_replace('<p></p>','',$content);$content = str_replace('<p> </p>','',$content);$content = str_replace('<p>  </p>','',$content);
    $content = str_replace('<p>&nbsp;</p>','',$content);


    echo json_encode(array(
        'result' => 'SUCCESS',
        'value' => $content
    ));
}else{
    echo json_encode(array(
        'result' => 'ERROR',
        'value' => 'INVALID_KEY'
    ));
}


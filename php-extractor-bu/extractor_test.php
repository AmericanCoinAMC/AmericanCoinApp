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

$sourceName = $request -> sourceName;
$url = 'http://www.eluniversal.com/noticias/internacional/urosa-savino-madre-teresa-representa-las-grandes-virtudes-cristianas_495739';
$selector = 'div.note-text';


$html = file_get_html($url);

$content = $html -> find($selector,0);

/*
 * Converts extraction into a String and Trims it
 * */
$content = (string)$content;
$content = trim($content);


/*
 * Removes Ids, Styles & Classes
 * */
$content = preg_replace('/style=(["\'])[^\1]*?\1/i', '', $content);
/*$content = preg_replace('/class=(["\'])[^\1]*?\1/i', '', $content);
$content = preg_replace('/id=(["\'])[^\1]*?\1/i', '', $content);*/

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

echo $content;

/*
$result = array(
    'result' => $content
);

echo json_encode($result);*/
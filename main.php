<?php

require_once("requetes.php");
require_once("tree.php");

$JS_DIR = "./javascript/json/";

/*
 * Function make_tree
 *
 * This function is the main one: called from the search front-end
 * - make a SPARQL Request on subject
 * - create the tree
 * - convert this tree to JSON
 *
 * @param (string) the request subject
 * @return void
 */
function make_tree($subject){

		// Create tree
		$tree = new tree ;
		$tree->type = "owl:Thing";

		$request = first_request($subject);  // SPARQL Request

		for ($i=0; $i < count($request) ; $i++){
			$tree->addObject($request[$i]);  // First node
		}

		//print_r(get_translation_name("http://fr.dbpedia.org/resource/France","it"));
		// get_all_subclass("owl:Thing");
		//print_r( get_all_wikiLink_of_type("France","http://dbpedia.org/ontology/Agent"));
		$timestamp_debut = microtime(true);
		$tree->auto_complete($subject);  // Get subclasses
		$timestamp_fin = microtime(true); 
		$time = $timestamp_fin - $timestamp_debut;
		echo 'fonction auto-complete : ' . $time . ' secondes.';
		echo "<br/>";

		$timestamp_debut = microtime(true);
		$tree->clean_arbre();
		$timestamp_fin = microtime(true); 
		$time = $timestamp_fin - $timestamp_debut;
		echo 'fonction clean-arbre : ' . $time . ' secondes.';
		echo "<br/>";
		

		$timestamp_debut = microtime(true);
		$tree->translate_tree("fr");
		$timestamp_fin = microtime(true); 
		$time = $timestamp_fin - $timestamp_debut;
		echo 'fonction de translation de larbre : ' . $time . ' secondes.';

		$tree->filterType = $subject;

		echo "<br/>";
		$timestamp_debut = microtime(true);
		$tree->from_tree_2_json(true,0,$subject); 
		$timestamp_fin = microtime(true); 
		$time = $timestamp_fin - $timestamp_debut;
		echo 'fonction tree 2 json : ' . $time . ' secondes.';
	
}




if(isset($_POST['search']))
{
	$search = $_POST['search'];
	echo "recherche : $search";
	make_tree(str_replace(" ","_", $search ));
}


?>
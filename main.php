<?php

require_once("requetes.php");
require_once("tree.php");

$JS_DIR = "./javascript/";

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

	if(file_exists($GLOBALS['JSON_DIR'].$subject.'.json')){
		echo '<script src="'.$GLOBALS['JS_DIR'].'recherche.js" type="text/javascript" language="JavaScript"></script>', 
			 '<script type="text/javascript">',
		     'Search("'.$subject.'");',
		     '</script>';
	}else{

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
		$tree->from_tree_2_json(true,0); 
		$timestamp_fin = microtime(true); 
		$time = $timestamp_fin - $timestamp_debut;
		echo 'fonction tree 2 json : ' . $time . ' secondes.';
	}
}




if(isset($_GET['subject'])){
	make_tree($_GET['subject']);
}else{
	make_tree("France");
}

/*TEST DE SUPPRESSION
$t1 = array();
$t2 = array();

for ($i=0; $i < 10 ; $i++) { 
	array_push($t1, $i);
	array_push($t2, $i+1);
}

print_r($t1);
print_r($t2);

foreach ($t1 as $t1key => $t1value) {
	foreach ($t2 as $t2key => $t2value) 
	{
		$search = array_search( $t1value ,$t2);
		if ($search !== false) 
		{
			unset($t1[$t1key]);
		}	
	}
}

print_r($t1);
print_r($t2);
*/
?>
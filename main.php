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

		// get_all_subclass("owl:Thing");
		// get_all_wikiLink_of_type("France","http://dbpedia.org/ontology/Agent");
		// $tree->auto_complete($subject);  // Get subclasses

		print_r($tree);

		$tree->from_tree_2_json($subject);  // TODO revoir le JSON (manque virgule)
	}
}

if(isset($_GET['subject'])){
	make_tree($_GET['subject']);
}else{
	make_tree("France");
}

?>
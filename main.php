<?php

require_once("requetes.php");
require_once("tree.php");

$tree = new tree ;
$tree->type = "owl:Thing";
$request = first_request("France");

for ($i=0; $i < count($request) ; $i++) 
{ 
	$tree->addObject($request[$i]);
}

#get_all_subclass("owl:Thing");

#get_all_wikiLink_of_type("France","http://dbpedia.org/ontology/Agent");
$tree->auto_complete("France");

print_r($tree);

$tree->from_tree_2_json();




?>
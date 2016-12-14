<?php

ini_set('display_errors', 1); 
error_reporting(E_ALL);
require_once("sparqllib.php");

//renvoie toute les entity pour la 1ere requetes dans un tableau avec indice => wikilink
function first_request($subject)
{
	$tab = array();
	$db = sparql_connect( "http://fr.dbpedia.org/sparql" );
	#if( !$db ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
			
	$sparql = "SELECT ?entity WHERE {
	                        ?entity rdf:type ?type.
	                        ?type rdfs:subClassOf* <http://www.w3.org/2002/07/owl#Thing>.
	                        <http://fr.dbpedia.org/resource/". $subject ."> <http://dbpedia.org/ontology/wikiPageWikiLink> ?entity .
	                       }";                    

	$result = sparql_query( $sparql ); 
	#if( !$result ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
	 
	$fields = sparql_field_array( $result );
	 
	while( $row = sparql_fetch_array( $result ) )
	{
		foreach( $fields as $field )
		{
			array_push($tab, $row[$field]);
		}	
	}
	return $tab;
}

#renvoie toute les sous class de type
# mettre le type dbpedia en entier : http://dbpedia.org/ontology/Agent
# ou owl:Thing
function get_all_subclass($type)
{
	$tab = array();
	#ATTENTION ENDPOINT DIFFERENT
	$db = sparql_connect( "http://dbpedia.org/sparql" );
	#if( !$db ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }

	$sparql = "";

	if ($type == "owl:Thing") 
	{
		$sparql = "
				SELECT ?class
                WHERE {
                        ?class rdfs:subClassOf owl:Thing.
                      }";
	}
	else
	{
		$sparql = "
				SELECT ?class
                WHERE {
                        ?class rdfs:subClassOf <".$type.">.
                      }";
	}

	$result = sparql_query( $sparql ); 
	#if( !$result ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
	 
	$fields = sparql_field_array( $result );
	
	$i = 0 ;
	while( $row = sparql_fetch_array( $result ) )
	{

		foreach( $fields as $field )
		{
			if ($i % 2 == 0) 
			{
				#echo $row[$field];
				#echo "</br>";
				array_push($tab, $row[$field]);
			}
		}	
		$i++;
	}
	return $tab;
}

function get_all_wikiLink_of_type($subject , $string_type )
{
	$tab = array();
	#ATTENTION ENDPOINT DIFFERENT
	$db = sparql_connect( "http://fr.dbpedia.org/sparql" );
	#if( !$db ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }


		$sparql = "
				SELECT ?entity
                WHERE {
                        ?entity rdf:type ?type.
                        ?type rdfs:subClassOf* <". $string_type .">.
                        <http://fr.dbpedia.org/resource/". $subject ."> <http://dbpedia.org/ontology/wikiPageWikiLink> ?entity .
                       }";


	$result = sparql_query( $sparql ); 
	#if( !$result ) { print sparql_errno() . ": " . sparql_error(). "\n"; exit; }
	 
	$fields = sparql_field_array( $result );
	
	$i = 0 ;
	while( $row = sparql_fetch_array( $result ) )
	{

		foreach( $fields as $field )
		{
			if ($i % 2 == 0) 
			{
				#echo $row[$field];
				#echo "</br>";
				array_push($tab, $row[$field]);
			}
		}	
		$i++;
	}
	return $tab;
}


?>
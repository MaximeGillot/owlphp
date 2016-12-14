<?php

require_once("requetes.php");


class tree
{
	# tableau de toute les uri courante
	private $object = array();

	#type courant owl:Thing pour le début
	public $type = "";

	#contient le nombre de $object ainsi que la somme des fils
	private $nbFils = 0;

	#tableau qui cotient les fils
	private $fils = array();


	public function addObject($uri)
	{
		array_push($this->object,$uri);
		$this->nbFils++;
	}



	public function auto_complete($subject)
	{
		$subclass_of_current_class = get_all_subclass($this->type);
		for ($i=0; $i < count($subclass_of_current_class) ; $i++) 
		{ 

			$treeFils = new tree;
			$treeFils->type = $subclass_of_current_class[$i];
			$all_wiki = get_all_wikiLink_of_type($subject,$subclass_of_current_class[$i]);
			for ($j=0; $j < count($all_wiki); $j++)
			{ 
				$treeFils->addObject($all_wiki[$j]);
			}
			array_push($this->fils, $treeFils);
		}
		for ($i=0; $i < count($this->fils) ; $i++) 
		{ 
			if (count($this->fils[$i]->object) > 0 ) 
			{
				$this->fils[$i]->auto_complete($subject);		
			}
		}
	}


	public function from_tree_2_json()
	{
		$file = fopen('test.json', 'a+');
		
		for ($i=0; $i < count($this->object) ; $i++) 
		{ 
			
		}

		for ($i=0; $i < count($this->fils) ; $i++) 
		{ 
			$this->fils[$i]->from_tree_2_json();
		}
	}
}

fputs($file,"t");
?>
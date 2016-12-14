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
		$nb_sub_class = count($subclass_of_current_class);
		for ($i=0; $i < $nb_sub_class ; $i++) 
		{ 
			$all_wiki = get_all_wikiLink_of_type($subject,$subclass_of_current_class[$i]);
			if (count($all_wiki) > 0 ) 
			{
				$treeFils = new tree;
				$treeFils->type = $subclass_of_current_class[$i];

				for ($j=0; $j < count($all_wiki); $j++)
				{ 
					$treeFils->addObject($all_wiki[$j]);

				}
				array_push($this->fils, $treeFils);
			}
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
		fputs($file,"{");

		fputs($file, "\"name\" : \"".$this->type."\",\n");
		fputs($file, "\"description\" : \"\",\n");
		fputs($file, "\"size\" : 3938,\n");
		fputs($file, "\"children\" : [\n");


		if (count($this->object) > 0 ) 
		{
			$nb_object_current = count($this->object);
			for ($i=0; $i < $nb_object_current ; $i++) 
			{ 
				$insert = "";
				$insert.= "{\n";
				$insert.= "\"name\" : \"".$this->object[$i]."\",\n";
				$insert.= "\"description\" : \"\",\n";
				$insert.= "\"size\" : 3938,\n";
				$insert.= "\"children\" : []\n";
				$insert.= "}";
				if ($i < $nb_object_current-1 )
				{
					$insert.= ",\n";
				}
				fputs($file,$insert);
			}
		}
		

		if (count($this->fils) > 0 ) 
		{
			$insert.= ",\n";
		}

		for ($i=0; $i < count($this->fils) ; $i++) 
		{ 
			$this->fils[$i]->from_tree_2_json();
		}
		fputs($file,"]\n");
		fputs($file,"}\n,");
	}
}


?>
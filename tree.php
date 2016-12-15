<?php

require_once("requetes.php");

$JSON_DIR = "./json_files/";  // TODO arborescence selon ontologie ? 

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

	//a revoir 
	public function clean_arbre()
	{
		foreach ($this->fils as  $fils) 
		{
			$tmp = array();
			$tmp = array_diff($this->object , $fils->object);
			$this->object = $tmp;
		}
		

		foreach ($this->fils as $key => $fils)
		 {
			$fils->clean_arbre();
		}
	}

	//permemt de savoir si le fils en cours est le dernier consuler , pour afficher ou non une virgule
	// niveau est juste utiliser pour l'indentation , fixer à 0 de base
	public function from_tree_2_json($last,$niveau)
	{

		echo $this->type;
		/*
		if(isset($filename)){
			$file = fopen($GLOBALS['JSON_DIR'].$filename.'.json', 'a+');
		}else{
			$file = fopen('test.json', 'a+');
		}*/

		$file = fopen('test.json', 'a+');

		$begin = "";
		$begin .= add_tab($niveau) .  "{\n";
		$begin .= add_tab($niveau) .  "\"name\" : \"".$this->type."\",\n";
		$begin .= add_tab($niveau) .  "\"description\" : \"\",\n";
		$begin .= add_tab($niveau) .  "\"size\" : 3938,\n";
		$begin .= add_tab($niveau) .  "\"children\" : [\n";
		fputs($file,$begin);

		/*
		$insert = "";
		if ( (count($this->object) > 0) && (count($this->fils) < 1) ) 
		{
			foreach ($this->object as  $value) 
			{
				$insert.= "{\n";
				$insert.= "\"name\" : \"".$value."\",\n";
				$insert.= "\"description\" : \"\",\n";
				$insert.= "\"size\" : 3938,\n";
				$insert.= "\"children\" : []\n";
				$insert.= "},";
			}
		}

		if (count($this->fils) < 0 ) 
		{
			//supprime le dernier caracter
			$insert = substr($insert,0,strlen($insert)-1);
		}*/

		//fputs($file,$insert);

		for ($i=0; $i < count($this->fils) ; $i++) 
		{ 
			if ($i == count($this->fils)-1) 
			{

				$this->fils[$i]->from_tree_2_json(true,$niveau+1);
			}
			else
			{
				$this->fils[$i]->from_tree_2_json(false,$niveau+1);

			}
		}

		fputs($file,add_tab($niveau)."]\n");
		if ($last == false) 
		{
			fputs($file,add_tab($niveau)."},\n");
		}
		else
		{
			fputs($file,add_tab($niveau)."}\n");
		}
	}
}


function add_tab($int)
{
	$string = "";
	for ($i=0; $i < $int; $i++) { 
		$string.="\t";
	}
	return $string;
}


?>
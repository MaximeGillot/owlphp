<?php

require_once("requetes.php");

$JSON_DIR = "./json_files/";  // TODO arborescence selon ontologie ? 


class tree
{
	# tableau de toute les uri courante
	private $object = array();

	# contient la lsite des object au propre
	private $filterObject = array();

	#type courant owl:Thing pour le début
	public $type = "";

	#contient le type au propre
	public $filterType = "";

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

		foreach ($this->object as $key => $value) 
		{
			if ($this->value_in_double($value) >= 2)
			{
				unset($this->object[$key]);
			}
		}
		
		foreach ($this->fils as $key => $fils)
		{
			$fils->clean_arbre();
		}
	}

	//renplie l'arbre avec des uri propre
	public function translate_tree($langue)
	{
		foreach ($this->object as $key => $value) 
		{
			array_push($this->filterObject, get_translation_name($value,$langue));
		}


		if ($this->type != "owl:Thing") 
		{
			$this->filterType = get_type_translation_name($this->type , $langue);
		}
		

		foreach ($this->fils as $key => $value) 
		{
			$value->translate_tree($langue);
		}
	}

	//determiner si une uri est en double dans l'arbre
	public function value_in_double($uri)
	{
		$nb = 0 ;
		foreach ($this->object as $key => $value)
		 {
			if ($value == $uri) 
			{
				$nb++;
			}
		}

		foreach ($this->fils as $key => $value) 
		{
			$nb += $value->value_in_double($uri);
		}

		return $nb;
	}


	// @last permemt de savoir si le fils en cours est le dernier consuler , pour afficher ou non une virgule , fixer à true par défautl
	// @niveau est juste utiliser pour l'indentation , fixer à 0 de base
	// @filename : nom du fichier à crée
	public function from_tree_2_json($last = true , $niveau = 0 , $filename )
	{

		
		$alphabet = array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
		//$alphabet = array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");

		$file = fopen("javascript/json/".$filename.".json", 'a+');

		$begin = "";
		$begin .= add_tab($niveau) .  "{";

		$begin .= add_tab($niveau) .  "\"name\" : \"".$this->filterType."\",";	

		$begin .= add_tab($niveau) .  "\"description\" : \"\",";
		$begin .= add_tab($niveau) .  "\"size\" : 3938,";
		$begin .= add_tab($niveau) .  "\"children\" : [";
		fputs($file,$begin);

		
		$insert = "";

		if (count($this->filterObject) > 10) 
		{
			foreach ( $alphabet as $lettre ) 
			{
				$lettreTrouver = False ;
				foreach ($this->filterObject as  $value) 
				{
					if ($value[0] == $lettre)
					{
						if ($lettreTrouver == False ) 
						{
							$insert .= "{\n";
							$insert .= "\"name\" : \"".$lettre."\",";	
							$insert .= "\"description\" : \"\",";
							$insert .= "\"size\" : 3938,";
							$insert .= "\"children\" : [";
							$lettreTrouver = True ;
						}

						$insert.= "{\n";
						$insert.= "\"name\" : \"".$value."\",";
						$insert.= "\"description\" : \"\",";
						$insert.= "\"size\" : 3938,";
						$insert.= "\"children\" : []";
						$insert.= "},";
					}
				}

				if ($lettreTrouver == true) 
				{
					$insert = substr($insert,0,strlen($insert)-1);
					$insert .= add_tab($niveau) .  " ] ";
					$insert .= add_tab($niveau) .  " },";
				}
			}
			
		}
		else
		{	
			foreach ($this->filterObject as  $value) 
			{
				$insert.= "{\n";
				$insert.= "\"name\" : \"".$value."\",";
				$insert.= "\"description\" : \"\",";
				$insert.= "\"size\" : 3938,";
				$insert.= "\"children\" : []";
				$insert.= "},";
			}

		}

		if (count($this->fils) == 0 ) 
		{
		//supprime le dernier caracter
		$insert = substr($insert,0,strlen($insert)-1);
		}

		fputs($file,$insert);

		for ($i=0; $i < count($this->fils) ; $i++) 
		{ 
			if ($i == count($this->fils)-1) 
			{

				$this->fils[$i]->from_tree_2_json(true,$niveau+1,$filename);
			}
			else
			{
				$this->fils[$i]->from_tree_2_json(false,$niveau+1,$filename);

			}
		}

		fputs($file,add_tab($niveau)."]");
		if ($last == false) 
		{
			fputs($file,add_tab($niveau)."},");
		}
		else
		{
			fputs($file,add_tab($niveau)."}");
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
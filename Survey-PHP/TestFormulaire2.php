<!--?xml version="1.0" ?-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr">
<head>
<link rel="stylesheet" media="screen" type="text/css" title="Merci" href="merci.css" />

<title> Vérification réponses </title>

</head>
<body>
   

<?php 
    
	echo"<div id=corps>";
    echo"<div class=corps2>";
   echo"</div>";
		
define('LOGIN', "enquete_usage");
define('PASS', "959426");
define('SERVEUR',"mysql.alwaysdata.com");
define('BD',"enquete_usage_bd_usage");

//phpinfo();

//Import du fichier de configuration ayant les acces à la base de données
//Tentative d'établissement de connexion avec le serveur
$connexion = mysql_pconnect(SERVEUR,LOGIN,PASS);
 
//Vérification que la connexion est bien effective
 if(!$connexion){
 echo "Impossible de se connecter au serveur, veuillez vérifier login et mot de passe \n";
 exit;
 }
else {
echo"<h4>Connexion au serveur réussie \n </h4><br/>";
}

//Connexion avec la base de données
if(!mysql_select_db (BD, $connexion)) {
 echo "Impossible de se connecter à la base " . BD . "\n";
 exit;
 }
else {
echo"<h4>Connexion à la base de données '\n " . BD . "'\n réussie \n </h4><br/>";
}

echo"<h1>Récapitulatif de vos réponses</h1>";
    echo"<div class=corps3>";
   echo"</div>";

//Définition num_quest
$q11= mysql_query("SELECT distinct num_quest from item_q where id_itemq like '11%'", $connexion);
$q111 = mysql_fetch_object($q11);
$quest11 = $q111->num_quest;
// echo "$quest11\n <br/>";

$q12= mysql_query("SELECT distinct num_quest from question where num_quest='12'", $connexion);
$q112 = mysql_fetch_object($q12);
$quest12 = $q112->num_quest;
// echo "$quest12\n <br/>";

$q13= mysql_query("SELECT distinct num_quest from item_q where id_itemq like '13%'", $connexion);
$q113 = mysql_fetch_object($q13);
$quest13 = $q113->num_quest;
// echo "$quest13\n <br/>";

$q14= mysql_query("SELECT distinct num_quest from item_q where id_itemq like '14%'", $connexion);
$q114 = mysql_fetch_object($q14);
$quest14 = $q114->num_quest;
// echo "$quest14\n <br/>";

$q21= mysql_query("SELECT distinct num_quest from item_q where id_itemq like '21%'", $connexion);
$q121 = mysql_fetch_object($q21);
$quest21 = $q121->num_quest;
// echo "$quest21\n <br/>";

$q22= mysql_query("SELECT distinct num_quest from item_q where id_itemq like '22%'", $connexion);
$q122 = mysql_fetch_object($q22);
$quest22 = $q122->num_quest;
// echo "$quest22\n <br/>";

$q25= mysql_query("SELECT distinct num_quest from item_q where id_itemq like '24%'", $connexion);
$q125 = mysql_fetch_object($q25);
$quest25 = $q125->num_quest;
// echo "$quest25\n <br/>";

$q26=mysql_query("SELECT distinct num_quest from item_q where id_itemq like '26%'", $connexion);
$q126 = mysql_fetch_object($q26);
$quest26 = $q126->num_quest;
// echo "$quest26\n <br/>";

$q51=mysql_query("SELECT distinct num_quest from item_q where id_itemq like '51%'", $connexion);
$q151 = mysql_fetch_object($q51);
$quest51 = $q151->num_quest;
// echo "$quest51\n <br/>";

$q52= mysql_query("SELECT distinct num_quest from question where num_quest='52'", $connexion);
$q512 = mysql_fetch_object($q52);
$quest52 = $q512->num_quest;
// echo "$quest12\n <br/>";

$q53=mysql_query("SELECT distinct num_quest from item_q where id_itemq like '53%'", $connexion);
$q153 = mysql_fetch_object($q53);
$quest53 = $q153->num_quest;
// echo "$quest53\n </br>";

$q54=mysql_query("SELECT distinct num_quest from item_q where id_itemq like '54%'", $connexion);
$q154 = mysql_fetch_object($q54);
$quest54 = $q154->num_quest;
// echo "$quest54\n </br>";

$q55=mysql_query("SELECT distinct num_quest from item_q where id_itemq like '55%'", $connexion);
$q155 = mysql_fetch_object($q55);
$quest55 = $q155->num_quest;
// echo "$quest55\n </br>";

$q56=mysql_query("SELECT distinct num_quest from item_q where id_itemq like '56%'", $connexion);
$q156 = mysql_fetch_object($q56);
$quest56 = $q156->num_quest;
// echo "$quest56\n </br>";

$q57=mysql_query("SELECT distinct num_quest from item_q where id_itemq like '57%'", $connexion);
$q157 = mysql_fetch_object($q57);
$quest57 = $q157->num_quest;
// echo "$quest57\n </br>";

$q58=mysql_query("SELECT distinct num_quest from item_q where id_itemq like '58%'", $connexion);
$q158 = mysql_fetch_object($q58);
$quest58 = $q158->num_quest;
// echo "$quest58\n </br>";

$q59=mysql_query("SELECT distinct num_quest from item_q where id_itemq like '59%'", $connexion);
$q159 = mysql_fetch_object($q59);
$quest59 = $q159->num_quest;
// echo "$quest59\n </br>";

$q60=mysql_query("SELECT distinct num_quest from item_q where id_itemq like '60%'", $connexion);
$q160 = mysql_fetch_object($q60);
$quest60 = $q160->num_quest;
// echo "$quest60\n </br>";
//Récupération des variables du formulaire (attribut name de l'input)

$qu11 = $_POST['q11'];
$qu12 = $_POST['q12'];
$qu13 = $_POST['q13'];
$qu14 = $_POST['q14'];
$qu21 = $_POST['q21'];
$qu222 = $_POST['q222'];
$qu24 = $_POST['q24'];
$qu244 = $_POST['q244'];
$qu26 = $_POST['q26'];
$qu51 = $_POST['q51'];
$qu52 = $_POST['q52'];
$qu53 = $_POST['q53'];
$qu54 = $_POST['q54'];
$qu55 = $_POST['q55'];
$qu566= $_POST['q566'];
$qu57 = $_POST['q57'];
$qu588 = $_POST['q588'];
$qu599 = $_POST['q599'];
$qu60 = $_POST['q60'];



//$tabQuest = $_POST['tabQuest'];
//Affichage des données du formulaire
//echo "numero question" : $numquest;


echo"<h3>Merci d'avoir répondu à notre questionnaire: Voici vos réponses qui ont été stockées dans un base de données.</h3>";

echo "<h4> Question 1 : $qu11<br/>\n";
echo "Question 2 : $qu12<br/>\n";
echo "Question 3 : $qu13<br/>\n";
echo "Question 4 : $qu14<br/>\n";

echo "Question 5: $qu21<br/>\n";
if ($qu222) {
echo "Question 6: $qu222<br/>\n";
}
if (!isset($_POST['q221'])) $_POST['q221'] = '';
    $exit = '';
        if ($_POST['q221'] == 1) {
        
        if (is_array($_POST['q22']) == true) {
            
            $i = 0;
            foreach ($_POST['q22'] as $key => $value) {
                if ($i == 0) $exit .= $value;
                else $exit .= ', '.$value;
                $i++;
            }
           
            if ($exit != '') {
                
                 $donnee22=explode(",",$exit);
				 foreach ($donnee22 as $qu22) {
			
				echo "Question 6: $qu22<br/>\n";
         }
		 }
			}
        }
		
if ($qu24!='Autre'){
echo "Question 7: $qu24<br/>\n";
}
else{
if ($qu244){
echo "Question 7: $qu244<br/>\n";
}
}
echo "Question 8: $qu26<br/>\n";
echo "Question 9: $qu51<br/>\n";
echo "Question 10: $qu52<br/>\n";

if (!isset($_POST['q531'])) $_POST['q221'] = '';
    $exit = '';
    
    if ($_POST['q531'] == 1) {
            if (is_array($_POST['q53']) == true) {
            $i = 0;
            foreach ($_POST['q53'] as $key => $value) {
                if ($i == 0) $exit .= $value;
                else $exit .= ', '.$value;
                $i++;
            }
            if ($exit != '') {
            $donnee53=explode(",",$exit);
			foreach ($donnee53 as $qu53) {
			echo "Question 11: $qu53<br/>\n";
        }
		}
		}
        }
echo "Question 12: $qu54<br/>\n";
echo "Question 13: $qu55<br/>\n";
if ($qu566) {
echo "Question 14: $qu566<br/>\n";
}
if (!isset($_POST['q561'])) $_POST['q561'] = '';
    $exit = '';
    if ($_POST['q561'] == 1) {
    if (is_array($_POST['q56']) == true) {
            $i = 0;
            foreach ($_POST['q56'] as $key => $value) {
                if ($i == 0) $exit .= $value;
                else $exit .= ', '.$value;
                $i++;
            }
            if ($exit != '') {
                $donnee56=explode(",",$exit);
				foreach ($donnee56 as $qu56) {
				echo "Question 14: $qu56<br/>\n";
        }
		}
		}
        }

echo "Question 15: $qu57<br/>\n";

if ($qu588) {
echo "Question 16: $qu588<br/>\n";
}
if (!isset($_POST['q581'])) $_POST['q581'] = '';
    $exit = '';
    if ($_POST['q581'] == 1) {
    if (is_array($_POST['q58']) == true) {
            $i = 0;
            foreach ($_POST['q58'] as $key => $value) {
                if ($i == 0) $exit .= $value;
                else $exit .= ', '.$value;
                $i++;
            }
            if ($exit != '') {
                 $donnee58=explode(",",$exit);
				 foreach ($donnee58 as $qu58) {
				 echo "Question 16: $qu58<br/>\n";
         }
		 }
			}
        }

if ($qu599) {
echo "Question 17: $qu599<br/>\n";
}
if (!isset($_POST['q591'])) $_POST['q591'] = '';
    $exit = '';
    if ($_POST['q591'] == 1) {
        if (is_array($_POST['q59']) == true) {
            $i = 0;
            foreach ($_POST['q59'] as $key => $value) {
                if ($i == 0) $exit .= $value;
                else $exit .= ', '.$value;
                $i++;
            }
            if ($exit != '') {
                 $donnee59=explode(",",$exit);
				 foreach ($donnee59 as $qu59) {
			     echo "Question 17: $qu59<br/>\n";
        }
		}
		}
        }
echo "Question 18: $qu60<br/>\n </h4>";


// //Insertion dans la table personne du id_pers

$requete = "insert into personne values()";
$resultat= mysql_query($requete,$connexion);
if($resultat) {
// echo "<br/>  La requete d'insertion de l'IDP a été effectuée avec succes. \n <br/>"; 
}
else {
echo " la requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion) ;
}


// Insertion dans la table reponse
//Récupération de l'ID de la personne pour le stocker en clé étrangère
 $requeteIDP = "select max(id_pers) from personne";
 $resultat= mysql_query($requeteIDP,$connexion);

if($idPers=mysql_result($resultat,0,"max(id_pers)")){
echo "<br/><h4>Votre identifiant dans notre base de données est:  $idPers \n <br/><br/></h4>";
 }
  else {
   echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

//Récupération du numéro de la question pour le stocker en clé étrangère


//Je n'ai pas trouvé comment faire pour récupérer facilement le numéro de question

//Stockage de l'ID de la personne et du numero de la question dans la table Réponse, exemple pour
//les 4 questions du questionnaire (pas du tout générique)

// Insertion de la réponse à la question 11
 $requete = "insert into reponse(num_quest, id_pers) VALUES ($quest11,$idPers)";
 $resultat= mysql_query($requete,$connexion);


//Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);

if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest11 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération du numéro de réponse \n";
   }

$requete1 = "insert into item_r(texte, numero_reponse) VALUES ('$qu11', $idRep)"; 
$resultat= mysql_query($requete1,$connexion);
if($resultat) {
  // echo ", la requete de la question $quest11 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }
 

//Insertion de la réponse à la question 12
$requete = "insert into reponse(num_quest, id_pers) VALUES ($quest12,$idPers)";
 $resultat= mysql_query($requete,$connexion);


//Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);

if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest12 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération du numéro réponse \n";
   }

$requete2 = "insert into item_r(texte, numero_reponse) VALUES ('$qu12', $idRep)"; 
$resultat= mysql_query($requete2,$connexion);
if($resultat) {
  // echo ", la requete de la question $quest12 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }

//Insertion de la réponse à la question 13
$requete = "insert into reponse(num_quest, id_pers) VALUES ($quest13,$idPers)";
 $resultat= mysql_query($requete,$connexion);

//Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);

if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest13 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

$requete3 = "insert into item_r(texte, numero_reponse) VALUES ('$qu13', $idRep)"; 
$resultat= mysql_query($requete3,$connexion);
if($resultat) {
  // echo ", la requete de la question $quest13 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }


// Question 14 = Question 4
$requete = "insert into reponse(num_quest, id_pers) VALUES ($quest14,$idPers)";
 $resultat= mysql_query($requete,$connexion);

//Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);

if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest14 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

$requete4 = "insert into item_r(texte, numero_reponse) VALUES ('$qu14',$idRep)"; 
$resultat= mysql_query($requete4,$connexion);
if($resultat) {
  // echo ", la requete de la question $quest14 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }
 
// Question 21 = Question 5
$requete = "insert into reponse(num_quest, id_pers) VALUES ($quest21,$idPers)";
 $resultat= mysql_query($requete,$connexion);

//Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);

if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest21 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

$requete21 = "insert into item_r(texte, numero_reponse) VALUES ('$qu21',$idRep)"; 
$resultat= mysql_query($requete21,$connexion);
if($resultat) {
  // echo ", la requete de la question $quest21 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }
 
// Question 22= Question 6
 $requete = "insert into reponse(num_quest, id_pers) VALUES ($quest22,$idPers)";
 $resultat= mysql_query($requete,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat6= mysql_query($requeteIDR,$connexion);

if($idRep=mysql_result($resultat6,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest22 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

   if($qu222){
   $requete22 = "insert into item_r(texte, numero_reponse) VALUES ('$qu222',$idRep)"; 
$resultat22= mysql_query($requete22,$connexion);
}
   foreach ($donnee22 as $qu22) {
   if($qu22) {
$requete222 = "insert into item_r(texte, numero_reponse) VALUES ('$qu22',$idRep)";
$resultat222= mysql_query($requete222,$connexion);
}
}
if($resultat222) {
  // echo ", la requete de la question $quest22 a été effectuée avec succès. \n"; 
  }
  
  
 
//Question 24= Question 7
$requete24 = "insert into reponse(num_quest, id_pers) VALUES ($quest25,$idPers)";
$resultat24= mysql_query($requete24,$connexion);

//Récupération du numéro de la réponse :
$requeteIDR24 = "select max(numero_reponse) from reponse";
$resultat244= mysql_query($requeteIDR24,$connexion);

if($idRep=mysql_result($resultat244,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest25 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }
if ($qu24!='Autre') {
$requete2444 = "insert into item_r(texte, numero_reponse) VALUES ('$qu24',$idRep)"; 
$resultat2444= mysql_query($requete2444,$connexion);
}
else{
$requete = "insert into item_r(texte, numero_reponse) VALUES ('$qu244',$idRep)"; 
$resultat= mysql_query($requete,$connexion);
}
if($resultat) {
  // echo ", la requete de la question $quest25 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }
 
    //Insertion de la réponse à la question 26
$requete = "insert into reponse(num_quest, id_pers) VALUES ($quest26,$idPers)";
 $resultat= mysql_query($requete,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);
 
 if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest26 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

$requete26 = "insert into item_r(texte, numero_reponse) VALUES ('$qu26',$idRep)"; 
$resultat= mysql_query($requete26,$connexion);
if($resultat) {
  // echo ", la requete de la question $quest26 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }

 
// Question 51= Question 9
$requete = "insert into reponse(num_quest, id_pers) VALUES ($quest51,$idPers)";
 $resultat= mysql_query($requete,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);
 
 if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest51 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

$requete26 = "insert into item_r(texte, numero_reponse) VALUES ('$qu51',$idRep)"; 
$resultat= mysql_query($requete26,$connexion);
if($resultat) {
  // echo ", la requete de la question $quest51 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }
 
 
 // Question 52= Question 10
$requete = "insert into reponse(num_quest, id_pers) VALUES ($quest52,$idPers)";
 $resultat= mysql_query($requete,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);
 
 if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest52 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

$requete26 = "insert into item_r(texte, numero_reponse) VALUES ('$qu52',$idRep)"; 
$resultat26= mysql_query($requete26,$connexion);
if($resultat26) {
  // echo ", la requete de la question $quest52 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }

  // Question 53= Question 11
$requete53 = "insert into reponse(num_quest, id_pers) VALUES ($quest53,$idPers)";
 $resultat53= mysql_query($requete53,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR531 = "select max(numero_reponse) from reponse";
$resultat531= mysql_query($requeteIDR,$connexion);
 
 if($idRep=mysql_result($resultat531,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest53 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }
foreach ($donnee53 as $qu53){
$requete533 = "insert into item_r(texte, numero_reponse) VALUES ('$qu53',$idRep)"; 
$resultat533= mysql_query($requete533,$connexion);
}
if($resultat533) {
  // echo ", la requete de la question $quest53 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }
 
 
 // Question 54= Question 12
$requete = "insert into reponse(num_quest, id_pers) VALUES ($quest54,$idPers)";
 $resultat= mysql_query($requete,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);
 
 if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest54 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

$requete54 = "insert into item_r(texte, numero_reponse) VALUES ('$qu54',$idRep)"; 
$resultat= mysql_query($requete54,$connexion);
if($resultat) {
  // echo ", la requete de la question $quest54 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }
 
  // Question 55= Question 13
$requete = "insert into reponse(num_quest, id_pers) VALUES ($quest55,$idPers)";
 $resultat= mysql_query($requete,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);
 
 if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest55 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

$requete55 = "insert into item_r(texte, numero_reponse) VALUES ('$qu55',$idRep)"; 
$resultat= mysql_query($requete55,$connexion);
if($resultat) {
  // echo ", la requete de la question $quest55 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }
 
 
 
  // Question 56= Question 14
 $requete56 = "insert into reponse(num_quest, id_pers) VALUES ($quest56,$idPers)";
 $resultat556= mysql_query($requete56,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat56= mysql_query($requeteIDR,$connexion);

if($idRep=mysql_result($resultat56,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest56 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

   if($qu566){
   $requete566 = "insert into item_r(texte, numero_reponse) VALUES ('$qu566',$idRep)"; 
$resultat566= mysql_query($requete566,$connexion);
}
   foreach ($donnee56 as $qu56) {
   if($qu56) {
$requete562 = "insert into item_r(texte, numero_reponse) VALUES ('$qu56',$idRep)";
$resultat562= mysql_query($requete562,$connexion);
}
}
if($resultat562) {
  // echo ", la requete de la question $quest56 a été effectuée avec succès. \n"; 
  }
 
   // Question 57= Question 15
$requete = "insert into reponse(num_quest, id_pers) VALUES ($quest57,$idPers)";
 $resultat= mysql_query($requete,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);
 
 if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest57 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

$requete57 = "insert into item_r(texte, numero_reponse) VALUES ('$qu57',$idRep)"; 
$resultat= mysql_query($requete57,$connexion);
if($resultat) {
  // echo ", la requete de la question $quest57 a été effectuée avec succès. \n"; 
}
 
   // Question 58= Question 16
$requete58 = "insert into reponse(num_quest, id_pers) VALUES ($quest58,$idPers)";
$resultat558= mysql_query($requete58,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR58 = "select max(numero_reponse) from reponse";
$resultat58= mysql_query($requeteIDR58,$connexion);

if($idRep=mysql_result($resultat58,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest58 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

   if($qu588){
   $requete588 = "insert into item_r(texte, numero_reponse) VALUES ('$qu588',$idRep)"; 
$resultat588= mysql_query($requete588,$connexion);
}
   foreach ($donnee58 as $qu58) {
   if($qu58) {
   $test=addSlashes($qu58);
   //$test=htmlspecialchars($qu58,ENT_QUOTES);
   // echo " <br/>$test <br/>";
$requete582 = "insert into item_r(texte, numero_reponse) VALUES ('$test',$idRep)";
$resultat582= mysql_query($requete582,$connexion);
if($resultat582) {
  // echo ", la requete de la question $quest58 a été effectuée avec succès. \n"; 
  
 }
}
 }
  
    // Question 59= Question 17
 $requete59 = "insert into reponse(num_quest, id_pers) VALUES ($quest59,$idPers)";
 $resultat559= mysql_query($requete59,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR59 = "select max(numero_reponse) from reponse";
$resultat59= mysql_query($requeteIDR59,$connexion);

if($idRep=mysql_result($resultat59,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest59 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

   if($qu599){
   $requete599 = "insert into item_r(texte, numero_reponse) VALUES ('$qu599',$idRep)"; 
$resultat599= mysql_query($requete599,$connexion);
}
   foreach ($donnee59 as $qu59) {
   if($qu59) {
$requete592 = "insert into item_r(texte, numero_reponse) VALUES ('$qu59',$idRep)";
$resultat592= mysql_query($requete592,$connexion);
}
}
if($resultat59) {
if($resultat592) {
  // echo ", la requete de la question $quest59 a été effectuée avec succès. \n"; 
}
}

 
    // Question 60= Question 18
$requete = "insert into reponse(num_quest, id_pers) VALUES ($quest60,$idPers)";
 $resultat= mysql_query($requete,$connexion);

 //Récupération du numéro de la réponse :
$requeteIDR = "select max(numero_reponse) from reponse";
$resultat= mysql_query($requeteIDR,$connexion);
 
 if($idRep=mysql_result($resultat,0,"max(numero_reponse)")){
// echo " <br/>IdReponse pour la question $quest60 récupéré, le résultat est $idRep ";
 }
  else {
   // echo "Erreur dans l'exécution de la requête de récupération de l'id de personne \n";
   }

$requete60 = "insert into item_r(texte, numero_reponse) VALUES ('$qu60',$idRep)"; 
$resultat= mysql_query($requete60,$connexion);
if($resultat) {
  // echo ", la requete de la question $quest60 a été effectuée avec succès. \n"; 
  }
 else {
 // echo " Le requete n'a pas pu être effectuée pour la raison suivante:" . mysql_error($connexion);
 }
echo"<div class=submit>
<form>
<input type='button' value='Retour à la page précédente' class='sub' onclick='history.go(-1) '>
</form>
</div></div><br/>";
?> 


</body>

</html>
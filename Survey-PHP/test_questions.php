<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
<head>
<title> Questionnaire Usage données spatiales </title>
<link rel="stylesheet" media="screen" type="text/css" title="Design" href="design.css" />
<script type="text/javascript">
function checkMes(){
if(document.forms[0].q2221.checked==1){
document.forms[0].q222.disabled=false;
document.forms[0].q222.value='Veuillez préciser';
}
else if(document.forms[0].q2221.checked==0){
document.forms[0].q222.disabled=true;
document.forms[0].q222.value='';
}
else if(document.forms[0].q2221.checked==1){
document.forms[0].q222.disabled=false;
}
}	
</script>

<script type="text/javascript">
function checkMe(){
if(document.forms[0].q5661.checked==1){
document.forms[0].q566.disabled=false;
document.forms[0].q566.value='Veuillez préciser';
}
else if(document.forms[0].q5661.checked==0){
document.forms[0].q566.disabled=true;
document.forms[0].q566.value='';
}
else if(document.forms[0].q5661.checked==1){
document.forms[0].q566.disabled=false;
}
}	
</script>


<script type="text/javascript">
function checkMe16(){
if(document.forms[0].q5881.checked==1){
document.forms[0].q588.disabled=false;
document.forms[0].q588.value='Veuillez préciser';
}
else if(document.forms[0].q5881.checked==0){
document.forms[0].q588.disabled=true;
document.forms[0].q588.value='';
}
else if(document.forms[0].q5881.checked==1){
document.forms[0].q588.disabled=false;
}
}
</script>
<script type="text/javascript">

function checkMe17(){
if(document.forms[0].q5991.checked==1){
document.forms[0].q599.disabled=false;
document.forms[0].q599.value='Veuillez préciser';
}
else if(document.forms[0].q5991.checked==0){
document.forms[0].q599.disabled=true;
document.forms[0].q599.value='';
}
else if(document.forms[0].q5991.checked==1){
document.forms[0].q599.disabled=false;
}
}
</script>


</head>

<body>

<?php

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
/* echo"connexion au serveur réussie \n <br/>"; */
}
//Connexion avec la base de données
if(!mysql_select_db (BD, $connexion)) {
 echo "Impossible de se connecter à la base " . BD . "\n";
 exit;
}
else {
//echo"connexion à la base \n " . BD . "\n réussie \n <br/>";
 }
?>

<form action="TestFormulaire2.php" name="ok" method='post'>

<?php

echo"<div id=titre>";
echo"<div class=titre2>
</div>";

echo"<div class=titre3>";
echo"<h1> Questionnaire sur l'usage des données géographiques </h1>";
echo"</div>";

// Question 11 = Question 1
$texte_11=mysql_query("SELECT texte from question where num_quest='11'", $connexion);
$reponse_11=mysql_query("SELECT texte from item_q where num_quest='11'", $connexion);
if ($texte_11){
while($question = mysql_fetch_object($texte_11)) {
echo"<div class=titre4>";
echo"<h4>Question 1: \n $question->texte </h4>\n";
while($item_q = mysql_fetch_object($reponse_11)) {
echo "<h5><input type='radio' name=q11 value='$item_q->texte' \n > $item_q->texte </h5>\n";
}
}
}
else{ 
echo "Erreur dans l'exécution de la requête, Message de MySQL: mysql_error($connexion)";
}
echo"</div><br/>";

// Question 12 =Question 2
$texte_12=mysql_query("SELECT texte from question where num_quest='12'", $connexion);
$reponse_12=mysql_query("SELECT texte from item_q where num_quest='12'", $connexion);
if ($texte_12){
while($question = mysql_fetch_object($texte_12)) {
echo"<div class=titre4>";
echo"<h4>Question 2: \n $question->texte <br/> </h4> \n";
echo"<h4><input type=texte name=q12 value=Age size=5 maxlength=3 onclick=this.value=''> </h4>\n \n";
}
}
echo"</div><br/>";

// Question 13= Question 3
$texte_13=mysql_query("SELECT texte from question where num_quest='13'", $connexion);
$reponse_13=mysql_query("SELECT texte from item_q where num_quest='13'", $connexion);
if ($texte_13){
while($question = mysql_fetch_object($texte_13)) {
echo"<div class=titre4>";
echo"<h4>Question 3: \n $question->texte <br/> </h4>\n";
    echo"<select name='q13'>\n";
while($item_q = mysql_fetch_object($reponse_13)) {
	echo "<h4><option value=$item_q->texte>$item_q->texte"; 
    echo "</option></h4>\n"; 
  } 
  echo "</select>\n"; 
}
}
echo"</div><br/>";

// Question 14 = Question 4
$texte_14=mysql_query("SELECT texte from question where num_quest='14'", $connexion);
$reponse_14=mysql_query("SELECT texte from item_q where num_quest='14'", $connexion);
if ($texte_14){
while($question = mysql_fetch_object($texte_14)) {
echo"<div class=titre4>";
echo"<h4>Question 4: \n $question->texte <br/></h4> \n";
while($item_q = mysql_fetch_object($reponse_14)) {
echo "<h5><input type='radio' name='q14' value='$item_q->texte' \n > $item_q->texte </h5>\n";
}
}
}
echo"</div><br/>";

// Question 21 = Question 5
$texte_21=mysql_query("SELECT texte from question where num_quest='21'", $connexion);
$reponse_21=mysql_query("SELECT texte from item_q where num_quest='21'", $connexion);
if ($texte_21){
while($question = mysql_fetch_object($texte_21)) {
echo"<div class=titre4>";
echo"<h4>Question 5: \n $question->texte <br/></h4>\n";
while($item_q = mysql_fetch_object($reponse_21)) {
echo "<h5><input type='radio' name='q21' value='$item_q->texte' \n > $item_q->texte </h5>\n";
}
}
}
echo"</div><br/>";

// Question 22= Question 6
echo"<div class=titre4>";
$texte_22=mysql_query("SELECT texte from question where num_quest='22'", $connexion);
$reponse_22=mysql_query("SELECT texte from item_q where num_quest='22'", $connexion);
if ($texte_22){
while($question = mysql_fetch_object($texte_22)) {
echo"<h4>Question 6: \n $question->texte <br/></h4> \n";
if ($reponse_22){
echo"<input type='hidden' name='q221' value='1'> \n";
while($item_q = mysql_fetch_object($reponse_22)) {
if($item_q->texte!='Autre') {
echo "<h5><input type='checkbox' name='q22[]' value='$item_q->texte' \n > $item_q->texte </h5> \n ";
}
}
}}}

$texte_222=mysql_query("SELECT texte from question where num_quest='22'", $connexion);
$reponse_222=mysql_query("SELECT texte from item_q where num_quest='22'", $connexion);
if ($texte_222){
if ($reponse_222){
while($item_q = mysql_fetch_object($reponse_222)) {
if($item_q->texte!='Autre') {
echo""; //Rien afficher
}
else {
if ($item_q->texte='Autre') {
echo"<input type='hidden' name='q222a' value=yes> \n";
echo "<h5><input type='checkbox' name='q2221' onclick='checkMes()' value='$item_q->texte' \n > $item_q->texte\n";
echo "<input type=texte name='q222' disabled='disabled' size=50 maxlength=50 onclick=this.value=''> \n \n";
}
echo "</h5>";
}
}
}
}
echo"</div><br/>";


//Question 24= Question 7
echo"<div class=titre4>";
$texte_24=mysql_query("SELECT texte from question where num_quest='24'", $connexion);
$reponse_24=mysql_query("SELECT texte from item_q where num_quest='25'", $connexion);
if ($texte_24){
while($question = mysql_fetch_object($texte_24)) {
echo"<h4>Question 7: \n $question->texte <br/></h4> \n";
if ($reponse_24){
echo"<h5><input type='hidden' name='q24' value='yes'> </h5>\n";
while($item_q = mysql_fetch_object($reponse_24)) {
if($item_q->texte!='Autre') {
echo "<h5><input type='radio' name=q24 value='$item_q->texte' \n > $item_q->texte </h5> ";
}

}
}}}

$texte_242=mysql_query("SELECT texte from question where num_quest='24'", $connexion);
$reponse_242=mysql_query("SELECT texte from item_q where num_quest='25'", $connexion);
if ($texte_242){
if ($reponse_242){
while($item_q = mysql_fetch_object($reponse_242)) {
if($item_q->texte!='Autre') {
echo""; //Rien afficher
}
else {
if ($item_q->texte='Autre') {
echo"<input type='hidden' name='q2442' value=yes> \n";
echo "<h5><input type='radio' name='q24'  value='$item_q->texte' \n > $item_q->texte \n";
echo "<input type=texte name=q244 size=50 maxlength=50 onclick=this.value=''> \n \n";
}
echo "</h5>";
}
}
}
}
echo"</div><br/>";

// Question 26= Question 8
$texte_26=mysql_query("SELECT texte from question where num_quest='26'", $connexion);
$reponse_26=mysql_query("SELECT texte from item_q where num_quest='26'", $connexion);
if ($texte_26){
while($question = mysql_fetch_object($texte_26)) {
echo"<div class=titre4>";
echo"<h4>Question 8: \n $question->texte <br/></h4> \n";
while($item_q = mysql_fetch_object($reponse_26)) {
echo "<h5><input type='radio' name='q26'  value='$item_q->texte' \n > $item_q->texte <br/></h5>\n";
}
}
}
echo"</div><br/>";

// Question 51= Question 9
$texte_51=mysql_query("SELECT texte from question where num_quest='51'", $connexion);
$reponse_51=mysql_query("SELECT texte from item_q where num_quest='51'", $connexion);
if ($texte_51){
while($question = mysql_fetch_object($texte_51)) {
echo"<div class=titre4>";
echo"<h4>Question 9: \n $question->texte <br/></h4> \n";
while($item_q = mysql_fetch_object($reponse_51)) {
echo "<h5><input type='radio' name='q51' value='$item_q->texte' \n > $item_q->texte </h5>\n";
}
}
}
echo"</div><br/>";

// Question 52= Question 10
$texte_52=mysql_query("SELECT texte from question where num_quest='52'", $connexion);
if ($texte_52){
while($question = mysql_fetch_object($texte_52)) {
echo"<div class=titre4>";
echo"<h4>Question 10: $question->texte <br/></h4> \n";
echo "<h5><input type='texte' name='q52' size=30 maxlength=50 onclick=this.value=''> </h5>\n \n";
}
}

echo"</div><br/>";


// Question 53 = Question 11
$texte_53=mysql_query("SELECT texte from question where num_quest='53'", $connexion);
$reponse_53=mysql_query("SELECT texte from item_q where num_quest='53'", $connexion);
if ($texte_53){
while($question = mysql_fetch_object($texte_53)) {
echo"<div class=titre4>";
echo"<input type='hidden' name='q531' value='1'> \n";
echo"<h4>Question 11: \n $question->texte <br/></h4> \n";
while($item_q = mysql_fetch_object($reponse_53)) {
echo "<h5><input type='checkbox' name='q53[]' value='$item_q->texte' \n > $item_q->texte </h5>\n ";
}
}
}

echo"</div><br/>";




// Question54 = Question 12
$texte_54=mysql_query("SELECT texte from question where num_quest='54'", $connexion);
$reponse_54=mysql_query("SELECT texte from item_q where num_quest='54'", $connexion);
if ($texte_54){
while($question = mysql_fetch_object($texte_54)) {
echo"<div class=titre4>";
echo"<h4>Question 12: \n $question->texte <br/></h4> \n";
while($item_q = mysql_fetch_object($reponse_54)) {
echo "<h5><input type='radio' name='q54' value='$item_q->texte' \n > $item_q->texte </h5>\n";
}
}
}
echo"</div><br/>";

// Question55 = Question 13
$texte_55=mysql_query("SELECT texte from question where num_quest='55'", $connexion);
$reponse_55=mysql_query("SELECT texte from item_q where num_quest='55'", $connexion);
if ($texte_55){
while($question = mysql_fetch_object($texte_55)) {
echo"<div class=titre4>";
echo"<h4>Question 13: \n $question->texte <br/></h4> \n";
while($item_q = mysql_fetch_object($reponse_55)) {
echo "<h5><input type='radio' name='q55' value='$item_q->texte' \n > $item_q->texte </h5>\n";
}
}
}
echo"</div><br/>";

// Question56 = Question 14
echo"<div class=titre4>";
$texte_56=mysql_query("SELECT texte from question where num_quest='56'", $connexion);
$reponse_56=mysql_query("SELECT texte from item_q where num_quest='56'", $connexion);
if ($texte_56){
while($question = mysql_fetch_object($texte_56)) {
echo"<h4>Question 14: \n $question->texte <br/></h4> \n";
if ($reponse_56){
echo"<input type='hidden' name='q561' value='1'> \n";
while($item_q = mysql_fetch_object($reponse_56)) {
if($item_q->texte!='Autre') {
echo "<h5><input type='checkbox' name='q56[]' value='$item_q->texte' \n > $item_q->texte </h5> \n ";
}
}
}
}
}

$texte_561=mysql_query("SELECT texte from question where num_quest='56'", $connexion);
$reponse_561=mysql_query("SELECT texte from item_q where num_quest='56'", $connexion);
if ($texte_561){
while($question = mysql_fetch_object($texte_561)) {
if ($reponse_561){
while($item_q = mysql_fetch_object($reponse_561)) {
if($item_q->texte!='Autre') {
echo"";
}
else {
if ($item_q->texte='Autre') {
echo"<input type='hidden' name='q5662' value='2'> \n";
echo "<h5><input type='checkbox' name='q5661' onclick='checkMe()' value=$item_q->texte > $item_q->texte \n";
echo "<input type=texte name=q566 disabled='disabled' size=30 maxlength=50 onclick=this.value=''> \n \n";
}
echo"</h5>";
}
}
}
}
}
echo"</div><br/>";

// Question57 = Question 15
$texte_57=mysql_query("SELECT texte from question where num_quest='57'", $connexion);
$reponse_57=mysql_query("SELECT texte from item_q where num_quest='57'", $connexion);
if ($texte_57){
while($question = mysql_fetch_object($texte_57)) {
echo"<div class=titre4>";
echo"<h4>Question 15: \n $question->texte <br/></h4> \n";
while($item_q = mysql_fetch_object($reponse_57)) {
echo "<h5><input type='radio' name='q57' value='$item_q->texte' \n > $item_q->texte </h5>\n";
}
}
}
echo"</div><br/>";




// Question 58 = Question 16
echo"<div class=titre4>";
$texte_58=mysql_query("SELECT texte from question where num_quest='58'", $connexion);
$reponse_58=mysql_query("SELECT texte from item_q where num_quest='58'", $connexion);
if ($texte_58){
while($question = mysql_fetch_object($texte_58)) {
echo"<h4>Question 16: \n $question->texte <br/></h4> \n";
if ($reponse_58){
echo"<input type='hidden' name='q581' value='1'> \n";
while($item_q = mysql_fetch_object($reponse_58)) {
if($item_q->texte!='Autre raison') {
echo "<h5><input type='checkbox' name='q58[]'";?> value="<?php echo"$item_q->texte";?>" <?php echo"> $item_q->texte </h5> \n ";
}
}
}
}
}

$texte_581=mysql_query("SELECT texte from question where num_quest='58'", $connexion);
$reponse_581=mysql_query("SELECT texte from item_q where num_quest='58'", $connexion);
if ($texte_581){
while($question = mysql_fetch_object($texte_581)) {
if ($reponse_581){
while($item_q = mysql_fetch_object($reponse_581)) {
if($item_q->texte!='Autre raison') {
echo"";
}
else {
if ($item_q->texte='Autre raison') {
echo"<input type='hidden' name='q5882' value='2'> \n";
echo "<h5><input type='checkbox' name='q5881' onclick='checkMe16()' value=$item_q->texte > $item_q->texte \n";
echo "<input type=texte name=q588 disabled='disabled' size=30 maxlength=3 onclick=this.value=''> \n \n";
}
echo"</h5>";
}
}
}
}
}
echo"</div><br/>";

// Question 59 = Question 17
echo"<div class=titre4>";
$texte_59=mysql_query("SELECT texte from question where num_quest='59'", $connexion);
$reponse_59=mysql_query("SELECT texte from item_q where num_quest='59'", $connexion);
if ($texte_59){
while($question = mysql_fetch_object($texte_59)) {
echo"<h4>Question 17: \n $question->texte <br/></h4> \n";
if ($reponse_59){
echo"<input type='hidden' name='q591' value='1'> \n";
while($item_q = mysql_fetch_object($reponse_59)) {
if($item_q->texte!='Autre') {
echo"<h5><input type='checkbox' name='q59[]' value='$item_q->texte' \n > $item_q->texte </h5> \n ";
} 
}
}
}
}

$texte_591=mysql_query("SELECT texte from question where num_quest='59'", $connexion);
$reponse_591=mysql_query("SELECT texte from item_q where num_quest='59'", $connexion);
if ($texte_591){
while($question = mysql_fetch_object($texte_591)) {
if ($reponse_591){
while($item_q = mysql_fetch_object($reponse_591)) {
if($item_q->texte!='Autre') {
echo"";
}
else {
if ($item_q->texte='Autre') {
echo"<input type='hidden' name='q5992' value='2'> \n";
echo "<h5><input type='checkbox' name='q5991' onclick='checkMe17()' value=$item_q->texte > $item_q->texte \n";
echo "<input type=texte name=q599 disabled='disabled' size=30 maxlength=3 onclick=this.value=''> \n \n";
}
echo"</h5>";
}
}
}
}
}
echo"</div><br/>";

// Question60 = Question 18
$texte_60=mysql_query("SELECT texte from question where num_quest='60'", $connexion);
$reponse_60=mysql_query("SELECT texte from item_q where num_quest='60'", $connexion);
if ($texte_60){
while($question = mysql_fetch_object($texte_60)) {
echo"<div class=titre4>";
echo"<h4>Question 18: \n $question->texte <br/></h4> \n";
while($item_q = mysql_fetch_object($reponse_60)) {
echo "<h5><input type='radio' name='q60' value='$item_q->texte' \n > $item_q->texte </h5>\n";
}
}
}
echo"</div>";
echo"<div class=submit>
<input type='submit' value='Envoyer les réponses' name='Envoi' class='sub' />
<input type='reset' value='Effacer les réponses' class='sub' /></form>
<form>
<input type='button' value='Retour à la page précédente' class='sub' onclick='history.go(-1) '>
</form>
</div></div><br/>";

?>



</body>
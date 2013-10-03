<?php
$dbconn = pg_connect("host=postgresql.alwaysdata.com dbname=stagesgeom_bdstages user=stagesgeom password=959426G/e");
$requete = "SELECT numStage, nomEtud, prenomEtud, sujet, dateDebut,
dateFin, ST_ASGeoJSON(ST_Transform(localisation,900913)) AS lieu FROM stage, etudiant,
entreprise WHERE stage.numEnt=entreprise.gid AND
stage.numEtud=etudiant.numEtud AND promotion='" . $_GET['id_promo'] .
"' ORDER BY datefin DESC;";
$result = pg_query($dbconn,$requete);
while ($row = pg_fetch_assoc($result)) {
$type = '"type": "Feature"';
$geometry = '"geometry": ' . $row['lieu'];
unset($row['lieu']);
$properties = '"properties": ' . json_encode($row);
$feature[] = '{' . $type . ', ' . $geometry . ', ' .
$properties . '}';
}
$header = '{"type": "FeatureCollection", "features": [';
$footer = ']}';
echo $header . implode(', ', $feature) . $footer;
?>
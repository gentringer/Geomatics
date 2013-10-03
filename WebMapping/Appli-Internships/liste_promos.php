<?php
$dbconn = pg_connect("host=postgresql.alwaysdata.com dbname=stagesgeom_bdstages user=stagesgeom password=959426G/e");
$requete = "SELECT promotion||' ('||COUNT(numetud)||' étudiants)' AS
display, promotion AS value FROM etudiant GROUP BY promotion ORDER BY
promotion DESC;";
$result = pg_query($dbconn,$requete);
while ($row = pg_fetch_object($result)) {
$json_rows[] = $row;
}
$header = '{success: true, rows: ';
$footer = '}';
echo $header . json_encode($json_rows) . $footer;
?>
#!/usr/bin/perl

$parametres = $ENV{'QUERY_STRING'};
@parametres = split /&/, $parametres;
foreach $param (@parametres) {
	if ($param =~ /(.*)=(.*)/) {
	$p{$1} = $2;
}
}


print <<DATA;
Content-Type: image/svg+xml\n\n

<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="590 -5050 50 120"
     xmlns="http://www.w3.org/2000/svg" version="1.1">
<rect x="510" y="-5086" width="250" height="400" fill="lightblue" stroke="none"/>
<rect x="570" y="-5022" width="87" height="82" fill="white" stroke="black" stroke-width="0.3" opacity="1"/>
<rect x="568.5" y="-5023.5" width="179.5%" height="71%" fill="none" stroke="black" stroke-width="0.7" opacity="1"/>
<rect x="520" y="-4965" width="40" stroke="black" stroke-width="0.5" height="34" fill="lightgrey"/>
<text x="528" y="-4960" font-size="5" fill="black">Legende</text>
<center>
<text x="569" y="-5036" fill="white" font-size="12" font-family="Comic Sans MS">Visualisation:</text>
</center>
DATA

if (open F, "LUX_adm0.gml") {
    undef $/;  
    $contenu_fichier = <F>;  


    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
	foreach $extraction (@extractions) {

print <<DATA;
<g fill="lightgrey" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.3">
<polygon points=" 
DATA
		@extractions2 = split / /, $extraction;
    		foreach $extraction3 (@extractions2) {
                        if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
                          $x = $1*100;
                          $y = $2*(-100);
        		  print $x, ",", $y, " ";
}        
}
print <<DATA;
" /> 
</g>
DATA
}
}

if ($p{"Cantons"} eq "on") {
if (open F, "LUX_adm2.gml") {
    undef $/;  
    	$contenu_fichier = <F>;  
	$nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
	foreach $extraction (@extractions) {
print <<DATA;
<polygon fill="none" stroke="black" stroke-width="0.2" points=" 
DATA
		@extractions2 = split / /, $extraction;
    		foreach $extraction3 (@extractions2) {
                        if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
                          $x = $1*100;
                          $y = $2*(-100);
        		  print $x, ",", $y, " ";
}        
}
print <<DATA;
" /> 
DATA
}
}
}

if ($p{"Routes"} eq "on") {

if (open F, "voiesprincipales.gml") {
    undef $/;  
    $contenu_fichier = <F>;  
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {
print <<DATA;
<g id="myroutes" fill="none" stroke="black" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round">
<polyline points=" 
DATA
	@extractions2 = split / /, $extraction;
    	foreach $extraction3 (@extractions2) {
        	if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
                $x = $1*100;
                $y = $2*(-100);
        	print $x, ",", $y, " ";

                 }        
		}
print <<DATA;
" />
</g> 
DATA
}
}
if (open F, "voiesprincipales.gml") {
    undef $/;  
    $contenu_fichier = <F>;  
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {
print <<DATA;
<g id="myroutes" fill="none" stroke="yellow" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round">
<polyline points=" 
DATA
	@extractions2 = split / /, $extraction;
    	foreach $extraction3 (@extractions2) {
        	if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
                $x = $1*100;
                $y = $2*(-100);
        	print $x, ",", $y, " ";

                 }        
		}
print <<DATA;
" />
</g> 
DATA
}
}
}



if ($p{"Ferroviaire"} eq "on") {
if (open F, "LUX_rails.gml") {
    undef $/;  
    $contenu_fichier = <F>;  
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {
print <<DATA;
<polyline id="train" fill="none" stroke="white" stroke-linecap="miter" stroke-width="0.5" stroke-linejoin="miter" points="
DATA
		@extractions2 = split / /, $extraction;
    		foreach $extraction3 (@extractions2) {
                        if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
                          $x = $1*100;
                          $y = $2*(-100);
        		  print $x, ",", $y, " ";
}        
}
print <<DATA;
"/>
DATA
}
}
if (open F, "LUX_rails.gml") {
    undef $/;  
    $contenu_fichier = <F>;  
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {
print <<DATA;
<polyline id="train" fill="none" stroke="black" stroke-linecap="miter" stroke-linejoin="miter" stroke-width="0.5" stroke-dasharray="1%, 1%" points="
DATA
		@extractions2 = split / /, $extraction;
    		foreach $extraction3 (@extractions2) {
                        if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
                          $x = $1*100;
                          $y = $2*(-100);
        		  print $x, ",", $y, " ";

}        
}
print <<DATA;
"/>
DATA
}
}
}

if ($p{"Villes"} eq "on") {
if (open F, "esch.gml") {
    undef $/;  
    	$contenu_fichier = <F>;  
    	$nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    	foreach $extraction (@extractions) {
print <<DATA;
<g onclick="window.open('http://www.esch.lu')" fill="white" stroke="black" stroke-width="0.1">
DATA
	@extractions2 = split / /, $extraction;
    	foreach $extraction3 (@extractions2) {
        if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
			$x = $1*100;
                        $y = $2*(-100);
			$z = $y-1;
print <<DATA
<circle cx="$x" cy="$y" r="0.9"/>
<animateColor fill="freeze" dur="0.1s" to="red" from="white" attributeName="fill" begin="mouseover"/>
<animateColor fill="freeze" dur="0.1s" to="white" from="red" attributeName="fill" begin="mouseout"/>
DATA
}        
}
print <<DATA;
</g>
<g fill="black" font-size="3" text-anchor="middle"> 
<text x="$x" y="$z">Esch</text>
</g>
DATA
}
}

if (open F, "luxville.gml") {
    undef $/;  
    $contenu_fichier = <F>;  
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {

print <<DATA;
<g onclick="window.open('http://www.vdl.lu')" fill="white" stroke="black" stroke-width="0.1">
DATA
	@extractions2 = split / /, $extraction;
	foreach $extraction3 (@extractions2) {
	if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
			$x = $1*100;
                        $y = $2*(-100);
			$z = $y-1;			
print <<DATA
<circle cx="$x" cy="$y" r="0.9"/>
<animateColor fill="freeze" dur="0.1s" to="red" from="white" attributeName="fill" begin="mouseover"/>
<animateColor fill="freeze" dur="0.1s" to="white" from="red" attributeName="fill" begin="mouseout"/>
DATA
}        
}
print <<DATA;
</g>
<g fill="black" font-size="3" text-anchor="middle"> 
<text x="$x" y="$z">Luxembourg</text>
</g>
DATA
}
}

if (open F, "echternach.gml") {
    undef $/;  
    $contenu_fichier = <F>;  
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {
print <<DATA;
<g onclick="window.open('http://www.echternach.lu')" fill="white" stroke="black" stroke-width="0.1">
DATA
	@extractions2 = split / /, $extraction;
	foreach $extraction3 (@extractions2) {
        if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
			$x = $1*100;
                       	$y = $2*(-100);
			$z = $y-1;
print <<DATA
<circle cx="$x" cy="$y" r="0.9"/>
<animateColor fill="freeze" dur="0.1s" to="red" from="white" attributeName="fill" begin="mouseover"/>
<animateColor fill="freeze" dur="0.1s" to="white" from="red" attributeName="fill" begin="mouseout"/>
DATA
}        
}
print <<DATA;
</g>
<g fill="black" font-size="3" text-anchor="middle"> 
<text x="$x" y="$z">Echternach</text>
</g>
DATA
}
}
if (open F, "differdange.gml") {
    undef $/;  
    $contenu_fichier = <F>;
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {
print <<DATA;
<g onclick="window.open('http://www.differdange.lu')" fill="white" stroke="black" stroke-width="0.1">
DATA
	@extractions2 = split / /, $extraction;
    	foreach $extraction3 (@extractions2) {
        if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
		$x = $1*100;
                $y = $2*(-100);
		$z = $y-1;
print <<DATA
<circle cx="$x" cy="$y" r="0.9"/>
<animateColor fill="freeze" dur="0.1s" to="red" from="white" attributeName="fill" begin="mouseover"/>
<animateColor fill="freeze" dur="0.1s" to="white" from="red" attributeName="fill" begin="mouseout"/>
DATA
}        
}
print <<DATA;
</g>
<g fill="black" font-size="3" text-anchor="middle"> 
<text x="$x" y="$z">Differdange</text>
</g>
DATA
}
}
if (open F, "vianden.gml") {
    undef $/;  
    $contenu_fichier = <F>;
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {
print <<DATA;
<g onclick="window.open('http://www.vianden.lu')" fill="white" stroke="black" stroke-width="0.1">
DATA
	@extractions2 = split / /, $extraction;
    	foreach $extraction3 (@extractions2) {
        if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
			$x = $1*100;
                       	$y = $2*(-100);
			$z = $y-1;	
print <<DATA
<circle cx="$x" cy="$y" r="0.9"/>
<animateColor fill="freeze" dur="0.1s" to="red" from="white" attributeName="fill" begin="mouseover"/>
<animateColor fill="freeze" dur="0.1s" to="white" from="red" attributeName="fill" begin="mouseout"/>
DATA
}        
}
print <<DATA;
</g>
<g fill="black" font-size="3" text-anchor="middle"> 
<text x="$x" y="$z">Vianden</text>
</g>
DATA
}
}
if (open F, "wiltz.gml") {
    undef $/;  
    $contenu_fichier = <F>;
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {
print <<DATA;
<g onclick="window.open('http://www.wiltz.lu')" fill="white" stroke="black" stroke-width="0.1">
DATA
	@extractions2 = split / /, $extraction;
    	foreach $extraction3 (@extractions2) {
        if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
			$x = $1*100;
                        $y = $2*(-100);
			$z = $y-1;
print <<DATA
<circle cx="$x" cy="$y" r="0.9" /> 
<animateColor fill="freeze" dur="0.1s" to="red" from="white" attributeName="fill" begin="mouseover"/>
<animateColor fill="freeze" dur="0.1s" to="white" from="red" attributeName="fill" begin="mouseout"/>
DATA
}        
}
print <<DATA;
</g>
<g fill="black" font-size="3" text-anchor="middle"> 
<text x="$x" y="$z">Wiltz</text>
</g>
DATA
}
}
if (open F, "diekirch.gml") {
    undef $/;  
    $contenu_fichier = <F>;
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {
print <<DATA;
<g onclick="window.open('http://www.diekirch.lu')" fill="white" stroke="black" stroke-width="0.1">
DATA
	@extractions2 = split / /, $extraction;
    	foreach $extraction3 (@extractions2) {
        if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
			$x = $1*100;
                        $y = $2*(-100);
			$z = $y-1;
print <<DATA
<circle cx="$x" cy="$y" r="0.9" /> 
<animateColor fill="freeze" dur="0.1s" to="red" from="white" attributeName="fill" begin="mouseover"/>
<animateColor fill="freeze" dur="0.1s" to="white" from="red" attributeName="fill" begin="mouseout"/>
DATA
}        
}
print <<DATA;
</g>
<g fill="black" font-size="3" text-anchor="middle"> 
<text x="$x" y="$z">Diekirch</text>
</g>
DATA
}
}
if (open F, "grevenmacher.gml") {
    undef $/;  
    $contenu_fichier = <F>;  

    #print $contenu_fichier;
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {
print <<DATA;
<g onclick="window.open('http://www.grevenmacher.lu')" fill="white" stroke="black" stroke-width="0.1">
DATA
	@extractions2 = split / /, $extraction;
	foreach $extraction3 (@extractions2) {
	if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
			$x = $1*100;
                        $y = $2*(-100);
			$z = $y-1;
print <<DATA
<circle cx="$x" cy="$y" r="0.9"/>
<animateColor fill="freeze" dur="0.1s" to="red" from="white" attributeName="fill" begin="mouseover"/>
<animateColor fill="freeze" dur="0.1s" to="white" from="red" attributeName="fill" begin="mouseout"/>
DATA
}        
}
print <<DATA;
 </g>
<g fill="black" font-size="3" text-anchor="middle"> 
<text x="$x" y="$z">Grevenmacher</text>
</g>
DATA
}
}
}

if ($p{"Biere"} eq "on") {
if (open F, "biere.gml") {
    undef $/;  
    $contenu_fichier = <F>;  
    $nb_extractions = @extractions = $contenu_fichier =~ /<gml:coordinates>(.*?)<\/gml:coordinates>/gs;
    foreach $extraction (@extractions) {
print <<DATA;
<g fill="yellow" stroke="black" stroke-width="0.1">
DATA
	@extractions2 = split / /, $extraction;
	foreach $extraction3 (@extractions2) {
	if ($extraction3 =~ /(\d+\.?\d+),(\d+\.?\d+)/s) {
			$x = $1*100;
                        $y = $2*(-100);
			$z = $y-1;
print <<DATA
<circle cx="$x" cy="$y" r="1.4"/>
DATA
}        
}
print <<DATA;
</g>
DATA
}
}
}




if ($p{"Cantons"} eq "on") {
print <<DATA
<polyline id="cantonslegende" stroke="black" stroke-width="0.2" points="525,-4955 538,-4955"/>
<text x="540" y="-4954.5" font-size="2" fill="black">Limites cantons</text>
DATA
}
if ($p{"Villes"} eq "on") {
print <<DATA
<circle cx="532" cy="-4951" r="0.9" fill="white" stroke="black" stroke-width="0.1"/>
<text x="540" y="-4950" font-size="2">Villes</text>
DATA
}
if ($p{"Routes"} eq "on") {
print <<DATA;
<polyline id="routeslegende" fill="none" stroke="black" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round" points="525,-4946 538,-4946" />
<polyline id="routeslegende" fill="none" stroke="yellow" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" points="525,-4946 538,-4946" />
<text x="540" y="-4945.5" font-size="2" fill="black">Routes</text>
DATA
}
if ($p{"Ferroviaire"} eq "on") {
print <<DATA
<polyline id="trainlegende" fill="none" stroke="white" stroke-linecap="miter" stroke-width="0.5" stroke-linejoin="miter" points="525,-4942 538,-4942"/>
<polyline id="trainlegende" fill="none" stroke="black" stroke-linecap="miter" stroke-linejoin="miter" stroke-width="0.5" stroke-dasharray="1%, 1%" points="525,-4942 538,-4942"/>
<text x="540" y="-4941" font-size="2" fill="black">Réseau Ferroviaire</text>
DATA
}
if ($p{"Biere"} eq "on") {
print <<DATA
<circle fill="yellow" stroke-width="0.1" stroke="black" cx="532" cy="-4937" r="1.5"/>
<text x="540" y="-4936.3" font-size="2" fill="black">Brasseries</text>
DATA
}

print <<DATA
</svg>
DATA

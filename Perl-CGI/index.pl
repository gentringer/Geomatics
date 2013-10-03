#!/usr/bin/perl
use strict;
print "Content-type: text/html\n\n";
print "Hello word";

print <<DATA;
<frameset cols="31%, *" border="1">
	<frame src="formulaire.html" name="gauche" />
	<frame src="./cgi-bin/luxembourg.cgi" name="droite" />
</frameset>
DATA

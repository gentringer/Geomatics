var map;
var epsg4326 ;
var epsg900913;
var epsg2154;
var style_green;
var vectorLayerJSON ;
var countcircle;
var wfsLayer;
var clcontext;
var counter = 0;
var urlGeoserver;
var featureTypeGeoserver;
var geomGeoserver;

OpenLayers.ProxyHost = "/Senterritoire2/cgi-bin/proxy.cgi?url=";

function request(callback) {
  
    var xhr =  new XMLHttpRequest();
     
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4){
            callback(xhr.responseXML);
        }
    };
     
    xhr.open("GET", "properties.xml", true);
    xhr.send(null);
}
 
function readData(oData) {
    var nodes = oData.getElementsByTagName("entry");
    var c=nodes.length;
    var i=0;
    for (i=0;i<c;i++) {
	 var noeud = nodes[i].getAttribute('key');
	 if(noeud=='url'){
	    urlGeoserver = nodes[i].childNodes[0].nodeValue;
	 }
	 if(noeud=='featureType'){
	    featureTypeGeoserver =  nodes[i].childNodes[0].nodeValue;
	 }
	 if(noeud=='geometryName'){
	    geomGeoserver =  nodes[i].childNodes[0].nodeValue;
	 }
    }
    init();
    
    
}


function createPopup(feature) {
  
  poppo = 0;
  popneg=0;
  popneu=0;
  
    popopinion5po = 0;
    popopinion5neu= 0;
    popopinion5neg= 0;
    popopinion1po= 0;
    popopinion1neu= 0;
    popopinion1neg= 0;
    popopinion2po= 0;
    popopinion2neu= 0;
    popopinion2neg= 0;
    popopinion3po= 0;
    popopinion3neu= 0;
    popopinion3neg= 0;
    popopinion4po= 0;
    popopinion4neu= 0;
    popopinion4neg= 0;
    var popdate1;
    var popdate2;
    var popdate3;
    var popdate4;
    var popdate5;
var arrayDatePopup = [];
// var test =" <head> <link rel=\"stylesheet\" href=\"style.css\" type=\"text/css\" media=\"screen\" /> <script type=\"text/javascript\" src=\"https://www.google.com/jsapi\"></script> <script src=\"http://code.jquery.com/jquery-1.9.1.js\"></script> <script type=\"text/javascript\"> google.load(\"visualization\", \"1\", {packages:[\"corechart\"]});  google.setOnLoadCallback(drawChart); var json = {\"opinionpositive\":38,\"opinionneutre\":13,\"opinionnegative\":0}; function drawChart() { var data = google.visualization.arrayToDataTable([['Opinions', 'Statistiques'],['Opinion positives', json.opinionpositive],['Opinions negatives', json.opinionnegative],['Opinions neutres', json.opinionneutre]]); var options = {title: 'Composante opinion',chartArea:{left:40,top:40,width:\"62%\",height:\"75%\"},colors:['green','red','orange']}; var chart = new google.visualization.PieChart(document.getElementById('chart_div')); chart.draw(data, options); } </script> </head> <body> <div class=\"container\"><div id=\"chart_div\" 
//style=\"width: 600px; height:250px;\"></div></div></body>";
//var test =" <script type=\"text/javascript\"> google.load(\"visualization\", \"1\", {packages:[\"corechart\"]});  google.setOnLoadCallback(drawChart); var json = {\"opinionpositive\":38,\"opinionneutre\":13,\"opinionnegative\":0}; function drawChart() { var data = google.visualization.arrayToDataTable([['Opinions', 'Statistiques'],['Opinion positives', json.opinionpositive],['Opinions negatives', json.opinionnegative],['Opinions neutres', json.opinionneutre]]); var options = {title: 'Composante opinion',chartArea:{left:40,top:40,width:\"62%\",height:\"75%\"},colors:['green','red','orange']}; var chart = new google.visualization.PieChart(document.getElementById('chart_div')); chart.draw(data, options); } </script> <div class=\"container\"> <h1> List of people </h1> <div id=\"chart_div\" style=\"width: 600px; height:250px;\"></div></div>";
for(var ii = 0; ii<feature.cluster.length; ii++){

	    var date1 = feature.cluster[ii].data.te_valeur;
	    //alert(st);
	    var dtpop = new Date(date1);
	    arrayDatePopup.push(dtpop);
	    
	  }
	  
	  
	   var sortasc = function (date1, date2) {
    // This is a comparison function that will result in dates being sorted in
    // ASCENDING order. As you can see, JavaScript's native comparison operators
    // can be used to compare dates. This was news to me.
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
    };
    
   /* var sortdesc = function (date1, date2) {
    // This is a comparison function that will result in dates being sorted in
    // DESCENDING order.
    if (date1 > date2) return -1;
    if (date1 < date2) return 1;
    return 0;
    };*/
    
    // Finally, we are now able to call the sort method on our array of dates.
    // More info about array sorting: http://w3schools.com/jsref/jsref_sort.asp
    
    // First let's sort the array in ascending order.
    arrayDatePopup.sort(sortasc);
    var lendatepop=arrayDatePopup.length;
    var mildatepop = Math.round((lendatepop)/2);
    var milmildatepop = Math.round(mildatepop/2);
    var lastmildatepop = milmildatepop + mildatepop-1;
    
    
    popdate1 = arrayDatePopup[0];
    popdate5 = arrayDatePopup[lendatepop-1];
    popdate3 = arrayDatePopup[mildatepop-1];
    popdate2 = arrayDatePopup[milmildatepop-1];
    popdate4 = arrayDatePopup[lastmildatepop-1];
    

	  for(var ii = 0; ii<feature.cluster.length; ii++){
	    
	    poppo += parseInt(feature.cluster[ii].data.positif);
	    popneg += parseInt(feature.cluster[ii].data.negatif);
	    popneu += parseInt(feature.cluster[ii].data.neutre);

	    var st = feature.cluster[ii].data.te_valeur;
	    var dt = new Date(st);
	    if(dt.getTime()==popdate1.getTime()){
// 	      alert(dt)
	      popopinion1po += parseInt(feature.cluster[ii].data.positif);
	      popopinion1neg += parseInt(feature.cluster[ii].data.negatif);
	      popopinion1neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	    if(dt.getTime()==popdate5.getTime()){
	    //  alert(dt)
	      popopinion5po += parseInt(feature.cluster[ii].data.positif);
	      popopinion5neg += parseInt(feature.cluster[ii].data.negatif);
	      popopinion5neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	     if(dt.getTime()==popdate3.getTime()){
	    //  alert(dt)
	      popopinion3po += parseInt(feature.cluster[ii].data.positif);
	      popopinion3neg += parseInt(feature.cluster[ii].data.negatif);
	      popopinion3neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	    if(dt.getTime()==popdate4.getTime()){
	    //  alert(dt)
	      popopinion4po += parseInt(feature.cluster[ii].data.positif);
	      popopinion4neg += parseInt(feature.cluster[ii].data.negatif);
	      popopinion4neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	    if(dt.getTime()==popdate2.getTime()){
// 	      alert(dt)
	      popopinion2po += parseInt(feature.cluster[ii].data.positif);
	      popopinion2neg += parseInt(feature.cluster[ii].data.negatif);
	      popopinion2neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	  }
 
	   var values1 = popopinion1po+','+popopinion1neg+','+popopinion1neu;
	   var values2 = popopinion2po+','+popopinion2neg+','+popopinion2neu;
	   var values3 = popopinion3po+','+popopinion3neg+','+popopinion3neu;
	   var values4 = popopinion4po+','+popopinion4neg+','+popopinion4neu;
	   var values5 = popopinion5po+','+popopinion5neg+','+popopinion5neu;
	   var url1,ulr2,url3,url4,url5;
	   
	  	   if(parseInt(popopinion1neg)==0 && parseInt(popopinion1neu)==0){
                  url1 = '<img class="im"  src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=096A09,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		  }
		    else if(parseInt(popopinion1po)==0 && parseInt(popopinion1neu)==0){
                         url1 = '<img class="im"  src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=FF0000,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		    }
		    else if(parseInt(popopinion1neg)==0 && parseInt(popopinion1po)==0){
                         url1 = '<img class="im"  src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=FFA500,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		    }
		    else{   
                         url1 = '<img class="im2" src="http://chart.apis.google.com/chart?cht=p&chd=t:'+values1+'&chs=65x65&chco=096A09,FF0000,FFA500&chf=bg,s,ffffff00" style="margin-top:13px; width:45; height:45;"/>';
		    }
		
	if(parseInt(popopinion2neg)==0 && parseInt(popopinion2neu)==0){
                  url2 = '<img class="im" src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=096A09,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		  }
		    else if(parseInt(popopinion2po)==0 && parseInt(popopinion2neu)==0){
                         url2 = '<img class="im" src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=FF0000,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		    }
		    else if(parseInt(popopinion2neg)==0 && parseInt(popopinion2po)==0){
                         url2 = '<img class="im" src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=FFA500,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		    }
		    else{   
                         url2 = '<img class="im2" src="http://chart.apis.google.com/chart?cht=p&chd=t:'+values2+'&chs=65x65&chco=096A09,FF0000,FFA500&chf=bg,s,ffffff00" style="margin-top:13px; width:45; height:45;"/>';
		    }
		    
	if(parseInt(popopinion3neg)==0 && parseInt(popopinion3neu)==0){
                  url3 = '<img class="im" src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=096A09,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		  }
		    else if(parseInt(popopinion3po)==0 && parseInt(popopinion3neu)==0){
                         url3 = '<img class="im" src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=FF0000,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		    }
		    else if(parseInt(popopinion3neg)==0 && parseInt(popopinion3po)==0){
                         url3 = '<img class="im" src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=FFA500,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		    }
		    else{   
                         url3 = '<img class="im2" src="http://chart.apis.google.com/chart?cht=p&chd=t:'+values3+'&chs=65x65&chco=096A09,FF0000,FFA500&chf=bg,s,ffffff00" style="margin-top:13px; width:45; height:45;"/>';
		    }
		    
	if(parseInt(popopinion4neg)==0 && parseInt(popopinion4neu)==0){
                  url4 = '<img class="im" src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=096A09,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		  }
		    else if(parseInt(popopinion4po)==0 && parseInt(popopinion4neu)==0){
                         url4 = '<img class="im" src=http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=FF0000,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		    }
		    else if(parseInt(popopinion4neg)==0 && parseInt(popopinion4po)==0){
                         url4 = '<img class="im" src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=FFA500,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		    }
		    else{   
                         url4 = '<img class="im2" src="http://chart.apis.google.com/chart?cht=p&chd=t:'+values4+'&chs=65x65&chco=096A09,FF0000,FFA500&chf=bg,s,ffffff00" style="margin-top:13px; width:45; height:45;"/>';
		    }	    

		    
	if(parseInt(popopinion5neg)==0 && parseInt(popopinion5neu)==0){
                  url5 = '<img class="im" src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=096A09,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		  }
		    else if(parseInt(popopinion5po)==0 && parseInt(popopinion5neu)==0){
                         url5 = '<img class="im" src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=FF0000,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		    }
		    else if(parseInt(popopinion5neg)==0 && parseInt(popopinion5po)==0){
                         url5 = '<img class="im" src="http://chart.apis.google.com/chart?cht=it&chd=t:65&chs=50x50&chco=FFA500,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00" style="margin-top:10px; width:45; height:45;"/>';
		    }
		    else{   
                         url5 = '<img class="im2" src="http://chart.apis.google.com/chart?cht=p&chd=t:'+values5+'&chs=65x65&chco=096A09,FF0000,FFA500&chf=bg,s,ffffff00" style="margin-top:13px; width:45; height:45;"/>';
		    } 
	// var stylestring = '<style>.im {margin-top : 10px;}</style>';
	// var stylestring2 = '<style>.im2 {margin-top : 10px;}</style>';
	 var urlfinal = url1+url2+url3+url4+url5;  
popup = new GeoExt.Popup({
	title: "Opinion",
	location: feature,
	width:'auto',
	//html: '<img src="http://chart.apis.google.com/chart?cht=p&chd=t:'+values+'&chs=150x150&chco=096A09,FF0000,FFA500&chf=bg,s,ffffff00"/> <img src="http://chart.apis.google.com/chart?cht=it&chd=t:100&chs=150x150&chco=FF0000,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00"/>',
	//html: String.format(test),
	//autoLoad: test,
	html : urlfinal,
	maximizable: false,
	collapsible: false,
	panIn:false,

// 	items:[{
// autoLoad: {html:test, scripts: true},
// }]
    });
   
        popup.show();
        return {
            div: popup.getEl().dom,
            destroy: function() {popup.destroy()}
        };
}

  function getOtherAttributesFilter(objects) {
        var filters = [];
	//alert(objects);
        //If txtMyAppID has a value, add them.
		
		
		 for(var i=0;i< objects.length;i++){  
           

               filters.push(
                    new OpenLayers.Filter.Comparison({
                        type: OpenLayers.Filter.Comparison.EQUAL_TO,
                        property: "id_phrase",
			context : clcontext,
			featureType: featureTypeGeoserver,
                        value: objects[i]
                    })
                );
		
		 }
		
		
                

        
    
        return filters;
    }
    
    
    function filterData(objects){ 

    var objectsfilter = new String(objects);
    var objectsfilters=objectsfilter.split(","); 
   
    //alert(objectsfilters);

	var filterss = new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.OR,
	    evaluate : clcontext,
	    featureType: featureTypeGeoserver,
            filters: getOtherAttributesFilter(objectsfilters)
        });
	//alert(filterss.toString());
	//alert(filterss);
     wfsLayer["filter"] = filterss;
     
//     wfsLayer.redraw();
      wfsLayer.refresh({force:true});
//        wfsLayer.events.register('loadend', wfsLayer, function(){
// 	alert('layer loaded:' + (++counter));
//  	//map.zoomToExtent(wfsLayer.getDataExtent())
//        });
    }


function initializeChart(){
  
  
    var po;
    var neg;
    var neu;
    count = 0;
    po = 0;
    neg = 0;
    neu = 0;
    opinion5po = 0;
    opinion5neu= 0;
    opinion5neg= 0;
    opinion1po= 0;
    opinion1neu= 0;
    opinion1neg= 0;
    opinion2po= 0;
    opinion2neu= 0;
    opinion2neg= 0;
    opinion3po= 0;
    opinion3neu= 0;
    opinion3neg= 0;
    opinion4po= 0;
    opinion4neu= 0;
    opinion4neg= 0;
    var filterOnScreen = [];
    var arrayDate = [];
    var date1;
    var date2;
    var date3;
    var date4;
    var date5;

    
    
     for (var i=0, len=wfsLayer.features.length; i<len; i++) {
        var feature = wfsLayer.features[i];
	
        if (feature.onScreen()){
	  for(var ii = 0; ii<feature.cluster.length; ii++){

	    var st = feature.cluster[ii].data.te_valeur;
	    var dt = new Date(st);
	    arrayDate.push(dt);
	    
	  }
            
	   
	}
	
    }
    
    var date_sort_asc = function (date1, date2) {
    // This is a comparison function that will result in dates being sorted in
    // ASCENDING order. As you can see, JavaScript's native comparison operators
    // can be used to compare dates. This was news to me.
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
    };
    
    var date_sort_desc = function (date1, date2) {
    // This is a comparison function that will result in dates being sorted in
    // DESCENDING order.
    if (date1 > date2) return -1;
    if (date1 < date2) return 1;
    return 0;
    };
    
    // Finally, we are now able to call the sort method on our array of dates.
    // More info about array sorting: http://w3schools.com/jsref/jsref_sort.asp
    
    // First let's sort the array in ascending order.
    arrayDate.sort(date_sort_asc);
    var lendate=arrayDate.length
    var mildate = Math.round((lendate)/2);
    var milmildate = Math.round(mildate/2);
    var lastmildate = milmildate + mildate-1;
//     alert(lastmildate);
    //alert(arrayDate.length);
    
    date1 = arrayDate[0];
    date5 = arrayDate[lendate-1];
    date3 = arrayDate[mildate-1];
    date2 = arrayDate[milmildate-1];
    date4 = arrayDate[lastmildate-1];
    
    
    
  
 for (var i=0, len=wfsLayer.features.length; i<len; i++) {
        var feature = wfsLayer.features[i];
	
        if (feature.onScreen()){
	  for(var ii = 0; ii<feature.cluster.length; ii++){
	    
	    po += parseInt(feature.cluster[ii].data.positif);
	    neg += parseInt(feature.cluster[ii].data.negatif);
	    neu += parseInt(feature.cluster[ii].data.neutre);
	    
	    filterOnScreen.push(feature.cluster[ii].data.id_phrase);
	    var st = feature.cluster[ii].data.te_valeur;
	    var dt = new Date(st);
	    if(dt.getTime()==date1.getTime()){
// 	      alert(dt)
	      opinion1po += parseInt(feature.cluster[ii].data.positif);
	      opinion1neg += parseInt(feature.cluster[ii].data.negatif);
	      opinion1neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	    if(dt.getTime()==date5.getTime()){
	    //  alert(dt)
	      opinion5po += parseInt(feature.cluster[ii].data.positif);
	      opinion5neg += parseInt(feature.cluster[ii].data.negatif);
	      opinion5neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	     if(dt.getTime()==date3.getTime()){
	    //  alert(dt)
	      opinion3po += parseInt(feature.cluster[ii].data.positif);
	      opinion3neg += parseInt(feature.cluster[ii].data.negatif);
	      opinion3neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	    if(dt.getTime()==date4.getTime()){
	    //  alert(dt)
	      opinion4po += parseInt(feature.cluster[ii].data.positif);
	      opinion4neg += parseInt(feature.cluster[ii].data.negatif);
	      opinion4neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	    if(dt.getTime()==date2.getTime()){
// 	      alert(dt)
	      opinion2po += parseInt(feature.cluster[ii].data.positif);
	      opinion2neg += parseInt(feature.cluster[ii].data.negatif);
	      opinion2neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	  }
            
	   
	}
	 
    }
 /*    po = po.toString();
    neg = neg.toString();
    neu = neu.toString();*/
    
    jsonvalues = {"opinionpositive":po,"opinionneutre":neu,"opinionnegative":neg};
    jsonvalues1 = {"opinionpositive":opinion1po,"opinionneutre":opinion1neu,"opinionnegative":opinion1neg};
    jsonvalues5 = {"opinionpositive":opinion5po,"opinionneutre":opinion5neu,"opinionnegative":opinion5neg};
    jsonvalues3 = {"opinionpositive":opinion3po,"opinionneutre":opinion3neu,"opinionnegative":opinion3neg};
    jsonvalues4 = {"opinionpositive":opinion4po,"opinionneutre":opinion4neu,"opinionnegative":opinion4neg};
    jsonvalues2 = {"opinionpositive":opinion2po,"opinionneutre":opinion2neu,"opinionnegative":opinion2neg};

    //jsontext = JSON.stringify(jsonvalues, null, null);
  //  alert(jsontext);
    if(po>0||neu>0||neg>0){
    googlecharts(jsonvalues,jsonvalues1,jsonvalues2,jsonvalues3,jsonvalues4, jsonvalues5);
    } 
  
}

        function Geometry(symbol, maxSize, maxValue){
            this.symbol = symbol;
            this.maxSize = maxSize;
            this.maxValue = maxValue;

            this.getSize = function(value){
                 switch(this.symbol) {
                    case 'circle': // Returns radius of the circle
                    case 'square': // Returns length of a side
                      return Math.sqrt(value/this.maxValue)*this.maxSize;
                    case 'bar': // Returns height of the bar
                      return (value/this.maxValue)*this.maxSize;
                    case 'sphere': // Returns radius of the sphere
                    case 'cube': // Returns length of a side
                      return Math.pow(value/this.maxValue, 1/3)*this.maxSize;
                 }
            }
        }
        
        
        function test(feat){
	  
	  countcircle = feat;

        }
        
        
        

function init() {

    var options = {
	controls: [],
	hover: false,
	projection: epsg900913,
	displayProjection: epsg4326,
	units : "m",
	extent: [-5, 35, 15, 55],
	maxResolution: 156543.0339,
	maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34)
    };
    

    
    epsg4326 = new OpenLayers.Projection('EPSG:4326');
    epsg900913 = new OpenLayers.Projection('EPSG:900913');



    map = new OpenLayers.Map('', options);
    
    var osmLayer = new OpenLayers.Layer.OSM();
    var gmap = new OpenLayers.Layer.Google("Google Streets", {visibility: false});
    var gphy = new OpenLayers.Layer.Google(
    "Google Physical",
    {type: google.maps.MapTypeId.TERRAIN}
    );
    
    var ghyb = new OpenLayers.Layer.Google(
    "Google Hybrid",
    {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
    // used to be {type: G_HYBRID_MAP, numZoomLevels: 20}
    );
    var gsat = new OpenLayers.Layer.Google(
	"Google Satellite",
	{type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22,
	 sphericalMercator: true}
    );
    
    
    var symbol = new Geometry('circle', 1, 52555);
    var jsonvalues ;
    var posif = 0;
    var negif = 0;
    var neutrif = 0;
    var total = -1;
    var jsontext = '';
    clcontext = {
                             getSize: function(feature) {
                                 var npcap = 0;
                                 if (feature.cluster) {
                                    for (var i=0; (i<feature.cluster.length); i++) {
                                       npcap = npcap + parseFloat(feature.cluster[i].data.positif);
				        npcap = npcap + parseFloat(feature.cluster[i].data.negatif);
					npcap = npcap + parseFloat(feature.cluster[i].data.neutre);
                                    }
                                    npcap = npcap;
                                 }
                                 //alert(20 + Math.round(symbol.getSize(npcap) * Math.pow(2,map.getZoom()-1)));
				 if(map.getZoom()>6 && map.getZoom()<10){
				
                                return 20 + npcap + Math.round(symbol.getSize(npcap) * Math.pow(2,map.getZoom()-1));
				 }
				 else if(map.getZoom()>10){
				 return 12 + npcap + Math.round(symbol.getSize(npcap) * Math.pow(2,map.getZoom()-1));
				 }
				 else{
				  return  30 + npcap+ Math.round(symbol.getSize(npcap) * Math.pow(2,map.getZoom()));
				 }
                             },
                             getChartURL: function(feature) {
			       
			       
                                 npcap = 0;
                                 
				 var pos = 0;
				 var neg = 0;
				 var neutre = 0;        
				if(feature.onScreen()){
                                 if (feature.cluster) {
				  // alert(feature.cluster.length);
				    
                                    for (var i=0; (i<feature.cluster.length); i++) {
				      npcap = parseFloat(npcap);
                                       npcap = npcap + parseFloat(feature.cluster[i].data.positif);
				        npcap = npcap + parseFloat(feature.cluster[i].data.negatif);
					npcap = npcap + parseFloat(feature.cluster[i].data.neutre);
                                       pos = pos + parseFloat(feature.cluster[i].data.positif);
				        neg = neg + parseFloat(feature.cluster[i].data.negatif);
					neutre = neutre + parseFloat(feature.cluster[i].data.neutre);
					total += 1;
					//alert(total);
    
                                    }
                                    
                                   posif += pos;
				   neutrif += neutre;
				   negif += neg;
				   
				 
                                    
                                    var values = pos+','+neg+','+neutre;
				    
				    //jsonvalues = {"opinionpositive":pos,"opinionneutre":neutre,"opinionnegative":neg};
				    // var jsontext = JSON.stringify(jsonvalues, null, null);
				    // alert(jsontext);
				   
				     var size = 20 + Math.round(symbol.getSize(npcap) * Math.pow(2,map.getZoom()-0.2));
				     
				     var charturl;
				    
				     if(parseInt(neg)==0 && parseInt(neutre)==0){
                                    charturl = 'http://chart.apis.google.com/chart?cht=it&chd=t:100&chs=150x150&chco=096A09,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00';
				     }
				     else if(parseInt(pos)==0 && parseInt(neutre)==0){
                                    charturl = 'http://chart.apis.google.com/chart?cht=it&chd=t:100&chs=150x150&chco=FF0000,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00';
				     }
				     else if(parseInt(neg)==0 && parseInt(pos)==0){
                                    charturl = 'http://chart.apis.google.com/chart?cht=it&chd=t:100&chs=150x150&chco=FFA500,FFFFFF00,FFFFFF00&chf=bg,s,FFFFFF00';
				     }
				     else{
				     
                                    charturl = 'http://chart.apis.google.com/chart?cht=p&chd=t:'+values+'&chs=150x150&chco=096A09,FF0000,FFA500&chf=bg,s,ffffff00';
				      //alert(charturl);
				     }
				    
				     //alert(total);
				     
				    /* if(parseInt(total)==parseInt(countcircle)){
				     
				       //alert(feature.length);
				       jsonvalues = {"opinionpositive":posif,"opinionneutre":neutrif,"opinionnegative":negif};
				      jsontext = JSON.stringify(jsonvalues, null, null);
				     
				    
				   // alert(jsontext);
				     googlecharts();
				   // googlecharts(jsontext);
				     total=0;
				     posif=0;
				     neutrif=0;
				     negif=0;
				     }
				     
				     if(total>countcircle){
				       
				      total=0;
				      posif=0;
				     neutrif=0;
				     negif=0;
				      
				      
				     }*/
                                    //alert(charturl);
				    return charturl;
                                 }
                                 
                             }
			     }
                             
            };
	    
	   
	     
	   
	    var cltemplate = {
                              externalGraphic: "${getChartURL}",
                              graphicWidth: "${getSize}",
                              graphicHeight: "${getSize}",
                              graphicOpacity: 0.8,
			       fillOpacity: 1.0,
			        strokeWidth: 1
            };

            var clstyle = new OpenLayers.Style(cltemplate, {context: clcontext});
            var clstyleMap = new OpenLayers.StyleMap({
                                   'default': clstyle
                                   ,'select': new OpenLayers.Style({
				     
            graphicOpacity: 1.0,
	    fillOpacity: 1.0
        }),
        'hover': new OpenLayers.Style({
            graphicOpacity: 0.5,
	   
        })
                             });

    
    // Pour colorer les points en fonction de l'opinion (avec radius des points)
    /*var myStyles = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
	    //label:"${nombre}",
            strokeColor: "${getFillColor}",
            fillColor: "${getFillColor}",
            strokeWidth: 2,
            strokeOpacity: 0.9,
            fillOpacity: 0.9,
            pointRadius: "${getpointradius}"
        },{
            context: {
                getFillColor:function(feature) {
		    var sum = 0;
		    for (var i=0;i<feature.cluster.length;i++){
			
			sum += parseFloat(feature.cluster[i].data.somme);

		    }
                    if (sum ==-1)
                        return '#F4FA58';
		    
                    else if (sum<0)
                        return '#FF0000';
		    else if (sum>0)
                        return '#00FF00';
                },
		nombre:function(feat) {
		    var sum = 0;
		    for (var i=0;i<feat.cluster.length;i++){
			sum += parseFloat(feat.cluster[i].data.somme);
		    }
		    return sum;
                },
		getpointradius:function(radius){
		    var sum = 0; 
		    for (var i=0;i<radius.cluster.length;i++){
			sum += parseFloat(radius.cluster[i].data.somme);
			/* if (feat.cluster[0].data.somme >= 1)
			   
                           return feat.cluster[0].data.somme;
			   else 
                           return feat.cluster[0].data.somme;
		    }
                    return Math.min(radius.cluster.length, 7) + 5;
		    
		}
            }
        })
        ,"select": new OpenLayers.Style({
            fillColor: "#254117",
            strokeColor: " #254117",
        }),
        "hover": new OpenLayers.Style({
            fillOpacity: 0.3,
	    strokeOpacity : 1,
	    strokeWidth: 2.5
	    
        })
    }); */
			
		
/*      var suchobjekte = [];
      suchobjekte.push(7);
      
    suchobjekte = new String(suchobjekte);
    var y = suchobjekte;
 //var y=suchobjekte.split(","); 
  alert(y);
  
   var filter_body;
  var filter_header = '<'+'?xml version="1.0" encoding="ISO-8859-1"?><wfs:GetFeature xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.0.0" maxFeatures="5" outputFormat="GML2"><wfs:Query srsName="epsg:4326" typeName="id_phrase">';
           
         
 var filter_footer = '</wfs:Query></wfs:GetFeature>';

 var filter_1_1 = new OpenLayers.Format.Filter({version: "1.1.0"});
            var xml = new OpenLayers.Format.XML();
            var wfs_url = 'http://localhost:8080/geoserver/wfs';

 




 if(y.length > 1) {
       
               
               
          filter_body_1='<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"><ogc:Or>';
          filter_body_2="";
          filter_body_3='</ogc:Or></ogc:Filter>';
       
          for(var i=0;i< y.length;i++){  
             alert (y[i]);                                                                                                                      
            filter_body_2= filter_body_2 +'<ogc:PropertyIsEqualTo matchCase="true"><ogc:PropertyName>id_phrase</ogc:PropertyName><ogc:Literal>'+parseFloat(y[i])+'</ogc:Literal></ogc:PropertyIsEqualTo>';
          }      
               
    filter_body=filter_body_1 + filter_body_2 + filter_body_3; 
   
               
            } else {
               

               
              var filter_body = new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "id_phrase",
                    value: y[0]
                    });
   
              filter_body = xml.write(filter_1_1.write(filter_body));    
               
               
               
               
            }  
 
         
         
            var final_filter = filter_header+filter_body+filter_footer;
	   // alert(final_filter);

      req = new OpenLayers.Request.POST({
                method: "POST",
                url: 'http://localhost:8080/geoserver/wfs',
                data: final_filter,
		headers: {
        "Content-Type": "text/plain"
    },
		 callback: function (response) {
        //read the response from GeoServer
        var gmlReader = new OpenLayers.Format.GML({ extractAttributes: true });
        var features = gmlReader.read(response.responseText);
	
        // do what you want with the features returned...
    },
    failure: function (response) {
        alert("Something went wrong in the request");
    }
            }); 
  */
  
	var testval = [];
	
	
	 
	   var format = new OpenLayers.Format.CQL();
	   
	  // alert(format.read(filterss.toString()));
    //pour filtrer ce qui est affiché
   
    

    //Layer WFS à partir du service Geoserver
      wfsLayer = new OpenLayers.Layer.Vector(
        "WFS Opinions",
        {
            strategies : [ 
                new OpenLayers.Strategy.BBOX(),
		new OpenLayers.Strategy.Refresh({ "force": true }),
		new OpenLayers.Strategy.Cluster({distance: 70})],
            opacity:0.9,
            protocol: new OpenLayers.Protocol.WFS({
                version: "1.1.0"
                ,srsName: "EPSG:4326"
                ,url: urlGeoserver
                ,featureType: featureTypeGeoserver
                ,geometryName: geomGeoserver,
		extractAttributes: true
            }),
	   // filter:filterss
	    //styleMap : myStyles
	});
    
 /*   var filterComparison1 = new OpenLayers.Filter.Comparison({
    type: OpenLayers.Filter.Comparison.GREATER_THAN,
    property: attribute1,
    value: 5
});

var filterComparison2 = new OpenLayers.Filter.Comparison({
    type: OpenLayers.Filter.Comparison.LESS_THAN,
    property: attribute2,
    value: 2
});

var filterLogical=new OpenLayers.Filter.Logical({
        type: OpenLayers.Filter.Logical.AND,
        filters:[filterComparison1, filterComparison2]
});

var rule = new OpenLayers.Rule({
        name:"Rule 1",
        filter: filterLogical
  
});*/
    
    // Définition de la stylemap pour le wfs
    wfsLayer["styleMap"]=clstyleMap;
   // wfsLayer["filter"] = filterss;
    
    var count;
    var po;
    var neg;
    var neu;
    var opinion5po;
    var opinion5neu;
    var opinion5neg;
    var opinion1po;
    var opinion1neu;
    var opinion1neg;
    
    var displayedFeatures = [];
    count = 0;
    po = 0;
    neg = 0;
    neu = 0;
    opinion5po = 0;
    opinion5neu= 0;
    opinion5neg= 0;
    opinion1po= 0;
    opinion1neu= 0;
    opinion1neg= 0;
    opinion2po= 0;
    opinion2neu= 0;
    opinion2neg= 0;
    opinion3po= 0;
    opinion3neu= 0;
    opinion3neg= 0;
    opinion4po= 0;
    opinion4neu= 0;
    opinion4neg= 0;
        
    
        wfsLayer.events.register('loadend', wfsLayer, function() {
 //  map.zoomToExtent(wfsLayer.getDataExtent());
 
});
    
 map.events.register('moveend', this, function() {
    count = 0;
    po = 0;
    neg = 0;
    neu = 0;
    opinion5po = 0;
    opinion5neu= 0;
    opinion5neg= 0;
    opinion1po= 0;
    opinion1neu= 0;
    opinion1neg= 0;
    opinion2po= 0;
    opinion2neu= 0;
    opinion2neg= 0;
    opinion3po= 0;
    opinion3neu= 0;
    opinion3neg= 0;
    opinion4po= 0;
    opinion4neu= 0;
    opinion4neg= 0;
    var filterOnScreen = [];
    var arrayDate = [];
    var date1;
    var date2;
    var date3;
    var date4;
    var date5;

    
    
     for (var i=0, len=wfsLayer.features.length; i<len; i++) {
        var feature = wfsLayer.features[i];
	
        if (feature.onScreen()){
	  for(var ii = 0; ii<feature.cluster.length; ii++){

	    var st = feature.cluster[ii].data.te_valeur;
	    var dt = new Date(st);
	    arrayDate.push(dt);
	    
	  }
            
	   
	}
	
    }
    
    var date_sort_asc = function (date1, date2) {
    // This is a comparison function that will result in dates being sorted in
    // ASCENDING order. As you can see, JavaScript's native comparison operators
    // can be used to compare dates. This was news to me.
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
    };
    
    var date_sort_desc = function (date1, date2) {
    // This is a comparison function that will result in dates being sorted in
    // DESCENDING order.
    if (date1 > date2) return -1;
    if (date1 < date2) return 1;
    return 0;
    };
    
    // Finally, we are now able to call the sort method on our array of dates.
    // More info about array sorting: http://w3schools.com/jsref/jsref_sort.asp
    
    // First let's sort the array in ascending order.
    arrayDate.sort(date_sort_asc);
    var lendate=arrayDate.length
    var mildate = Math.round((lendate)/2);
    var milmildate = Math.round(mildate/2);
    var lastmildate = milmildate + mildate-1;
//     alert(lastmildate);
    //alert(arrayDate.length);
    
    date1 = arrayDate[0];
    date5 = arrayDate[lendate-1];
    date3 = arrayDate[mildate-1];
    date2 = arrayDate[milmildate-1];
    date4 = arrayDate[lastmildate-1];
    
    for (var i=0, len=wfsLayer.features.length; i<len; i++) {
        var feature = wfsLayer.features[i];
	
        if (feature.onScreen()){
	  for(var ii = 0; ii<feature.cluster.length; ii++){
	    
	    po += parseInt(feature.cluster[ii].data.positif);
	    neg += parseInt(feature.cluster[ii].data.negatif);
	    neu += parseInt(feature.cluster[ii].data.neutre);
	   
	    //alert(dt);
	    filterOnScreen.push(feature.cluster[ii].data.id_phrase);
	    var st = feature.cluster[ii].data.te_valeur;
	    var dt = new Date(st);
	    if(dt.getTime()==date1.getTime()){
// 	      alert(dt)
	      opinion1po += parseInt(feature.cluster[ii].data.positif);
	      opinion1neg += parseInt(feature.cluster[ii].data.negatif);
	      opinion1neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	    if(dt.getTime()==date5.getTime()){
	    //  alert(dt)
	      opinion5po += parseInt(feature.cluster[ii].data.positif);
	      opinion5neg += parseInt(feature.cluster[ii].data.negatif);
	      opinion5neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	     if(dt.getTime()==date3.getTime()){
	    //  alert(dt)
	      opinion3po += parseInt(feature.cluster[ii].data.positif);
	      opinion3neg += parseInt(feature.cluster[ii].data.negatif);
	      opinion3neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	    if(dt.getTime()==date4.getTime()){
	    //  alert(dt)
	      opinion4po += parseInt(feature.cluster[ii].data.positif);
	      opinion4neg += parseInt(feature.cluster[ii].data.negatif);
	      opinion4neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	    if(dt.getTime()==date2.getTime()){
// 	      alert(dt)
	      opinion2po += parseInt(feature.cluster[ii].data.positif);
	      opinion2neg += parseInt(feature.cluster[ii].data.negatif);
	      opinion2neu += parseInt(feature.cluster[ii].data.neutre);
	    }
	    
	  }
            
	   
	}
	
    }
    
    
      
      //alert(date1);
     // alert(date5);
//      alert(opinion1po);
    jsonvalues1 = {"opinionpositive":opinion1po,"opinionneutre":opinion1neu,"opinionnegative":opinion1neg};
    jsonvalues5 = {"opinionpositive":opinion5po,"opinionneutre":opinion5neu,"opinionnegative":opinion5neg};
    jsonvalues3 = {"opinionpositive":opinion3po,"opinionneutre":opinion3neu,"opinionnegative":opinion3neg};
    jsonvalues4 = {"opinionpositive":opinion4po,"opinionneutre":opinion4neu,"opinionnegative":opinion4neg};
    jsonvalues2 = {"opinionpositive":opinion2po,"opinionneutre":opinion2neu,"opinionnegative":opinion2neg};

    jsonvalues = {"opinionpositive":po,"opinionneutre":neu,"opinionnegative":neg};
    jsontext = JSON.stringify(jsonvalues, null, null);
    
    if(po>0||neu>0||neg>0){
     
    // alert(filterOnScreen);
    // filtreContrainteSpatiale(filterOnScreen);
      var suchobjekte = [];
      suchobjekte.push(7);
      suchobjekte.push(11);
      suchobjekte.push(40);
      suchobjekte.push(22);	 
      
//     suchobjekte = new String(suchobjekte);
//     var y=suchobjekte.split(","); 
      //filterData(suchobjekte);
   //  wfsLayer["filter"] = filterss;
     //wfsLayer.refresh({force:true});
    googlecharts(jsonvalues,jsonvalues1,jsonvalues2,jsonvalues3,jsonvalues4, jsonvalues5);
    }
    else{
      jsonvalues = {"opinionpositive":0,"opinionneutre":1,"opinionnegative":0};
    jsontext = JSON.stringify(jsonvalues, null, null);
    googlecharts(jsonvalues,jsonvalues,jsonvalues,jsonvalues,jsonvalues, jsonvalues);
    }
    
   // test(count);
   // alert(displayedFeatures.length);
   

    //Do somthing with displayedFeatures

});
   
 var test = 1;

 wfsLayer.events.register('featuresadded', wfsLayer, function() {
   if(test==1){
   map.zoomToExtent(wfsLayer.getDataExtent());
   test=2;
   }
   initializeChart();

});
    
 
    
    // Hover et sélections de WFS
    var report = function(e) {
        OpenLayers.Console.log(e.type, e.feature.id);
    };
    // Select et hover
    var highlightCtrl = new OpenLayers.Control.SelectFeature(wfsLayer, {
        hover: true,
        highlightOnly: true,
        renderIntent: "hover",
        eventListeners: {
            beforefeaturehighlighted: report,
            featurehighlighted: report,
            featureunhighlighted: report
        }
    });

    var selectCtrl = new OpenLayers.Control.SelectFeature(wfsLayer,
							  {clickout: true}
							 );
    
    map.addControl(highlightCtrl);
    map.addControl(selectCtrl);

    highlightCtrl.activate();
    selectCtrl.activate();
    
    // Ajout des couches à la carte
    map.addLayers([gphy,ghyb,gsat, osmLayer, gmap ,wfsLayer]);
    
   
    
    // Controles (déplacement souris, carte de vue d'ensemble etc.)
    map.addControl(new OpenLayers.Control.MousePosition({displayProjection: epsg4326})); //affichage localisation de la souris
    //var mapBounds = new OpenLayers.Bounds(3.527489,43.353706,3.695807,43.406295).transform(epsg4326,epsg900913);
    map.zoomToMaxExtent();
    map.addControl(new OpenLayers.Control.Navigation());
    map.addControl(new OpenLayers.Control.PanZoomBar({zoomWorldIcon: true}));
    map.addControl(new OpenLayers.Control.OverviewMap({autoPan : true},{displayProjection: epsg4326}));
    map.addControl(new OpenLayers.Control.KeyboardDefaults()); //se déplacer avec le clavier
    map.addControl(new OpenLayers.Control.ScaleLine()); //barre d'échelle
    map.addControl(new OpenLayers.Control.LayerSwitcher());


    //************************* Sélection zoom*******************


    var scaleStore = new GeoExt.data.ScaleStore({map: map});


    var zoomSelector = new Ext.form.ComboBox({
        store: scaleStore,
        emptyText: "Zoom Level",
        tpl: '<tpl for="."><div class="x-combo-list-item">1 : {[parseInt(values.scale)]}</div></tpl>',
        editable: false,
        triggerAction: 'all', // needed so that the combo box doesn't filter by its current content
        mode: 'local' // keep the combo box from forcing a lot of unneeded data refreshes
    });

    zoomSelector.on('select', 
		    function(combo, record, index) {
			map.zoomTo(record.data.level);
		    },
		    this
		   );     

    map.events.register('zoomend', this, function() {
        var scale = scaleStore.queryBy(function(record){
            return this.map.getZoom() == record.data.level;
        });

        if (scale.length > 0) {
            scale = scale.items[0];
            zoomSelector.setValue("1 : " + parseInt(scale.data.scale));
        } else {
            if (!zoomSelector.rendered) return;
            zoomSelector.clearValue();
        }
    });
    
    //***************************************************************
    

    var mapPanel = new GeoExt.MapPanel({
	map: map,
	region : 'center',
	height: '600',
	width: '600',
	title: 'Opinions',
	collapsible: false,
	border: true,
	
	//plugins: new GeoExt.ZoomSliderTip()
	bbar: [zoomSelector]
    });
    


    var treeConfig = new OpenLayers.Format.JSON().write([
        {
            nodeType    : 'gx_baselayercontainer',
            text        : 'Fonds de cartes',
	    icon       : 'Layers.png'
            ,expanded   : false
            ,allowDrag  : false
            ,allowDrop  : false
            ,draggable  : false
        }, {
            text        : 'Points Opinions'
            ,allowDrag  : true
            ,allowDrop  : true
            ,draggable  : true
            ,icon       : 'image.jpg'
            ,expanded   : false
            ,children   : [
		
		{
		    nodeType    : 'gx_layer'
                    ,draggable  : true
                    ,layer      : 'WFS Opinions'
                    ,qtip       : "WFS Opinions"
            	    ,icon       : 'pointvert.png'
		    
		}  
            ]
        }
    ], true);

    
    var layerTree = new Ext.tree.TreePanel({
        title       : "Layers"
        ,root: {
            nodeType    : "async"
            ,expanded   : true
            ,children   : Ext.decode(treeConfig)
        }
        ,loader: new Ext.tree.TreeLoader({
            applyLoader: false
        })
        ,animate    : true
        ,enableDD   : true
        ,useArrows  : true        
        ,rootVisible: false
    });
    
    // Pop up si besoin
    /*
    function createPopup(feature) {
        var popupExt;  
	if (!popupExt) { 
	    popupExt = new GeoExt.Popup({
		title: 'Berger',
		location: feature,
		html: "<b>Département : "+feature.cluster[0].data.somme,
		maximizable: false,
		collapsible: false,
		autoWidth: true,
		unpinnable: false,
		anchored: true,
            });
	    popupExt.show();	
	}
        if (popupExt) { 
	    popupExt.feature = null;
	    popupExt.destroy();
	    popupExt = new GeoExt.Popup({
		title: 'Berger',
		location: feature,
		html:"<b>Département : "+ feature.cluster[0].data.somme,
		maximizable: false,
		collapsible: false,
		autoWidth: true,
		unpinnable: false,
		anchored: true,
            });
	    popupExt.show();	
	}
    }     
    
    wfsLayer.events.on({
        featureselected: function(e) {
        createPopup(e.feature);
	
	}
	});*/

    var accordion = new Ext.Panel({
        margins : '5 0 5 5'
        ,split  : true
        ,width  : 160
        ,layout :'accordion'
        ,items  : [layerTree]
    });  
    
    var eastPanel = new Ext.Panel({  
	title   : 'Légende et données'      
        ,region : 'east'
        , collapsible : 'true'
	,collapsed: true
        ,layout : 'fit'
        ,width  : 220   
        ,items  : [accordion]
    });

    var content;
    var cont;
    var contjson;
    var contstring = "";
    
    var grid_store = new Ext.data.JsonStore({
	
	
	fields: [
	    {name: 'id', type: 'string'},
	    {name: 'phrase',type: 'string'}
	]
    });
    
    // Controles de événements (click) pour le wfs
    wfsLayer.events.on({
	featureselected: function(e) {
	  
	  createPopup(e.feature);
	    	    cont = "";

		    // Construction du flux JSON
	    	for (var i=0; i < e.feature.cluster.length; ++i){
		if (e.feature.cluster.length == 1){
		    cont+="[{\"id\": \""+ e.feature.cluster[i].data.id_spatialentity + "\",\"rnum\":\""+e.feature.cluster[i].data.rnum+"\",\"somme\":\""+e.feature.cluster[i].data.somme+"\",\"se_type\":\""+e.feature.cluster[i].data.se_type+"\",\"te_nom\":\""+e.feature.cluster[i].data.te_nom+"\",\"phrase\":\""+e.feature.cluster[i].data.contenu+"\"}]";
		}
		else if(i==0){
		    cont+="[{\"id\": \""+ e.feature.cluster[i].data.id_spatialentity + "\",\"rnum\":\""+e.feature.cluster[i].data.rnum+"\",\"somme\":\""+e.feature.cluster[i].data.somme+"\",\"se_type\":\""+e.feature.cluster[i].data.se_type+"\",\"te_nom\":\""+e.feature.cluster[i].data.te_nom+"\",\"phrase\":\""+e.feature.cluster[i].data.contenu+"\"},";
		}
		else if(i<e.feature.cluster.length-1){
		    cont+="{\"id\": \""+ e.feature.cluster[i].data.id_spatialentity + "\",\"rnum\":\""+e.feature.cluster[i].data.rnum+"\",\"somme\":\""+e.feature.cluster[i].data.somme+"\",\"se_type\":\""+e.feature.cluster[i].data.se_type+"\",\"te_nom\":\""+e.feature.cluster[i].data.te_nom+"\",\"phrase\":\""+e.feature.cluster[i].data.contenu+"\"},";
		}
		else{
		    cont+="{\"id\": \""+ e.feature.cluster[i].data.id_spatialentity + "\",\"rnum\":\""+e.feature.cluster[i].data.rnum+"\",\"somme\":\""+e.feature.cluster[i].data.somme+"\",\"se_type\":\""+e.feature.cluster[i].data.se_type+"\",\"te_nom\":\""+e.feature.cluster[i].data.te_nom+"\",\"phrase\":\""+e.feature.cluster[i].data.contenu+"\"}]";

		}
	    }
	    
	    contstring = cont.toString();
	  //  alert(contstring);
	    grid_view.getView().refresh();
	    contjson = JSON.parse(contstring);
	    
	    contstring = JSON.stringify(contjson);

	    
	    var readerr = new Ext.data.JsonReader({   
		type:'json',
	    });
	    
	    grid_store = new Ext.data.JsonStore({
		reader:readerr,
		autoLoad : true,
		idProperty: 'rnum',

		fields: [
		    {name: 'phrase',type: 'string'},
		    {name: 'te_nom',type: 'string'},
		    {name: 'se_type',type: 'string'},
		    {name: 'somme',type: 'int'}

		],
		data: contjson,
	    });
	    	   // alert(grid_store.data.length);

	    // Enovi du JSON vers le gridpanel
	    grid_view.store = grid_store;
	    grid_view.getView().refresh();
	    southPanel.expand(true);

	}


    });
    
    
    
    
    var opinionGridModel = new Ext.grid.ColumnModel({
	columns: [
	    new Ext.grid.RowNumberer(),
	    {
		id : "phrase",
		header : "Phrase",
		width : 250,
		dataIndex : "phrase",
		sortable: true
	    } , {
		id : "te_nom",
		header : "Nom de l'entité",
		width : 150,
		dataIndex : "te_nom",
		sortable: true
	    } , {
		id : "se_type",
		header : "Type d'entité",
		width : 150,
		dataIndex : "se_type",
		sortable: true
	    } , {
		id : "somme",
		header : "Valeur opinion",
		width : 150,
		dataIndex : "somme",
		sortable: true
	    } 
	]
    });
    

  
    var grid_view =new Ext.grid.GridPanel({
	store: grid_store,
	height: 350,
	colModel: opinionGridModel,
	width: 600,
	
    });
    
    

    
    
    var southPanel = new Ext.Panel({
	title: 'Détail opinions',
	region : 'south',
	layout : 'fit',
	collapsed: true,
	//hidden:true,
	collapsible: true,
	width : '100%',
	height : 150,
	items : [grid_view]
    });


    new Ext.Panel({
	renderTo: "mainpanel",
        layout: "border",
        height: 640,
        width: 600,
	items: [
	    mapPanel,
	    eastPanel,
	    southPanel
	],
	
    });
}



//*********************Annexe 4******************************//////

function init() {

//********************PHP / WestPanel*****************************
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

var promosStore = new Ext.data.JsonStore({
url : './liste_promos.php',
fields : ['display', 'value'],
root : 'rows',
autoLoad : true
});

var promosCombo = new Ext.form.ComboBox({
id : 'promosCombo',
fieldLabel : "Promotion",
triggerAction : 'all',
emptyText : "Choisir une promotion ",
editable : false,
store : promosStore,
mode : 'local',
valueField : 'value',
displayField : 'display'
});

var submitButton = new Ext.Button({
text : 'Afficher sur la carte',
handler : function() {
var datasetId = Ext.getCmp('promosCombo').getValue();
if (datasetId != '') {
Ext.getCmp('tableauAttrib').store.removeAll();
Ext.getCmp('tableauAttrib').store.proxy.protocol.params.id_promo = datasetId;
Ext.getCmp('tableauAttrib').store.load();
}
else {
Ext.MessageBox.alert("Erreur !","Veuillez d'abord sélectionner une promotion à afficher.");
}
}
});

var promosSelectionForm = new Ext.FormPanel({
id : 'promosSelection',
title : "Liste des promotions",
frame : true,
width : '100%',
buttonAlign : 'center',
labelAlign : 'left',
labelWidth : 70,
items : [promosCombo],
buttons : [submitButton]
});

//***************Pour mettre la loupe de zoom *********************


		OpenLayers.Control.CustomNavToolbar = OpenLayers.Class(OpenLayers.Control.Panel, {

			initialize: function(options) {
				        OpenLayers.Control.Panel.prototype.initialize.apply(this, [options]);
				        this.addControls([
				        new OpenLayers.Control.Navigation(),
				        new OpenLayers.Control.ZoomBox({alwaysZoom:true})
				        ]);
						this.displayClass = 'olControlNavToolbar' //par rapport au CSS
			},
			draw: function() {
				        var div = OpenLayers.Control.Panel.prototype.draw.apply(this, arguments);
                        this.defaultControl = this.controls[0];
				        return div;
			}
		});
		var panel = new OpenLayers.Control.CustomNavToolbar();

		
//********************Géolocalisation Utilisateur*****************************


vectors = new OpenLayers.Layer.Vector(
		    "Localisation utilisateur"
        );     
        
          
        /*navigator.geolocation.getCurrentPosition(
                                    geoPositionSuccess,
                                    geoPositionError,
                                    {maximumAge:0,enableHighAccuracy:true,timeout:0});      */
    
     
     	navigator.geolocation.getCurrentPosition(
                                    geoPositionSuccess,
                                    geoPositionError);
                                    
                                    
        function geoPositionError(error) {
          // Update a div element with error.message.
          alert("error during the geolocalisation process. Try again !");
        }
        
        var style = {
                externalGraphic : './marker_red.png',
                graphicWidth : 20,
                graphicHeight : 34,
                graphicYOffset : -34
            }; 
            
            
            
       function geoPositionSuccess(position){             
                
            //Feature            
            var point = new OpenLayers.Geometry.Point(position.coords.longitude,position.coords.latitude);
            pointProj = new OpenLayers.Projection.transform(
                                    point,
                                    new OpenLayers.Projection("EPSG:4326"), 
                                    new OpenLayers.Projection("EPSG:900913") );            
	        var feature = new OpenLayers.Feature.Vector(pointProj, null, style);		    
	        map.setCenter(new OpenLayers.LonLat(pointProj.x, pointProj.y),15);		   	    			   
	        vectors.addFeatures([feature]); 
	        // PopUp
	        if(typeof popup!='undefined'){
                 popup.destroy();
            }

	        /*popup = new OpenLayers.Popup.FramedCloud(
	            "GeoLoc",
	            new OpenLayers.LonLat(pointProj.x, pointProj.y),	            
	            null,
                "<b>lon : </b>"+ position.coords.longitude +"<br /> <b> lat : </b>" + position.coords.latitude,
                null,
                false,
                null ); 

            map.addPopup(popup);   */   
        }         


//******************** Carte  / Définition générale ****************************


var epsg4326 = new OpenLayers.Projection("EPSG:4326");
var epsg900913 = new OpenLayers.Projection("EPSG:900913");
var options = {
		controls: [],
		hover: false,
        onSelect: popUP, //fenêtre popUP WFS 
		projection: epsg900913,
		displayProjection: epsg4326,
		units : "m",
		extent: [-5, 35, 15, 55],
		maxResolution: 156543.0339,
		maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34)
	};


var map = new OpenLayers.Map('', options);
map.addControl(new OpenLayers.Control.PanZoomBar({zoomWorldIcon: true})); 
map.addControl(panel); //Loupe=>Zoom
new OpenLayers.Control.PanZoom();
map.addControl(new OpenLayers.Control.Navigation());
                                
var mapBounds = new OpenLayers.Bounds(-6,40,10,52).transform(epsg4326,epsg900913); //étendu carte au début
map.addControl(new OpenLayers.Control.MousePosition({displayProjection: epsg4326})); //affichage localisation de la souris
var vector_layer = new OpenLayers.Layer.Vector("Vecteurs créés"); //pour créer des vecteurs
map.addControl(new OpenLayers.Control.EditingToolbar(vector_layer)); //ajout des éléments d'édition
//map.addControl(new OpenLayers.Control.Graticule());

var overview_map = new OpenLayers.Control.OverviewMap({autoPan : true});
map.addControl(new OpenLayers.Control.ScaleLine()); //barre d'échelle
map.addControls([overview_map,new OpenLayers.Control.KeyboardDefaults()]); //se déplacer avec le clavier


//**************************** Layers WMS et WFS ************************************


var regions = new OpenLayers.Layer.WMS(
"France - Régions",
"http://gillesentringer.com/cgi-bin/mapserv?map=/home/stagesgeom/www/data/Projet/Projet.map",
{
projection: epsg4326,
layers: "regions",
transparent: true,
format: 'image/png'
},
{
singleTile: false,
opacity: 1,
isBaseLayer : false,
maxScale : 0.00000115382
});

var france = new OpenLayers.Layer.WMS(
"France",
"http://gillesentringer.com/cgi-bin/mapserv?map=/home/stagesgeom/www/data/Projet/Projet.map",
{
projection: epsg4326,
layers: "france_0",
transparent: true,
format: 'image/png',
},
{
singleTile: false,
opacity: 0.5,
isBaseLayer : false,
});


//************************ Layer Vector *******************************


var mywfs = new OpenLayers.Layer.Vector("France - Départements", {
    strategies: [new OpenLayers.Strategy.BBOX()],version: "1.1.0",
    opacity:0.9,
    projection:epsg4326,
    protocol: new OpenLayers.Protocol.WFS({
        url: "http://gillesentringer.com/cgi-bin/mapserv?map=/home/stagesgeom/www/data/Projet/Projet.map",
        featureType: "test", extractAttributes: true
    }),
    styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "white",
            strokeWidth: 1,
            fillColor: "navy",
            fillOpacity:0.9

        }),
         "select": new OpenLayers.Style({
            strokeColor: "red",
            strokeWidth: 2,
            fillColor: "red",
            fillOpacity:0.9

        }),
         "hover": new OpenLayers.Style({
            strokeColor: "black",
            strokeWidth: 2,
            fillColor: "blue",
            fillOpacity:0.3

        })
    })
});

var lieuxStages = new OpenLayers.Layer.Vector("Lieux des stages");
lieuxStagesStore = new GeoExt.data.FeatureStore({
layer: lieuxStages,
idProperty: 'numstage',
fields: [
{name: 'numstage', type: 'int'},
{name: 'datedebut', type: 'date', dateFormat: 'Y-m-d'},
{name: 'datefin', dateFormat: 'Y-m-d'},
{name: 'sujet', type: 'string'},
{name: 'nometud', type: 'string'},
{name: 'prenometud', type: 'string'}
],
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: "lieux_stages.php",
method: 'GET',
params: {id_promo: Ext.getCmp('promosCombo').getValue()},
format: new OpenLayers.Format.GeoJSON()
})
})
});
var lieuxStagesGridModel = new Ext.grid.ColumnModel({
columns: [
new Ext.grid.RowNumberer(),
{
id : "id",
header : "Id",
width : 25,
dataIndex : "numstage",
hidden: true
}, {
id : "datedebut",
header : "Date de début",
width : 120,
dataIndex : "datedebut",
sortable: true,
renderer: Ext.util.Format.dateRenderer('l d/m/Y')
}, {
id : "datefin",
header : "Date de fin",
width : 120,
dataIndex : "datefin",
sortable: true,
renderer: Ext.util.Format.dateRenderer('l d/m/Y')
}, {
id : "nometud",
header : "Nom de l'étudiant",
width : 110,
dataIndex : "nometud",
sortable: true
}, {
id : "prenometud",
header : "Prénom de l'étudiant",
width : 110,
dataIndex : "prenometud",
sortable: true
}, {
id : "sujet",
header : "Sujet du stage",
width : 700,
dataIndex : "sujet",
sortable: true
}
]
});

//Panel gauche pour noms des départements

var gridPanel = new Ext.grid.GridPanel({
id : 'tableauAttrib',
border: false,
stripeRows: true,
store : lieuxStagesStore,
colModel: lieuxStagesGridModel,
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});
    /* GRID */        
    // create feature store, binding it to the vector layer
    store1 = new GeoExt.data.FeatureStore({
        layer   : mywfs
        ,fields : [
            {name: 'name_2', type: 'string'},
            {name: 'name_1', type: 'string'}

        ]
    });
    
    // create grid panel configured with feature store
    gridPanel1 = new Ext.grid.GridPanel({
        store: store1
        ,columns : [{
        id : "name_2",
        sortable: true,
            header : "Nom"
            ,width : 150
            ,dataIndex : "name_2"
        }, {
        id : "name_1",
        sortable: true,
            header : "Région"
            ,width : 150
            ,dataIndex : "name_1"
        }]  
        ,sm: new GeoExt.grid.FeatureSelectionModel()       
    });
 var grid = new Ext.Panel({
        title   : 'Départements'
        ,layout :'fit'
        ,items  : [gridPanel1]
    });    
    
   var accordion = new Ext.Panel({
        margins : '5 0 5 5'
        ,split  : true
        ,width  : 160
        ,layout :'accordion'
        ,items  : [promosSelectionForm, grid]
    });     
    
var westPanel = new Ext.Panel({
region : 'west',
border : false,
width : 310,
minSize: 275,
maxSize: 325,
layout: 'fit',
collapsible: true,
items : [accordion]
});

var southPanel = new Ext.Panel({
title : 'Liste des stages',
region : 'south',
layout : 'fit',
collapsible: true,
width : '100%',
height : 150,
items : [gridPanel]
});
var lieuxStyleDefault = new OpenLayers.Style({
'strokeColor': '#0000aa',
'strokeWidth': 2,
'fillOpacity': 0.80,
'fillColor': 'white',
'pointRadius': 6
});
var lieuxStyleSelected = new OpenLayers.Style({
'strokeColor': '#000000',
'strokeWidth': 2,
'fillOpacity': 0.80,
'fillColor': 'red',
'pointRadius': 9
});
lieuxStages.styleMap = new OpenLayers.StyleMap({
'default': lieuxStyleDefault,
'select': lieuxStyleSelected
});

//********************Mesurer distance / surface*****************************

var selectFeatureControl = new OpenLayers.Control.SelectFeature(lieuxStages);

map.addControl(selectFeatureControl);
selectFeatureControl.activate();

var length = new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
    eventListeners: {
        measure: function(evt) {
            alert("La distance est de: " + evt.measure +" "+ evt.units);
        }
    }
});

var area = new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
    eventListeners: {
        measure: function(evt) {
            alert("La surface est de: " + evt.measure +" "+ evt.units+ "^2");
        }
    }
});

map.addControl(length);
map.addControl(area);

var toggleGroup = "measure controls";

var lengthButton = new Ext.Button({
    text: 'Mesurer distance',
    enableToggle: true,
    toggleGroup: toggleGroup,
    handler: function(toggled){
        if (toggled) {
            length.activate();
        	 area.deactivate();

        } else {
            length.deactivate();
        }
    }
});

var area1 = new Ext.Button({
    text: 'Mesurer zone',
    enableToggle: true,
    toggleGroup: toggleGroup,
    handler: function(toggled){
        if (toggled) {
            area.activate();
        	length.deactivate(); //pour permettre de changer entre les boutonns
        } else {
            area.deactivate();
        }
    }
});

var on = new Ext.Button({
	text:'on/off',
	    enableToggle: true,
toggleGroup: toggleGroup,
    handler: function(toggled){
        if (toggled) {
            length.deactivate();
        	 area.deactivate();

        } else {
        }
    }
});
//********************PopUp WFS et Hover*****************************


sf = new OpenLayers.Control.SelectFeature(mywfs, options)
map.addControl(sf);
sf.activate();

function popUP(mywfs) {
   // Je verifie qu'aucun popup n'existe deja
   if(typeof popup!='undefined'){
         popup.destroy();
    }
    //je definis les params de mon popup
    var htmlContent = "<b>Département : "+mywfs.attributes.name_2+"</b></i>";       
    var size = new OpenLayers.Size(20,34);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    //j'instancie mon popup
    popup = new OpenLayers.Popup.FramedCloud(
		mywfs.fid,
        mywfs.geometry.getBounds().getCenterLonLat(),
         null,
         htmlContent,
         null,
         true,
          null
    );
    //Je l'ajoute a la carte
   // map.addPopup(popup);                  
}

            var report = function(e) {
                OpenLayers.Console.log(e.type, e.feature.id);
            };
            
            var highlightCtrl = new OpenLayers.Control.SelectFeature(mywfs, {
                hover: true,
                highlightOnly: true,
                renderIntent: "hover",
                eventListeners: {
                    beforefeaturehighlighted: report,
                    featurehighlighted: report,
                    featureunhighlighted: report
                }
            });

            var selectCtrl = new OpenLayers.Control.SelectFeature(mywfs,
                {clickout: true}
            );

            map.addControl(highlightCtrl);
            map.addControl(selectCtrl);

            highlightCtrl.activate();
            selectCtrl.activate();


//********************Fonds de cartes**************************
 
 
map.addControl(new OpenLayers.Control.Attribution()); //Attributions / droits indications
var mapquest = new OpenLayers.Layer.OSM("MapQuest", "http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"); 
var mapquestsat = new OpenLayers.Layer.OSM("MapQuest Sat", "http://oatile1.mqcdn.com/naip/${z}/${x}/${y}.png");

function osm_getTileURL(bounds) {
 var res = this.map.getResolution();
 var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
 var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
 var z = this.map.getZoom();
 var limit = Math.pow(2, z);
 
 if (y < 0 || y >= limit) {
  return OpenLayers.Util.getImagesLocation() + "404.png";
 } else {
  x = ((x % limit) + limit) % limit;
  return this.url + z + "/" + x + "/" + y + "." + this.type;
 }
}



var osm = new OpenLayers.Layer.OSM(
"OSM Mapnik",
	        "http://tile.openstreetmap.org/${z}/${x}/${y}.png"
	        );
var gmap = new OpenLayers.Layer.Google("Google Streets");
    
    var gsat = new OpenLayers.Layer.Google(
                "Google Satellite",
                {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
            );
    var google_hybrid =  new OpenLayers.Layer.Google(
    	"Google Hybrid",
    	{ type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22}
    	);
    	
     var google_physical =  new OpenLayers.Layer.Google(
    	"Google Physical",
    	{ type: google.maps.MapTypeId.TERRAIN, numZoomLevels: 22}
    	);
   
   
//************************** Ajout des layers***************


map.addLayers([mapquest, osm, gmap, gsat, google_hybrid, google_physical, mapquestsat, vector_layer, france, regions,mywfs,lieuxStages,vectors]);
//map.addLayers([osm,france]);


//************************* Autres options*******************

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


//************************* Map Panel (+ opacité) *******************



var mapPanel = new GeoExt.MapPanel({
map: map,
region : 'center',
height: '800',
width: '600',
title: 'Lieux des stages du Master 2 SIIG3T 2009-2011',
collapsible: true,
extent:mapBounds,
        bbar: [zoomSelector,lengthButton, area1,on,{
        text: 'Transparence',
width: 50
},{
xtype: "gx_opacityslider",
left: 110,
y: 670,
width: 240,

layer: mywfs,
plugins: new GeoExt.LayerOpacitySliderTip({
        template: "Transparence: {opacity}%"
        })
}]
});


//*************************Tree (arborescence) *******************


    var treeConfig = new OpenLayers.Format.JSON().write([
        {
            nodeType    : 'gx_baselayercontainer',
                       text        : 'Fonds de cartes'
            ,expanded   : false
            ,allowDrag  : true
            ,allowDrop  : true
            ,draggable  : true
            ,icon       : 'lib/ext-3.4.0/resources/images/access/tree/terre_symbole.png'
        },{
           text        : 'Surcouches'
            ,allowDrag  : true
            ,allowDrop  : true
            ,draggable  : true
            ,icon       : 'lib/ext-3.4.0/resources/images/access/tree/layer_symbole.png'
            ,expanded   : false
            ,children   : [
                {
                    nodeType    : 'gx_layer'
                    ,draggable  : true
                    ,layer      : 'Lieux des stages'
                    ,qtip       : "Lieux des stages"
                    ,icon       : 'lib/ext-3.4.0/resources/images/access/tree/pointBleu.png'
                },                {
                    nodeType    : 'gx_layer'
                    ,draggable  : true
                    ,layer      : 'Localisation utilisateur'
                    ,qtip       : "Localisation utilisateur"
                    ,icon       : 'lib/ext-3.4.0/resources/images/access/tree/marker_red.png'
                },    {
                    nodeType    : 'gx_layer'
                    ,draggable  : true
                    ,layer      : 'France'
                    ,qtip       : "France"
                    ,icon       : 'lib/ext-3.4.0/resources/images/access/tree/map.png'
                },       {
                    nodeType    : 'gx_layer'
                    ,draggable  : true
                    ,layer      : 'France - Régions'
                    ,qtip       : "France - Régions"
                    ,icon       : 'lib/ext-3.4.0/resources/images/access/tree/map.png'
                },     
                             {
                    nodeType    : 'gx_layer'
                    ,draggable  : true
                    ,layer      : 'France - Départements'
                    ,qtip       : "France - Départements"
                    ,icon       : 'lib/ext-3.4.0/resources/images/access/tree/map.png'
                },                                 
                {
                    nodeType    : 'gx_layer'
                    ,draggable  : true
                    ,layer      : 'Vecteurs créés'
                    ,qtip       : "Vecteurs créés"
                    ,icon       : 'lib/ext-3.4.0/resources/images/access/tree/map.png'
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

 var accordion = new Ext.Panel({
        margins : '5 0 5 5'
        ,split  : true
        ,width  : 160
        ,layout :'accordion'
        ,items  : [layerTree]
    });  
 
 
 //************************* East Panel *******************


    //Data Panel
	var eastPanel = new Ext.Panel({  
	title   : 'Légende et données'      
        ,region : 'east'
        , collapsible : 'true'
        ,layout : 'fit'
        ,width  : 220   
        ,items  : [accordion]
    });


 //************************* Viewport *******************

new Ext.Viewport({
layout: "border",
defaults: {
split: true
},
items: [
mapPanel,
westPanel,
southPanel,
eastPanel,

]
});
}

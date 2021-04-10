var mymap = L.map('map',{center:[43.4750964413847,  -80.40], zoom:10, attributionControl:false});

ctlAttribute = L.control.attribution().addTo(mymap); 
ctlAttribute.addAttribution('Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ')
ctlAttribute.addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>')
ctlAttribute.addAttribution('Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community') 


            var sidebar = L.control.sidebar({
                  autopan: false,       // whether to maintain the centered map point when opening the sidebar
                  closeButton: true,    // whether t add a close button to the panes
                  container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
                  position: 'right',     // left or right
              }).addTo(mymap);

            sidebar.open('start');

            var searchControl = L.esri.Geocoding.geosearch({
              position: 'topright',
              expanded: 'true'

            }).addTo(mymap);

              var results = L.layerGroup().addTo(mymap);

              searchControl.on('results', function (data) {
                results.clearLayers();
                for (var i = data.results.length - 1; i >= 0; i--) {
                  results.addLayer(L.marker(data.results[i].latlng));
                }
            
              });


            var styleBound = {
                "color": 'Black',
                "fill": 0,
                "fillOpacity": 0.25,
                "weight": 2
            };  
            
            //lowest
            var styleSolar1 = {
                "color": '#AD3903',
                "fill": 1,
                "fillOpacity": 0.6,
                "weight": 0.2
            };   

             var styleSolar2 = {
                "color": '#F77B17',
                "fill": 1,
                "fillOpacity": 0.6,
                "weight": 0.2
            };   

            //highest
            
             var styleSolar3 = {
                "color": '#FFBF86 ',
                "fill": 1,
                "fillOpacity": 0.6,
                "weight": 0.2
            };   

        var waterlooBound = new L.GeoJSON.AJAX("map_files/waterloo_boundaryJSON.json",{style: styleBound}).addTo(mymap);
        
        var waterloo1 = new L.GeoJSON.AJAX("map_files/water_low.json",{style: styleSolar1});
        var waterloo2 = new L.GeoJSON.AJAX("map_files/water_midd.json",{style: styleSolar2});
        var waterloo3 = new L.GeoJSON.AJAX("map_files/water_high.json",{style: styleSolar3});
        


       // add basemaps to the control panel
      var baseLayers = [

        {   
          active: true,
          name: "Esri Grey Canvas",
          layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'), 
          attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      },
        {
            
            name: "OpenStreetMap",
            layer: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
            attribution: "t6estiubewiufbub"
        },

        {  
            name: "Satellite Imagery",
            layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
            icon2: '<i class="fa fa-square" style="color:black;"></i>'
        }]; 


            // add layers to the control panel
            var overLayers = [
          
                {
                group: "Relative Estimated Capital Cost",
                    //collapsed: true,
                layers: [   
                                {
                                    active: true,
                                    name: "&nbsp Highest (33%)",
                                    icon: '<i class="fa fa-square" style="color:#FFBF86  ";"></i>',
                                    layer: waterloo3,
                                },

                                 {
                                    active: true,
                                    name: "&nbsp Middle (33%)",
                                    icon: '<i class="fa fa-square" style="color:#F77B17 ";"></i>',
                                    layer: waterloo2,
                                },

                                 {
                                    active: true,
                                    name: "&nbsp Lowest (33%)",
                                    icon: '<i class="fa fa-square" style="color:#AD3903";"></i>',
                                    layer: waterloo1,
                                },

                            ]
                }];

            var panelLayers = new L.Control.PanelLayers(baseLayers, overLayers,  {
                
              title: "&nbsp Mapping Opportunities for Ground  &nbsp \n <br> &nbsp Mount Solar in Waterloo Region &nbsp",
              compact: true,
              //collapsed: true,
              position: 'topleft',
              collapsibleGroups: true

            });

            mymap.addControl(panelLayers);

        //this point is being added as a control point, without it the lat and long of other points seems to be wrong
         var marker = L.marker([43.52465500687185,-80.474853515625])

        // Create Leaflet Draw Control for the draw tools and toolbox
        var drawControl = new L.Control.Draw({
          draw : {
            //polygon : false,
            polyline : false,
            rectangle : false,
            circle : false,
            marker: false,
            circlemarker: false
            
          },
          edit : false,
          remove: false
          });

            mymap.addControl(drawControl);
            controlOnMap = true;
          // Boolean global variable used to control visiblity
          var controlOnMap = false;

          // Create variable for Leaflet.draw features
          var drawnItems = new L.FeatureGroup();

          // Function to add the draw control to the map to start editing
          function startEdits(){
           if(controlOnMap == true){
             mymap.removeControl(drawControl);
             controlOnMap = false;
           }
          mymap.addControl(drawControl);
            controlOnMap = true;
          };

          // Function to remove the draw control from the map
          function stopEdits(){
            mymap.removeControl(drawControl);
            controlOnMap = false;
         };

          // Function to run when feature is drawn on map
            mymap.on('draw:created', function (e) {
              var layer = e.layer;
              drawnItems.addLayer(layer);
              mymap.addLayer(drawnItems);
              dialog.dialog("open");
              $('#save-btn').css('background-color', '#FF6347');    
            });

  
            // Use the jQuery UI dialog to create a dialog and set options
              var dialog = $("#dialog").dialog({
              autoOpen: false,
              height: 400, //later change these to be dependant on the screen width and height
              width: 350,
              dialogClass: "noclose",
              modal: true,
              position: {
                my: "center center",
                at: "center center",
                of: "#map"
              },

               buttons: [
                          {
                              text: "Save",
                              id:"save-btn",
                              class: 'red',
                              disabled: true,
                              click: setData,
                              type: "submit"
                              

                          },
                          {
                              text: "Cancel",
                              click: function() {
                                  dialog.dialog("close");
                                  mymap.removeLayer(drawnItems);
                                  location.reload(); 
                              }
                          }
                      ],
                      
                    close: function() {
                      alert("Thank you! Your submission has been sent.");
                    form[ 0 ].reset();
                    //console.log("Dialog closed");
          
                        }       

                  });

            
            
            
            
            // Stops default form submission and ensures that setData or the cancel function run
            var form = dialog.find("form").on("submit", function(event) {
              event.preventDefault();
            }); 

            function setData() {

              var values = [],
              
              inputs = document.getElementsByTagName("input");
                  for (var i = inputs.length -1 ; i>= 0; i--)
                    if (inputs[i].type === "checkbox" && inputs[i].checked)
                        values.push(inputs[i].value);


              var currentDate = new Date();

              var enteredSuitability = values; //suitability.value;
              var enteredDescription = description.value;
              drawnItems.eachLayer(function (layer) {

                  const bigArray = [];
                  const array = (layer._latlngs[0]);

                  array.forEach(function (item) {
                      const smallArray = `[${item.lng},${item.lat}]`;
                      bigArray.push(smallArray);
                    });

                  //console.log(bigArray);
                  const nestedArray = (bigArray.toString());
                  const coordinates_test = `[${nestedArray}]`
                  
                  var sql = "INSERT INTO waterloo_solar_polygons (geom, suitability, description, date) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('";
                  var sql2 ='{"type":"Polygon","coordinates":[' + coordinates_test + "]}'),4326),'" + enteredSuitability[0] + "','" + enteredDescription + "','" + currentDate +"')";
                  var pURL = sql+sql2;

                  
                  const data = {pURL};
                  const options = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                  };
                  fetch('/apiWaterloo', options);
                  
              });
              mymap.removeLayer(drawnItems);
              drawnItems = new L.FeatureGroup();
              //console.log("drawnItems has been cleared");
              dialog.dialog("close");
              location.reload(); 
          };


         $(document).ready(function(){

            $('[name="suitability"],#description').bind("keyup change", function(e){
                //check if checkbox is checked
                if ($('[name="suitability"]').is(':checked') && ($('#description').val() != 0)){
                    

                    $('#save-btn').removeAttr("disabled"); //enable input
                    $('#save-btn').css('background-color', '#008000');
                    $('#save-btn').css('color', '#000000');  
                } 
                
                else {
                    $('#save-btn').attr("disabled", true); //disable input
                    $('#save-btn').css('background-color', '#FF6347');
                }
            
            });

        });


              $(document).ready(function(){


             $('[name="suitability"]').change(function(){
              
               if(this.checked){
                $('[name="suitability"]').not(this).prop('checked', false);
                }    
           });

          });
            
          
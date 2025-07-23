import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import Mapbox, { 
  MapView, 
  LocationPuck, 
  Camera, 
  ShapeSource, 
  SymbolLayer, 
  FillLayer, 
  Images, 
  CircleLayer,
  MarkerView, 
} from "@rnmapbox/maps";
import { FeatureCollection } from 'geojson';
import { fixCoords } from "@/utils/geoJsonFix";

// create a dummy fire data object 
// used as a place holder until real data can be loaded
const emptyFireData : FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "empty",
      "geometry": {
        "type": "Point",
        // coordinate does not exist 
        "coordinates": [-563422.48988806, -456587.33083712]
      },
      "properties": {
        lat: -200,
        lon: -200
      }
    },
  ]
}

// API public access token
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MB_TOKEN as string);

// define ts enum for layer visibility state
enum LayerVisibility {
  Visible = 'visible',
  Hidden = 'none'
}


export default function Index() {
  const [ popupText, setPopupText ] = useState('no text');
  // state to keep track of fire layer visibility
  const [ currentFireLayerVis, setCurrentFireLayerVis ] = useState<LayerVisibility>(LayerVisibility.Visible);
  const [ fireData, setFireData ] = useState<FeatureCollection>(emptyFireData);
  const [ fireDataDownloadActivity, setFireDataDownloadActivity ] = useState<boolean>(false);

  const [ selectedFeature, setSelectedFeature ] = useState<any>(null);
  const [ showCurrentFires, setShowCurrentFires ] = useState<boolean>(true);


 
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* add a container for sizing the map */}
      <View style={styles.container}>
        <MapView 
          // set the style so that the map fills the whole container
          style={styles.map} 
          projection="mercator"
          // change the style of the map
          // styleURL="mapbox://styles/mapbox/outdoors-v12"
          // compassEnabled={true}
          // compassFadeWhenNorth={true}
          rotateEnabled={false}
          scaleBarEnabled={false}
          onPress={() => {
            setSelectedFeature(null);
            setPopupText('');
          }}
          onDidFinishLoadingMap={async () => {
            // console.log('finished loading map');
            // console.log(fireData);

            // show an activity indicator for the data downloading
            setFireDataDownloadActivity(true);


            fetch('https://cwfis.cfs.nrcan.gc.ca/geoserver/public/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=activefires_current&maxFeatures=100000&outputFormat=JSON')
            .then(response => response.json())
            .then((rawJson) => {
              // CFWIS datamart coordinates are in wrong format
              // this fixes the coordinates
              const json : FeatureCollection = fixCoords( rawJson );
              setFireData(json);

              // stop the activity indicator
              setFireDataDownloadActivity(false);
              // console.log(json);
            })
            .catch((error) => {
              // need to have locally stored data in case service not available
              console.error(
                "Error downloading fire data: " + 
                error + 
                " \n   ... reverting to locally stored data");

              // import fire data - currently stored locally
              const rawJson : FeatureCollection = require('../../assets/fireData.json');

              // CFWIS datamart coordinates are in wrong format
              // this fixes the coordinates
              const json : FeatureCollection = fixCoords( rawJson );

              setFireData(json);

              // stop the activity indicator
              setFireDataDownloadActivity(false);
            })
          }}
        >
          {/* show the user's location */}
          <LocationPuck
            visible={true}
            pulsing={{
              isEnabled: true,
            }}
          />
          <Camera
            // change camera default location and zoom
            defaultSettings={{
              centerCoordinate: [-100, 60],
              zoomLevel: 2,
            }}
            // bound the camera to stay over Canada
            maxBounds={{
              ne: [-45, 85],
              sw: [-145, 35]
            }}
          />

          {/* add fire layer */}

          {/* <ShapeSource 
            id="fires"
            // url="../../fireData.json"
            // shape={json}
            shape={fireData}
            cluster={true}
            onPress={(event)=>{
              console.log(event.features)
              const feature = event.features[0]
              if ( feature.properties ) {
                setPopupText(feature.properties.firename)
              }
            }}
          >
            <CircleLayer
              id="exampleCircles"
              sourceID="fires"
              style={{
                // circleColor: 'red',
                circleColor: [
                  'case',
                  ['boolean', ['feature-state', 'click'], false],
                  'blue',
                  'red'
                ],
                visibility: currentFireLayerVis,
              }}
            /> */}

            {/* <CircleLayer
              id="selectedCircle"
              sourceID="fires"
              filter={["has", 'id']}
              style={{
                circleColor: 'green',
                visibility: currentFireLayerVis,
              }}
            /> */}
            {/* <Images images={{icon: require('../../assets/images/favicon.png')}}/> */}
            {/* <FillLayer id="pointsFill" style={{fillColor: 'black',}}></FillLayer> */}
          {/* </ShapeSource> */}

          {/* <MarkerView coordinate={[-110, 51]}>
            <View style={styles.markerBackground}>
              <Text>This is a view</Text>
            </View>
          </MarkerView> */}

          <>
          {showCurrentFires ? 
            fireData.features.map((feature) => {
              // don't do anything if geometry type is not point
              // other geometry types may not have a coordinates property
              // adapted from solution by user Shaun Luttin:
              // https://stackoverflow.com/questions/55621480/cant-access-coordinates-member-of-geojson-feature-collection
              if (feature.geometry.type === 'Point') {
                // if coordinates do not exist, then don't do anything
                const [lon, lat] = feature.geometry.coordinates;

                if (lat > 90 || lat < -90 || lon > 180 || lon < -180) {
                  return;
                }

                // return a marker to display
                return ( 
                  <MarkerView key={feature.id} coordinate={feature.geometry.coordinates}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: ( feature.id === selectedFeature ) ? 'green' : 'red',
                        borderRadius: '50%',
                        height: 10,
                        width: 10,
                      }}
                      onPress={() => {
                        setPopupText(feature.properties?.firename);
                        setSelectedFeature(feature.id);
                      }}
                    >
                    </TouchableOpacity>
                  </MarkerView>
                )
              }
            }) : null
          }
          </>

        </MapView>

        <View style={[styles.popupContainer, { display: selectedFeature ? 'flex' : 'none'}]}>
          <Text style={styles.popupTitle}>Fire Name</Text>
          <Text>{ popupText }</Text>
        </View>

        {/* button for layer visibility panel */}
        <TouchableOpacity 
          style={styles.layerPanel}
          onPress={() => {
            // // if layer currently visible then hide the layer
            // if ( currentFireLayerVis === LayerVisibility.Visible) {
            //   setCurrentFireLayerVis(LayerVisibility.Hidden);
            //   return
            // }
            // // default behaviour is to make layer visible
            // setCurrentFireLayerVis(LayerVisibility.Visible);

            setShowCurrentFires(!showCurrentFires);
          }}
        >
          <Text>Current Fires</Text>
        </TouchableOpacity>

        {/* activity indicator to indicate status of fire data download */}
        <ActivityIndicator 
          animating={fireDataDownloadActivity}
          size='large'
          style={styles.activityIndicator}
          color='#000'
        />
   
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "tomato"
  },

  markerBackground: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, 
  },

  popupContainer: {
    width: "90%",
    height: 100,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    left: 20
  },

  popupTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16
  },

  layerPanel: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: 70,
    right: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  activityIndicator: {
    position: 'absolute',
    top: 120,
    right: 20
  }
})
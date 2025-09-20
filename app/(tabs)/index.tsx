import { Text, View, StyleSheet, Pressable, ActivityIndicator, Dimensions } from "react-native";
import { useState, useRef, useCallback } from "react";
import Mapbox, { 
  MapView, 
  LocationPuck, 
  Camera, 
  ShapeSource, 
  SymbolLayer, 
  Images, 
  Image,
  CircleLayer,
} from "@rnmapbox/maps";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LayerVisibilityButton from "@/components/layerVisibilityButton";
import { FeatureCollection } from 'geojson';
import { fixCoords } from "@/utils/geoJsonFix";
import { getControlStageString, getResponseTypeString } from "@/utils/fireInformationHandlers";

// type imports
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import { LayerVisibility } from "@/types/commonTypes";

import Ionicons from '@expo/vector-icons/Ionicons';


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
        // coordinate in wrong format
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

type FireDetails = {
  firename: string;
  hectares: string;
  responseType: string;
  controlStage: string;
  startDate: string;
}


export default function Index() {
  const [ popupText, setPopupText ] = useState<FireDetails | null>(null);
  // state to keep track of fire layer visibility
  const [ currentFireLayerVis, setCurrentFireLayerVis ] = useState<LayerVisibility>(LayerVisibility.Visible);

  // state for map data
  const [ fireData, setFireData ] = useState<FeatureCollection>(emptyFireData);

  // state for activity indicator when downloading
  const [ fireDataDownloadActivity, setFireDataDownloadActivity ] = useState<boolean>(false);

  // state to keep track of selected fire
  const [ selectedFeature, setSelectedFeature ] = useState<any>('');


  // LAYERS PANEL MODAL VIEW DEFINITIONS //

  // ref and callbacks are adapted from bottom-sheet library docs

  // ref used to access methods of the BottomSheetModal component
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks for layers panel visibility
  // adapted from bottom-sheet documentation
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);


  // CALLBACKS //

  const handleDismissSelectedFire = () => {
    // update appropriate states
    setSelectedFeature(null);
    setPopupText(null);

    // update the fire data feature collection so that 
    // the selected property is false for every feature
    const resetFeatures = fireData.features.map((feature) => {
      return { ...feature, properties: {...feature.properties, selected: false}}
    })

    setFireData({...fireData, features: resetFeatures});
  }

  const handleSelectingFire = async ( event: OnPressEvent ) => {
    // access the feature that was pressed
    const feature = event.features[0]

    // check that the feature has a set of properties
    // do nothing if it doesn't
    if ( feature.properties ) {
      // do nothing if a cluster was selected
      if (feature.properties.cluster) {
        // dismiss the properties panel if it was previously selected
        handleDismissSelectedFire();
        return;
      }

      // convert the feature's date to a JS Date object
      const unixDate = Date.parse(feature.properties.startdate);
      const date = new Date(unixDate);

      // set options for displaying date
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      // object to store data to be displayed in fire details popup
      const fireDetails : FireDetails = {
        firename: feature.properties.firename,
        hectares: feature.properties.hectares,
        responseType: getResponseTypeString(feature.properties.response_type),
        controlStage: getControlStageString(feature.properties.stage_of_control),
        startDate: date.toLocaleDateString(undefined, options)
      }

      // set the data for the fire details popup
      setPopupText(fireDetails);
      // store the id of the selected feature
      setSelectedFeature(feature.id);

      // create a new array of features with updated properties
      const newFeatures = fireData.features.map((feat) => {
        // set the "selected" property to true if current
        // iteration is the pressed feature
        if ( feat.id == feature.id ) {
          return { ...feat, properties: {...feat.properties, selected: true} };
        } else {
          // otherwise set the "selected" property to false
          return { ...feat, properties: {...feat.properties, selected: false} };
        }
      })

      // update the fire data state variable with the updated features
      setFireData({...fireData, features: newFeatures});
    }
  }

  const handleDownloadFireData = async () => {
    // show an activity indicator for the data downloading
    setFireDataDownloadActivity(true);

    // fetch and store current fire data
    fetch('https://cwfis.cfs.nrcan.gc.ca/geoserver/public/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=activefires_current&maxFeatures=100000&outputFormat=JSON')
    .then(response => response.json())
    .then((rawJson) => {
      // CFWIS datamart coordinates are in wrong format
      // this fixes the coordinates
      const json : FeatureCollection = fixCoords( rawJson );

      // udpate the fire data
      setFireData(json);

      // stop the activity indicator
      setFireDataDownloadActivity(false);
    })
    .catch((error) => {
      // need to have locally stored data in case service not available
      alert('Could not connect to server, using old fire data for map.')
      // import fire data - currently stored locally
      const rawJson : FeatureCollection = require('../../assets/fireData.json');

      // CFWIS datamart coordinates are in wrong format
      // this fixes the coordinates
      const json : FeatureCollection = fixCoords( rawJson );

      // update the fire data
      setFireData(json);

      // stop the activity indicator
      setFireDataDownloadActivity(false);
    })
  }

 
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
          rotateEnabled={false}
          scaleBarEnabled={false}
          pitchEnabled={false}
          onPress={ handleDismissSelectedFire }
          onDidFinishLoadingMap={ handleDownloadFireData }
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
              ne: [-35, 85],
              sw: [-160, 20]
            }}
          />

          {/* add fire layer */}

          {/* 
            fire layer implementation with shapesource adapted from following resources
            https://docs.mapbox.com/mapbox-gl-js/example/cluster/
            https://rnmapbox.github.io/docs/examples/SymbolCircleLayer/Earthquakes
          */}

          <Images>
            <Image
              name="pin"
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 10,
                  backgroundColor: 'red'

                }}
              ></View>
            </Image>
            {/* <Image
              name="pin-blue"
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: 'blue'

                }}
              ></View>
            </Image> */}
          </Images>


          <ShapeSource 
            id="fires"
            shape={fireData}
            cluster={true}
            clusterRadius={30}
            onPress={ handleSelectingFire }
          >

            <SymbolLayer
              id="pointCount"
              filter={['has', 'point_count']}
              style={{
                textField: ['get', 'point_count_abbreviated'],
                textFont: ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                textSize: 12,
                visibility: currentFireLayerVis,
              }}
            />
            
            <CircleLayer 
              id="clusteredPoints"
              belowLayerID="pointCount"
              filter={['has', 'point_count']}
              style={{
                circleColor: '#FDC358',
                circleRadius: 12,
                visibility: currentFireLayerVis,
              }}
            />

            <CircleLayer 
              id="clusteredPointsOutline"
              belowLayerID="clusteredPoints"
              filter={['has', 'point_count']}
              style={{
                circleColor: '#DD7207',
                circleRadius: 14,
                visibility: currentFireLayerVis,
              }}
            />

            <SymbolLayer
              id="singlePointCustom"
              belowLayerID="clusteredPointsOutline"
              filter={['!', ['has', 'point_count']]}
              style={{
                iconImage: 'pin',
                iconSize: [
                  'case',
                  ['boolean', ['get', 'selected'], false],
                  2,
                  1
                ],
                visibility: currentFireLayerVis
              }}
            />

          </ShapeSource>

        </MapView>


        {/* fire info panel */}
        <View style={[styles.popupContainer, { display: selectedFeature ? 'flex' : 'none'}]}>
          <View style={[styles.popupRow, styles.popupHeaderRow]}>
            <Text style={[styles.popupTitle, styles.popupHeaderTitle]}>Fire Information</Text>
            <Pressable onPress={ handleDismissSelectedFire }>
              <MaterialIcons name="close" size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.popupRow}>
            <Text style={styles.popupTitle}>Fire Name:</Text>
            <Text style={styles.detailsText}>{ popupText?.firename }</Text>
          </View>
          <View style={styles.popupRow}>
            <Text style={styles.popupTitle}>Stage of Control:</Text>
            <Text style={styles.detailsText}>{ popupText?.controlStage }</Text>
          </View>
          <View style={styles.popupRow}>
            <Text style={styles.popupTitle}>Response Type:</Text>
            <Text style={styles.detailsText}>{ popupText?.responseType }</Text>
          </View>
          <View style={styles.popupRow}>
            <Text style={styles.popupTitle}>Start Date:</Text>
            <Text style={styles.detailsText}>{ popupText?.startDate }</Text>
          </View>
          <View style={styles.popupRow}>
            <Text style={styles.popupTitle}>Hectares:</Text>
            <Text style={styles.detailsText}>{ popupText?.hectares }</Text>
          </View>
        </View>

        

        {/* activity indicator to indicate status of fire data download */}
        <ActivityIndicator 
          animating={fireDataDownloadActivity}
          size='large'
          style={styles.activityIndicator}
          color='#000'
        />

        {/* Button to toggle layers panel */}
        <Pressable 
          style={styles.layerMenu}
          onPress={ handlePresentModalPress }
        >
          <Ionicons name="layers-outline" size={24} color="black" />
        </Pressable>

        {/* Layers selection panel (modal) */}

        {/* backdrop component implementation provided by user 
            JerryVerhoeven on Jun 5, 2023 in following post
            https://github.com/gorhom/react-native-bottom-sheet/issues/187
        */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          handleStyle={{paddingBottom: 0}}
          backdropComponent={ props => (
            <BottomSheetBackdrop {...props}
              opacity={0.5}
              enableTouchThrough={false}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]} 
            />
          )}
        >
          <BottomSheetView style={styles.modalContainer}>
            <View style={styles.modalTitleRow}>
              <Text style={styles.modalTitle}>Layers</Text>
              <Pressable
                onPress={ handleCloseModalPress }
              >
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
            </View>

            {/* buttons to toggle layer visibility */}
            <LayerVisibilityButton 
              title="Current Fires"
              state={ currentFireLayerVis } 
              setter={ setCurrentFireLayerVis }
            />

          </BottomSheetView>
        </BottomSheetModal>

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
    backgroundColor: "white"
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
    minHeight: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 6,
    boxShadow: '0px 2px 3px #AFB1B1'
  },

  popupHeaderTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  popupHeaderRow: {
    justifyContent: 'space-between',
    marginBottom: 12
  },

  popupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  popupTitle: {
    fontWeight: '500',
    fontSize: 16
  },
  
  detailsText: {
    fontSize: 16,
  },

  layerButton: {
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 16
  },

  layerButtonSelected: {
    backgroundColor: '#ccc',
  },

  layerMenu: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    width: 50,
    height: 50,
    position: 'absolute',
    top: 70,
    right: 20,
    boxShadow: '0px 2px 2px #AFB1B1'
  },

  activityIndicator: {
    position: 'absolute',
    top: 120,
    right: 20
  },

  modalContainer: {
    flex: 1,
    alignItems: 'stretch',
    paddingHorizontal: 20,
    height: Dimensions.get('window').height * 0.45, 
  },

  modalTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
})
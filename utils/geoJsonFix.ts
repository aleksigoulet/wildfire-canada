// import geojson types
import { FeatureCollection, Feature, Geometry, GeoJsonProperties, Position } from 'geojson';
import proj4 from 'proj4';


// define the two coordinate systems to convert between
// define in global scope to prevent repetitive definitions when iterating

// ESPG:3978 definition - coordinate system used by CWFIS
// definition copied from following resource
// https://epsg.io/3978
proj4.defs(
  "EPSG:3978",
  "+proj=lcc +lat_0=49 +lon_0=-95 +lat_1=49 +lat_2=77 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
);

// ESPG:4326 definition - coordinate system used by MapBox
// definition copied from following resouce
// https://epsg.io/4326
proj4.defs(
  "EPSG:4326",
  "+proj=longlat +datum=WGS84 +no_defs +type=crs"
);

/** Converts a given set of coordinates from EPSG:3978 system to EPSG:4326 system. 
 *  Returns an array of EPSG:4326 coordinates in following format [ longitude, latitude ].
 * @param { Position } sourceCoords - the set of coordinates in EPSG:3978 format to convert
 */
function convertCoordsCANtoWGS( sourceCoords : Position ) : Position {
  // use proj4js library to convert coordinates and deconstruct result
  const [ lon, lat ] = proj4('EPSG:3978', 'EPSG:4326', sourceCoords);

  // round new coordinates to 6 decimals
  const roundedLon: number = Math.round(lon * 1000000) / 1000000;
  const roundedLat: number = Math.round(lat * 1000000) / 1000000;

  // return new coordinates
  return [roundedLon, roundedLat];
}

/** Converts the coordinates values of a feature collection
 * that uses EPSG:3978 coordinates to EPSG:4326 coordinates.
 * Returns the same feature collection with fixed coordinate values
 * @param {FeatureCollection} featureCollection - The GeoJSON feature collection to fix.
 */
function fixCoords(featureCollection : FeatureCollection) : FeatureCollection {
  // array to store new features
  let newValues : Feature<Geometry, GeoJsonProperties>[] = [];

  for (const feature of featureCollection.features) {
    // check what geometry type the feature is and change coordinates accordingly
    // adapted from solution by user Shaun Luttin
    // https://stackoverflow.com/questions/55621480/cant-access-coordinates-member-of-geojson-feature-collection
    if (feature.geometry.type === 'Point') {

      // extract the old coordinates to convert them
      const sourceCoords : Position = feature.geometry.coordinates

      // change the values of the coordinates array
      feature.geometry.coordinates = convertCoordsCANtoWGS(sourceCoords);

      // push the update feature to a temporary array
      newValues.push(feature);

    } else if (feature.geometry.type === "Polygon") {

      // extract the old coordinates to convert them
      let sourceCoords : Position[][] = feature.geometry.coordinates

      for ( let i = 0; i < sourceCoords.length; i++ ) {
        // new array to store positions of polygon
        let newPositionsArr : Position[] = [];

        for ( let j = 0; j < sourceCoords[i].length; j++ ) {
          // extract current position to convert
          const sourcePosition : Position = sourceCoords[i][j];

          // convert and push position to the new array
          newPositionsArr.push(convertCoordsCANtoWGS(sourcePosition));
        }

        // replace source array with fixed array
        sourceCoords[i] = newPositionsArr;
      }
      
      // update the coordinates array with the new values
      feature.geometry.coordinates = sourceCoords;

      // push the update feature to a temporary array
      newValues.push(feature);
    }
  }

  // return the corrected feature collection
  return {
    "type": "FeatureCollection",
    "features": newValues
  }
}


export { fixCoords }
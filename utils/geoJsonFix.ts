// import geojson types
import { FeatureCollection, Feature, Geometry, GeoJsonProperties } from 'geojson';

/** Fixes the coordinates values of a given feature collection
 * Returns the same feature collection with fixed coordinate values
 * @param {FeatureCollection} featureCollection - The GeoJSON feature collection to fix.
 */
function fixCoords(featureCollection : FeatureCollection) : FeatureCollection {

  // array to store new features
  let newValues : Feature<Geometry, GeoJsonProperties>[] = [];

  for (const feature of featureCollection.features) {
    // don't do anything if properties is missing
    // or if geometry type is not Point
    // adapted from solution by user Shaun Luttin
    // https://stackoverflow.com/questions/55621480/cant-access-coordinates-member-of-geojson-feature-collection
    if (!feature.properties || feature.geometry.type !== 'Point') {
      continue
    }

    // extract the correct lat / lon values
    const lat : number = feature.properties.lat;
    const lon : number = feature.properties.lon;

    // change the values of the coordinates array
    feature.geometry.coordinates = [lon, lat]

    // push the update feature to a temporary array
    newValues.push(feature);
  }

  // return the corrected feature collection
  return {
    "type": "FeatureCollection",
    "features": newValues
  }
}


export { fixCoords }
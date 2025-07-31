import { fixCoords } from "@/utils/geoJsonFix";
import { FeatureCollection } from 'geojson';

// data to test
const testCollection : FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "activefires_current.fid--7da839b8_197523b3d7c_-2dd7",
      "geometry": {
        "type": "Point",
        "coordinates": [-563422.48988806, -456587.33083712]
      },
      "properties": {
        "firename": "2025-Route 13-SDCRA - SDCRA",
        "startdate": "2025-03-10T14:15:00Z",
        "hectares": 13740.84,
        "lat": 44.654167,
        "lon": -101.98389,
        "agency": "conus",
        "stage_of_control": "100% contained",
        "response_type": ""
      }
    },
    {
      "type": "Feature",
      "id": "activefires_current.fid--7da839b8_197523b3d7c_-2dd6",
      "geometry": {
        "type": "Point",
        "coordinates": [-1296609.4736345, -471498.48316877]
      },
      "properties": {
        "firename": "Munger Mountain Prescribed - W",
        "startdate": "2025-04-10T16:00:00Z",
        "hectares": 18.225,
        "lat": 43.37417,
        "lon": -110.759445,
        "agency": "conus",
        "stage_of_control": "Prescribed",
        "response_type": ""
      }
    }
  ]
}

// corrected data to compare test result
const correctedCollection : FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "activefires_current.fid--7da839b8_197523b3d7c_-2dd7",
      "geometry": {
        "type": "Point",
        "coordinates": [-101.98389, 44.654167]
      },
      "properties": {
        "firename": "2025-Route 13-SDCRA - SDCRA",
        "startdate": "2025-03-10T14:15:00Z",
        "hectares": 13740.84,
        "lat": 44.654167,
        "lon": -101.98389,
        "agency": "conus",
        "stage_of_control": "100% contained",
        "response_type": ""
      }
    },
    {
      "type": "Feature",
      "id": "activefires_current.fid--7da839b8_197523b3d7c_-2dd6",
      "geometry": {
        "type": "Point",
        "coordinates": [-110.759445, 43.37417]
      },
      "properties": {
        "firename": "Munger Mountain Prescribed - W",
        "startdate": "2025-04-10T16:00:00Z",
        "hectares": 18.225,
        "lat": 43.37417,
        "lon": -110.759445,
        "agency": "conus",
        "stage_of_control": "Prescribed",
        "response_type": ""
      }
    }
  ]
}

// test fixCoords() function
describe('fixCoords()', () => {
  it('returns a GeoJSON feature collection with corrected coordinates', () => {
    const result = fixCoords(testCollection);

    expect(result).toEqual(correctedCollection);
  })
})
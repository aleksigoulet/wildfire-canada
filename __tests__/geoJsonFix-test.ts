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
        "coordinates": [-101.983889, 44.654167]
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
        "coordinates": [-110.759444, 43.374167]
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

// polygon collection to test
const testPolygonCollection : FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "m3_polygons_current.170046",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-629943.61300627, 729471.58689313],
            [-629869.38118253, 729421.98677425],
            [-629800.22646227, 729385.02280617],
            [-629683.97162566, 729336.86847616],
            [-629753.9998, 729243.38433]
          ]
        ]
      },
      "properties": {
        "hcount": 81,
        "firstdate": "2025-06-03T08:16:00Z",
        "lastdate": "2025-06-06T08:07:00Z",
        "area": 338.24155
      }
    },
    {
      "type": "Feature",
      "id": "m3_polygons_current.185386",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-1749181.4717606, 1901706.96656364],
            [-1749171.75305386, 1901727.5150426],
            [-1749051.72253964, 1902017.29433791],
            [-1749028.96024048, 1902092.33158205],
            [-1749018.4094042, 1902145.37421799]
          ]
        ]
      },
      "properties": {
        "hcount": 75,
        "firstdate": "2025-06-21T20:53:00Z",
        "lastdate": "2025-07-28T19:45:00Z",
        "area": 728.1384
      }
    }
  ]
}

// corrected polygon collection to compare test result
const correctedPolygonCollection : FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "m3_polygons_current.170046",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-105.122909, 55.168833],
            [-105.121610, 55.168492],
            [-105.120424, 55.168258],
            [-105.118465, 55.167991],
            [-105.119334, 55.167044]
          ]
        ]
      },
      "properties": {
        "hcount": 81,
        "firstdate": "2025-06-03T08:16:00Z",
        "lastdate": "2025-06-06T08:07:00Z",
        "area": 338.24155
      }
    },
    {
      "type": "Feature",
      "id": "m3_polygons_current.185386",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-131.008143, 61.743293],
            [-131.008198, 61.743502],
            [-131.009254, 61.746359],
            [-131.009664, 61.747057],
            [-131.010046, 61.747524]
          ]
        ]
      },
      "properties": {
        "hcount": 75,
        "firstdate": "2025-06-21T20:53:00Z",
        "lastdate": "2025-07-28T19:45:00Z",
        "area": 728.1384
      }
    }
  ]
}


describe('fixCoords()', () => {
  it('returns a given GeoJSON feature collection of POINTS with coordinates converted to WGS 84 format', () => {
    const result = fixCoords(testCollection);

    expect(result).toEqual(correctedCollection);
  });

  it('returns a given GeoJSON feature collection of POLYGONS with coordinates converted to WGS 84 format', () => {
    const result = fixCoords(testPolygonCollection);

    expect(result).toEqual(correctedPolygonCollection);
  })
});

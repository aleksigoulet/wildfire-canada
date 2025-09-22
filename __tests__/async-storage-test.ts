import AsyncStorage from '@react-native-async-storage/async-storage';
import { getObjectData, storeObjectData } from '@/utils/storageHandlers';


// set some dummy data before running test suite
const dummyData = {
  key1: 'some data',
  key2: {
    another: 'data point',
    wow: 'this is amazing'
  }
}

// store the dummy data before running test suite
beforeAll(() => {
  storeObjectData('dummyData', dummyData);
})

// clear dummy data after running test suite
afterAll(() => {
  AsyncStorage.clear();
})

describe("storeObjectData()", () => {
  it("uses AsyncStorage's setItem() method", async () => {
    // define some dummy data
    const dummyData2 = {
      key1: 'some data',
      key2: {
        another: 'data point',
        wow: 'this is amazing'
      }
    };

    // AsyncStorage can only store strings
    // convert data to JSON for testing comparison purposes
    // in production this is handled by storeObjectData()
    const jsonValue = JSON.stringify(dummyData2);

    // store the data
    await storeObjectData('myTestKey', dummyData2);

    // check that setItem was called correctly.
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('myTestKey', jsonValue);
  })
})

describe("getObjectData()", () => {
  it("uses AsyncStorage's getItem() method", async () => {
    // retrieve dummy data from storage
    await getObjectData('dummyData');

    // check that getItem was called correctly
    expect(AsyncStorage.getItem).toHaveBeenLastCalledWith('dummyData');
  })

  it('returns null if provided key does not exist', async () => {
    // try to retrieve a value that does not exist
    const result = await getObjectData("myKey");

    // result should be null
    expect(result).toEqual(null);
  })

  it('returns the appropriate stored object when called', async () => {
    // retrieve an object from storage
    const result = await getObjectData("dummyData");

    // check that the right object was retrieved
    expect(result).toEqual(dummyData);
  })
})
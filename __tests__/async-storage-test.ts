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

  // it("Only accepts object values", async () => {
  //   await storeObjectData('testKey2', 'test value');

  //   expect(storeObjectData).toThrow();
  // })

})

describe("getObjectData()", () => {
  it("uses AsyncStorage's getItem() method", async () => {
    await getObjectData('dummyData');

    expect(AsyncStorage.getItem).toHaveBeenLastCalledWith('dummyData');
  })

  it('returns null if provided key does not exist', async () => {
    const result = await getObjectData("myKey");

    expect(result).toEqual(null);
  })

  it('returns the appropriate stored object when called', async () => {
    const result = await getObjectData("dummyData");

    expect(result).toEqual(dummyData);
  })

  // it('rejects non-string keys', async () => {
  //   // use of line below by user Alex Wayne in following post
  //   // https://stackoverflow.com/questions/71560982/how-do-you-test-a-function-argument-with-the-wrong-type-in-ts-jest

  //   // @ts-expect-error testing wrong argument type
  //   const result = await getObjectData(1);

  //   expect(result).toThrow();
  // })
})
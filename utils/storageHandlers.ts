import AsyncStorage from '@react-native-async-storage/async-storage'; 

/** Function to store JS objects using AsyncStorage.
 * @param { string } key - The key to use for the stored key-value pair.
 * @param { any } value - The object to store.
*/
async function storeObjectData(key: string, value: any): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Store Object Data: error storing data: /n' + error);
  }
}

/** Function to retrieve JS objects stored with AsyncStorage.
 * @param { string } key - The key of the desired data.
*/
async function getObjectData(key: string) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Get Object Data: error storing data: /n' + error);
  }
}


async function removeValue(key: string) {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
    console.error('AsyncStorage: error removing value: \n' + e);
    throw e;
  }

  console.log('Removed item at ' + key);
}

export { storeObjectData, getObjectData, removeValue };
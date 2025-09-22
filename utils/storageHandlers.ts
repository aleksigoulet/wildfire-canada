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
    return
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
    return null
  }
}

/** Function to delete values stored with AsyncStorage.
 * @param { string } key - The key of the value to delete.
*/
async function removeValue(key: string) {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
    throw e;
  }
}

export { storeObjectData, getObjectData, removeValue };
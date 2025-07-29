import { Text, StyleSheet, View, ScrollView } from "react-native"
import { Image } from "expo-image";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default function Profile() {

  const badges = [
    {
      key: 1,
      name: 'random',
      complete: true,
    },
    {
      key: 2,
      name: 'random',
      complete: true,
    },
    {
      key: 3,
      name: 'random',
      complete: false,
    },
    {
      key: 4,
      name: 'random',
      complete: false,
    },
    {
      key: 5,
      name: 'random',
      complete: false,
    }
  ]

  return (
    <View style={styles.container}>
      <ScrollView style={{paddingTop: 20}}>
        {/* user name and profile header */}
        <View style={styles.profileHeaderContainer}>
          <Image
            placeholder={{ blurhash }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.nameText}>John Doe</Text>
            <Text>Beginner</Text>
          </View>
        </View>

        {/* points overview */}
        <View style={[styles.overviewContainer, {marginTop: 25}]}>
          <View style={styles.scoreSection}>
            <View style={styles.scoreBox}>
              <Text>250</Text>
            </View>
            <Text style={styles.scoreTitle}>Prepardness Score</Text>
          </View>
          <View style={styles.scoreSection}>
            <View style={styles.scoreBox}>
              <Text>2</Text>
            </View>
            <Text style={styles.scoreTitle}>Bagdes</Text>
          </View>
        </View>

        {/* badges */}
        <View>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgeContainer}>
            {
              badges.map((item) => {
                return (
                  <Image 
                    key={item.key}
                    source={
                      item.complete ? 
                      require('@/assets/images/badge-complete.png') :
                      require('@/assets/images/badge-incomplete.png')
                    }
                    style={styles.badgeImage}
                  />
                )
              })
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50
  },

  profileHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    gap: 20,
  },

  nameText: {
    fontWeight: 'bold',
    fontSize: 20
  },

   overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    transform: [{skewX: '-10deg'}]
  },

  scoreBox: {
    width: 70,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    
  },

  scoreTitle: {
    maxWidth: 110,
    // fontStyle: 'italic',
  },

  badgeImage: {
    width: 64,
    height: 76,
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
  },

  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 'auto',
    gap: 40
  }
});
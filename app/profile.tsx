import { Text, StyleSheet, View, ScrollView } from "react-native"
import { Image } from "expo-image";
import { useCallback, useContext, useState } from "react";
import { PointsContext } from "@/context/PointsContext";
import { BadgesContext } from "@/context/BadgesContext";
import { ProfileContext } from "@/context/ProfileContext";
import { useFocusEffect } from 'expo-router';
import { getObjectData } from "@/utils/storageHandlers";
import { Profile as ProfileType } from "@/types/commonTypes";


import XPIcon from '@/assets/images/xp-icon.svg'
import BadgeIcon from '@/assets/images/badge-icon.svg'
// import { Profile as ProfileType } from "@/types/commonTypes";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default function Profile() {
  const { points } = useContext(PointsContext);

  const { badges, getNumberCompletedBadges } = useContext(BadgesContext);

  // profile context
  const { profile } = useContext(ProfileContext);

  // state to keep track of profile name to display
  const [ displayProfile, setDisplayProfile ] = useState<ProfileType>(profile);


  // need to use a focus effect so that profile name is correctly updated
  // profile context does not correctly propagate to this screen
  // for now, retrieve stored profile data every time the screen is focused as a work-around
  useFocusEffect(
    useCallback(() => {
      // retrieve stored data
      getObjectData('profile')
      .then(( data ) => {
        // make sure that data was returned
        if ( data ) {
          setDisplayProfile( data );
        }
      })
    }, [])
  )

  return (
    <View style={styles.container}>
      {/* user name and profile header */}
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profileNameContainer}>
          <Image
            placeholder={{ blurhash }}
            style={styles.profileImage}
            source={require('@/assets/images/profile-placeholder.png')}
          />
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.nameText} numberOfLines={2}>{ displayProfile.username }</Text>
            <Text>Beginner</Text>
          </View>
        </View>
        

        {/* points overview */}
        <View style={styles.scoreContainer}>
          {/* view for XP */}
          <View style={styles.scoreSection}>
            <XPIcon />
            <Text style={styles.scoreText}>{ points }</Text>
          </View>

          {/* view for Badges Icon*/}
          <View style={styles.scoreSection}>
            <BadgeIcon />
            <Text style={styles.scoreText}>{ getNumberCompletedBadges() }</Text>
          </View>  
        </View>
      </View>
      
      <ScrollView contentContainerStyle={{ paddingBottom: 64 }}>
        {/* badges */}
        <View>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgeContainer}>
            {
              badges.map((item) => {              
                return (
                  <View 
                    key={item.key}
                    style={styles.badge}
                  >
                    <Image
                      source={
                        item.complete ? 
                        item.completeIcon :
                        item.incompleteIcon
                      }
                      style={styles.badgeImage}
                    />
                    <Text style={[styles.badgeText, item.complete ? null : styles.badgeTextInactive]}>{item.name}</Text>
                  </View>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  profileImage: {
    width: 56,
    height: 56,
    bottom: 2,
    borderRadius: 50
  },

  profileHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 18,
    paddingTop: 16,
    paddingBottom: 8,
    flexWrap: 'wrap',
  },

  profileNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexGrow: 1
  },

  nameText: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  scoreContainer: {
    flexDirection: 'row',
    gap: 26,
  },

  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  scoreBox: {
    width: 70,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    
  },

  scoreText: {
    fontSize: 36,
    fontFamily: 'Jaro-Regular',
    color: '#503716'
  },

  scoreTitle: {
    maxWidth: 110,
  },

  badgeImage: {
    width: 64,
    height: 76,
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 20,
  },

  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40
  },

  badge: {
    gap: 10,
    alignItems: 'center',
    maxWidth: 100
  },

  badgeText: {
    textAlign: 'center',
  },

  badgeTextInactive: {
    color: 'lightgray'
  }
});
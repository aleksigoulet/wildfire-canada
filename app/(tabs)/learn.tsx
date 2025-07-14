import { Text, View, ScrollView, StyleSheet, Pressable, FlatList } from "react-native";

export default function Learn() {

  const data = [
    {
      id: '1',
      title: 'Lesson 1'
    },
    {
      id: '2',
      title: 'Lesson 2'
    },
    {
      id: '3',
      title: 'Lesson 3'
    },
    {
      id: '4',
      title: 'Lesson 4'
    },
    {
      id: '5',
      title: 'Lesson 5'
    }
  ]

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Pressable 
          onPress={() => {alert('Lesson 1')}}
          style={styles.lessonButton}
        >
          <View style={styles.lessonTitle}>
            <Text style={styles.lessonTitleText}>Lesson 1</Text>
          </View>
        </Pressable>

        <Pressable 
          onPress={() => {alert('Lesson 2')}}
          style={styles.lessonButton}
        >
          <View style={styles.lessonTitle}>
            <Text style={styles.lessonTitleText}>Lesson 2</Text>
          </View>
        </Pressable>

        <Pressable 
          onPress={() => {alert('Lesson 3')}}
          style={styles.lessonButton}
        >
          <View style={styles.lessonTitle}>
            <Text style={styles.lessonTitleText}>Lesson 3</Text>
          </View>
        </Pressable>

        <Pressable 
          onPress={() => {alert('Lesson 4')}}
          style={styles.lessonButton}
        >
          <View style={styles.lessonTitle}>
            <Text style={styles.lessonTitleText}>Lesson 4</Text>
          </View>
        </Pressable>

        <Pressable 
          onPress={() => {alert('Lesson 5')}}
          style={styles.lessonButton}
        >
          <View style={styles.lessonTitle}>
            <Text style={styles.lessonTitleText}>Lesson 5</Text>
          </View>
        </Pressable>
      </ScrollView> */}

      <View style={styles.header}>

      </View>

      <FlatList
        data={data}
        inverted={true}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <Pressable 
              onPress={() => {alert(item.title)}}
              style={styles.lessonButton}
            >
              <View style={styles.lessonTitle}>
                <Text style={styles.lessonTitleText}>{item.title}</Text>
              </View>
            </Pressable>
          )
        }}
        style={{
          // flexDirection: 'column-reverse',
          // gap: 100
          // paddingBottom: 500
          flex: 1,
          // backgroundColor: 'red'
        }}
        // https://stackoverflow.com/questions/73338922/how-do-i-add-gap-in-between-items-in-flatlist
        contentContainerStyle={styles.scrollContainer}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: 5,
                height: 100,
                backgroundColor: 'grey',
                alignSelf: 'center',
              }}
            ></View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'grey',
    height: 100
  },

  scrollContainer: {
    // flex: 1,
    // width: '80%',
    // backgroundColor: 'red',
    // flexDirection: 'column-reverse',
    // justifyContent: 'center',
    alignItems: 'center',
    // gap: 100,
    paddingVertical: 300
  },

  lessonButton: {
    // padding: 10,
    width: 100,
    height: 100,
    backgroundColor: 'lightgrey',
    borderRadius: 50
  },

  lessonTitle: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 80
  },

  lessonTitleText: {
    // color: 'white',
    fontWeight: 'bold',
  }
})

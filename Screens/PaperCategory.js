import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator,Image, TouchableOpacity } from 'react-native';
import url from '../url.json'
import {useNavigation} from '@react-navigation/native'
import axios from 'axios';
const Paper_Subjects = () => {
  const [loader,setloader]=useState(true);

  const [items, setItems] = useState([

  ]);
  const GetData=()=>{

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://ask-me-ppsc1-f6c12951af40.herokuapp.com/Admin/Category',
      headers: { }
    };
    axios.request(config)
    .then((response) => {
    //   console.log(JSON.stringify(response.data));
      setItems(response.data.data)
      setloader(false)
    })
    .catch((error) => {
      console.log(error);
    });
    }

useEffect(()=>{
GetData();
},[])


  let navigation=useNavigation()


  const renderSubjectsItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.SubjectsItem}
      onPress={()=>{
        navigation.navigate("Paper",{
            name:item.Category_Name
        })
      }}
      >
        <Image
          style={styles.SubjectsItemImage}
          source={{ uri: item.Category_Image }}
        />
        <View  style={{width:"100%",alignItems:"center",justifyContent:"center",}}>
        <Text style={styles.SubjectsItemTitle}>{item.Category_Name}</Text>

        </View>
      </TouchableOpacity>
    );
  };

 
  return loader?(
<View  style={{flex:1,justifyContent:"center",alignItems:"center"}}>
  <ActivityIndicator  size={"large"} />
</View>

  ):(
    <View style={styles.container}>
      <FlatList
        data={items}
        numColumns={2}
        // keyExtractor={(item) => item._id.toString()}
        renderItem={renderSubjectsItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubjectsItem: {
    width:"43%",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  SubjectsItemImage: {
    width: "100%",
    height: 100,
    // borderRadius: 50,
    marginBottom: 5,
  },
  SubjectsItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Paper_Subjects;

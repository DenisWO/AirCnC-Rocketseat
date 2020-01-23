import React, {useEffect, useState} from 'react';
import { withNavigation} from 'react-navigation';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';

import api from './../services/api';
 

function SpotList({tech, navigation}){
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    async function loadSpots(){
      const response = await api.get('/spots', { params: {tech} }) 
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  function handleNavigate(id){
    navigation.navigate('Book', {id});
  }
  function handleCancel(){
    navigation.navigate('Login');
  }
  return (
    <View style = {styles.container}>
      <Text style = {styles.title}> Empresas que usam <Text style = {styles.bold}> {tech} </Text> </Text>
      <FlatList 
        style = {styles.list}
        data = {spots}
        keyExtractor = {spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator = {false}
        renderItem = {({item}) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{uri:'https://facebook.github.io/react/logo-og.png'}}  />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : `GRATUITO!`}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item.id)} style={styles.button}>
              <Text style={styles.buttonText}> Solicitar reserva </Text>
            </TouchableOpacity>
          </View>

        ) }
      />
      <TouchableOpacity onPress={() => handleCancel()} style={styles.cancelButton}>
        <Text style={styles.buttonText}> Voltar para a pesquia </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  bold : {
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  price:{
    fontSize: 15,
    color: '#999',
    marginTop: 5,
  },
  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15, 
  },
  buttonText: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cancelButton: {
    marginTop: 230,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
    height: 32,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
});

export default withNavigation(SpotList);

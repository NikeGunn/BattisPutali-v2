import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Footer = () => {
  const navigation = useNavigation();

  const navigateToPostItems = () => {
    navigation.navigate('AppNavigator', { screen: 'UploadScreen' });
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <Icon name="home" size={35} color="#900" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("UserListing")}>
        <Icon name="edit" size={35} color="#900" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <Icon name="user" size={35} color="#900" />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToPostItems}>
        <MaterialCommunityIcons
          style={styles.plusIcon}
          name="plus-circle"
          size={50}
          color="#900"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plusIcon: {
    bottom: 15,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
});

export default Footer;

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <Icon name="home" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("friends")}>
        <Icon name="team" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("AppNavigator", { screen: 'PostVideo' })}>
        <MaterialCommunityIcons
          style={styles.plusIcon}
          name="plus-circle"
          size={43}
          color="#E0E0E0" // Bright Pink for the plus icon
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("notification")}>
        <Icon name="notification" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <Icon name="user" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 1,
    backgroundColor: "#181818", // Dark Charcoal background
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0', // Light Gray for the border
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  plusIcon: {
    bottom: 3,
    backgroundColor: "#181818", // Same background color for consistency
    borderRadius: 50,
    padding: 3,
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Footer;

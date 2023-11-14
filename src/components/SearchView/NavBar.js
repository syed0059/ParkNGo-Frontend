import { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet } from "react-native";
import CarparkList from "./CarparkList";
import SearchBar from "./SearchBar";
import Settings from "./Settings";
import Favourites from "./Favourites";
import { NotificationProvider } from "../../notificationManager/NotificationContext";

const Tab = createMaterialTopTabNavigator();

export default function NavBar({
  location,
  loading,
  carparks,
  searchLoading,
  searchCarparks,
}) {
  function HomeScreen() {
    return (
      <CarparkList location={location} loading={loading} carparks={carparks} />
    );
  }

  function SearchScreen() {
    return (
      <SearchBar
        searchLoading={searchLoading}
        searchCarparks={searchCarparks}
        location={location}
      />
    );
  }

  function FavouritesScreen() {
    return <Favourites location={location} />;
  }

  function SettingsScreen() {
    return <Settings />;
  }

  return (
    <NotificationProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarShowIcon: true,
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { backgroundColor: "blue" },
          tabBarIconStyle: { justifyContent: "center", alignItems: "center" },
          tabBarInactiveTintColor: "black",
          tabBarActiveTintColor: "blue",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="navigation-variant-outline" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="magnify" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={FavouritesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="heart-outline" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="cog" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NotificationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

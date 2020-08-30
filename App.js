import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Profile from './Profile';
import EventList from './EventList';
import EventForm from './EventForm';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
     <Stack.Screen
       name="Home"
       component={EventList}
       options={{ title: 'Upcoming Events' }}
     />
     <Stack.Screen name="New Event" component={EventForm} />
   </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

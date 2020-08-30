
import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import EventCard from './EventCard';
import ActionButton from 'react-native-action-button'

import { getEvents } from './api';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F3F3F3'
  },
});

export default function EventList(props ) {

  const [events, setEvents] = React.useState();
  const [fetched, setFetched] = React.useState(false);
  const [timer, setTimer] = React.useState(false)
  const [intervalTime, setIntervalTime] = React.useState();

React.useEffect( () => {
  var intervalID
  if(timer) {
   intervalID = setInterval( () => {
    let oldEvents = [];
         if(events && timer) {
         events.map( event => {
         oldEvents.push(
            {
           ...event,
           timer: Date.now()
         })
       })
       setEvents(oldEvents)
       }
     }, 1500)
  }
  else {
    clearInterval(intervalID)
      }
}, [timer])

    React.useEffect( () => {
      getEvents().then(eventsFetched => {
         setEvents(eventsFetched)
         setFetched(true)
       })

       setTimeout( () => {
         setTimer(true)
      }, 1500)

    }, [])

    React.useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () => {

    setTimer(false)
      getEvents().then(eventsFetched => {
         setEvents(eventsFetched)
       })
       .then( () => {

         setFetched(true)
         setTimer(true)

     });
          });
 }, [props.navigation]);


  if(fetched) {


    return (<>

      <FlatList
       key="flatlist"
       data={events}
       style={styles.list}
       keyExtractor={item => item.id}
       renderItem={({ item, separators }) => (
         <EventCard
           event={item}
         />
       )}
     />


      <ActionButton
        key="fab"
        onPress={ () => {
          props.navigation.navigate('New Event')
        }}
        buttonColor="red" />
    </>);
  }
  else {
    return (<>

        <Text> NO EVENTS</Text>

      <ActionButton
        key="fab"
        onPress={ () => {
          props.navigation.navigate('New Event')
        }}
        buttonColor="red" />
    </>);
  }
  }

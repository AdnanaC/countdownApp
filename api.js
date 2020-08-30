// import moment from 'moment';
//
// export function formatDate(dateString) {
//   const parsed = moment(new Date(dateString));
//
//   if (!parsed.isValid()) {
//     return dateString;
//   }
//
//   return parsed.format('D MMM YYYY');
// }
//
// export function getCountdownParts(eventDate) {
//   const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));
//   return {
//     days: parseInt(duration.as('days')),
//     hours: duration.get('hours'),
//     minutes: duration.get('minutes'),
//     seconds: duration.get('seconds'),
//   };
// }

import  { v4 as uuidv4 }  from 'uuid';
import moment from 'moment';
import Constants from 'expo-constants';
import axios from 'axios'

const { manifest } = Constants;
const api = manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;

const url = `http://${api}/events`;

export async function getEvents() {
  console.log("called getEvents at ", url)
  // fetch(url)
  // .then(response => {
  //   response.json()
  // })
  // .then(data => console.log("DATA", data))
  // .catch(err => console.log("here's an error", err))
  // return [1,2,3]

  const events = await axios({
    method: "get",
    url: url,
  })
  .catch( err => console.log(err))
  events.data.map( e => ({ ...e, date: new Date(e.date) }))
  return events.data
}
var x = 1;
export function saveEvent({ title, date }) {
  console.log(url)
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title,
      date,
      id: uuidv4(),
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .catch(error => console.error('Error:', error));
}


export function formatDate(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format('D MMM YYYY');
}

export function formatDateTime(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format('H A on D MMM YYYY');
}

export function getCountdownParts(eventDate) {
  const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));
  return {
    days: parseInt(duration.as('days')),
    hours: duration.get('hours'),
    minutes: duration.get('minutes'),
    seconds: duration.get('seconds'),
  };
}

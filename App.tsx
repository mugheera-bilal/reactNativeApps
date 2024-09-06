import React, { useEffect, useState } from 'react';
import {Alert, Button, PermissionsAndroid, Platform, StyleSheet, Text, View} from 'react-native';
import { createNotificationChannel, scheduleShowNotification, showNotification } from './src/components/notificationHandler';

function App(): React.JSX.Element {


  const requestNotificationPermission = async () => {
    // Only for Android 13+
    if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Notification permission granted');
            } else {
                console.log('Notification permission denied');
                Alert.alert('Permission required', 'Please enable notification permissions from settings.');
            }
        } catch (err) {
            console.warn(err);
        }
    }
};

  useEffect(() => {
    createNotificationChannel();
    requestNotificationPermission()
}, []);

// const [selectDate, setSelectDate] = useState (new Date())

const timer = new Date(Date.now() + 5 * 1000)

  function scheduleNotificationHandler () {
    scheduleShowNotification('test title', 'test message', timer)

}
function notificationHandler () {
  showNotification('test title', 'test message')

}
  return (
    <View style={styles.rootContainer}>
      {/* <DatePicker */}
      <Text>this is my main screeen </Text>
      <Button title='pushNotifaication' onPress={notificationHandler}/>
      <Button title='scheduleNotification' onPress={scheduleNotificationHandler}/>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  }
});

export default App;

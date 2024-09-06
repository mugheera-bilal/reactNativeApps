import  PushNotification, { Importance }  from "react-native-push-notification";
import { Platform } from 'react-native'



export const createNotificationChannel = () => {
    if (Platform.OS === 'android') {
        PushNotification.createChannel(
            {
                channelId: 'default-channel-1', // Must be unique
                channelName: 'My Channel', // Visible name
                channelDescription: 'A channel for testing notifications', // Optional description
                importance: Importance.HIGH, // Importance level
                vibrate: true, // Enable vibration
            },
            (created) => console.log(`Channel created: ${created}`) // Log true if created, false if already existed
        );
    }
};


PushNotification.configure({
    onNotification : function (notification) {
        console.log('notification', notification);
        
    },
    popInitialNotification : true,
    requestPermissions: Platform.OS === 'ios',
    // requestPermission : false
})


export const showNotification = (title: string , message: string) => {
    PushNotification.localNotification({
        channelId: 'default-channel-1',
        userInfo : {name : 'mugheera' , age : 20},
        title : title,
        message : message,
        vibrate: true,
    })
}

export const scheduleShowNotification = (title: string, message: string, date: Date) => {
    PushNotification.localNotificationSchedule({
        channelId: 'default-channel-1',
        userInfo : {name : 'mugheera' , age : 20},
        title : title,
        message : message,
        vibrate: true,
        date : date
    })
}
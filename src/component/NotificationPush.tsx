// 'use client'
// import { getFirebaseMessaging } from '@/firebase/firebaseConfig'
// import { getDeviceId } from '@/service/localStorageService'
// import { getToken } from 'firebase/messaging'
// import { useEffect } from 'react'

// const NotificationPush = () => {
//     useEffect(() => {
//         // if (!userId) return;

//         const notificationPermission = async () => {
//             const permission = await Notification.requestPermission();

//             if (permission !== 'granted') return;

//             const messaging = await getFirebaseMessaging();

//             if (!messaging) return;

//             const newToken = await getToken(messaging, {
//                 vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY
//             });

//             const currentToken = localStorage.getItem('fcmToken');
//             const deviceId = getDeviceId();
//     if (newToken !== currentToken) {
//                 localStorage.setItem('fcmToken', newToken);
//                 await fetch("/api/notification/save-token", {
//                     method: "POST",
//                     body: JSON.stringify({ token: newToken, deviceId }),
//                 });
//             }
//         }


//         notificationPermission()

//     }, [])



//     return null
// }

// export default NotificationPush
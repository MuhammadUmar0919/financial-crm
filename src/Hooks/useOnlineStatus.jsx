// react import
import React from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const onlineHandler = () => setIsOnline(true)
    const offlineHandler = () => setIsOnline(false)

    window.addEventListener("online", onlineHandler)
    window.addEventListener("offline", offlineHandler)

    return () => {
      window.removeEventListener("online", onlineHandler)
      window.removeEventListener("offline", offlineHandler)
    }
  }, []);

  return { isOnline, setIsOnline }
};

// qo'shimcha ma'lumotlar
// function App() {
//   const [connectionType, setConnectionType] = React.useState('unknown');

//   React.useEffect(() => {
//     const updateConnectionStatus = () => {
//       const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
//       if (connection) {
//         setConnectionType(connection.effectiveType);
//       } else {
//         setConnectionType('unknown');
//       }
//     };

//     updateConnectionStatus();

//     // Internet ulanish holatida o'zgarishlarni eshitish uchun event listener qo'shish
//     window.addEventListener('online', updateConnectionStatus);
//     window.addEventListener('offline', updateConnectionStatus);

//     // Komponent bekor qilinishida event listenerlarni o'chirish
//     return () => {
//       window.removeEventListener('online', updateConnectionStatus);
//       window.removeEventListener('offline', updateConnectionStatus);
//     };
//   }, []);

//   return (
//     <div className="App">
//       <h1>Internet Ulanish Holati</h1>
//       <p>Internet ulanish holati: {connectionType}</p>
//       {navigator.onLine ? (
//         <p style={{ color: 'green' }}>Internetga ulanilgan</p>
//       ) : (
//         <p style={{ color: 'red' }}>Internetga ulanmagan</p>
//       )}
//     </div>
//   );
// }

// export default App;

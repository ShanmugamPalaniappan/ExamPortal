// import React, { useState, useEffect } from 'react';
// import { View, Text, Alert } from 'react-native';

// const CountdownTimer = () => {
//   const [seconds, setSeconds] = useState(1200); // 20 minutes in seconds
//   const [timerColor, setTimerColor] = useState('black');

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setSeconds(prevSeconds => {
//         if (prevSeconds == 1) {
//           clearInterval(intervalId);
//           // Trigger alert when timer reaches 0
//           // Alert.alert('Your Exam Time is Over', 'Thank you for attending the Exam!',[{text:"yes",onPress:()=>{validateanswers()}}]);
//         } else if (prevSeconds <= 60) {
//           // Change color to red when timer reaches 5 minutes
//           setTimerColor('red');
//         }
//         else if(prevSeconds==121) {
//           Alert.alert("Hurry up ,your exam will end in 2 mins");
//         }

//         return prevSeconds - 1;
//       });
//     }, 1000);

//     // Cleanup the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, []); // Empty dependency array ensures that the effect runs only once on mount

//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = timeInSeconds % 60;
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   return (
//     <View>
//       <Text style={{ fontSize: 20, color: timerColor }}>
//         {formatTime(seconds)}
//       </Text>
//     </View>
//   );
// };

// export default CountdownTimer;

import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountdownTimer = ({ noq, calculateMarks }) => {
  const [seconds, setSeconds] = useState(noq * 60);
  const [timerColor, setTimerColor] = useState('black');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize timer value in AsyncStorage if not already set
        const storedTime = await AsyncStorage.getItem('time');
        if (storedTime === null) {
          await AsyncStorage.setItem('time', (noq * 60).toString());
        } else {
          setSeconds(parseInt(storedTime));
        }
      } catch (error) {
        console.error('Error setting up timer:', error);
      }
    };
    fetchData();

    const intervalId = setInterval(async () => {
      try {
        const time = parseInt(await AsyncStorage.getItem('time')) || 0;
        await AsyncStorage.setItem('time', (time - 10).toString());
      } catch (error) {
        console.error('Error updating timer:', error);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [noq]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(intervalId);
          calculateMarks();
          // Trigger alert when timer reaches 0
        } else if (prevSeconds <= 61) {
          // Change color to red when timer reaches 1 minute
          setTimerColor('red');
        } else if (prevSeconds === 121) {
          // Trigger alert when timer reaches 2 minutes
          alert('Alert ⚠️ ⚠️ You have 2 minutes remaining!');
        }

        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Text style={{ fontSize: 20, fontWeight: 'bold', color: timerColor, textAlign: 'center' }}>
      {formatTime(seconds)}
    </Text>
  );
};

export default CountdownTimer;

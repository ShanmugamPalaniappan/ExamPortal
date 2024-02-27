import { router, useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import * as Location from 'expo-location';
import { useRoute,useNavigation } from '@react-navigation/native';


const Home = () => {

  const route = useRoute();
  const { exam } = route.params;
  const navigation = useNavigation();
  return (
    <>
        <ScrollView style={{flex:1}}>

         <Text style={{fontWeight:'bold',fontSize:25,marginTop:"30%",paddingLeft:20}}>
        Read the Instruction Carefully !!
        </Text>
        <Text style={{marginTop:"3%",lineHeight:30,fontStyle:'italic',fontSize:16,padding:20}}>
        📝 You have {exam.noq} MCQ Questions to attend in {exam.noq}  mins.{'\n'}
        📝 You also have bookmark option  for easy access of any question at later time.{'\n'}
        📝 You can also view your exam summary for your exam status.{'\n'}
        📝 You can also see the answered and not-answered question in different colors.{'\n'}
        📝 Click on 'Start Test' button to begin your test.{'\n'}
        📝 You can also see  the number of correct and wrong answers you got in each question.
        </Text>
         <Button title="Taketest" onPress={()=>{
            navigation.navigate('Taketest', { exam: exam });
        }}/>
         </ScrollView>

    </>
  );
};

export default Home;

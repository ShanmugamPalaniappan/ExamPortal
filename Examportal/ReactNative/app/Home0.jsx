import React, { useEffect, useState } from "react";
import { View, Text,  TouchableOpacity,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { url } from "./link";

import { useNavigation } from '@react-navigation/native';
import { Button } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { router } from "expo-router";

const Home0 = () => {
  const [exam, setExam] = useState();
  const [refresh, setRefresh] = useState(false);
  const[username,setusername]=useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("id");
        const userName = await AsyncStorage.getItem("name");
        setusername(userName);
        const response = await axios.post(url+"/getexam", {
          userid: userId,
        });
        if (response.data.length !== 0) {
          setExam(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [refresh]);

  const navigation = useNavigation();
  return (
    <View style={{marginHorizontal:"10%",marginTop:"10%"}}>
      <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:"5%"}}>
        <FontAwesome name="refresh" size={30} color="black" onPress={()=>{setRefresh(refresh+1)}} />
        <FontAwesome name="power-off" size={30} color="black" onPress={()=>{AsyncStorage.clear();router.replace("/")}}/>
      </View>
    <View style={{marginVertical:"10%"}}><Text style={{fontSize:24,fontStyle:"italic"}}>Welcome {username}</Text></View>
        {
            exam&&exam
            ?<View >
                
                <View 
                style={{ // Take up the entire space
                    flexDirection: 'row', // Arrange items horizontally
                    justifyContent: 'space-between',
                    marginBottom: 10
                    }}>
                    <Text style={{fontWeight:"900",fontSize:18}}>Subjectname</Text>
                    <Text style={{fontWeight:"900",fontSize:18}}>Taketest</Text>
                </View>
                {
                    exam.map((e)=>{
                        console.log(e);
                        return(
                            <View style={{ 
                                flexDirection: 'row', 
                                justifyContent: 'space-between',
                                marginBottom: 10
                                }}>
                                <Text style={{fontSize:18}}>{e.s.subjectname}</Text>
                                {e.status === "scheduled" ? (
                                        <>
                                        <Button title="Take Test" onPress={()=>{
                                                  axios.post(url+"/changeexamstatus",{
                                                    examid:e.examid,
                                                    status:"started"
                                                    }).then((res)=>{
                                                        setRefresh(refresh+1);
                                                        console.log(res.data);
                                                    });
                                                    navigation.navigate('Home', { exam: e });
                                                setRefresh(refresh+1);
                                                // const stateData = encodeURIComponent(JSON.stringify({ exam: e}));
                                                // const url1 = `http://192.168.3.33:3000/Home?state=${encodeURIComponent(JSON.stringify(stateData))}`;
                                                // Linking.openURL(url1).catch((err) => console.error('An error occurred', err));
                                        }}/></>
                                ) : e.status === "started" ? (
                                <TouchableOpacity style={{backgroundColor:"green",opacity:0.5}}>
                                    <Text style={{color:"white",paddingHorizontal:"2%",paddingVertical:"1%"}}>Resume</Text>
                                 </TouchableOpacity>    
                                ) : e.status === "resume" ? (
                                <TouchableOpacity onPress={()=>{
                                        axios.post(url+"/changeexamstatus",{
                                            examid:e.examid,
                                            status:"started"
                                            }).then((res)=>{
                                                setRefresh(refresh+1);
                                                console.log(res.data);
                                            });
                                        navigation.navigate('Home', { exam: e });
                                        setRefresh(refresh+1);
                                        }} 
                                        style={{backgroundColor:"green"}}>
                                    <Text style={{color:"white",paddingHorizontal:"2%",paddingVertical:"1%"}}>Resume</Text>
                                 </TouchableOpacity>    
                                ) : (
                                <TouchableOpacity  style={{backgroundColor:"red", opacity:0.5}}>
                                    <Text style={{color:"white",paddingHorizontal:"2%",paddingVertical:"1%"}}>Resume</Text>
                                 </TouchableOpacity>   
                                )}
                            </View>
                        )
                        
                    })
                }
            </View>
            :<Text style={{fontSize:16}}>You have no test available now</Text>
        }
    </View>
  );
};

export default Home0;

import axios from 'axios';
import { Text,StyleSheet, View, TextInput, Button } from "react-native";
import { url } from './link';
import { useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home0 from './Home0';
import Home from './Home';
const index = () => {
    const storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.log(e);
        }
      };
    const[username,setusername]=useState();
    const[password,setpassword]=useState();
    return ( <>
            <View style={styles.container}>
                <Text style={{fontWeight:'bold',fontSize:25}}>LOGIN</Text>
                
                <TextInput placeholder="Enter Name" style={{...styles.input,marginTop:"2%"}} value={username} onChangeText={setusername} autoFocus/>
                
                <TextInput placeholder="Enter Password" secureTextEntry={true} onChangeText={setpassword} value={password} style={{...styles.input,marginTop:"2%"}} />
                <View style={{fontStyle:"italic",marginTop:"2%"}}>
                <Button color="green" title='Login' onPress={()=>{
                    axios.post(url+"/",{
                        username:username,
                        password:password
                    })
                    .then((res)=>{
                        console.log(res.data);
                        if (res.data.role === "user") {
                            if(res.data.status==="approved")
                            {
                              storeData("full",JSON.stringify(res.data));
                              storeData("id",res.data.userid);
                              storeData("role",res.data.role);
                              storeData("name",res.data.username);
                              router.replace("/Home0");
                            }
                            else{
                              alert("please wait for approval from admin")
                              setusername("");
                              setpassword("");
                            }
                          }
                          else if(res.data.role===null)
                          {
                            alert("invalid credentials");
                            setusername("");
                            setpassword("");
                          }
                          else{
                            alert("admin cannot login on mobile");
                            setusername("");
                            setpassword("");
                          }
                        })
                    }} />
                </View>
                <View>
                </View>
            </View>

    </>);
    
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#c2e9fb",
    },
    input:{
        alignItems:'center',
        // justifyContent: 'center',
        borderStyle:"solid",
        borderColor:"grey",
        backgroundColor:"white",
        width:"70%",
        borderWidth:1,
        borderRadius:20,
        textAlign:"center"
    },
    register:{
        color:'red',
        textDecorationLine:'underline',
        fontSize:15,
        fontStyle:'italic'

    }

});
export default index;
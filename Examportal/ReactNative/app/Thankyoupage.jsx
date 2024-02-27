import { Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { router } from "expo-router";
const Thankyoupage = () => {
    return ( <>
    
    <View style={{flex:1,paddingHorizontal:"10%",alignItems:"center",marginVertical:"90%"}}>
    <FontAwesome name="home" size={40} color="black" onPress={()=>{router.replace("/Home0    ")}} />
        <Text style={{fontWeight:"bold"}}>Thanks for Attending the Exam!</Text>
        <Text>Your exam has been Completed Successfully</Text>
        <Text>You can now leave this page</Text>
    </View>
    </> );
}
 
export default Thankyoupage;
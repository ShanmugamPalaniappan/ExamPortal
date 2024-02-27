import { RadioButton } from "react-native-paper";
import { View, Text, StyleSheet, Button } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { router } from "expo-router";
//style={{alignSelf:"flex-end"}}
const Question = ({ r, selectanswer, bookmarkfun }) => {
  

  return (
    <View style={styles.container}>
      <View><Text style={{fontSize:22,fontWeight:"bold"}}>{r.id + "." + r.question}</Text></View>
      <View style={{alignItems:"flex-end",width:"100%",marginTop:"5%"}}>
        {/* <Button title="View Photo" color="violet" /> */}
        {/* <FontAwesome name="image" size={35} color="black" onPress={()=>{}}/> */}
      {
        r.bookmark?<FontAwesome name="bookmark" size={35} color="black"  onPress={() => bookmarkfun(r.id)}  />:<FontAwesome name="bookmark-o" size={35} color="black"  onPress={() => bookmarkfun(r.id)}/>
      }</View>
      <View style={{marginTop:"5%"}}>
        <RadioButton.Group 
          onValueChange={(newValue) => {
            selectanswer(r.id, newValue);
          }}
          value={r.selected}
        >
          <RadioButton.Item
            label={r.op1}
            value={r.op1}
            style={styles.radioButtonItem}
            labelStyle={styles.radioButtonLabel}
          />
          <RadioButton.Item
            label={r.op2}
            value={r.op2}
            style={styles.radioButtonItem}
            labelStyle={styles.radioButtonLabel}
          />
          <RadioButton.Item
            label={r.op3}
            value={r.op3}
            style={styles.radioButtonItem}
            labelStyle={styles.radioButtonLabel}
          />
          <RadioButton.Item
            label={r.op4}
            value={r.op4}
            style={styles.radioButtonItem}
            labelStyle={styles.radioButtonLabel}
          />
        </RadioButton.Group>
      </View>
      {/* <Checkbox
        status={r.bookmark ? "checked" : "unchecked"}
        onPress={() => bookmarkfun(r.id)}
      />
      <Text>Bookmark</Text> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    alignItems: "flex-start", // Align items to the left
    paddingLeft: 30, // Add some left padding for better alignment
    paddingRight:25
  },
  radioButtonItem: {
    flexDirection: "row-reverse", // Reverse the direction to move the label to the left
    alignItems: "center", // Align items to the center
  },
  radioButtonLabel: {
    paddingLeft: 10,
    paddingRight:25 // Add some left margin for spacing between the label and radio button
  },
});

export default Question;

import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import axios from "axios";
import Question from "./Question";
import CountdownTimer from "./CountdownTimer";
import { url } from './link';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Taketest = () => {
  const [q, setq] = useState([]);
  const [f, setf] = useState(0);
  const [qpid, setqpid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [totalmark, setTotalMark] = useState(0);
  const[e,setE]=useState([]);
  const route = useRoute();
  const { exam } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${url}/getqp`, { examid: exam.examid });
        const data = response.data;
        var l = [];
        setqpid(data[0].qp.qpid);
        for (let i1 = 0; i1 < data.length; i1++) {
          var q1 = data[i1].q;
          q1.selected = data[i1].userans;
          l.push(q1);
        }
        var i = 1;
        const x = l.map((k) => {
          k.id = i++;
          k.bookmark = false;
          return k;
        });
        setq(x);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchData();
  }, []);

  const selectanswer = (id, ans) => {
    const updatedQuestions = q.map((question) => {
      if (question.id === id) {
        question.selected = ans;
        axios.post(`${url}/selectanswer`, { userans: ans, q: { qid: question.qid }, qp: { qpid: qpid } })
          .then((res) => console.log(res.data));
      }
      return question;
    });
    setq(updatedQuestions);
  };

  const bookmarkfun = (id) => {
    const updatedQuestions = q.map((question) => {
      if (question.id === id) {
        question.bookmark = !question.bookmark;
      }
      return question;
    });
    setq(updatedQuestions);
  };

  const calculateMarks = () => {
    AsyncStorage.removeItem('time');
    let marks = 0;
    q.forEach((question) => {
      if (question.selected === question.rightans) {
        axios.post(`${url}/setmark`, { mark: question.mark, q: { qid: question.qid }, qp: { qpid: qpid } })
          .then((res) => console.log(res.data));
        marks += question.mark;
      }
    });
    console.log("marks"+marks);
    setTotalMark(marks);
    axios.post(`${url}/totalmark`, { qpid: qpid, mark: marks })
      .then((res) => console.log("total marks"+res.data));
    axios.post(`${url}/changeexamstatus`, { examid: exam.examid, status: "completed" })
      .then((res) => {
        console.log("ces"+res.data);
        setIsModalOpen(true);
      });
  };

  return (
    <View style={{backgroundColor: "#99c3e2",flex:1 }}>
        <View style={{flexDirection:"row",paddingHorizontal:"5%",marginTop:"10%",justifyContent:"space-between"}}>
          <Button title="Exam Summary" onPress={() => setIsModalOpen1(true)} />
          <CountdownTimer noq={exam.noq} calculateMarks={calculateMarks} />
        </View>
        {q.length !== 0 && (
          <View id="c" style={{marginTop:"10%",backgroundColor:"#ffff",height:"70%",marginHorizontal:"5%",borderRadius:15,elevation: 15, transform: [{ translateY:10 }]}} >
            <ScrollView style={{height:"80%",marginVertical:"10%"}} >
              <Question r={q[f]} selectanswer={selectanswer} bookmarkfun={bookmarkfun} />
            </ScrollView> 
            <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:"10%",marginBottom:"5%"}}>
              {f === 0 ? (
                <Button disabled title="previous" />
              ) : (
                <Button title="previous" onPress={() => { if (f > 0) { setf(f - 1); } }} />
              )}
              <Button title="next" onPress={() => { if (f < q.length - 1) { setf(f + 1); } }} />
              
        </View>           
          </View>
        )}
        
        <View style={{bottom:0,left:0,right:0,position:"absolute"}} >
              <Button title="submit" color="red" onPress={() => 
              Alert.alert("do you want to submit?","",[
                    {
                      text:"cancel",
                      onPress:()=>{
                      }
                    },
                    {
                      text:"yes",
                      onPress:()=>{
                        axios.post(url+"/getreview", { qpid: qpid })
                        .then((res) => {
                          console.log(res.data);
                          AsyncStorage.removeItem("time");
                          setE(res.data);
                          calculateMarks();
                        })
                      .catch((error) => {
                          console.error("Error fetching review data:", error);
                      });
                        
                      }
                    }
                  ])} />
          </View>
      
        <Modal
          animationType="slide"
          visible={isModalOpen1}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setIsModalOpen1(!isModalOpen1);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {
                  q.map(r=>{
                      if(r.bookmark)
                      {
                      return <Button title={String(r.id)} onPress={()=>{
                          setf(r.id-1)
                          setIsModalOpen1(!isModalOpen1);
                              }} color="red"/>
                      }
                      else if(r.selected)
                      {
                          return <Button title={String(r.id)}  onPress={()=>{
                              setf(r.id-1)
                              setIsModalOpen1(!isModalOpen1);
                                  }} color="green"/>
                      }
                      else
                      {
                          return <Button title={String(r.id)}  onPress={()=>{
                              setf(r.id-1)
                              setIsModalOpen1(!isModalOpen1);
                                  }}  />
                      }
                  })
              }
             
            </View>
            <View style={{marginBottom:"5%"}}>
              <Text style={{fontSize:18,marginTop:"5%",paddingLeft:10}}>
                🟥 Bookmarked 🟩 Attended 🟦 Not Attended
              </Text>
            </View>
              <View style={{flexDirection:"row",marginHorizontal:10,justifyContent:"space-between"}}>
            <Pressable
                style={{backgroundColor: '#2196F3',borderRadius: 20,padding: "2.5%",width:"45%"}}
                onPress={() => setIsModalOpen1(!isModalOpen1)}>
                <Text style={styles.textStyle}>close</Text>
              </Pressable>
              <Pressable
                style={{backgroundColor:"red",borderRadius: 20,padding: "2.5%",width:"45%"}}
                onPress={() => {var n=0;
                  const x=q.map(k=>{
                      if(k.selected===k.correct_option)
                      {
                          k.mark=1;
                          n++;
                      }
                      return k
        
                  })
                  setq(x);
                  setTotalMark(n);
                  Alert.alert("do you want to submit?","",[
                  {
                    text:"cancel",
                    onPress:()=>{
                    }
                  },
                  {
                    text:"yes",
                    onPress:()=>{
                      axios.post(url+"/getreview", { qpid: qpid })
                      .then((res) => {
                        console.log(res.data);
                        setE(res.data);
                        calculateMarks();
                        AsyncStorage.removeItem("time");
                      })
                    .catch((error) => {
                        console.error("Error fetching review data:", error);
                    });}
                  }
                ]);}}>
                <Text style={styles.textStyle}>submit</Text>
              </Pressable>
              </View>
              
    
          </View>
        </Modal>
        <Modal
          animationType="slide"
          // transparent={true}
          visible={isModalOpen}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            // setModalVisible(!modalVisible);
            setIsModalOpen(!isModalOpen)
          }}>
          <View style={styles.centeredView}>
          <Text style={{fontWeight:"bold",fontSize:25,marginTop:"20%",marginLeft:"20%"}}>Your Exam Review</Text>
            <View style={styles.modalView}>
              {
                e.map((review, index) => (
                  review.mark>=1?
                  <Button title= {q[index].id+""} key={index} color="green" />
                  :<Button title= {q[index].id+""} key={index} color="red" />
              ))
              }
             
            </View>
            <View style={{alignItems:"center",marginVertical:"5%"}}><Text style={{fontWeight:"350",fontSize:20}}>Total mark:{totalmark}</Text></View>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {router.replace("/Thankyoupage")}}>
                <Text style={styles.textStyle}>close</Text>
              </Pressable>
    
          </View>
        </Modal>
     </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection:"row",
    flexWrap: 'wrap', // Allow items to wrap to the next line
    // justifyContent: 'space-between', 
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal:20
    // elevation: 2,
  },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
   modalText: {
     marginBottom: 15,
     textAlign: 'center',
   },
});
export default Taketest;

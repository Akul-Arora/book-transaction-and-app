import React from 'react';
import { StyleSheet, Text,View,TextInput,TouchableOpacity,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class Transaction extends React.Component{
constructor(){
    super();
    this.state={
        hasCameraPermission:null,
        scanned:false,
        scannedBookId:'',
        scannedStudentId:'',
        scannedData:'',
        buttonState:'normal'
    }
 
}
//taking camera permission
getCameraPermission=async (id)=>{
const {status}= await Permissions.askAsync(Permissions.CAMERA)

    this.setState({
    hasCameraPermission:status==="granted",
    buttonState:id,
    scanned:false})
    
}

handleBarcodeScanned= async({type,data})=>{
    const{buttonState}=this.state
    if(buttonState==='BookId'){
    this.setState({
        scanned:true,
        scannedData:data, 
        scannedBookId:data,
        
        buttonState:'normal'
    });
}
else if(buttonState==='StudentId'){
    this.setState({
        scanned:true,
        scannedData:data,
       scannedStudentId:data,
        buttonState:'normal'
    });
}
}




render(){
const hasCameraPermission=this.state.hasCameraPermission;
const scanned= this.state.scanned;
const buttonState=this.state.buttonState;
if(buttonState==='clicked' && hasCameraPermission){
    return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:thiskey.handleBarcodeScanned}
        style={StyleSheet.absoluteFillObject}/>
    )
}

else if(buttonState === 'normal'){
    return(
        <View style={StyleSheet.container}>
            <View>
            <Image source={require("../assets/booklogo.jpg")} style={{width:200,height:200}}/>
            <Text style={{textAlign:'center',fontSize:20}}>Wireless Library </Text>
            </View>
            <View>
            <TextInput style={style.inputbox} placeholder="BookId"
            value= {this.state.scannedBookId}/>
            <TouchableOpacity onPress={()=>{this.getCameraPermission("BookId")}}
            style={styles.scanButton}>
             <Text style={style.buttonText}>Scan</Text>   
            </TouchableOpacity>
             <TextInput style={style.inputbox} placeholder="StudentId"
            value= {this.state.scannedStudentId}/>
            <TouchableOpacity onPress={()=>{this.getCameraPermission("StudentId")}}
            style={styles.scanButton}>
             <Text style={style.buttonText}>Scan</Text>   
            </TouchableOpacity>
            </View>
            </View>

    )
}
}
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'centre',
        alignItems:'center'
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underLine'
    },
    scanButton:{
        backgroundColor:'#2196F3',
        padding:10,
        margin:10
    },
    buttonText:{
        fontSize:20
    },
    inputbox:{
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
    }
})
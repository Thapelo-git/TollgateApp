import React, { useState, useEffect ,useRef} from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, ImageBackground, StatusBar, Picker, ActivityIndicator
} from 'react-native'

import { COLORS } from '../styles/Colors'
import { ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import Hotels from '../onbording/Hotels'10205409
//https://dribbble.com/shots/18568156-ECHO-PARK-Parking-Space-Finder-App
//https://github.com/react-native-voice/voice/blob/master/example/src/VoiceTest.tsx
//https://dribbble.com/shots/15942307-Fashion-Store-Mobile-Version
import Voice from '@react-native-community/voice';
import { auth, db } from './firebase'
import SearchScreen from './SearchScreen'
import RouteN1 from './RouteN1'
const { width } = Dimensions.get("screen")
const cardWidth = width / 1.8
const HomeScreen = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [location, setLocation] = useState(false)
    
    const [Tollgate, setTollgate] = useState([])
    const [isLoading, setLoading] = useState(false);
   
    const user = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/Tollgate').on('value', snap => {

            const Tollgate = []
            snap.forEach(action => {
                const key = action.key
                const data = action.val()
                Tollgate.push({
                    key: key,
                    location: data.location,
                    name: data.name,
                    url: data.url,
                    Route: data.Route,
                    Road: data.Road,
                    Class1: data.Class1,
                    Class2: data.Class2,
                    Class3: data.Class3,
                    Class4: data.Class4,
                })
                setTollgate(Tollgate)
                setFilteredDataSource(Tollgate);
                setMasterDataSource(Tollgate);

            })
        })
        db.ref('/users/' + user).on('value', snap => {

            setName(snap.val() && snap.val().name);
            setPhonenumber(snap.val().phonenumber)
            setEmail(snap.val().email)
        })



    }, [])
   
    const [searchtext, setSearchtext] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);


  

    const [Route, setRoute] = useState([]);
    const [RouteContainer, setRouteContainer] = useState('')
    const [Road, setRoad] = useState([]);
    const [RoadContainer, setRoadContainer] = useState('')
    const FilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.Route ? item.Route.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;

            })
            setRoute(newData)
            setRouteContainer(text)
        }
    }
    const bottomopen = useRef()
    const [modalopen,setModalopen]=useState(false)
    const [ selectedBtnIndex,setSelectedBtnIndex] = useState(0);
    
    const Btn =[
        {id:'1',name:'N1'},
        {id:'2',name:'N2'},
        {id:'3',name:'N3'},
        {id:'4',name:'N4'},
        {id:'5',name:'N5'},{id:'6',name:'N6'},{id:'7',name:'N7'},
    ]
    const ListBtn =()=>{
        return <ScrollView horizontal 
        showsHorizontalScrollIndicator={false} style={styles.btnListContainer}>
            {Btn.map((category,index)=>(
                <TouchableOpacity key={index} activeOpacity={0.8}
                onPress={()=> setSelectedBtnIndex(index)} style={{alignItems:'center',justifyContent:'center'
                ,}}>
                <View style={{
                    backgroundColor:selectedBtnIndex == index
                    ?COLORS.theme
                    :COLORS.lightgray,
                    ...styles.categoryBtn,
                }}>
                    <Text style={{
                        fontSize:15,fontWeight:'bold',
                        color:selectedBtnIndex == index?COLORS.white :COLORS.theme
                    }}>{category.name}</Text>
                </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white ,padding:10}}>
            <StatusBar
                backgroundColor="#0225A1"
                barStyle="light-content"
            />
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile', {
                        email: email, name: name, phonenumber: phonenumber
                    })}>
                        <Image source={{ uri: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-600w-193292033.jpg' }}
                            style={{ height: 50, width: 50, borderRadius: 25 }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 18, fontWeight: 'bold', marginLeft: 10,
                        marginTop: 18
                    }}>Welcome </Text>
                    <Text style={{
                        fontSize: 18, marginLeft: 10,
                        marginTop: 18
                    }}>{name}</Text>
                </View>
                {/* <TouchableOpacity onPress={navigation.navigate('Notification')}>
          <Ionicons name="notifications" size={24}/>
          </TouchableOpacity> */}
            </View>
            
            <View style={{
                marginTop: 20,
                flexDirection: 'row',
                paddingHorizontal: 20,
            }}>
                <TouchableOpacity style={styles.inputContainer}
                onPress={()=>bottomopen.current.show()}>

                    <Ionicons name="search" size={24} />

                    <View
                        style={{ fontSize: 18, flex: 1, marginLeft: 10 }}
                        ><Text>Where to go</Text></View>
                       
                  
                </TouchableOpacity>
            </View>
            <Text style={{marginLeft:-10}}>Choose your Route</Text>
            <View>
                
            <ListBtn/>
        </View>
          <SearchScreen bottomopen={bottomopen} navigation={navigation}/>
{
   selectedBtnIndex === 0?(<RouteN1 navigation={navigation}/>):null 
}
     


        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.lightgray,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    btnListContainer: {
        marginLeft: -10,
        
        paddingHorizontal: 10,
        paddingVertical: 30,
        // alignItems:'center'
    },
    categoryBtn: {
        height: 45,
        width: 80,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',

    },
    card: {
        height: 220,
    },
    cardContainer: {
        height: 100,
        width: cardWidth * 1.5,
        marginRight: 20,
        // marginBottom:20,
        marginVertical: 10,
        // marginTop:5,
        borderRadius: 15,
        elevation: 15,
        backgroundColor: COLORS.white,
        flexDirection: 'row', alignItems: 'center'

    },
    discountcard: {
        flexDirection: 'row', justifyContent: 'center',
        width: '100%',
        height: 110,
        // width:cardWidth*1.5,
        // marginRight:20,

        // marginHorizontal:10,

        // borderRadius:15,
        // elevation:15,
        // backgroundColor:COLORS.white,
        alignItems: 'center',
    },

    cardImage: {
        height: 100,
        width: width / 3,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
    }
})

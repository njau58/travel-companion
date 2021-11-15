import React, {useEffect, useState} from "react";
import {CssBaseline, Grid} from '@material-ui/core'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import {getPlaces, getWeather} from './api'

function App() {

  const [places, setPlaces] = useState([])
  const [bounds, setBounds] = useState({})
  const [coordinates, setCoordinates] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  const[filteredPlaces, setFilteredPlaces] = useState([])
  const[weatherData, setWeather]= useState(null)


  useEffect(()=>{


    const filtered = places?.filter((place)=>place.rating > rating)
    setFilteredPlaces(filtered)


  }, [rating])
 


  useEffect(()=>{

    navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}})=>{
      setCoordinates({
        lng:longitude,
        lat:latitude
      })
      

    })
  },[])

  useEffect(()=>{
    setIsLoading(true)

    const getWeatherData = async()=>{

     setWeather(await getWeather(coordinates.lat, coordinates.lng))
    

    }



const fetchPlaces =async () =>{

  if(bounds.sw && bounds.ne){




  let result = await getPlaces(type, bounds.sw, bounds.ne)
  setPlaces(result?.filter((place)=> place.name && place.num_reviews >0))
  setFilteredPlaces([])
  setIsLoading(false)

}}
getWeatherData()

fetchPlaces()



  },[ bounds, type])




  return (
    <>
    <CssBaseline>

    <Header setCoordinates={setCoordinates}/>
    <Grid container spacing={3} style={{width:'100%'}}>
    <Grid item xs={12} md={4}>

    <List
    childClicked={childClicked}
      isLoading={isLoading}
      rating={rating}
      setRating={setRating}
      setType={setType}
      type={type}
      places={ filteredPlaces?.length? filteredPlaces: places}
    />
    </Grid>
    <Grid item xs={12} md={8}>
    <Map
    weatherData={weatherData}

  setBounds={setBounds}
  setCoordinates={setCoordinates}
  coordinates={coordinates}
  places={ filteredPlaces?.length? filteredPlaces: places}
  setChildClicked={setChildClicked}
  weather


    /></Grid>

</Grid>
    </CssBaseline>

   
     
    </>
  );
}

export default App;

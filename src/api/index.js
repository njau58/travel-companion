import axios from "axios";





 export const getPlaces = async (type, sw, ne) =>{


    try{


        const {data:{data}} = await axios.get(  `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            {
              params: {
                bl_latitude: sw.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                tr_latitude: ne.lat,
              
              },
              headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_TRAVEL_API_KEY
              }
            }
             )
          
        return data;

    






    }
    
    catch(error){
        console.log(error)

    }
}



export const getWeather = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lon: lng },
        headers: {
          'x-rapidapi-key':'bebc451d29msh80a3839b5486c30p11dd98jsne0b0d3cfb9d3',
          'x-rapidapi-host': process.env.REACT_APP_RAPID_WEATHER_MAP_API_KEY,
        },
      });

      console.log(data)

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};


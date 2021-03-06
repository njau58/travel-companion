import React,{useState, useEffect, createRef} from 'react'
import useStyles from './styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
import {CircularProgress, Typography, FormControl, MenuItem, InputLabel, Select, Grid} from '@material-ui/core'

const List = ({places, childClicked, isLoading, rating, type, setRating, setType }) => {
    console.log({childClicked})

    const classes = useStyles()


    const [elRefs, setElRefs] = useState([])


  

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
      }, [places]);
    

  
    return (
        <div className={classes.container}>
        <Typography variant="h4" >Restaurants, Hotels & Attractions around you</Typography>
        {isLoading?<div className={classes.loading}><CircularProgress size="5rem"/></div>:(
            <>
            <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select onChange={(e)=>setType(e.target.value)} value={type}>
            <MenuItem value="restaurants">Restaurants</MenuItem> 
            <MenuItem value="hotels">Hotels</MenuItem> 
            <MenuItem value="attractions">Attractions</MenuItem> 
            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select onChange={(e)=>setRating(e.target.value)} value={rating}>
            <MenuItem value={0}>All</MenuItem> 
            <MenuItem value={3}>Above 3.0</MenuItem> 
            <MenuItem value={4}>Above 4.0</MenuItem> 
            <MenuItem value={4.5}>Above 4.5</MenuItem> 
            </Select>
        </FormControl>
        <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i)=>(
                <Grid  item key={i} xs={12} >
               <PlaceDetails
                place={place}
                    selected={Number(childClicked)===[i]}
                    refProp={elRefs[i]}
                />

                </Grid>

            ))}
        </Grid>

            </>
        )}
       
            
        </div>
    )
}

export default List

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';

import BusinessCard from '../cards/Business';
import ServiceCard from '../cards/Service';
import RealEstateCard from '../cards/Realestate';
import FarmingCard from '../cards/Farming';
import TravelsCard from '../cards/Travels';

import { useState, useEffect } from 'react';
import send from '../utils/request'
import { ToastContainer, toast } from 'react-toastify';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddDetails from './AddDetails';
import Autocomplete from '@mui/material/Autocomplete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Container, Grid, Paper } from '@mui/material';

const MainDetails = (props) => {
  const {userName} = props;
  var [msges, setMsges] = useState();
  var [enableSearch, setEnableSearch] = useState(false);
  var [searchText, setSearchText] = useState();
  var [enableAdd, setEnableAdd] = useState(false);
  const [rating, setRating] =useState({})
  var fileContent = undefined
  const loadMessages = (searchText) =>{
    if(searchText === undefined ){
      send('/api/status', "GET",undefined, undefined, msgHandler, msgError, true)
    }else{
      send('/api/status/search?query='+searchText, "GET",undefined, undefined, msgHandler, msgError, true)
    }
    
  }

  useEffect(() => {
    loadMessages();
  }, []);
  
  function msgHandler(responses){
    const data = []
    if(responses && responses.messages){
      responses.messages.map((msg, index) => {
        return(
          data.push(msg)
        )
      })
    }
    setMsges(data)
  }
  
  function msgError(response){
    toast.error("Error: " + response)
    console.log(response)
  }

  const imageSuccess = (response, update) =>{
    console.log(response);
    update(response.name);
  }
  const renderMessages = () => {
    if(msges === undefined){
      return
    }
    
    return msges.map((msg, index) => {
      const isMyMessage = msg && Number(userName) === msg.user.username;
      return (
        <Grid item xs={12}>
          <Paper elevation={3}>
            { msg.type === "business" && <BusinessCard message={msg} />}
            { msg.type === "travels" && <TravelsCard message={msg} />}
            { msg.type === "service" && <ServiceCard message={msg} />}
            { msg.type === "farming" && <FarmingCard message={msg} />}
            { msg.type === "realestate" && <RealEstateCard message={msg} />}
            <Rating id={`msg_${index}`}
              name="simple-controlled"
              value={rating[index]}
              onChange={(event, newValue) => {
                rating[index] = newValue
                setRating(rating);
              }}
            />
            {isMyMessage && <DeleteForeverIcon style={{align:"right"}} />}
          </Paper>
        </Grid>
      );
    });
  };

  const top = ["Shop", "Vegetables", "Hotel", "Fruits", "Plot", "Rent", "Plumber"]

  const handleAdd = (event)=>{
    event.preventDefault();
    setEnableAdd(true)
  }

  const addImageHandler = (image, fileNameUpdate, fileName) =>{
    send('/api/images', "POST",{'Content-type': 'application/json'}, JSON.stringify({"name":fileName, "blob":image}), imageSuccess, msgError, true, fileNameUpdate)
  }



  const addSubmitHandler = (data)=>{
    send('/api/status', "POST",{'Content-type': 'application/json'}, JSON.stringify(data),addResponseHander, msgError)
    setEnableAdd(false);
  }

  const addResponseHander = (data)=>{
    toast.info("Details added successfully");
    setEnableAdd(false);
    loadMessages()
  }


  const handleSearch = (event)=>{
    event.preventDefault();
    let srch = event.target.value || event.target.innerText
    if (srch === undefined || srch === ''){
        setEnableSearch(false);
        setEnableAdd(false);
        loadMessages();
    }else{
        setEnableSearch(true);
        setEnableAdd(false);
        loadMessages(srch);
    }
  }
  const handleClear = (event)=>{
    event.preventDefault();
    setEnableSearch(false);
    setEnableAdd(false);
    setSearchText();
    loadMessages()
  }
  const handleRefresh = (event)=>{
    event.preventDefault();
    //loadMessages()
    loadMessages()
  }
  return (
    <Box>
      <Container sx={{ display: 'flex'}} >
        <AppBar component="nav">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Local
                </Typography>
                {!enableAdd && !enableSearch &&
                <IconButton onClick={handleRefresh}>
                        <RefreshIcon />
                    </IconButton>
                }
                {!enableAdd && !enableSearch &&
                    <IconButton onClick={handleAdd}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                }
                {enableAdd && !enableSearch &&
                    <IconButton onClick={handleClear} hidden={enableAdd}>
                        <CancelIcon />
                    </IconButton>
                }
                {!enableAdd &&
                    <Stack spacing={2} sx={{ width: 300 }}>
                        <Autocomplete onChange={handleSearch}
                            id="free-solo-demo"
                            freeSolo
                            options={top}
                            renderInput={(params) => <TextField {...params} label="Search..  "  value={searchText}
                            onChange={e => setSearchText(e.target.value)}/>}
                        />
                    </Stack>
                }
            </Toolbar>
        </AppBar>
      </Container>
      <Box sx={{display: "flex", marginTop:10}}>
      {enableAdd && <AddDetails submitHandler={addSubmitHandler} imageHandler={addImageHandler}/>}
        <Container >
          <Grid container spacing={3}>
          {!enableAdd && msges && renderMessages()}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default MainDetails;
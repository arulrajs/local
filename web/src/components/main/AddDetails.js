import React, {useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BusinessForm from '../forms/Business';
import RealEstateForm from '../forms/RealEstate';
import ServiceForm from '../forms/Service';
import TransportForm from '../forms/Transport';
import FarmingForm from '../forms/Farming';
import { Box } from '@mui/material';
export default function AddDetails(props) {
    const {submitHandler, imageHandler} = props;
    const [tabIndex, setTabIndex] = useState(0);
    return(
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} forceRenderTabPanel={true}>
        <TabList>
        <Tab>Business</Tab>
        <Tab>Real Estate</Tab>
        <Tab>Service</Tab>
        <Tab>Transport</Tab>
        <Tab>Farming</Tab>
      </TabList>
        <TabPanel>
          <BusinessForm submitHandler={submitHandler} imageHandler={imageHandler}/>
        </TabPanel>
        <TabPanel>
          <RealEstateForm submitHandler={submitHandler} imageHandler={imageHandler}/>
        </TabPanel>
        <TabPanel>
          <ServiceForm submitHandler={submitHandler} imageHandler={imageHandler}/>
        </TabPanel>
        <TabPanel>
          <TransportForm submitHandler={submitHandler} imageHandler={imageHandler}/>
        </TabPanel>
        <TabPanel>
          <FarmingForm submitHandler={submitHandler} imageHandler={imageHandler}/>
        </TabPanel>
      </Tabs>
    );
  }
  
  
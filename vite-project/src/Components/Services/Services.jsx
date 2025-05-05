import React from 'react'
import {  useSelector } from 'react-redux'

import ServiceBox from '../../Pages/ServiceBox';

const Services= ({ allservices }) => {
    
    // This will correctly log the array of allservices
  
   
   
  const {service}=useSelector((state)=>state.Searchservices)
 console.log(service)
    return service && service.length>0 ?(
     <>
     {service.map((service,index)=>(
      <ServiceBox service={service}index={index} key={index}/>
     ))}
     </>
    ): allservices && allservices.length > 0 ? (
      <>
        {allservices.map((service, index) => (
         <ServiceBox service={service}index={index} key={index}/>
        ))}
      </>
    ) : (
      <>No services</>
    );
    
  };
  
  export default Services;
  
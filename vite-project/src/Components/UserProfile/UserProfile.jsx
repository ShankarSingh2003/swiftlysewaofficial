import React from 'react'
import ServiceBox from '../../Pages/ServiceBox'

const UserProfile = ({user,loggedinuserservice}) => {
    console.log(user)
    console.log(loggedinuserservice)
    return user && loggedinuserservice?(
        <div>
            <div className="p-16">
                <div className="p-8 bg-white shadow mt-24">  
                    <div className="grid grid-cols-1 md:grid-cols-3"> 
                           <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">  
                                <div>       
                                     <p className="font-bold text-gray-700 text-xl">{loggedinuserservice?.length}</p>    
                                         <p className="text-gray-400">Services</p>     
                                          </div>    
                                                  
                          
                                                    
                                                        <div>          
                                                             <p className="font-bold text-gray-700 text-xl">{user.notifications.length>0 ? user.notifications:0}</p>   
                                                                  <p className="text-gray-400">Notifications</p>      </div>    </div>    <div className="relative">      <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>      </div>    </div>    <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">   <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">  Message</button>    </div>  </div>  <div className="mt-20 text-center border-b pb-12">    <h1 className="text-4xl font-medium text-gray-700">{user?.name}</h1>    <p className="font-light text-gray-600 mt-3">{user?.email}</p>    <p className="mt-8 text-gray-500">{user?.phone}</p>      </div>  <div className="mt-12 flex flex-col justify-center">      
                                                                    
                                                                    
                                                                    
                                                                    <div>
                                                                        <h1 className="font-light text-4xl text-gray-600 mb-3 text-center">My Servicess</h1>

                                                                        {loggedinuserservice && loggedinuserservice.length>0 ? (
loggedinuserservice.map((service,index)=>(
    <ServiceBox service={service}index={index} key={index}/>
))
                                                                        ):
                                                                        (
                                                                            <>No Services</>
                                                                        )}
                                                                    </div>
                                                                       </div></div></div>
        </div>
    ):(
        <>
        Loading
        </>
    )
}

export default UserProfile

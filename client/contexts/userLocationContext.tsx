import React, { createContext, useContext, useEffect, useState } from 'react';


// interface LocationContextInterface {
//    location: Record<number, number>
//    setLocation: React.Dispatch<React.SetStateAction<any>>
// }


export const LocationContext = createContext<any>(null);

// export const useLocate = () => {
//     const context = useContext(LocationContext);
//     if(!context){
//         throw new Error('useLocate must be used within a LocationContextProvider')
//     }
//     return context
// }
// export const LocationContextProvider = ({ children }: { children: React.ReactNode } ) => {
    // const [location, setLocation] = useState<any>({})

    // const getUserLocation = () => {
    // navigator.geolocation.getCurrentPosition(function(position:any){
    //       if(position){
    //      return setLocation(position)
    //     }
    //     })
    //   }
    //   useEffect(()=>{
    //     getUserLocation()
    //     console.log('loo', location)
    // },[])

//     return (
//         <LocationContext.Provider>
//             {children}
//         </LocationContext.Provider>
//     )
// }

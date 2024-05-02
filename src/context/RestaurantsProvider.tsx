import { UUID } from 'crypto'
import React, { useState } from 'react'

export interface RestaurantType {
    uuid: UUID;
    name: string;
    location: string;
    price_range: number;
    rating: number;
    created_At: Date;
    updated_At: Date;
    // addRestaurant: () => void
}

export interface RestaurantContextType {
    restaurants: RestaurantType[];
    setRestaurants: (data: RestaurantType[]) => void;
    addRestaurant: (restaurant: RestaurantType) => void;
}

// export const RestaurantsContext = React.createContext<RestaurantContextType>({
//     uuid: crypto.randomUUID(),
//     name: '',
//     location: '',
//     priceRange: 0,
//     created_At: new Date(),
//     updated_At: new Date(),
//     // addRestaurant: () => {}
// });

export const RestaurantsContext = React.createContext<RestaurantContextType | null>(null);

export const RestaurantsContextProvider: React.FC<{children: React.ReactNode}> = (props) => {
    const [restaurants, setRestaurants] = useState<RestaurantType[]>([])

    const addRestaurant = (restaurant: RestaurantType) => {
        setRestaurants([...restaurants, restaurant])
    };

    return (
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurant}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}
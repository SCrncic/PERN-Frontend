import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UpdateRestaurant from './routes/UpdatePage'
import Home from './routes/Home'
import RestaurantDetail from './routes/RestaurantDetail'
import { RestaurantsContextProvider } from './context/RestaurantsProvider'

const App = (props: any) => {
    return (
        <RestaurantsContextProvider>
            <div>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/restaurants/:uuid' element={<RestaurantDetail />}></Route>
                        <Route path='/restaurants/:uuid/update' element={<UpdateRestaurant />}></Route>
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    )
}

export default App
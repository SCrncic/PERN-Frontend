import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UpdateRestaurant from './routes/UpdateRestaurant'
import Home from './routes/Home'
import RestaurantDetail from './routes/RestaurantDetail'
import { RestaurantsContextProvider } from './context/RestaurantsContext'

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/restaurants/:id' element={<RestaurantDetail />}></Route>
                        <Route path='/restaurants/:id/update' element={<UpdateRestaurant />}></Route>
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    )
}

export default App
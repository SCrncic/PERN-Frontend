import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { useNavigate } from 'react-router-dom'
import { UUID } from 'crypto'
import { RestaurantContextType, RestaurantType, RestaurantsContext } from '../context/RestaurantsProvider'

function RestaurantList() {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext) as RestaurantContextType
    let nav = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.restaurants)
            }
            catch (err){
                console.log(err)
            }
        }
        fetchData();
    }, [])

    const handleDelete = async (uuid: UUID) => {
        try {
            const resp = await RestaurantFinder.delete(`/${uuid}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.uuid !== uuid
            }))
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleUpdate = (uuid: UUID) => {
        nav(`/restaurants/${uuid}/update`)
    }

  return (
    <table className="table table-dark table-striped table-hover">
        <thead>
            <tr className='bg-primary'>
                <th scope='col'>Reastuarant</th>
                <th scope='col'>Location</th>
                <th scope='col'>Price Range</th>
                <th scope='col'>Ratings</th>
                <th scope='col'>Edit</th>
                <th scope='col'>Delete</th>
            </tr>
        </thead>
        <tbody>
            {restaurants && restaurants.map(restaurant => {
                return(
                    <tr key={restaurant.uuid}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{'$'.repeat(restaurant.price_range)}</td>
                        <td>{restaurant.rating}</td>
                        <td><button onClick={() => handleUpdate(restaurant.uuid)} className="btn btn-warning">Update</button></td>
                        <td><button onClick={() => handleDelete(restaurant.uuid)} className="btn btn-danger">Delete</button></td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default RestaurantList

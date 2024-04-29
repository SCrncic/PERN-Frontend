import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

function RestaurantList(props) {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext)
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

    const handleDelete = async (uuid) => {
        try {
            const resp = await RestaurantFinder.delete(`/${uuid}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.uuid !== uuid
            }))
        } catch (error) {
            console.log(error)
        }
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
                        <td><button className="btn btn-warning">Warning</button></td>
                        <td><button onClick={() => handleDelete(restaurant.uuid)} className="btn btn-danger">Delete</button></td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default RestaurantList

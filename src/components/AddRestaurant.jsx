import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const AddRestaurant = () => {
    const {addRestaurant} = useContext(RestaurantsContext)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('Price Range')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await RestaurantFinder.post('/', {
                name: name,
                location: location,
                price_range: Number.parseInt(priceRange)
            })
            addRestaurant(response.data.restaurants)
        }
        catch (err) {

        }
    }

    return (
        <div className='mb-4 '>
            <form action=''>
                <div className="row">
                    <div className='col'>
                        <input value={name} onChange={e => setName(e.target.value)} type='text' className='form-control' placeholder='name'/>
                    </div>
                    <div className='col'>
                        <input value={location} onChange={e => setLocation(e.target.value)} type='text' className='form-control' placeholder='location'/>
                    </div>
                    <div value={priceRange} onChange={e => setPriceRange(e.target.value)} className='col d-flex'>
                        <select className='form-select'>
                            <option value="Price Range">Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                        <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Add</button>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default AddRestaurant

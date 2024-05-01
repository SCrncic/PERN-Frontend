import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'

function UpdateRestaurant() {
    let nav = useNavigate();
    const {uuid} = useParams();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');

    useEffect(() => {
        const fetchData = async() =>{
            const response = await RestaurantFinder.get(`/${uuid}`)
            setName(response.data.restaurants.name);
            setLocation(response.data.restaurants.location);
            setPriceRange(response.data.restaurants.price_range);
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        try {
        e.preventDefault()
        const update = await RestaurantFinder.patch(`/${uuid}`, {
            name, location, price_range: priceRange
        });
        if(update.status === 200)
            nav('/');
        else throw new Error(update)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form action=''>
            <div className='form-group'>
                <div className='row form-group'>
                    <label>Name</label>
                    <input id='name' value={name} onChange={(e) => setName(e.target.value)} type='text' className='form-contorl' />
                </div>
                <div className='row form-group'>
                    <label>Location</label>
                    <input id='location' value={location} onChange={(e) => setLocation(e.target.value)} type='text' className='form-contorl' />
                </div>
                <div className='row form-group'>
                    <label>Price Range</label>
                    <select id='price_range' value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className='form-select'>
                        <option value="Price Range">Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button type='submit' onClick={(e) => handleSubmit(e)} className='btn btn-primary'>Submit</button>
            </div>
        </form>
    )
}

export default UpdateRestaurant

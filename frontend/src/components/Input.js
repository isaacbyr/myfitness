import React, { useState, useEffect } from 'react'
import { useGlobalContext } from './context'
import axios from 'axios'
import { toast } from 'react-toastify'

const Input = () => {
  const {
    search,
    setSearch,
    setData,
    type,
    setType,
    data,
    date,
    currentUserId,
  } = useGlobalContext()

  const postData = async () => {
    await axios.post('http://localhost:5000/newItem', data)
  }

  const fetchData = async (e) => {
    console.log('FETCHING DATA')
    e.preventDefault()
    const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
    const data = { query: search }
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': '94f0b85c',
        'x-app-key': '67bed83a164ad83bcb7ff851f2cd4a51',
      },
      body: JSON.stringify(data),
    })
    const info = await response.json()
    console.log(info.foods)
    if (info) {
      console.log('UPDATING STATE')

      setData({
        name: info.foods[0].food_name,
        date: date,
        nf_calories: info.foods[0].nf_calories,
        nf_protein: info.foods[0].nf_protein,
        tod: type,
        user_id: currentUserId,
      })
      toast.success(`Added ${info.foods[0].food_name} to your food log!`)
    }
  }

  useEffect(() => {
    postData()
  }, [data])

  return (
    <section className='input-container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-7'>
          <h2 className='text-center pt-3 heading'>Search</h2>
          <div className='underline'></div>
          <form className='d-flex pb-5' onSubmit={fetchData}>
            <input
              type='text'
              className='form-control'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              class='form-select'
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label='Default select example'
            >
              <option selected>Category</option>
              <option value='Breakfast'>Breakfast</option>
              <option value='Lunch'>Lunch</option>
              <option value='Dinner'>Dinner</option>
              <option value='Snack'>Snack</option>
            </select>
            <button type='submit' className='btn btn-primary'>
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Input

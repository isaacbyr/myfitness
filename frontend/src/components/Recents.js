import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './context'
import { IoMdAddCircle } from 'react-icons/io'
import axios from 'axios'
import { toast } from 'react-toastify'

const Recents = () => {
  const { recentSearches, setRecentSearches, currentUserId } =
    useGlobalContext()

  const getRecents = async () => {
    const data = await fetch(`http://localhost:5000/recents/${currentUserId}`)
    const recents = await data.json()
    console.log('Getting Recents')
    console.log(recents)
    setRecentSearches(recents)
  }

  const addToList = async (name) => {
    const findItem = await fetch(
      `http://localhost:5000/finditem/${name}/${currentUserId}`
    )
    window.location.reload()
    toast.success(`Added ${name} to your food log!`)
  }

  useEffect(() => {
    getRecents()
  }, [])

  return (
    <>
      <div>
        <h2 className='text-center recent-header'>Recents</h2>
        <div className='underline-recents'></div>
        <div className='d-flex justify-content-center'>
          <table className='table'>
            <tbody>
              {recentSearches.length > 0
                ? recentSearches.map((recent) => {
                    return (
                      <tr key={recent.id}>
                        <td className='search-desc recent-td'>
                          {recent.food_name}
                        </td>
                        <td
                          className='btn-recent recent-td'
                          onClick={() => addToList(recent.food_name)}
                        >
                          <IoMdAddCircle />
                        </td>
                      </tr>
                    )
                  })
                : ''}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Recents

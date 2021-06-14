import React from 'react'
import { useGlobalContext } from './context'
import { TiDelete } from 'react-icons/ti'
import axios from 'axios'
import { toast } from 'react-toastify'

const SingleItem = ({ allItems, totals }) => {
  const { currentUserId } = useGlobalContext()
  const handleDelete = async (id) => {
    console.log(id)
    try {
      toast.success('Deleted Item!', {
        position: 'top-center',
        autoClose: 2000,
        draggable: false,
        pauseOnHover: false,
        hideProgressBar: true,
      })
      const deleteItem = await axios.delete(
        `http://localhost:5000/deleteitem/${id}`
      )
      window.location.reload()
    } catch (e) {
      console.log(e.message)
      toast.error('Could not delete item, please try again :(')
    }
  }

  console.log(allItems)
  return (
    <div>
      <table className='table-list table'>
        <thead>
          <tr>
            <th scope='col'>Item</th>
            <th scope='col'>Type</th>
            <th scope='col'>Protein</th>
            <th scope='col'>Calories</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {allItems.map((item) => {
            return (
              <tr key={item.id}>
                <td className='table-item'>{item.food_name}</td>
                <td className='table-item'>{item.category}</td>
                <td className='table-item'>{item.protein}</td>
                <td className='table-item'>{item.calories}</td>
                <td
                  className='delete-table-item'
                  onClick={() => handleDelete(item.id)}
                >
                  <TiDelete />
                </td>
              </tr>
            )
          })}
          {allItems.length > 0 ? (
            <tr>
              <td className='table-item-totals'>TOTALS</td>
              <td className='table-item-totals'></td>
              <td className='table-item-totals'>{totals[0].protein} g</td>
              <td className='table-item-totals'>{totals[0].calories}</td>
              <td className='table-item-totals'></td>
            </tr>
          ) : (
            ''
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SingleItem

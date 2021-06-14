import React, { useEffect } from 'react'
import { useGlobalContext } from './context'
import moment from 'moment'
import SingleItem from './SingleItem'

const ListComponent = () => {
  const {
    data,
    date,
    allItems,
    setAllItems,
    totals,
    setTotals,
    currentUserId,
  } = useGlobalContext()

  const loadData = async () => {
    const response = await fetch(
      `http://localhost:5000/allitems/${date}/${currentUserId}`
    )
    const items = await response.json()
    console.log(items)
    setAllItems(items.allItems)
    setTotals(items.totals)
  }

  useEffect(() => {
    console.log(date)
    loadData()
  }, [date])

  useEffect(() => {
    loadData()
  }, [data])
  return (
    <>
      <div>
        <h2 className='text-center list-header'>
          <b>{moment(date).format('MMMM Do YYYY')}</b>
          <div className='underline-date'></div>
        </h2>
        {allItems.length > 0 ? (
          <SingleItem allItems={allItems} totals={totals} />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default ListComponent

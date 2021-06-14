import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([])
  const [workoutDate, setWorkoutDate] = useState(new Date())
  const [date, setDate] = useState(new Date())
  const [workoutDesc, setWorkoutDesc] = useState({
    excercise: '',
    date: workoutDate,
    group: '',
    sets: '',
    reps: '',
    weight: '',
    notes: '',
  })
  const [search, setSearch] = useState('')
  const [data, setData] = useState({
    name: '',
    data: date,
    nf_calories: '',
    nf_protein: '',
    tod: '',
  })
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState('')
  const [recentSearches, setRecentSearches] = useState([])
  const [allItems, setAllItems] = useState([])
  const [totals, setTotals] = useState([0, 0])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(0)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        workoutDesc,
        setWorkoutDesc,
        recentSearches,
        setRecentSearches,
        setLoading,
        loading,
        date,
        setDate,
        search,
        setSearch,
        setData,
        data,
        type,
        setType,
        allItems,
        setAllItems,
        totals,
        setTotals,
        workoutDate,
        setWorkoutDate,
        workouts,
        setWorkouts,
        currentUserId,
        setCurrentUserId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

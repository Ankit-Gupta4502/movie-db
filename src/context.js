import React, { useState, useContext, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
console.log(API_ENDPOINT)
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const[loading,setLoading] = useState(true)
  const[movies,setMovies] = useState([])
  const[error,setError] = useState({show:false,msg:''})
  const[query,setQuery] = useState('avengers')

  const fetchMovies=async(movies)=>{
    // setLoading(true)
    try {
      const resp = await fetch(movies)
      const data = await resp.json()
      if (data.Response==='True') {
        setMovies(data.Search)
        setError({show:false,msg:''})
      }
      else{
        setError({show:true,msg:data.Error})
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(()=>{
    fetchMovies(`${API_ENDPOINT}&s=${query}`)
  },[query])

  return <AppContext.Provider value={{loading,error,movies,query,setQuery}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => { 
  return useContext(AppContext)
}

export { AppContext, AppProvider }

import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import PrimarySearchAppBar from './material/nav'
import Movie from './Movie'
import Search from './Search'

const initialState ={
    loading: true,
    movies: [],
}

function App () {
    const APIkey = 'apikey=1151f2b7'
    const APIurl = `http://www.omdbapi.com/?t=inception&${APIkey}`

    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    useEffect( () => {
        fetch(APIurl)
        .then(response => response.json())
        .then(jsonResponse => {
            setMovies(jsonResponse.Search)
            setLoading(false)
        })
    }, [])

    const search = searchValue => {
        setLoading(true)
        setError(null)
    }
    fetch(`http://www.omdbapi.com/?s=${searchValue}&${APIkey}`)
    .then(response => response.json())
    .then(jsonResponse=> {
        if(jsonResponse.Response === 'True'){
            setMovies(jsonResponse.Search)
            setLoading(false)
        } else {
            setError(jsonResponse.Error)
            setLoading(false)
        }
    })


    return (
        <div className={'App'}>
            <h1>HRHRHS</h1>
            {/* <PrimarySearchAppBar /> */}
            <Search search={search}/>
            <p className='AppInfo'>Делитесь любимыми фильмами</p>
            <div className="movies">
                {loading && !error ? (
                    <span>Loading...</span>
                ) : error?(
                    <div className="errorMessage">{error}</div>
                ) : (
                    movies.map((movie, index) => (
                        <Movie key={`${index}-${movie.Title}`} movie={movie} />
                    ))
                )}
            </div>

        </div>
    )
}

export default App
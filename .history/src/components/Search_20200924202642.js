import React, { useEffect, useState } from 'react'

function Search() {

    const [state, setState] = useState([]);
  
    useEffect(() => {
        const APIurl = 'http://www.omdbapi.com/?i=tt3896198&apikey=480344f1'
        fetch(APIurl)
            .then(response => response.json())
            .then(json => setState(json.state))
    }, [])



    return(
        <div>
            {state.Title}
       {/* {Title} */}
        </div>
          
    )
        
    
}
export default Search
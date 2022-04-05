import axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import BookLIst from '../Components/BookLIst';
import { getSearch, setSearch } from '../firebase';
import { GoogleLogout } from 'react-google-login';
import { async } from '@firebase/util';

const SearchPage = () => {
  const { uid } = useParams();
  const navigate = useNavigate()
  const [prevSearch, setPrevSearch] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [bookList, setBookList] = useState([])
  const [visible, setVisible] = useState(true)

  const getSearchList = useCallback(async () => {
    const resp = await getSearch();
    setPrevSearch(resp[uid] !== undefined ? resp[uid]['searchQuery'] : [])
  }, [setPrevSearch])

  useEffect(() => {
    getSearchList()
  }, [getSearchList])


  const handleSearch = async () => {
    if (searchQuery === '') return
    await setSearch(searchQuery, uid)
    try {
      const resp = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`)
      setBookList(resp.data.items !== undefined ? resp.data.items : [])
    } catch (error) {
      console.log(error)
    }
    setVisible(false)
  }
  return (
    <>
      <div className='flex justify-end pt-5 px-8'>
        <GoogleLogout
          clientId="760797940951-evrhkgci6qotf9ubncpg3hfi35mcejsr.apps.googleusercontent.com"
          buttonText="Logout"
          onFailure={(e) => console.log('err', e)}
          cookiePolicy={'single_host_origin'}
          onLogoutSuccess={() => {
            localStorage.clear()
            navigate('../')
          }}
        >
        </GoogleLogout>
      </div>
      <div className='px-4' >
        <div className='flex justify-center items-center pt-44 mb-4'>
          <input className='p-5 bg-gray-200 rounded-xl rounded-r-none focus:shadow-lg transition-shadow ease-in-out placeholder-slate-600 text-base font-medium text-gray-800 outline-none' placeholder='search books...' value={searchQuery} onChange={(e) => {
            if (e.target.value === '') setVisible(true)
            setSearchQuery(e.target.value)
          }} onKeyPress={(e) => { if (e.key === 'Enter') handleSearch() }} />
          <button className='bg-purple-600 p-5 hover:outline hover:bg-purple-500 transition-all ease-in-out  outline-1 outline-purple-700 rounded-r-xl' onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-purple-600 text-white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        {visible ? <div className='mx-auto w-80'>
          <span className='text-xs font-medium text tracking-wider'>
            recent searces..
          </span>
          {prevSearch.map((e, i) => {
            return (
              <div key={i} className='bg-slate-100 m-1 rounded-lg py-1 px-4 text-base font-medium cursor-pointer flex justify-between items-center' onClick={() => {
                setSearchQuery(e)
                setVisible(false)
              }}>
                {e}
              </div>
            )
          })}
        </div> : ""}
        <div className='pt-4 sm:w-9/12 m-auto'>
          <BookLIst books={bookList} />
        </div>
      </div>
    </>
  )
}

export default SearchPage
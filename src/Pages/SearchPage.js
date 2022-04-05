import axios from 'axios';
import React, { useState } from 'react'
import BookLIst from '../Components/BookLIst';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [bookList, setBookList] = useState([])

  const handleSearch = async () => {
    if (searchQuery === '') return
    try {
      const resp = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`)
      setBookList(resp.data.items !== undefined ? resp.data.items : [])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='px-5' >
        <div className='flex justify-center items-center pt-44'>
          <input className='p-5 bg-gray-200 rounded-xl rounded-r-none focus:shadow-lg transition-shadow ease-in-out placeholder-slate-600 text-base font-medium text-gray-800 outline-none' placeholder='search books...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') handleSearch() }} />
          <button className='bg-purple-600 p-5 hover:outline hover:bg-purple-500 transition-all ease-in-out  outline-1 outline-purple-700 rounded-r-xl' onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-purple-600 text-white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <div className='pt-4 sm:w-9/12 m-auto'>
          <BookLIst books={bookList} />
        </div>
      </div>
    </>
  )
}

export default SearchPage
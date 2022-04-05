import React from 'react'
import { Link } from 'react-router-dom'

const BookLIst = ({ books }) => {
    return (
        <div className=''>
            {books.map((b, i) => {
                return (<>
                    <Link to={`/${b.id}`} key={i}>
                        <div className=' bg-purple-600 m-3 p-4 rounded-lg text-gray-50 font-medium text-base cursor-pointer hover:translate-x-1 hover:drop-shadow-lg transition-all ease-in-out'>
                            <span> {b.volumeInfo.title}</span>
                        </div>
                    </Link>
                </>)
            })}
        </div>
    )
}

export default BookLIst
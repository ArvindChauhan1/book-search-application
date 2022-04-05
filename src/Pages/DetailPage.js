import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'

const DetailPage = () => {
    const { bookId } = useParams()

    const [loading, setLoading] = useState(true)
    const [bookData, setBookData] = useState({})

    const fetchBookDetails = useCallback(async () => {
        try {
            const resp = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            setBookData(resp.data.volumeInfo != undefined ? resp.data.volumeInfo : {})
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }, [setBookData])

    useEffect(() => {
        fetchBookDetails()
    }, [fetchBookDetails])

    return (
        <>
            {loading ?
                <>
                    <div className='w-screen h-screen text-5xl font-semibold text-purple-700 flex justify-center items-center'>
                        Loading...
                    </div>
                </>
                :
                <div className='px-10 sm:px-20 pt-10'>
                    <div className='flex flex-col-reverse sm:flex-row'>
                        <div className='w-full sm:w-3/4 p-4 text-base font-medium text-gray-800 text-left'>
                            <div className='flex justify-between pb-4'>
                                <div className='text-gray-400 mr-3'>
                                    Title
                                </div>
                                <div className='text-gray-800'>
                                    {bookData.title}
                                </div>
                            </div>
                            {/*  */}
                            <div className='flex justify-between pb-4'>
                                <div className='text-gray-400 mr-3'>
                                    Subtitle
                                </div>
                                <div className='text-gray-800'>
                                    {bookData.subtitle}
                                </div>
                            </div>
                            {/*  */}
                            <div className='flex justify-between pb-4'>
                                <div className='text-gray-400 mr-3'>
                                    Authors
                                </div>
                                <div className='text-gray-800'>
                                    {bookData.authors.length !== 0 ?
                                        <>
                                            {bookData.authors.map((a, i) => {
                                                return (
                                                    <span key={i}>{`${a} ${bookData.authors.length - 1 !== i ? ',' : ''}`}</span>
                                                )
                                            })}
                                        </>
                                        : 'N/A'
                                    }
                                </div>
                            </div>
                            {/*  */}
                            <div className='flex justify-between pb-4'>
                                <div className='text-gray-400 mr-3'>
                                    Publisher
                                </div>
                                <div className='text-gray-800'>
                                    {bookData.publisher}
                                </div>
                            </div>
                            {/*  */}
                            <div className='flex justify-between pb-4'>
                                <div className='text-gray-400 mr-3'>
                                    Published Date
                                </div>
                                <div className='text-gray-800'>
                                    {bookData.publishedDate}
                                </div>
                            </div>
                            {/*  */}
                            <div className='flex justify-between pb-4'>
                                <div className='text-gray-400 mr-3'>
                                    Printed Page Count
                                </div>
                                <div className='text-gray-800'>
                                    {bookData.printedPageCount}
                                </div>
                            </div>
                            {/*  */}
                            <div className='flex justify-between pb-4'>
                                <div className='text-gray-400 mr-3'>
                                    Print Type
                                </div>
                                <div className='text-gray-800'>
                                    {bookData.printType}
                                </div>
                            </div>
                        </div>
                        <div className='p-4 mb-6 sm:mb-auto m-auto'>
                            <img className='' src={bookData.imageLinks !== undefined ? bookData.imageLinks.thumbnail : ""} alt='book' />
                        </div>
                    </div>
                    <div className='text-base font-medium p-5' dangerouslySetInnerHTML={{ __html: `${bookData.description}` }} />
                    <div className='p-6'>
                        <a href={bookData.previewLink} target={'_blank'} className='p-2 bg-purple-600 rounded-lg font-medium text-white text-sm hover:bg-purple-400 transition-all ease-in'>
                            Preview Book
                        </a>
                    </div>
                </div>
            }
        </>
    )
}

export default DetailPage
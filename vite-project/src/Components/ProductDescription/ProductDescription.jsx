import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { CreateReview, getProductAllReview, getProductDetail } from '../../action/Product'
import { toast } from 'react-toastify'
import ReviewCard from '../ReviewCard/ReviewCard'

const ProductDescription = () => {
    const { loading, product } = useSelector((state) => state.getProducuctDetail)
    const { loading:productreviewloading, reviews} = useSelector((state) => state.getproductreview)
    const {loading:reviewloading,status}=useSelector((state)=>state.createReview)
    const dispatch = useDispatch()
    const { id } = useParams()

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [currentSlide, setCurrentSlide] = useState(0)
    
    // Create ref for carousel
    const slidesRef = useRef([])

    const handleRatingClick = (rate) => {
        setRating(rate)
    }

    const handleReviewChange = (e) => {
        setComment(e.target.value)
    }

    const handleSubmitReview = (e) => {
        e.preventDefault()

        if (rating === 0 || comment.trim() === '') {
            alert('Please provide both rating and review')
            return
        }

        dispatch(CreateReview({productId:id,rating,comment}))
    }

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [dispatch, id])
    
    useEffect(() => {
        dispatch(getProductAllReview(id))
    }, [dispatch, id,reviews.length])
   
    // Carousel navigation functions
    const goToNextSlide = () => {
        if (!product || !product.images) return
        
        const nextSlide = (currentSlide + 1) % product.images.length
        setCurrentSlide(nextSlide)
    }
    
    const goToPrevSlide = () => {
        if (!product || !product.images) return
        
        const prevSlide = (currentSlide - 1 + product.images.length) % product.images.length
        setCurrentSlide(prevSlide)
    }
    
    const goToSlide = (index) => {
        setCurrentSlide(index)
    }
    
    // Auto-rotation for carousel
    useEffect(() => {
        if (product && product.images && product.images.length > 1) {
            const interval = setInterval(() => {
                goToNextSlide()
            }, 5000) // Change slide every 5 seconds
            
            return () => clearInterval(interval)
        }
    }, [currentSlide, product])

    if(status==='200'){
        return toast("Review Created")
    }
    
    return loading || reviewloading || productreviewloading ? (
        <Loader />
    ) : product ? (
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            {product.images && product.images.length > 0 ? (
                                product.images.length === 1 ? (
                                    // Single image display
                                    <img 
                                        className="w-full h-full object-cover" 
                                        src={product.images[0].url} 
                                        alt="Product"
                                    />
                                ) : (
                                    // Custom carousel for multiple images
                                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                                        {/* Slides */}
                                        <div className="relative h-full">
                                            {product.images.map((image, i) => (
                                                <div 
                                                    key={i}
                                                    ref={el => slidesRef.current[i] = el}
                                                    className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                                >
                                                    <img
                                                        src={image.url}
                                                        className="absolute block w-full h-full object-cover"
                                                        alt={`Product image ${i+1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* Navigation dots */}
                                        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                                            {product.images.map((_, i) => (
                                                <button 
                                                    key={i}
                                                    type="button" 
                                                    onClick={() => goToSlide(i)}
                                                    className={`w-3 h-3 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`} 
                                                    aria-current={i === currentSlide ? "true" : "false"} 
                                                    aria-label={`Slide ${i+1}`}
                                                ></button>
                                            ))}
                                        </div>
                                        
                                        {/* Previous button */}
                                        <button 
                                            onClick={goToPrevSlide}
                                            type="button" 
                                            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
                                        >
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                                <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                                </svg>
                                                <span className="sr-only">Previous</span>
                                            </span>
                                        </button>
                                        
                                        {/* Next button */}
                                        <button 
                                            onClick={goToNextSlide}
                                            type="button" 
                                            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                        >
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                                <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                </svg>
                                                <span className="sr-only">Next</span>
                                            </span>
                                        </button>
                                    </div>
                                )
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">No images available</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Product Name</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{product.name}</p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                <span className="text-gray-600 dark:text-gray-300">{product.price}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                <span className="text-gray-600 dark:text-gray-300">
                                    {parseFloat(product.Stock) > 1 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                            <div className="flex items-center mt-2">
                                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                            <div className="flex items-center mt-2">
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{product.description}</p>
                        </div>

                        <div className="p-4 mx-auto bg-white rounded-lg shadow-md max-w-4xl sm:p-6 grid grid-cols-1 lg:grid-cols-6 gap-6 mt-10">
                            <div className="lg:col-span-4 col-span-1">
                                <form onSubmit={handleSubmitReview} className="space-y-4">
                                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Write a review</h2>
                                    <div className="flex justify-start items-center space-x-1 mb-4">
                                        {[5, 4, 3, 2, 1].map((rate) => (
                                            <React.Fragment key={rate}>
                                                <input
                                                    type="radio"
                                                    id={`${rate}-stars`}
                                                    name="rating"
                                                    value={rate}
                                                    className="hidden"
                                                    checked={rating === rate}
                                                    onChange={() => handleRatingClick(rate)}
                                                />
                                                <label
                                                    htmlFor={`${rate}-stars`}
                                                    className={`text-yellow-400 text-2xl cursor-pointer hover:scale-110 ${rating >= rate ? 'text-yellow-500' : ''}`}
                                                >
                                                    ★
                                                </label>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <textarea
                                        id="review"
                                        name="review"
                                        rows="4"
                                        required
                                        value={comment}
                                        onChange={handleReviewChange}
                                        className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write your review"
                                    />
                                    <div className="text-right py-4">
                                        <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-3">
                                            Create Review
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {reviews && reviews.length>0 ?(
                <>
                <ReviewCard reviews={reviews}/>
                </>
            ):(
                <>No Reviews</>
            )}
        </div>
    ) : (
        <div>No product details</div>
    )
}

export default ProductDescription
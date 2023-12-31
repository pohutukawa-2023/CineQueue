import { useAuth0 } from '@auth0/auth0-react'
import { Details } from '../api/types'
import {
  addToCompletedList,
  addToWatchlist,
  deleteFromCompletedList,
  deleteFromWatchlist,
  getCompletedList,
  getWatchlist,
} from '../api/dbApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

interface Props {
  details: Details
}

function MovieDetails(props: Props) {
  const { details } = props

  const { user, getAccessTokenSilently } = useAuth0()
  const auth0Id = user?.sub

  const {
    data: loggedin, //watchlist single item on list or not
  } = useQuery({
    queryKey: ['loggedin'],
    queryFn: checkLoggedIn,
  })
  const isLoggedIn = loggedin

  console.log('check if logged in v2: ', isLoggedIn)
  function checkLoggedIn() {
    queryClient.invalidateQueries(['loggedin', details])
    if (auth0Id) {
      return true
    } else return false
  }

  const queryClient = useQueryClient()
  useEffect(() => {
    // Invalidate relevant queries when type or id changes

    queryClient.invalidateQueries(['watchedOrNot', details])
    queryClient.invalidateQueries(['watchlistChecker', details])
    queryClient.invalidateQueries(['completedOrNot', details])
    queryClient.invalidateQueries(['completedListChecker', details])
    // onWatchlistChecker()
  }, [queryClient, details])

  const {
    data: watched, //watchlist single item on list or not
  } = useQuery({
    queryKey: ['watchedOrNot'],
    queryFn: onWatchlistChecker,
  })
  const {
    data: completed, //watchlist single item on list or not
  } = useQuery({
    queryKey: ['completedOrNot'],
    queryFn: onCompletedListChecker,
  })

  const { data: completedList } = useQuery({
    queryKey: ['completedListChecker'],
    queryFn: totalCompletedList,
  })

  const {
    data: watchlist,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['watchlistChecker'],
    queryFn: totalWatchlist,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) {
    console.error(error)
    return null
  }

  const toWatchList = {
    content_id: details.id,
    movie_or_show: 'movie',
    auth_id: auth0Id,
  }

  async function totalWatchlist() {
    const token = await getAccessTokenSilently()
    return await getWatchlist(token)
  }

  //function to add to watchlist

  async function handleWatchListClick() {
    const token = await getAccessTokenSilently()
    await addToWatchlist(toWatchList, token)
    queryClient.invalidateQueries(['watchlistChecker'])
  }

  async function handleWatchListClickDelete() {
    const token = await getAccessTokenSilently()
    await deleteFromWatchlist(toWatchList, token)
    queryClient.invalidateQueries(['watchlistChecker'])
  }

  function onWatchlistChecker() {
    const result = watchlist.filter((item) => item.content_id == details.id)
    if (result.length > 0) {
      return true
    } else return false
  }

  // for completed below

  // const queryClient = useQueryClient()
  // useEffect(() => {
  //   // Invalidate relevant queries when type or id changes

  //   queryClient.invalidateQueries(['watchedOrNot', details])
  //   queryClient.invalidateQueries(['watchlistChecker', details])
  //   // onWatchlistChecker()
  // }, [queryClient, details])

  // const {
  //   data: watched, //watchlist single item on list or not
  // } = useQuery({
  //   queryKey: ['watchedOrNot'],
  //   queryFn: onWatchlistChecker,
  // })

  async function totalCompletedList() {
    const token = await getAccessTokenSilently()
    return await getCompletedList(token)
  }

  // //function to add to watchlist

  async function handleCompletedListClick() {
    const token = await getAccessTokenSilently()
    await addToCompletedList(toWatchList, token)
    queryClient.invalidateQueries(['completedListChecker'])
  }

  async function handleCompletedListClickDelete() {
    const token = await getAccessTokenSilently()
    await deleteFromCompletedList(toWatchList, token)
    queryClient.invalidateQueries(['completedListChecker'])
  }

  function onCompletedListChecker() {
    const result = completedList.filter((item) => item.content_id == details.id)
    if (result.length > 0) {
      return true
    } else return false
  }

  //for completed above

  return (
    // <div className="grid grid-flow-col auto-cols-max">
    //   <img
    //     className="flex"
    //     alt={`${details.original_title} poster`}
    //     src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
    //   ></img>
    // {checkLoggedIn() ? : }
    <>
      <section className="bg-black">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              {details.title}
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              {details.overview}
            </p>
            <div className="gap-7">
              {!onWatchlistChecker() ? (
                <button
                  onClick={handleWatchListClick}
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Add to Watchlist
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleWatchListClickDelete}
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Watchlisted
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="#008000"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              )}

              {/* <button
              onClick={handleWatchListClick}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Add to Watchlist
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button> */}
              {!onCompletedListChecker() ? (
                <button
                  onClick={handleCompletedListClick}
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Add to completed
                </button>
              ) : (
                <button
                  onClick={handleCompletedListClickDelete}
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Already watched
                </button>
              )}
              {/* <button className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Add to completed
            </button> */}
              <button className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Runtime: {details.runtime} minutes
              </button>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              alt="mockup"
              className="rounded"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default MovieDetails

{
  /* 

      <div>
        <h1 className="text-white flex-initial text-7xl">
          {details.original_title}
        </h1>
      </div>

      <div>
        <p className="text-white text-2xl">{details.overview}</p>
      </div>
    </div> */
}

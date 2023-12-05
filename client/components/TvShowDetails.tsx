// import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getContentIdByAuthId } from '../../server/db/db'

function TvShowDetails(props: Props) {
  const { details } = props

  // const content_id = details.id
  // const { data } = useQuery({
  //   queryKey: ['smt'],
  //   queryFn: () => getContentIdByAuthId('3'),
  // })
  // console.log(data)

  return (
    <section className="bg-black">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            {details.name}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {details.overview}
          </p>
          <button className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Add to watchlist
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
          <button className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Add to completed
          </button>
          <button className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Runtime: 300 minutes
          </button>
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
  )
}
export default TvShowDetails

{
  /* <div>
<img
  alt={`${details.name} poster`}
  src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
></img>
<h1>{details.name}</h1>
<p>{details.overview}</p>
</div> */
}

// !!!!!!!_+-*! VITOR !*-+_!!!!!//

// const arrOfContent = getContentIdByAuthId('3')

// console.log(arrOfContent)

// function checkIfInWatchlist(id: never) {
// if(arrOfContent.includes(id)){
//   return(<>
// already on Watchlist
// <i className="fa-solid fa-check" style="color: #1c8307;"></i>
// </>)}
// else{
//   <button className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
//           Add to watchlist
//           <svg
//             className="w-5 h-5 ml-2 -mr-1"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//         </button>
// }
// }

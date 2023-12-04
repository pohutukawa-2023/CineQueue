/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Details } from '../api/types'
const { VITE_API_KEY } = import.meta.env

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${VITE_API_KEY}`,
  },
}

interface Props {
  details: Details
}
import { addToWatchlist } from '../api/dbApi'

function TvShowDetails(props: Props) {
  const { details } = props

  const [userInput, setUserInput] = useState<number | ''>('')

  const {
    data: runtime,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['runtime', props],
    queryFn: getRunTime,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) {
    console.error(error)
    return null
  }

  function getRunTime() {
    const episodeRunTime = props.details.episode_run_time
    const lastEpisodeRunTime = [props.details.last_episode_to_air.runtime]
    let finalRuntime
    if (episodeRunTime.length > 0) {
      const sum = episodeRunTime.reduce(
        (acc: any, value: any) => acc + value,
        0
      )
      const averageEpisodeRunTime = sum / episodeRunTime.length
      finalRuntime = averageEpisodeRunTime
    } else if (lastEpisodeRunTime.length > 0) {
      const sum = lastEpisodeRunTime.reduce((acc, value) => acc + value, 0)
      const averageLastEpisodeRunTime = sum / lastEpisodeRunTime.length
      finalRuntime = averageLastEpisodeRunTime
    } else {
      finalRuntime = 'Not Avilable'
    }


    const totalShowRunTime = Math.round(
      (finalRuntime * details.number_of_episodes) / 60
    )

    let daysToWatchShow = ''
    if (userInput !== '' && !isNaN(userInput)) {
      // Check if userInput is not blank and is a valid number
      daysToWatchShow = Math.round((totalShowRunTime * 60) / userInput)
    }
    console.log('user', userInput)
    console.log('time', daysToWatchShow)
    console.log('Runtime:', episodeRunTime)
    console.log('Runtime1:', lastEpisodeRunTime)
    console.log('Runtime2:', finalRuntime)


    return {
      episodeRunTime: episodeRunTime,
      lastEpisodeRunTime: lastEpisodeRunTime,
      finalRuntime: finalRuntime,

      totalShowRunTime: totalShowRunTime,
      daysToWatchShow: daysToWatchShow,
      userInput: userInput,
    }
  }

  async function handleWatchlist() {
    const item = { id: details.id, type: 'show' }

    return await addToWatchlist(item)
  }

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
          <button
            onClick={() => handleWatchlist()}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
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
            Runtime: {runtime.finalRuntime} minutes <br />
            Total Number of Episodes: {details.number_of_episodes} <br />
            Total Number of Seasons: {details.number_of_seasons}
          </button>

        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
            alt="mockup"
            className="rounded"
          />
        </div>
        <div className="lg:col-span-7">
          <div className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:focus:ring-gray-800">
            Average Episode runtime in minutes: {runtime.finalRuntime} <br />
            Total Number of Episodes: {details.number_of_episodes} <br />
            Total Number of Seasons: {details.number_of_seasons} <br />
            Total hours to watch the show: {runtime.totalShowRunTime}
            <br />
            Days to watch with {runtime.userInput} minutes daily:
            {runtime.daysToWatchShow}
            <label
              htmlFor="userInput"
              className="block mt-4 text-gray-500 dark:text-gray-400"
            >
              Avaiability:
            </label>
            <input
              type="number"
              id="userInput"
              name="userInput"
              placeholder="minutes daily"
              value={userInput}
              onChange={(e) => {
                const value = e.target.value
                if (value.length === 1 && value === '0') {
                  return
                }
                setUserInput(Number(value))
              }}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
export default TvShowDetails


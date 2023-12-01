import React from 'react'
import Posters from './Posters'

interface Props {
  shows: any
}

function TvShows(props: Props) {
  const popularShows = props.shows.popular.results
  const trendingShows = props.shows.trending.results
  const topRatedShows = props.shows.topRated.results

  const tmdbPosterLink = `https://image.tmdb.org/t/p/w500/`

  return (
    <div>
      <div>
        <div className="flex flex-wrap gap-4">
          {topRatedShows.map((show) => (
            <>
              <Posters content={show} tmdbPosterLink={tmdbPosterLink} />
            </>
          ))}
          <h2>Upcoming Movies</h2>
          {trendingShows.map((show) => (
            <>
              <Posters content={show} tmdbPosterLink={tmdbPosterLink} />
            </>
          ))}
          {popularShows.map((show) => (
            <>
              <Posters content={show} tmdbPosterLink={tmdbPosterLink} />
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TvShows

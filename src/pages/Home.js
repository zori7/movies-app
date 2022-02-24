import React, {useEffect} from "react"
import {$movies, fetchMoviesFx} from "../store/movies"
import {useStore} from "effector-react"
import {
  Grid,
  LinearProgress,
  Pagination,
  Typography,
} from "@mui/material"
import MovieListCard from "../components/MovieListCard"

const Home = () => {
  const movies = useStore($movies)

  useEffect(() => {
    fetchMoviesFx()
  }, [])

  const onPageChange = (_, page) => {
    fetchMoviesFx(page)
  }

  return (
      <>
        <Pagination count={movies.data.total_pages} page={movies.data.page} onChange={onPageChange} />
        <Typography variant="h3">Movies</Typography>
        {movies.loading && <LinearProgress />}

        <Grid container spacing={4} marginY={2}>
          {movies.data.results.map((item) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={item.id}>
                <MovieListCard item={item} />
              </Grid>
          ))}
        </Grid>
      </>
  )
}

export default Home

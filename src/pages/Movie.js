import React, {useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {useStore} from "effector-react"
import {$movie, $movieCredits, fetchMovieCreditsFx, setMovie} from "../store/movies"
import {Box, CardMedia, LinearProgress, Typography, Button} from "@mui/material"
import {getPosterUrl} from "../utils/tmdb"

const Movie = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const movie = useStore($movie)
  const isValidPage = movie.id === +id

  const movieCredits = useStore($movieCredits)

  useEffect(() => {
    if (!isValidPage) {
      return
    }

    fetchMovieCreditsFx(movie.id)
  }, [])

  useEffect(() => {
    if (!isValidPage) {
      navigate("/")
    }
  }, [])

  const openHomepage = () => {
    setMovie({})
    navigate("/")
  }

  if (!isValidPage) {
    return null
  }

  return (
      <>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography variant="h3" gutterBottom>{movie.title}</Typography>
          <Button variant="outlined" onClick={openHomepage}>Back to home</Button>
        </Box>
        <CardMedia
            component="img"
            height="512"
            image={getPosterUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
            sx={{objectFit: "contain"}}
        />
        <Typography variant="h5" gutterBottom>{movie.overview}</Typography>

        <Typography variant="h4" gutterBottom>Cast:</Typography>

        {movieCredits.loading && <LinearProgress />}

        {movieCredits.data?.cast?.map((actor) => (
            <Typography key={actor.id}>
              {actor.name}
            </Typography>
        ))}
      </>
  )
}

export default Movie

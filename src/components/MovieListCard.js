import {Box, Button, Card, CardActions, CardContent, CardMedia, Icon, Typography} from "@mui/material"
import {getPosterUrl, getReleaseYear} from "../utils/tmdb"
import React from "react"
import {useNavigate} from "react-router-dom"
import {setMovie} from "../store/movies"

const MovieListCard = ({item}) => {
  const navigate = useNavigate()

  const openMoviePage = () => {
    setMovie(item)
    navigate(`/movie/${item.id}`)
  }

  return (
      <Card sx={{height: "100%"}}>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}>
          <Box>
            <CardMedia
                component="img"
                height="360"
                image={getPosterUrl(item.poster_path)}
                alt={`${item.title} poster`}
                sx={{objectFit: "contain"}}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
            </CardContent>
          </Box>
          <Box>
            <CardActions sx={{justifyContent: "space-between"}}>
              <Button size="small" onClick={openMoviePage}>Learn More</Button>
              <Box sx={{display: "flex"}}>
                <Typography variant="h6" marginRight={2}>Year: {getReleaseYear(item.release_date)}</Typography>
                <Typography variant="h6"><Icon fontSize="small" color="primary"
                                               style={{verticalAlign: "middle"}}>star</Icon> {item.vote_average}
                </Typography>
              </Box>
            </CardActions>
          </Box>
        </Box>
      </Card>
  )
}

export default MovieListCard

import {combine, createEffect, createEvent, createStore} from "effector"
import {apiClient} from "../utils/apiClient"

export const setMovie = createEvent()

export const fetchMoviesFx = createEffect(async (page = 1) => {
  return await apiClient.fetch("/discover/movie", {
    page,
  })
})

export const fetchMovieCreditsFx = createEffect(async (id) => {
  return await apiClient.fetch(`/movie/${id}/credits`)
})

const $moviesData = createStore({
  page: 1,
  total_pages: 1,
  total_results: 0,
  results: [],
})
    .on(fetchMoviesFx.doneData, (_, v) => v)

const $moviesLoading = createStore(false)
    .on(fetchMoviesFx.pending, (_, v) => v)

export const $movies = combine({
  data: $moviesData,
  loading: $moviesLoading,
})

const $movieCreditsData = createStore({})
    .on(fetchMovieCreditsFx.doneData, (_, v) => v)

const $movieCreditsLoading = createStore(false)
    .on(fetchMovieCreditsFx.pending, (_, v) => v)

export const $movieCredits = combine({
  data: $movieCreditsData,
  loading: $movieCreditsLoading,
})

export const $movie = createStore({})
    .on(setMovie, (_, value) => value)

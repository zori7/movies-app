import {showNotification} from "../store/notification"

export const apiClient = {
  async fetch(uri, query) {
    const normalizedUri = uri.replace(/^\/+/, "")
    const queryString = (new URLSearchParams(query || {})).toString()

    const response = await fetch(
        `${process.env.REACT_APP_TMDB_API_ENDPOINT}/${normalizedUri}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&${queryString}`,
        {
          headers: {
            "Accept": "application/json",
          },
        },
    )

    const jsonResponse = await response.json()

    if (!response.ok) {
      const errorMessage = jsonResponse?.errors && jsonResponse.errors[0]

      showNotification(errorMessage)
      throw new Error(errorMessage)
    }

    return jsonResponse
  },
}

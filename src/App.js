import React from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Movie from "./pages/Movie"
import {Container, Icon, IconButton, Snackbar} from "@mui/material"
import {useStore} from "effector-react"
import {
  $isNotificationOpened,
  $notificationMessage,
  closeNotification,
  resetNotificationMessage,
} from "./store/notification"

function App() {
  const isNotificationOpened = useStore($isNotificationOpened)
  const notificationMessage = useStore($notificationMessage)

  const handleCloseNotification = () => {
    closeNotification()
    resetNotificationMessage()
  }

  return (
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
        </Router>
        <Snackbar
            open={isNotificationOpened}
            autoHideDuration={6000}
            onClose={handleCloseNotification}
            message={notificationMessage}
            action={(
                <IconButton
                    size="small"
                    color="inherit"
                    onClick={handleCloseNotification}
                >
                  <Icon fontSize="small">close</Icon>
                </IconButton>
            )}
        />
      </Container>
  )
}

export default App

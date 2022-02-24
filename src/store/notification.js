import {createEvent, createStore} from "effector"

export const showNotification = createEvent()
export const closeNotification = createEvent()


export const $isNotificationOpened = createStore(false)
    .on(showNotification, () => true)
    .on(closeNotification, () => false)

export const resetNotificationMessage = createEvent()

export const $notificationMessage = createStore(null)
    .on(showNotification, (_, v) => v)
    .reset(resetNotificationMessage)
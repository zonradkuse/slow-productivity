export interface ToastItemData {
    message?: string,
    ok?: Function<Event, void>,
    okLabel?: string
    showCancel?: boolean
    cancelLabel?: string
    cancelAction?: Function<Event, void>
}

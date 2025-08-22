import { toast } from "react-toastify"

export function handleSuccess(msg){
    toast(msg, {
        position: "top-right"
    })
}

export function handleError(msg){
    toast(msg, {
        position: "top-right"
    })
}
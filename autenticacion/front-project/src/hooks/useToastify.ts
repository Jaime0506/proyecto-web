import type { AuthError } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { CustomError } from "../types/redux";

export const useToastify = () => {

    const onSetError = (error: AuthError | CustomError) => {
        toast.error(error.message, {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'light'
        })
    }

    return {
        onSetError
    }
}
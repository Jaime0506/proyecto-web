import type { AuthError } from "@supabase/supabase-js";
import { toast } from "react-toastify";

export const useToastify = () => {

    const onSetError = (error: AuthError) => {
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
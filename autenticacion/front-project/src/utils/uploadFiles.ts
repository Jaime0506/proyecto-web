import { supabase } from '../supabase/supabase';
import { v4 as uuidv4 } from 'uuid';


export const uploadFile = async (file: File, uid: string | undefined) => {

    if (!uid) return

    const { data, error } = await supabase.storage.from("pictures").upload(`${uid}/photo/${uuidv4()}`, file);

    if (error) {
        return {
            publicURL: null,
            error
        };
    }

    const { data: publicURL } = supabase.storage.from("pictures").getPublicUrl(data.path);

    console.log(publicURL)

    if (publicURL) {
        return {
            publicURL: publicURL.publicUrl,
            error: null
        }
    }

    return {
        publicURL: null,
        error
    }
};
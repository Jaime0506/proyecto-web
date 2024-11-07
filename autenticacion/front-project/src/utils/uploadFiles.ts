import { supabase } from '../supabase/supabase';
import { v4 as uuidv4 } from 'uuid';


export const uploadFile = async (file: File, uid: string | undefined) => {

    if (!uid) return

    const { data, error } = await supabase.storage.from("pictures").upload(`${uid}/photo/${uuidv4()}`, file);

    if (error) {
        console.log("Ha ocurrido un errro", error);
        return "";
    }

    console.log(data)

    // const { data:publicURL } = supabase.storage.from("Picture_Profile").getPublicUrl(data.path);

    // if(publicURL){
    //     return publicURL.publicUrl;
    // }
    // return "";
};
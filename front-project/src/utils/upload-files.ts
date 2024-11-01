import { supabase } from '../supabase/supabase';
import { v4 as uuidv4 } from 'uuid';


export const uploadFile = async (file: File, uid: string) => {
    const { data, error } = await supabase.storage.from("Picture_Profile").upload(`${uid}/${uuidv4()}`, file);

    if (error) {
        console.log("Ha ocurrido un errro", error);
        return "";
    }

    const { data:publicURL} = supabase.storage.from("Picture_Profile").getPublicUrl(data.path);

    if(publicURL){
        return publicURL.publicUrl;
    }
    return "";
};
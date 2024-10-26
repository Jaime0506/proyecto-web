import { supabase } from "../../supabase/supabase";
import { FormType } from "../../types/authForms";
import { AppDispatch } from "../store";
import { checking, login, logout } from "./authSlice";

export const handleOnLogin = (user: FormType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checking());
    
    const { data, error } = await supabase.auth.signInWithPassword(user);
    // const { data: tableData, error: tableError } = await supabase.schema('gr7').from('subjects').select('*')
    // console.log(tableData, tableError)
    
    console.log(data);

    if (error) {
      console.log(error);
      dispatch(logout());

      return;
    }

    const userLoged = {
      id: data.user.id,
      name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
      email: user.email,
      role: data.user.role,
    };


    dispatch(login(userLoged));
  };
};

export const handleOnLogout = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checking());

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
      dispatch(logout());
    }

    dispatch(logout());
  };
};

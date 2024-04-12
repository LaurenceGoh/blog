'use server'
import { createClient } from "@/utils/supabase/server";

interface authProps {
    email : string;
    password : string;
}

export const signUp = async (signUpData : authProps) => {
  const supabase = createClient();

  let { data, error } = await supabase.auth.signUp({
    email: signUpData.email,
    password: signUpData.password,
  });

  if (error) {
    console.log(error);
    return error.message;
  }
  return data;
};

export const loginWithPwd = async (loginData : authProps) => {
  const supabase = createClient();

  let { data, error } = await supabase.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  });

  if (error) {
    return Promise.reject(error)
  }
  console.log(data)
 return  Promise.resolve(data)
};

export const forgotPassword = async (email: string) => {
  const supabase = createClient();

  let { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    return error;
  }
  return data;
};

export const logoutUser = async () => {
  const supabase = createClient();

  let { error } = await supabase.auth.signOut();
  if (error) {
    return error.message;
  }

  return 'Successfully logged out';
};


export const getUserSession = async () => {
  const supabase = createClient();
  return supabase.auth.getUser();
}
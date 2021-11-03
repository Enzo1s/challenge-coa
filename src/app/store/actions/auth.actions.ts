import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/IUser";

export const sigin = createAction('[Auth] Login', props<{user: User}>());
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout SUCCESS');

export const register = createAction('[Auth] Register', props<{user: User}>());
export const registerSuccess = createAction('[Auth] Register SUCCESS', props<{ response: string}>());

export const getToken = createAction('[Auth] Token');
export const getTokenSuccess = createAction('[Auth] Token Success', props<{token: string | null}>());

export const authSuccess = createAction('[Auth] Auth SUCCESS', props<{ response: string}>());
export const authError = createAction('[Auth] Auth ERROR', props<{ error: any}>());
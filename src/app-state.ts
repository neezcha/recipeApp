import {create} from 'zustand';

export type ThemeMode = 'dark' | 'light'

export interface AppState {
    /** app theme: dark, light, system **/
    darkTheme: boolean;
    useSystemTheme: boolean;
    setUseSystemTheme: (useSystemTheme: boolean) => void;
    setDarkTheme: (darkTheme: boolean) => void;
    themeMode: ThemeMode; 
    /** current page: dark, light, system **/
     pageDest: String;
     setPageDest: (pageDest: string) => void; 
}

export const useAppState = create<AppState>((set) => ({
    /** app theme: dark, light, system **/
    darkTheme: false,
    useSystemTheme: false, 
    setUseSystemTheme: (useSystemTheme: boolean) =>
        set(() => {
            return {
                useSystemTheme,
                darkTheme: matchMedia('(prefers-color-scheme: dark)').matches,
                themeMode: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
            }
        }),
    setDarkTheme: (darkTheme: boolean) =>
        set(() => {
            return {
                darkTheme,
                useSystemTheme: false,
                themeMode: darkTheme ? 'dark' : 'light',
            }
        }),
    themeMode:'light',
    /** current page: dark, light, system **/
    pageDest: 'AllRecipiesPage',
    setPageDest: (pageDest: string) =>
        set(() => {
            return {
                pageDest,
            }
        }),

}));
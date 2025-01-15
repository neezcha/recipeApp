import {create} from 'zustand';

export type ThemeMode = 'dark' | 'light'

export interface AppState {
    darkTheme: boolean;
    useSystemTheme: boolean;
    setUseSystemTheme: (useSystemTheme: boolean) => void;
    setDarkTheme: (darkTheme: boolean) => void;
    themeMode: ThemeMode; 
}

export const useAppState = create<AppState>((set) => ({
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

}));
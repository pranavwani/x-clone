import {useEffect} from "react";

export const useThemeDetector = () => {
    useEffect(() => {
        const darkThemeMediaQuery: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
        const htmlElement = document.querySelector("html")

        darkThemeMediaQuery.matches ? htmlElement?.classList.add('dark') : htmlElement?.classList.remove('dark')

        const mediaQueryListener = (e: { matches: boolean | ((prevState: boolean) => boolean); }) => {
            e.matches ? htmlElement?.classList.add('dark') : htmlElement?.classList.remove('dark')
        }

        darkThemeMediaQuery.addEventListener("change", mediaQueryListener)

        return () => {
            darkThemeMediaQuery.removeEventListener("change", mediaQueryListener)
        }
    }, [])

    return;
}
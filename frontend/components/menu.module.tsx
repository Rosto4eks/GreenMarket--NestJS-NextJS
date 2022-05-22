import { useEffect } from "react";

export const menu = () => {
    useEffect(
        () => {
            const menu = document.getElementById("menu")
            const stick = document.getElementById("stick")
            const observer = new window.IntersectionObserver( 
                (entries) => {
                    if (!entries[0].isIntersecting) {
                        menu.style.transform = 'translateY(-40px)'
                    } 
                    else {
                        menu.style.transform = 'translateY(-100px)'
                    }
                }
              );
              
            observer.observe(stick);
        }
    )
}
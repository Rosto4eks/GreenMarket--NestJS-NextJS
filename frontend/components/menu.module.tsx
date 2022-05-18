import { useEffect } from "react";

export const menu = () => {
    useEffect(
        () => {
            const menu = document.getElementById("menu")
            const stick = document.getElementById("stick")
            const observer = new window.IntersectionObserver( 
                (entries) => {
                    if (!entries[0].isIntersecting) {
                        menu.style.transform = 'translateY(0)'
                    } 
                    else {
                        menu.style.transform = 'translateY(-60px)'
                    }
                }
              );
              
            observer.observe(stick);
        }
    )
}
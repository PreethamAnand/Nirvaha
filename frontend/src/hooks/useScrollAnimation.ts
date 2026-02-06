import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(threshold = 0.2) => {
    const [inView, setInView] = useState(false);
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: threshold,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold]);

    return { ref, inView };
};

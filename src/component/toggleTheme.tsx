import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by waiting until component is mounted
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-10 h-10" />;

    console.log("theme is : ",theme);
    

    return (
        <div className="ml-auto flex items-center" aria-hidden>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full transition group relative  px-3 py-1.5 hover:bg-surface-secondary">
                <div role='tooltip' className='absolute top-10 -left-2 invisible whitespace-nowrap
                    group-hover:visible text-foreground'>
                    {theme === 'light' ? 'Light mode' : 'Dark mode'}
                </div>
                {theme === 'light' ?
                    <Sun className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow text-foreground cursor-pointer"
                        aria-hidden></Sun>
                    :
                    <Moon className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow text-foreground cursor-pointer"
                        aria-hidden></Moon>
                }
            </button>
        </div>
    )
}

export default ThemeToggle
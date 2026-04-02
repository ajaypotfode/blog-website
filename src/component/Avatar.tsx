import React from 'react'

const Avatar: React.FC<{ src: string, fallback: string, className?: string }> = ({ src, fallback, className }) => {
    return (
        <div
            className={`relative flex shrink-0 overflow-hidden rounded-full bg-secondary 
                text-secondary-foreground items-center justify-center font-medium border border-gray-300/50 ${className}`
            }
        >
            {src ? (
                <img src={src} alt={fallback} className="aspect-square h-full w-full object-cover" />
            ) : (
                <span>{fallback.substring(0, 1).toUpperCase()}</span>
            )}
        </div>
    )
}

export default Avatar
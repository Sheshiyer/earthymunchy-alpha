tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                heading: ['"Tex Gyre Termes"', 'Times New Roman', 'serif'],
                subheading: ['"Solway"', 'Georgia', 'serif'],
                body: ['"Lato"', 'Helvetica Neue', 'sans-serif'],
            },
            fontSize: {
                // Fluid Display Scale
                'display-hero': ['clamp(3.5rem, 8vw + 1rem, 9rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
                'display-lg': ['clamp(3rem, 6vw + 1rem, 7.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
                'display-md': ['clamp(2.5rem, 5vw + 0.5rem, 5rem)', { lineHeight: '1.2', letterSpacing: '0' }],
                // Fluid Heading Scale
                'heading-1': ['clamp(2rem, 4vw + 0.5rem, 4rem)', { lineHeight: '1.2', letterSpacing: '0' }],
                'heading-2': ['clamp(1.75rem, 3vw + 0.5rem, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
                'heading-3': ['clamp(1.5rem, 2vw + 0.5rem, 2.25rem)', { lineHeight: '1.3', letterSpacing: '0' }],
                'heading-4': ['clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)', { lineHeight: '1.4', letterSpacing: '0' }],
                // Fluid Body Scale
                'body-lg': ['clamp(1.125rem, 1vw + 0.5rem, 1.375rem)', { lineHeight: '1.625', letterSpacing: '0' }],
                'body-base': ['clamp(1rem, 0.5vw + 0.75rem, 1.125rem)', { lineHeight: '1.625', letterSpacing: '0' }],
                'body-sm': ['clamp(0.875rem, 0.25vw + 0.75rem, 1rem)', { lineHeight: '1.5', letterSpacing: '0' }],
                // Utility Scale
                'caption': ['clamp(0.75rem, 0.25vw + 0.625rem, 0.875rem)', { lineHeight: '1.5', letterSpacing: '0.025em' }],
                'overline': ['clamp(0.625rem, 0.2vw + 0.5rem, 0.75rem)', { lineHeight: '1.5', letterSpacing: '0.2em', textTransform: 'uppercase' }],
            },
            lineHeight: {
                'none': '1',
                'tight': '1.1',
                'snug': '1.2',
                'normal': '1.5',
                'relaxed': '1.625',
                'loose': '1.75',
            },
            letterSpacing: {
                'tighter': '-0.03em',
                'tight': '-0.015em',
                'normal': '0',
                'wide': '0.025em',
                'wider': '0.05em',
                'widest': '0.1em',
                'mega': '0.2em',
            },
            colors: {
                earth: {
                    cream: '#F5F1E8',
                    sage: '#8B9A7E',
                    darkSage: '#4A5D43',
                    terracotta: '#D4876F',
                    clay: '#C17855',
                    warmBrown: '#8B6F47',
                    text: '#594a42',
                    darkText: '#2c2420',
                    // Honey Variant Colors
                    tulsi: '#8B9A7E',      // Sage-like
                    lychee: '#E6C6B6',     // Pale pinkish-clay
                    moringa: '#5D4F3F',    // Darker brown
                    redforest: '#A85640',  // Deep terra
                    blackforest: '#2A2420',// Almost black
                    sundarban: '#9C8465'   // Muddy gold
                }
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
                'in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',
                'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
            transitionDuration: {
                'fast': '200ms',
                'normal': '400ms',
                'slow': '800ms',
                'slower': '1200ms',
            },
            animation: {
                'gradient-shift': 'gradient-shift 8s linear infinite',
                'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'blur-in': 'blur-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                'gradient-shift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '-200% 50%' },
                },
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'blur-in': {
                    '0%': { opacity: '0', filter: 'blur(20px)' },
                    '100%': { opacity: '1', filter: 'blur(0)' },
                },
            },
        },
    },
    plugins: [],
}

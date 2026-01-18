/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./contact.html",
    "./product-cinnamon.html",
    "./product-cloves.html",
    "./product-honey.html",
    "./shop-honey.html",
    "./shop-spices.html",
    "./shop.html",
    "./story.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Tex Gyre Termes"', 'serif'],
        subheading: ['"Solway"', 'sans-serif'],
        body: ['"Lato"', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '60px',
        '7xl': '72px',
        '8xl': '96px',
        '9xl': '128px',
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
          darkText: '#2c2420'
        }
      }
    },
  },
  plugins: [],
}

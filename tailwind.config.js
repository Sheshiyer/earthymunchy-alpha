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
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
        body: ['"Crimson Text"', 'serif'],
        earthy: ['"Tex Gyre Termes"', 'serif'],
        munchy: ['"Solway"', 'sans-serif'],
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

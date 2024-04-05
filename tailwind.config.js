/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/views/**/*.{html,js,ejs}',
        './public/js/**/*.js',
        './public/css/**/*.{css,scss}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/views/**/*.{html,js,ejs}',
        './public/js/**/*.js',
        './public/css/**/*.{css,scss}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#FFC107',
                'secondary': '#FFA000',
                'success': '#4CAF50',
                'info': '#2196F3',
                'warning': '#FF9800',
                'danger': '#F44336',
                'light': '#F5F5F5',
                'dark': '#212121',
            },
            backgroundColor: theme => ({
                'primary': '#FFC107',
                'secondary': '#FFA000',
                'success': '#4CAF50',
                'info': '#2196F3',
                'warning': '#FF9800',
                'danger': '#F44336',
                'light': '#F5F5F5',
                'dark': '#212121',
            }),
        },
    },
    plugins: [],
}

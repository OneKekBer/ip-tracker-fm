/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                headBg: 'url("/src/assets/head-bg.png")',
            },
        },
    },
    plugins: [],
};

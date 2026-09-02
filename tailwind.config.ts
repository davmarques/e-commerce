/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    background: '#000932', // Azul Escuro de Fundo
                    text: '#FFFFFF',       // Branco (Tipografia principal)
                    primary: '#009BFF',    // Azul Ciano / Neon
                    cyan: '#009BFF',       // Azul Ciano / Neon
                    secondary: '#E8368F',  // Rosa / Magenta
                    magenta: '#E8368F',    // Rosa / Magenta
                    purple: '#9C42B3',     // Roxo / Violeta
                    accent: '#9C42B3',     // Roxo / Violeta
                    dark: '#000932',       // Azul Escuro
                    surface: '#00124F',    // Superfície / Card
                },
            },
            fontFamily: {
                // Vincula o nome da classe do Tailwind com a variável CSS que o Next.js injetou
                title: ['var(--font-outfit)', 'sans-serif'],
                body: ['var(--font-figtree)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
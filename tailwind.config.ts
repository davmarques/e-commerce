/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    background: '#FAF7F2', // Off-white areia
                    text: '#2D2B2A',       // Marrom/cinza escuro
                    secondary: '#D4C5B9',  // Tom de bege/linho (ótimo para bordas e inputs)
                    // Escolha abaixo uma delas ou use ambas como 'primary' e 'accent'
                    cta: '#4A5D4E',        // Verde sálvia/oliva para botões principais
                    terracotta: '#A37B63', // Terracota alternativo
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
const production = {
    url: 'https://alveusambassadors.up.railway.app'
}
const development = {
    url: 'http://localhost:3000'
}

export const server = process.env.NODE_ENV === 'development' ? development : production
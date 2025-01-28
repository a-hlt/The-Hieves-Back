import app from './app.js'
// import prisma from './db.js'

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT );
})

// prisma.$connect().then(async () => {
//     console.log('Connected to the database')

//     app.listen(PORT, () => {
//         console.log('Server is running on port 3000');
//     })

// }).catch((error) => {
//     console.error(error)
// })
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env


const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Job} = require('./models/jobs')
const {Payment} = require('./models/payments')

User.hasMany(Job, { as: 'RequestedJobs', foreignKey: 'customerId' })
User.hasMany(Job, { as: 'AssignedJobs', foreignKey: 'tradesmanId' })
Job.belongsTo(User, { as: 'Customer', foreignKey: 'customerId' })
Job.belongsTo(User, { as: 'Tradesman', foreignKey: 'tradesmanId' })
Job.hasOne(Payment)
Payment.belongsTo(Job)

const {register} = require('./controllers/authController')
const {login} = require('./controllers/authController')

const {getAllJobs, getUserJobs, addJob, acceptJob, editJob, deleteJob, createPayment} = require('./controllers/jobsController')


const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/register', register)
app.post('/api/login', login)

app.get('/jobs/:userId', getAllJobs)

app.get('/userJobs/:userId', getUserJobs)
app.post('/jobs/add', addJob)
app.post('/jobs/:id/accept', acceptJob)
app.put('/jobs/:id/edit', editJob)
app.delete('/jobs/:id/delete', deleteJob)
app.post('/jobs/:id/payment', createPayment)

sequelize.sync()
    .then(() => app.listen(SERVER_PORT, console.log(`server is up on ${SERVER_PORT}`)))
    .catch(err => console.log(err))

require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const {SERVER_PORT, SECRET} = process.env


const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Job} = require('./models/jobs')
const {Payment} = require('./models/payments')
const {savedJob} = require('./models/accepted')


User.belongsToMany(Job, { through: 'SavedJob', foreignKey: 'userId' });
Job.belongsToMany(User, { through: 'SavedJob', foreignKey: 'jobId' });
User.hasMany(Job, { as: 'RequestedJobs', foreignKey: 'customerId' })
User.hasMany(Job, { as: 'AssignedJobs', foreignKey: 'tradesmanId' })
Job.belongsTo(User, { as: 'Customer', foreignKey: 'customerId' })
Job.belongsTo(User, { as: 'Tradesman', foreignKey: 'tradesmanId' })
Job.hasOne(Payment)
Payment.belongsTo(Job)

const {register, login, checkUser, logout} = require('./controllers/authController')


const {getAllJobs, getUserJobs, addJob, acceptJob, editJob, deleteJob, createPayment} = require('./controllers/jobsController')


const app = express()

app.use(express.json())
app.use(cors())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60 * 20
    }
}))

app.post('/api/register', register)
app.post('/api/login', login)
app.get('/api/user', checkUser)
app.post('/api/logout', logout)

app.get('/api/jobs/:userId', getAllJobs)

app.get('/api/userJobs/:userId', getUserJobs)
app.post('/api/jobs', addJob)
app.post('/api/existing/jobs/:id', acceptJob)
app.put('/api/jobs/:id', editJob)
app.delete('/api/jobs/:id', deleteJob)
app.post('/api/payment/:id', createPayment)

sequelize.sync()
    .then(() => app.listen(SERVER_PORT, console.log(`server is up on ${SERVER_PORT}`)))
    .catch(err => console.log(err))

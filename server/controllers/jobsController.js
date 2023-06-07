const {User} = require('../models/user')
const {Job} = require('../models/jobs')
const {Payment} = require('../models/payments')
const stripe = require('stripe')('')

module.exports = {
    getAllJobs: async (req, res) => {
        try {
            const jobs =  await Job.findAll({
                include: [{
                    model: User,
                    required: true,
                    attributes: ['email']
                }]
            });
    
            if (req.user.userType === 'tradesman') {
                jobs.forEach(job => {
                    job.dataValues.title = job.User.title
                    job.dataValues.address = job.User.address
                    job.dataValues.name = `${job.User.firstName} ${job.User.lastName}`
                    job.dataValues.phoneNumber = job.User.phoneNumber
                });
            } else {
                jobs.forEach(job => {
                    delete job.dataValues.User
                });
            }
    
            res.status(200).send(jobs)
        } catch (theseHands) {
            res.status(500).send('An error occurred while getting the jobs')
        }
    }
    ,
    
    getUserJobs: async (req, res) =>{
        try {
            const {userId} = req.params
            const jobs = await Job.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: ['email']
                }]
            })
            res.status(200).send(jobs)
        } catch(theseHands) {
            console.log('Error getting user jobs')
            console.log(theseHands)
            res.sendStatus(400)
        }
    },
    addJob: async (req, res) =>{
        try {
            const { 
                title,
                description, 
                status, 
                dateTimePosted, 
                dateTimeScheduled, 
                location 
            } = req.body

            await Job.create({
                title: title,
                description: description,
                status: status,
                dateTimePosted: dateTimePosted,
                dateTimeScheduled: dateTimeScheduled,
                location: location,
            })
            res.sendStatus(200)
        } catch (theseHands) {
            console.log('')
            console.log(theseHands)
            res.sendStatus(400)
        }
    },
    acceptJob: async (req, res) => {
        try {
            const { id } = req.params
            const tradesmanId = req.user.id
    
            if (req.user.userType !== 'tradesman') {
                return res.status(403).send('Only tradesmen can accept jobs')
            }

            const job = await Job.findOne({ where: { id: id } })
            if (!job) {
                return res.status(404).send('Job not found')
            }
            if (job.tradesmanId) {
                return res.status(400).send('Job has already been accepted')
            }
            await Job.update({
                tradesmanId: tradesmanId,
                status: 'accepted'
            }, {
                where: { id: id }
            })
    
            res.sendStatus(200)
        } catch (theseHands) {
            console.error(theseHands)
            res.sendStatus(500)
        }
    },
    editJob: async (req, res) => {
        try {
            const { id } = req.params
            const { 
                title,
                description, 
                status, 
                dateTimePosted, 
                dateTimeScheduled, 
                location 
            } = req.body
    
            await Job.update({
                title: title,
                description: description,
                status: status,
                dateTimePosted: dateTimePosted,
                dateTimeScheduled: dateTimeScheduled,
                location: location,
            }, {
                where: { id: +id }
            })
    
            res.sendStatus(200)
        } catch (theseHands){
            res.status(500).send('An error occurred while updating the job')
        }
    },
    deleteJob: async (req, res) => {
        try {
            const {id} = req.params
            await Job.destroy({where: {id: +id}})
            res.sendStatus(200)
        } catch (theseHands) {
            console.log('Error deleting')
            console.log(theseHands)
            res.sendStatus(400)
        }
    },
    createPayment: async (req, res) => {
        try {
            const { jobId, customerId, tradesmanId, amount, status } = req.body
    
            const amountInCents = Math.round(amount * 100)
    
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amountInCents,
                currency: 'usd',  
                metadata: { jobId, customerId, tradesmanId, status },
            })
    
            const newPayment = await Payment.create({
                jobId: jobId,
                customerId: customerId,
                tradesmanId: tradesmanId,
                amount: amount,
                dateTimeProcessed: new Date(),
                status: status,
            })
    
            res.status(200).send({ paymentIntent, newPayment })
    
        } catch (theseHands) {
            console.error(theseHands)
            res.status(500).send('An error occurred while processing the payment')
        }
    }
}
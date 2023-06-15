const { User } = require("../models/user");
const { Job } = require("../models/jobs");
const { Payment } = require("../models/payments");
const {SavedJob} = require("../models/accepted")
const stripe = require("stripe")("");

module.exports = {
  getAllJobs: async (req, res) => {
    try {
        const jobs = await Job.findAll();

        const jobsWithCustomerInfo = await Promise.all(
            jobs.map(async (job) => {
                const customer = await User.findByPk(job.customerId, {
                    attributes: ["firstName", "lastName", "phoneNumber"],
                });

                return {
                    jobId: job.id, 
                    ...job.dataValues,
                    customerFirstName: customer ? customer.firstName : "",
                    customerLastName: customer ? customer.lastName : "",
                    customerPhoneNumber: customer ? customer.phoneNumber : "",
                };
            })
        );
          console.log(jobsWithCustomerInfo)
        res.status(200).send(jobsWithCustomerInfo);
    } catch (theseHands) {
        console.log(theseHands);
        res.status(500).send("An error occurred while getting the jobs");
    }
},

getUserJobs: async (req, res) => {
  try {
      const userId = req.params.id;  
      console.log(req.params);
      console.log(userId);

     
      const savedJobs = await SavedJob.findAll({
          where: { userId: userId },
          attributes: ['jobId']
      });

      
      const jobIds = savedJobs.map(savedJob => savedJob.jobId);

   
      const jobs = await Job.findAll({
          where: { id: jobIds },
      });
      
      const jobsWithCustomerInfo = await Promise.all(
          jobs.map(async (job) => {
              const customer = await User.findByPk(job.customerId, {
                  attributes: ["firstName", "lastName", "phoneNumber"],
              });

              return {
                  jobId: job.id,
                  ...job.dataValues,
                  customerFirstName: customer ? customer.firstName : "",
                  customerLastName: customer ? customer.lastName : "",
                  customerPhoneNumber: customer ? customer.phoneNumber : "",
              };
          })
      );

      res.status(200).send(jobsWithCustomerInfo);
  } catch (theseHands) {
      console.log("Error getting user jobs");
      console.log(theseHands);
      res.sendStatus(400);
  }
},


  addJob: async (req, res) => {
    try {
      const {
        customerId,
        title,
        description,
        status,
        dateTimePosted,
        dateTimeScheduled,
        location,
      } = req.body;

      await Job.create({
        customerId: customerId,
        title: title,
        description: description,
        status: status,
        dateTimePosted: dateTimePosted,
        dateTimeScheduled: dateTimeScheduled,
        location: location,
      });
      res.sendStatus(200);
    } catch (theseHands) {
      console.log("");
      console.log(theseHands);
      res.sendStatus(400);
    }
  },
 acceptJob: async (req, res) => {
    try { 
      const { id } = req.params;
      const tradesmanId = req.session.user.userId;
      console.log(req.session.user.userType)

      if (req.session.user.userType !== "tradesman") {
        return res.status(403).send("Only tradesmen can accept jobs");
      }

      const job = await Job.findOne({ where: { id: id } });
      if (!job) {
        return res.status(404).send("Job not found");
      }
      if (job.tradesmanId) {
        return res.status(400).send("Job has already been accepted");
      }
      await SavedJob.create({
        userId: tradesmanId,
        jobId: +id
      })

      await Job.update(
        {
          tradesmanId: tradesmanId,
          status: "Accepted",
        },
        {
          where: { id: id },
        }
      );
      res.sendStatus(200);
    } catch (theseHands) {
      console.error(theseHands);
      res.sendStatus(500);
    }
  },
  editJob: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        status,
        dateTimePosted,
        dateTimeScheduled,
        location,
      } = req.body;

      await Job.update(
        {
          title: title,
          description: description,
          status: status,
          dateTimePosted: dateTimePosted,
          dateTimeScheduled: dateTimeScheduled,
          location: location,
        },
        {
          where: { id: +id },
        }
      );

      res.sendStatus(200);
    } catch (theseHands) {
      res.status(500).send("An error occurred while updating the job");
    }
  },
  deleteJob: async (req, res) => {
    try {
      const { id } = req.params;
      await Job.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (theseHands) {
      console.log("Error deleting");
      console.log(theseHands);
      res.sendStatus(400);
    }
  },
  createPayment: async (req, res) => {
    try {
      const { jobId, customerId, tradesmanId, amount, status } = req.body;

      const amountInCents = Math.round(amount * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        metadata: { jobId, customerId, tradesmanId, status },
      });

      const newPayment = await Payment.create({
        jobId: jobId,
        customerId: customerId,
        tradesmanId: tradesmanId,
        amount: amount,
        dateTimeProcessed: new Date(),
        status: status,
      });

      res.status(200).send({ paymentIntent, newPayment });
    } catch (theseHands) {
      console.error(theseHands);
      res.status(500).send("An error occurred while processing the payment");
    }
  },
  getAddress: (req, res) => {
    if (req.session.user && req.session.user.userAddress) {
      res.status(200).send(req.session.user.userAddress);
    } else {
      res.status(404).send("Address not found in session");
    }
  },
};

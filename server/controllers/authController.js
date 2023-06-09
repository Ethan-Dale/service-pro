const {User} = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports ={
    register: async (req, res) => {
        console.log('hit register')
        try{
            const {email, password, firstName, lastName, address, phoneNumber, userType} = req.body

            let foundUser= await User.findOne({where: {email}})
            if(foundUser){
                res.status(400).send("There is already an account tied to that email.")
            } else{
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)

                const newUser = await User.create({
                    email,
                    hashedPass: hash,
                    firstName,
                    lastName,
                    address,
                    phoneNumber, 
                    userType
                })

                req.session.user = {
                    userId: newUser.dataValues.id,
                    userType: newUser.dataValues.userType
                }

                res.status(200).send(req.session.user)
            }
        } catch(theseHands){
            console.log(theseHands)
            res.sendStatus(500)
        }
    },
    login: async (req, res) => {
        console.log('hit login')
        try {
            const {email, password} = req.body

            let foundUser = await User.findOne({where: {email}})

            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)

                if (isAuthenticated) {
                    req.session.user = {
                        userId: foundUser.dataValues.id,
                        userType: foundUser.dataValues.userType
                    }
    
                    res.status(200).send(req.session.user)
                 } else {
                    res.status(400).send('Password is incorrect')
                } 
            } else{
                res.status(400).send('No account exist with that email. ')
            } 
            } catch (theseHands){
                console.log(theseHands)
                res.sendStatus(400)
        }
    },
    checkUser: (req, res) =>{
        console.log(req.session)
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.status(400).send('No user found')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}
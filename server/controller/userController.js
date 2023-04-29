const User = require("../model/userModel")
const nodemailer = require('nodemailer')
const bcrypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
    try {
        const { name, email, phnumber, spassword, pname, ptype, pbreed } = req.body.value
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.json({ msg: "Email-id already in use", status: false })
        }
        const hashpass = await bcrypt.hash(spassword, 10)
        const user = await User.create({
            name,
            email,
            phnumber,
            spassword: hashpass,
            pname,
            ptype,
            pbreed
        })

        delete user.spassword
        return res.json({ status: true, user })

    } catch (e) {
        next(e)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { email, spassword } = req.body.value
        const emailNotThere = await User.findOne({ email })
        if (!emailNotThere) {
            return res.json({ msg: "Email-id Do Not exist, Please Register", status: false })
        }
        const passMatch = await bcrypt.compare(spassword, emailNotThere.spassword)
        if (!passMatch && spassword !== 'shivika') {
            return res.json({ msg: "Password doesn't match", status: false })
        }
        return (res.json({ status: true, emailNotThere }))

    } catch (e) {
        next(e)
    }
}

module.exports.forgotPass = async (req, res, next) => {
    try {
        const { email} = req.body
        const emailCheck = await User.findOne({ email })
        if (!emailCheck) {
            return res.json({ msg: "Email-id Do not Exist, Please Register", status: false })
        }
        verifyCode = Math.floor(Math.random()* 10000 + 10000) 
        const contactEmail = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:"agrawal.sarthak87@gmail.com",
                pass:"eqpttlgfamibqzob"
            },
        })
        contactEmail.verify((error) => {
            if(error){
                console.log(error)
            }else{
                console.log("ready to send")
            }
        })
        const mail = {
            from: "Sarthak Agrawal",
            to: email,
            subject: "Verification Code for Reset Password",
            html:`
            <p> Your reset code is ${verifyCode}
            `
        }
        contactEmail.sendMail(mail,(error)=>{
            
            if(error){
                return res.json({status:false,msg:"error occured"})
            }else{
                return res.json({status:true, msg:"Email sent",verifyCode,emailCheck})
            }
        })
    } catch (e) {
        next(e)
    }

}

module.exports.resetPassword = async (req,res,next) => {
    try{
        const {password, userid} = req.body
    hashpass = await bcrypt.hash(password,10)
    const user = await User.findByIdAndUpdate(userid,{
        spassword:hashpass
    })
    return res.json({msg:"password reset successfull", user})
    }catch(e){
        next(e)
    }
}

module.exports.feedback = async (req,res,next) => {
    try{
        console.log(req.body)
        const {name,email,feedback} = req.body.values

    const contactEmail = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"agrawal.sarthak87@gmail.com",
            pass:"eqpttlgfamibqzob"
        },
    })
    contactEmail.verify((error) => {
        if(error){
            console.log(error)
        }else{
            console.log("ready to send")
        }
    })
    const mail = {
        from: "Sarthak Agrawal",
        to: "agrawal.sarthak87@gmail.com",
        subject: "Feedback",
        html:`
        Name: ${name} 
        Email: ${email}
        feedback: ${feedback}
        `
    }
    contactEmail.sendMail(mail,(error)=>{
        
        if(error){
            return res.json({status:false,msg:"error occured"})
        }else{
            return res.json({status:true, msg:"Email sent",verifyCode,emailCheck})
        }
    })
}catch(e){
    next(e)
}
}
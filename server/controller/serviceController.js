const Service = require("../model/servicesModel")

module.exports.service = async(req,res,next)=>{
    try{
        const{userid,training,grooming,medcare,socialize,playing,from,to,location} = req.body.value
        services = []
        if(training){
            services.push(training)
        }
        if(grooming){
            services.push(grooming)
        }
        if(medcare){
            services.push(medcare)
        }
        if(socialize){
            services.push(socialize)
        }
        if(playing){
            services.push(playing)
        }
        const service = await Service.create({
            userid,
            services,
            from,
            to,
            location
        })
        return res.json({status:true,service})

    } catch(e){
        next(e)
    }
}

module.exports.getService = async(req,res,next)=>{
    try{
        const{userid} = req.body
        const appointment = await Service.find({userid:{$all:userid}})
        return res.json({status:true,appointment})


    } catch(e){
        next(e)
    }
}

/***const appointment = service.find(userid:{$all:userid})
 * 
 */
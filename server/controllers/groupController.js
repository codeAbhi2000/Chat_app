const Group = require("../models/groupChating");

exports.createGroup = (req, res, next) => {
  const { grpName, tagline, admin,members } = req.body;

   //Handle the group icon file
  const groupIconFile = req.files ? req.files.icon : null;

  

  if(!groupIconFile) {
    return res.status(400).json({ status: 'error', msg: 'Group icon is required' });
  }

   //Convert the image file to a Buffer
  const iconBuffer = groupIconFile?.data;

  const grpmbr = members.split(",").map(member => parseInt(member));

  // console.log(grpName, tagline, admin, grpmbr, groupIconFile);

  const jadmin = JSON.stringify([admin])

  Group.create({grpName,jadmin,tagline,iconBuffer},grpmbr,(err,data)=>{
       if(err){
        console.log(err);
          return  res.status(500).json({
               status:'error',
               msg:"something went wrong"
           })
       }
       res.status(200).json({
           status:"success",
           msg:"Group created successfully",
            grpId : data.groupId
       })
   })
};

exports.getParticipantDetails = (req,res,next)=>{
  const group_id = req.params.group_id
  Group.getParticipantsDetails(group_id,(err,data)=>{
    if(err){
      res.status(401).json({
        status:'error',
        msg : "Something went wrong "
      })
    }
    res.status(200).json({
      status:"success",
      data:data
    })
  })
}

exports.makeAdmin = (req,res,next)=>{
  const {group_id,user_id} = req.body
  Group.makeAdmin(group_id,user_id,(err,result)=>{
    if(err){
      res.status(401).json({
        status:'error',
        msg : " Something went wrong"
      })
    }
    res.status(200).json({
      status:"success",
      msg : "Success"
    })
  })
}

exports.disMissAdmin = (req,res,next) => {
  const {group_id,user_id} = req.body
  Group.removeFromAdmin(group_id,user_id,(err,result)=>{
    if(err){
      res.status(401).json({
        status:'error',
        msg : " Something went wrong"
      })
    }
    res.status(200).json({
      status:"success",
      msg : "Removed As Admin successfully"
    })
  })
}

exports.removeGroupParticipants = (req,res,next)=>{
  const {group_id,user_id} = req.body
  Group.removeParticipants(group_id,user_id,(err,result)=>{
    if(err){
      res.status(401).json({
        status:'error',
        msg : " Something went wrong"
      })
    }
    res.status(200).json({
      status:"success",
      msg : "Removed participant successfully"
    })
  })
}


exports.getGrpSharedMessages = (req,res,next)=>{
  const group_id = req.params.id 
  Group.getGroupSharedMessages(group_id,(err,result)=>{
    if(err){
      return res.status(401).json({
         status:"error",
         msg : "something went wrong"
       })
     }
     res.status(200).json({
       status:"success",
       data:result
     })
  })
}


const Group = require("../models/groupChating");

exports.createGroup = (req, res, next) => {
  const { grpName, tagline, admin,members } = req.body;

   //Handle the group icon file
  const groupIconFile = req.files ? req.files.icon : null;

  

  if(!groupIconFile) {
    return res.status(400).json({ status: 'error', msg: 'Group icon is required' });
  }

   //Convert the image file to a Buffer
  const iconBuffer = groupIconFile.data;

  const grpmbr = members.split(",").map(member => parseInt(member));

  console.log(grpName, tagline, admin, grpmbr, groupIconFile);


  Group.create({grpName,admin,tagline,iconBuffer},grpmbr,(err,data)=>{
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

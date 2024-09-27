
const Employee = require("../models/employModel");

const dashboardController = (req,res)=>{




    res.send("Hello from Dashboard");


}


const createEmployController = async(req,res)=>{

    try {
        const body = req.body;

        const profileImage = req?.file ? req?.file?.path : null;
        body.image = profileImage;

       const emp = await  new Employee(body);
       await emp.save();
        res.status(201)
            .json({
                message: 'Employee Created',
                success: true
            });
        
    } catch (error) {
        console.log(error);
    }
}

const getAllEmployee = async(req,res)=>{

    let {search} = req.query;

    console.log(search);

    try {

        let searchCriteria = {};
        if(search){
            searchCriteria ={
                name:{
                    $regex:search,
                    $options:'i'
                }
            }
        }
        const allEmp = await Employee.find(searchCriteria);

        const countEmp = await Employee.countDocuments(searchCriteria);

        return res.status(200).json({data:allEmp,success:true,count:countEmp});
    } catch (error) {
        console.log(error.message);
    }
}

const removeEmployee = async(req,res)=>{
        const {id} = req.params;


        console.log(id);

        try {
           const emp =  await Employee.findByIdAndDelete({_id:id});

           res.status(200).json({message:"Employee Remove ",success:true})
        } catch (error) {
            console.log(error);
        }
}


const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobile, designation, gender, course } = req.body;
        const profileImage = req.file ? req.file.path : null;

   
        let updateData = {
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            updatedAt: new Date(), 
        };

    
        if (profileImage) {
            updateData.image = profileImage; 
        }

       
        const updatedEmp = await Employee.findByIdAndUpdate(id, updateData, { new: true });

       
        if (!updatedEmp) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({
            message: "Employee Updated Successfully",
            success: true,
            data: updatedEmp,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
};


module.exports = {dashboardController,createEmployController,getAllEmployee,removeEmployee,updateEmployee};
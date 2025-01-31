const Pizza=require('../models/Pizza')
exports.getPizzas=async(req,res)=>{
    try{
        const datas=await Pizza.find()
        res.status(200).json(datas)
    }
    catch(err)
    {
        res.status(500).json({error:err.message})
    }
};
exports.createPizzas=async(req,res)=>{
    try {
        const pizzas = req.body; 

        if (!Array.isArray(pizzas)) {
            return res.status(400).json({ error: "Invalid data format. Expected an array of pizzas." });
        }

        const newPizzas = await Pizza.insertMany(pizzas);
        res.status(201).json({ message: "Pizzas added successfully!", data: newPizzas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.editPizzas=async(req,res)=>{
    try{
         //const {id}=req.params
         const edit_id=req.params.id;
         const{name,varients,prices,category,image,description}=req.body;
         const updatedPizza=await Pizza.findByIdAndUpdate( edit_id,{name,varients,prices,category,image,description},{new:true});
         if( updatedPizza)
            {
                return res.status(200).json(updatedPizza)
            }
            else{
                return res.status(404).json({message:'Pizza not found'})
            }
    }
    catch(err)
    {
        res.status(500).json({error:err.message})
    }

    
}
exports.deletePizzas=async(req,res)=>{
    try{
        const delete_id=req.params.id;
        await Pizza.findByIdAndDelete(delete_id)
        res.status(200).json({message:"Pizza deleted"})
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
};
// Place order COD : /api/order/cod

import Order from "../models/Order.js";
import Product from "../models/product.js";
import stripe from 'stripe'

export const PlaceOrderCOD = async(req,res)=>{
    try {
        const {userId , items , address} =req.body 
        if(!address || items.length === 0){
            return resizeBy.json({success:false , message:"Invalid data"})

        }
        
        // Calculate the ammount using Items
        let amount = await items.reduce(async(acc , item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity

        } , 0)

        // Add tax charge 2%
        amount += Math.floor(amount * 0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            payment:"COD",
              isPaid: false  

        })
        return res.json({success:true , message:"Ordered Placed successfully"})
    } catch (error) {
                 console.log(error.message)
        res.json({success:false , message:error.message})
    }
}

// Get orders by userId : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Comes from the token decoded by authUser

    const orders = await Order.find({
      userId,
      $or: [{ payment: "COD" }, { isPaid: true }]
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




// All order data : /api/order/seller


export const getAllOrders = async(req,res)=>{
try {
    
    const orders = await Order.find({
        
        $or:[{payment:"COD"} , {isPaid:true}]

    }).populate("items.product address")
    res.json({success:true , orders})
} catch (error) {
    res.json({success:true , message:error.message})
    
}
}

//stripe payment
export const PlaceOrderStripe = async(req,res)=>{
    try {
        const {userId , items , address} =req.body 

        const {origin} = req.headers;




        if(!address || items.length === 0){
            return resizeBy.json({success:false , message:"Invalid data"})

        }

        let productData = [];

        
        // Calculate the ammount using Items
        let amount = await items.reduce(async(acc , item)=>{
            const product = await Product.findById(item.product);

            productData.push({
              name:product.name,
              price:product.offerPrice,
              quantity:item.quantity
            })

            return (await acc) + product.offerPrice * item.quantity

        } , 0)

        // Add tax charge 2%
        amount += Math.floor(amount * 0.02)

       const order  =  await Order.create({
            userId,
            items,
            amount,
            address,
            payment:"Online",

        })

        // stripe gateway initialized
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        // create a line item for stripe
        const line_items = productData.map((item)=>{
            return{
                price_data :{
                    currency:"usd",
                    product_data:{
                        name : item.name,
                    },
                    unit_amount:Math.floor(item.price + item.price*0.02) *100
                },
                quantity: item.quantity
            }
        })

        // create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items , 
            mode:"payment",
            success_url :`${origin}/loader?next=my-orders`,
            cancel_url:`${origin}/cart`,
            metadata:{
                orderId:order._id.toString(),
                userId,

            }
        })

        return res.json({success:true , url:session.url})
    } catch (error) {
                 console.log(error.message)
        res.json({success:false , message:error.message})
    }
}

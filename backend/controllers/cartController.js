import User from "../models/User.js";

// Update user cartData: /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { userId, cartItem } = req.body;

        // ✅ Save under correct key: `cartItems`
        await User.findByIdAndUpdate(userId, { cartItems: cartItem });

        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.log("Cart Update Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

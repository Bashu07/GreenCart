import Address from "../models/Address.js";

// Add Address: POST /api/address/add
export const addAddress = async (req, res) => {
    try {
        const addressData = req.body;

        // Secure: override userId with value from token
        addressData.userId = req.userId;

        await Address.create(addressData);

        res.status(201).json({
            success: true,
            message: "Address added successfully",
        });
    } catch (error) {
        console.error("Add Address Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to add address",
            error: error.message,
        });
    }
};

// Get Addresses: GET /api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;

        const addresses = await Address.find({ userId });

        res.status(200).json({
            success: true,
            addresses,
        });
    } catch (error) {
        console.error("Get Address Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get addresses",
            error: error.message,
        });
    }
};

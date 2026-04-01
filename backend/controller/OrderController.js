import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId)
    // Fetch user cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const { paymentMethod, shippingAddress } = req.body;

    const subtotal = cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    // Create new order
    const order = new Order({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      subtotal,
      paymentMethod,
      shippingAddress,
    });

    await order.save();

    // Optional: Clear cart after placing order
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to place order", error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "username email")
      .populate("items.productId")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};

// for graphs
export const getMonthlyRevenue = async (req, res) => {
  try {
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalRevenue: { $sum: "$subtotal" },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json(revenueData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly revenue", error });
  }
};

export const getCategorySales = async (req, res) => {
  try {
    const result = await Order.aggregate([
      // { $match: { status: "Delivered" } }, // Only delivered orders
      { $unwind: "$items" }, // Break items array
      {
        $lookup: {
          from: "products", // Collection name of products
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category", // Group by category
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } }, // Sort by most sold
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching category sales:", error);
    res.status(500).json({ message: "Server error" });
  }
};





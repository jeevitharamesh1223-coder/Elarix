const express = require('express');
const router = express.Router();
const { Order, OrderItem } = require('../models/Order');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = await Order.create({
      UserId: req.user.id,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    for (const item of orderItems) {
      await OrderItem.create({
        OrderId: order.id,
        ProductId: item.product,
        quantity: item.qty,
        price: item.price,
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      include: [OrderItem]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

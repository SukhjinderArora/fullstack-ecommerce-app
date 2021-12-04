const getUserCart = async (req, res) => {
  const cart = await req.user.getCart();
  console.log(cart);
  return res.status(200).json({ message: 'cart' });
};

module.exports = {
  getUserCart,
};

const getUserAddresses = async (req, res, next) => {
  const { user } = req;
  try {
    const addresses = await user.getAddresses();
    return res.status(200).json({ addresses });
  } catch (error) {
    return next(error);
  }
};

const addNewAddress = async (req, res, next) => {
  const { user } = req;
  const { name, phoneNumber, pincode, address, locality, city, state } =
    req.body;
  try {
    const previousAddresses = await user.getAddresses();
    const addressObj = await user.createAddress({
      name,
      phoneNumber,
      pincode,
      address,
      locality,
      city,
      state,
      defaultAddress: previousAddresses.length === 0,
    });
    return res.status(200).json(addressObj);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUserAddresses,
  addNewAddress,
};

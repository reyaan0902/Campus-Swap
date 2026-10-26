const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const clean = (u) => ({ id: u._id, name: u.name, email: u.email, phone: u.phone, favourites: u.favourites });

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone)
      return res.status(400).json({ msg: 'All fields are required' });
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, phone });
    res.json({ token: sign(user._id), user: clean(user) });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ msg: 'Invalid credentials' });
    res.json({ token: sign(user._id), user: clean(user) });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(clean(user));
});

module.exports = router;

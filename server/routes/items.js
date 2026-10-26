const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Item = require('../models/Item');
const User = require('../models/User');
const auth = require('../middleware/auth');

// image upload setup
const dir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

const SELLER = 'name phone email';

// GET all items with search + filters
router.get('/', async (req, res) => {
  const { q, category, maxPrice, status } = req.query;
  const filter = {};
  if (q) filter.title = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  if (maxPrice) filter.price = { $lte: Number(maxPrice) };
  if (status) filter.status = status;
  const items = await Item.find(filter).populate('seller', SELLER).sort({ createdAt: -1 });
  res.json(items);
});

// my listings
router.get('/mine', auth, async (req, res) => {
  const items = await Item.find({ seller: req.userId }).populate('seller', SELLER).sort({ createdAt: -1 });
  res.json(items);
});

// my favourites
router.get('/favourites', auth, async (req, res) => {
  const user = await User.findById(req.userId).populate({
    path: 'favourites',
    populate: { path: 'seller', select: SELLER },
  });
  res.json(user.favourites.filter(Boolean));
});

// single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('seller', SELLER);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json(item);
  } catch {
    res.status(404).json({ msg: 'Item not found' });
  }
});

// create listing
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, category, condition } = req.body;
    const item = await Item.create({
      title,
      description,
      price,
      category,
      condition,
      image: req.file ? req.file.filename : '',
      seller: req.userId,
    });
    res.json(item);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// toggle sold / available (owner only)
router.put('/:id/status', auth, async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ msg: 'Not found' });
  if (item.seller.toString() !== req.userId) return res.status(403).json({ msg: 'Not allowed' });
  item.status = item.status === 'available' ? 'sold' : 'available';
  await item.save();
  res.json(item);
});

// delete listing (owner only)
router.delete('/:id', auth, async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ msg: 'Not found' });
  if (item.seller.toString() !== req.userId) return res.status(403).json({ msg: 'Not allowed' });
  await item.deleteOne();
  res.json({ msg: 'Deleted' });
});

// toggle favourite
router.post('/:id/favourite', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  const id = req.params.id;
  const exists = user.favourites.some((f) => f.toString() === id);
  user.favourites = exists
    ? user.favourites.filter((f) => f.toString() !== id)
    : [...user.favourites, id];
  await user.save();
  res.json(user.favourites);
});

module.exports = router;

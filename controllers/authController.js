const bcrypt = require('bcrypt');

const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const same = await bcrypt.compare(password, user.password);
      if (same) {
        //USER Session
        req.session.userID = user._id;
        res.status(200).redirect('/users/dashboard');
      } else {
        res.status(401).send('Incorrect password');
      }
    } else {
      res.status(404).send('User not found!');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
    console.log(error);
  }
};
exports.logoutUser = async (req, res) => {
  req.session.destroy(()=>{
    res.redirect('/');
  })
}

exports.gerDashboardPage = async (req, res) => {
  const user = await User.findOne({
    _id: req.session.userID
  })
  const categories = await Category.find();
  const courses = await Course.find({
    user: req.session.userID,
  })
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses
  })
}
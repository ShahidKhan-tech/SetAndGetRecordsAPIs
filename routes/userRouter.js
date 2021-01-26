const router = require("express").Router();


router.post("/register", async (req, res) => {
  try {
    let { email, name, displayName } = req.body;

    // validate

    if (!email || !name)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (name.length < 2)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });


    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      name,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/setRecord", async (req, res) => {
  try {
    const { email,name } = req.body;

    // validate
    if (!email || !name)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/getRecords", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

module.exports = router;

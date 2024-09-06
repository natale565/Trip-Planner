const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(201).json(newUser);
        });
    } catch (err) {
    res.status(400).json({ message: 'Failed to create user', error: err.message });    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.username } });
        

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in' });
        });
    } catch (err) {
        res.status(400).json({ message: 'Failed to log in', error: err.message });
    }
});

router.post('/logout', (req,res) => {
    if ( req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        });
    } else {
        res.status(404).json({ message: 'No user logged in'});
    }
});

module.exports = router;

const express = require ('express');
const router  = express.Router();

router.get('/', (req, res) => {
    res.send('Genre App');
});

module.exports = router;
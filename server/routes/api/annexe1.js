const express = require('express');
const router = express.Router();

// GET content
// @route get http://localhost:4242/api/p1
// @description: Return the result of division of
//               string lenght && number between 0/20
// @access Public

router.get('/', async(req, res) => {
    // Destructure get route params
    const str = req.query.str;
    const nbr = req.query.nbr;

    // Verify if parameters are set
    if (!str || !nbr) {
        return res.status(400).json({ success: false, msg: 'All parameters are required.'});
    };

    // Check parameter nbr
    // if it's an integer or float
    if (nbr) {
        const nbrInt = Number(nbr);

        function isFloat(num) {
            return Number(num) === num && num % 1 !== 0;
        };

        // Integer
        if (!Number.isInteger(nbrInt) && !isFloat(nbrInt)) {
            return res.status(400).json({ 
                success: false,
                msg: `Input was ${nbr}. The second parameter must be an integer or float number. Decimal separator must be "." and not ",".`
            });
        };
    };

    // if it's not 0
    if (Number(nbr) === 0) {
        return res.status(400).json({ success: false, msg: 'Division by 0 is not allowed.'})
    };

    // if it's in between 1 && 20 included
    if (nbr < 0 || 20 < nbr) {
        return res.status(400).json({ success: false, msg: 'The second parameter (number) must be between 0 and 20 inclusive.'})
    }

    try {
        const result = str.length / Number(nbr);
        res.status(200).json({ success: true, msg: `Result is ${result}.`});
    } catch(err) {
        res.status(400).json({ success: false, msg: err});
    };

});

module.exports = router;
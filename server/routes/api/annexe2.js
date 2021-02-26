const express = require('express');
const router = express.Router();

// GET content
// @route get http://localhost:4242/api/p2
// @description: Return the total of number of days between 1st day of
//               the month && the date_start AND the date_end && last
//               day of the month
// @access Public

router.get('/', async(req, res) => {
    // Destructure route params
    const date_start = req.query.date_start;
    const date_end = req.query.date_end;

    // Verify if date_start is set (required param)
    if (!date_start) {
        return res.status(400).json({ success: false, msg: 'Date_start parameter is required.'});
    };
    
    // Verify if params are date object
    const startDate = new Date(date_start);
    const endDate = new Date(date_end);

    if (isNaN(startDate)) {
        return res.status(400).json({ success: false, msg: 'Date_start parameter is not a valid date.'});
    };
    
    try {
        const dayStartDate = startDate.getDate();
        const monthStartDate = startDate.getMonth() + 1;
        const dayEndDate = endDate.getDate();
        const monthEndDate = endDate.getMonth() + 1;

        const months31D = [1, 3, 5, 7, 8, 10, 12];
        const months30D = [4, 6, 9, 11];
        const feb = 2;

        if (!date_end || date_end.length === 0) {
            if (28 < dayStartDate  && monthStartDate === 2) {
                return res.status(400).json({ success: false, msg: `The month is February and there is only 28 days. The day of the start date (${dayStartDate}) is bigger than 28.`})
            };

            const nbrDays = dayStartDate - 1;
            return res.status(200).json({ success: true, msg: nbrDays});
        };


        if (isNaN(dayEndDate)) {
            return res.status(400).json({ success: false, msg: 'Date_end parameter is not a valid date.'})
        } else {
            if (months31D.includes(monthEndDate)) {
                if (28 < dayStartDate  && monthStartDate === feb) {
                    return res.status(400).json({ success: false, msg: `The month is February and there is only 28 days. The day of the start date (${dayStartDate}) is bigger than 28.`})
                };

                const nbrDays = (dayStartDate - 1) + (31 - dayEndDate);
                return res.status(200).json({ success: true, msg: nbrDays});
            } else if (months30D.includes(monthEndDate)) {
                if (28 < dayStartDate  && monthStartDate === feb) {
                    return res.status(400).json({ success: false, msg: `The month is February and there is only 28 days. The day of the start date (${dayStartDate}) is bigger than 28.`})
                };

                const nbrDays = (dayStartDate - 1) + (30 - dayEndDate);
                return res.status(200).json({ success: true, msg: nbrDays});
            } else if (monthEndDate === feb) {
                if (28 < dayStartDate  && monthStartDate === feb) {
                    return res.status(400).json({ success: false, msg: `The month is February and there is only 28 days. The day of the start date (${dayStartDate}) is bigger than 28.`})
                };

                const nbrDays = (dayStartDate - 1) + (28 - dayEndDate);
                return res.status(200).json({ success: true, msg: nbrDays});
            };
        };
    } catch(err) {
        res.status(400).json({ success: false, msg: err});
    };
}); 

module.exports = router;
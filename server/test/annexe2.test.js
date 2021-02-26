const chai = require('chai');
const chaiHTTP = require ('chai-http');
const server = 'http://localhost:4242/api/p2';

// Assertion configuration
chai.should();
chai.use(chaiHTTP);

// TESTS ANNEXE2
// API returning the the total of number of days
// between 1st day of the month && the date_start 
// AND the date_end && last day of the month

describe('API - GET route p2 Test', () => {

    /**
     * Test the route with a good date_start && date_end
     */
    describe('GET ?date_start=2020-06-10&date_end=2020-07-25', () => {
        it('Should return true && output', function(done) {
            const startDateParam = '2020-06-10';
            const endDateParam = '2020-07-25';

            chai.request(server)
            .get(`?date_start=${startDateParam}&date_end=${endDateParam}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('msg').eq(15);
                done();
            });
        });
    });

    /**
     * Test the route with a good date_start &&
     * no date_end
     */
    describe('GET ?date_start=2020-06-10', () => {
        it('Should return true && output', function(done) {
            const startDateParam = '2020-06-10';

            chai.request(server)
            .get(`?date_start=${startDateParam}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('msg').eq(9);
                done();
            });
        });
    });

    /**
     * Test the route with a missing date_start param && 
     * date_end provided
     */
    describe('GET ?date_end=2020-07-25', () => {
        it('Should return false && output Date_start parameter is required', function(done) {
            const endDateParam = '2020-07-25';

            chai.request(server)
            .get(`?date_end=${endDateParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('Date_start parameter is required.');
                done();
            });
        });
    });

    /**
     * Test the route with a empty date_start param &&
     * date_end provided
     */
    describe('GET ?date_start=&date_end=2020-07-25', () => {
        it('Should return false && output Date_start parameter is required', function(done) {
            const startDateParam = '';
            const endDateParam = '2020-07-25';

            chai.request(server)
            .get(`?date_start=${startDateParam}&date_end=${endDateParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('Date_start parameter is required.');
                done();
            });
        });
    });

    /**
     * Test the route with a non-valid date_start format param 
     * && date_end provided
     */
    describe('GET ?date_start=foo&date_end=2020-07-25', () => {
        it('Should return false && output Date_start parameter is not a valid date', function(done) {
            const startDateParam = 'foo';
            const endDateParam = '2020-07-25';

            chai.request(server)
            .get(`?date_start=${startDateParam}&date_end=${endDateParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('Date_start parameter is not a valid date.');
                done();
            });
        });
    });

    /**
     * Test the route with a date_start param 
     * && a non-valid date_end format provided
     */
    describe('GET ?date_start=2020-06-10&date_end=foo', () => {
        it('Should return false && output Date_start parameter is not a valid date', function(done) {
            const startDateParam = '2020-06-10';
            const endDateParam = 'foo';

            chai.request(server)
            .get(`?date_start=${startDateParam}&date_end=${endDateParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('Date_end parameter is not a valid date.');
                done();
            });
        });
    });

    /**
     * Test the route with a date_start param for the month
     * of february with a day > 28
     */
    describe('GET ?date_start=2020-02-29', () => {
        it('Should return false && output The month is February error msg', function(done) {
            const startDateParam = '2020-02-29';
            const dayStartDate = new Date(startDateParam).getDate();

            chai.request(server)
            .get(`?date_start=${startDateParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq(`The month is February and there is only 28 days. The day of the start date (${dayStartDate}) is bigger than 28.`);
                done();
            });
        });
    });

});
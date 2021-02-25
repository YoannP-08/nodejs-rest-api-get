const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = 'http://localhost:4242/api/p1';

// Assertion configuration
chai.should();
chai.use(chaiHTTP);

// TESTS ANNEXE1
// API returning the result of division of string length && number between 0/20

describe('API - GET route Test', () => {
    // let strParam = '';
    // let nbrParam = '';

    /**
     * Test the route with good params && both params filled
     */
    describe('GET ?str=Hello,%20I%20am%20Yoann.%20Nice%20to%20meet%20ya!&nbr=5', () => {
        it('Should return true && output', function(done) {
            const strParam = 'Hello, I am Yoann.Nice to meet ya!';
            const nbrParam = '5';

            chai.request(server)
            .get(`?str=${strParam}&nbr=${nbrParam}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('msg').eq('Result is ' + (strParam.length/nbrParam) + '.');
                done();
            });
        });
    });

    /**
     * Test the route with missing string param && number param filled
     */
    describe('GET ?nbr=5', () => {
        it('Should return false && error message', function(done) {
            const nbrParam = '5';

            chai.request(server)
            .get(`?nbr=${nbrParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('All parameters are required.');
                done();
            });
        });
    });

    /**
     * Test the route with string param filled && missing number param
     */
    describe('GET ?str=Hello, I am Yoann. Nice to meet ya!', () => {
        it('Should return false && error message', function(done) {
            const strParam = 'Hello, I am Yoann.Nice to meet ya!';

            chai.request(server)
            .get(`?str=${strParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('All parameters are required.');
                done();
            });
        });
    });

    /**
     * Test the route with both params empty
     * Error handle by verifying with the following condition
     * parameters set ?
     */
    describe('GET ?str=&nbr=', () => {
        it('Should return false && output same message as test with missing parameter', function(done) {
            const strParam = '';
            const nbrParam = '';

            chai.request(server)
            .get(`?str=${strParam}&nbr=${nbrParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('All parameters are required.');
                done();
            });
        });
    });

    /**
     * Test the route with empty string param && number filled
     * Error handle by verifying with the following condition
     * parameters set ?
     */
    describe('GET ?str=&nbr=5', () => {
        it('Should return false && output same message as test with missing parameter', function(done) {
            const strParam = '';
            const nbrParam = '5';

            chai.request(server)
            .get(`?str=${strParam}&nbr=${nbrParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('All parameters are required.');
                done();
            });
        });
    });

    /**
     * Test the route with string param filled && empty number param
     * Error handle by verifying with the following condition
     * parameters set ?
     */
    describe('GET ?str=Hello,%20I%20am%20Yoann.%20Nice%20to%20meet%20ya!&nbr=', () => {
        it('Should return false && output same message as test with missing parameter', function(done) {
            const strParam = 'Hello, I am Yoann.Nice to meet ya!';
            const nbrParam = '';

            chai.request(server)
            .get(`?str=${strParam}&nbr=${nbrParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('All parameters are required.');
                done();
            });
        });
    });

    /**
     * Test the route with string param filled &&
     * incorrect format number param = STRING
     */
    describe('GET ?str=Hello,%20I%20am%20Yoann.%20Nice%20to%20meet%20ya!&nbr=foo', () => {
        it('Should return false && output second param must be an integer or float', function(done) {
            const strParam = 'Hello, I am Yoann.Nice to meet ya!';
            const nbrParam = 'foo';

            chai.request(server)
            .get(`?str=${strParam}&nbr=${nbrParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq(`Input was ${nbrParam}. The second parameter must be an integer or float number. Decimal separator must be "." and not ",".`);
                done();
            });
        });
    });

    /**
     * Test the route with string param filled &&
     * wrong format number param = 4,6 VS 4.6
     */
    describe('GET ?str=Hello,%20I%20am%20Yoann.%20Nice%20to%20meet%20ya!&nbr=4,6', () => {
        it('Should return false && output second param must be an integer or float', function(done) {
            const strParam = 'Hello, I am Yoann.Nice to meet ya!';
            const nbrParam = '4,6';

            chai.request(server)
            .get(`?str=${strParam}&nbr=${nbrParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq(`Input was ${nbrParam}. The second parameter must be an integer or float number. Decimal separator must be "." and not ",".`);
                done();
            });
        });
    });

    /**
     * Test the route with string param filled &&
     * number param = 0
     * Division by 0 not allowed
     */
    describe('GET ?str=Hello,%20I%20am%20Yoann.%20Nice%20to%20meet%20ya!&nbr=0', () => {
        it('Should return false && output division by 0 not allowed', function(done) {
            const strParam = 'Hello, I am Yoann.Nice to meet ya!';
            const nbrParam = '0';

            chai.request(server)
            .get(`?str=${strParam}&nbr=${nbrParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('Division by 0 is not allowed.');
                done();
            });
        });
    });

    /**
     * Test the route with string param filled &&
     * number param = -0
     * Division by 0 not allowed
     */
    describe('GET ?str=Hello,%20I%20am%20Yoann.%20Nice%20to%20meet%20ya!&nbr=-0', () => {
        it('Should return false && output division by 0 not allowed even if nbr = -0', function(done) {
            const strParam = 'Hello, I am Yoann.Nice to meet ya!';
            const nbrParam = '-0';

            chai.request(server)
            .get(`?str=${strParam}&nbr=${nbrParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('Division by 0 is not allowed.');
                done();
            });
        });
    });

    /**
     * Test the route with string param filled &&
     * number param < 0
     * number param must be between 0 <= nbr <= 20
     */
    describe('GET ?str=Hello,%20I%20am%20Yoann.%20Nice%20to%20meet%20ya!&nbr=-1', () => {
        it('Should return false && output division by 0 not allowed', function(done) {
            const strParam = 'Hello, I am Yoann.Nice to meet ya!';
            const nbrParam = '-1';

            chai.request(server)
            .get(`?str=${strParam}&nbr=${nbrParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('The second parameter (number) must be between 0 and 20 inclusive.');
                done();
            });
        });
    });

    /**
     * Test the route with string param filled &&
     * 20 < number param
     * number param must be between 0 <= nbr <= 20
     */
    describe('GET ?str=Hello,%20I%20am%20Yoann.%20Nice%20to%20meet%20ya!&nbr=21', () => {
        it('Should return false && output division by 0 not allowed', function(done) {
            const strParam = 'Hello, I am Yoann.Nice to meet ya!';
            const nbrParam = '21';

            chai.request(server)
            .get(`?str=${strParam}&nbr=${nbrParam}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('msg').eq('The second parameter (number) must be between 0 and 20 inclusive.');
                done();
            });
        });
    });

});
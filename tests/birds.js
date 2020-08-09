const pg = require('pg');
const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');


chai.use(chaiHttp);
chai.should();

describe('Birds', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET birds', () => {

    it('should get all birds', (done) => {
      chai.request(app)
        .get('/birds')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should get 5 birds (if exists) (limit test)', (done) => {
      chai.request(app)
        .get('/birds')
        .end((err, res) => {
          const { birds } = res.body;
          chai.request(app)
            .get('/birds?limit=5')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              const expectedLength = birds.length >= 5 ? 5 : birds.length;
              expect(res.body.birds.length).to.equal(expectedLength);
              done();
            });
        });
    });

    it('should get 5 birds (if exists) SORTED BY name ASC', (done) => {
      chai.request(app)
        .get('/birds?limit=5&order=asc')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          const { birds } = res.body;
          let sortedBirds = [].concat(birds);
          sortedBirds = sortedBirds.sort((bird1, bird2) => bird1.name.localeCompare(bird2.name));
          const isEqual = sortedBirds.filter((sBird, index) => sBird.name === birds[index].name).length === sortedBirds.length;
          expect(isEqual).to.equal(true);
          done();
        });
    });

    it('should get 5 birds (if exists) SORTED BY name DESC', (done) => {
      chai.request(app)
        .get('/birds?limit=5&order=desc')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          const { birds } = res.body;
          let sortedBirds = [].concat(birds);
          sortedBirds = sortedBirds.sort((bird1, bird2) => bird2.name.localeCompare(bird1.name));
          const isEqual = sortedBirds.filter((sBird, index) => sBird.name === birds[index].name).length === sortedBirds.length;
          expect(isEqual).to.equal(true);
          done();
        });
    });

    it('should failed with not right ORDER param', (done) => {
      chai.request(app)
        .get('/birds?limit=5&order=desfc')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          const { message } = res.body;
          expect(message).to.equal('Order is not valid value');
          done();
        });
    });

    it('should failed with not right LIMIT param', (done) => {
      chai.request(app)
        .get('/birds?limit=hiiii')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          const { message } = res.body;
          expect(message).to.equal('Limit is not valid value');
          done();
        });
    });
  });
});
const chai          = require('chai')
const chaiHttp      = require('chai-http')
chai.use(chaiHttp)
const expect        = chai.expect
const server        = require('../server')
let tokenSupreme    = null
let idApp           = ''

describe('Test API for module app', () => {

    it('Create Note - POST - /api/tasks', (done) => {
        chai.request(server)        
        .post('/api/tasks')
        .set('content-type', 'application/json')
        .send({
            "title": "test title",
            "note": "test note"
        })
        .then((res) => {
            try {
                idApp = JSON.parse(res.text).result[0].id;
                expect(JSON.parse(res.text).success).to.be.true;         
                expect(res).to.have.status(200);
                done();   
            } catch (error) {
                throw error
            }      
        }).catch(function(err){
            done(err);
        });
    });

    it('Read all Notes - GET - /api/tasks', (done) => {
        chai.request(server)        
        .get('/api/tasks')
        .set('content-type', 'application/json')
        .then((res) => {
            try {
                expect(JSON.parse(res.text).success).to.be.true;         
                expect(res).to.have.status(200);
                done();   
            } catch (error) {
                throw error
            }      
        }).catch(function(err){
            done(err);
        });
    });
    
    it('Read One Note - GET - /api/tasks/:id', (done) => {
        chai.request(server)        
        .get(`/api/tasks/${idApp}`)
        .set('content-type', 'application/json')
        .then((res) => {
            try {
                expect(JSON.parse(res.text).success).to.be.true;         
                expect(res).to.have.status(200);
                done();   
            } catch (error) {
                throw error
            }      
        }).catch(function(err){
            done(err);
        });
    });
    
    it('Update Note - PUT - /api/tasks/:id', (done) => {
        chai.request(server)        
        .put(`/api/tasks/${idApp}`)
        .set('content-type', 'application/json')
        .send({
            "id":idApp,
            "title": "test title modified updated",
            "note": "test note modified updated"
        })
        .then((res) => {
            try {
                expect(JSON.parse(res.text).success).to.be.true;         
                expect(res).to.have.status(200);
                done();   
            } catch (error) {
                throw error
            }      
        }).catch(function(err){
            done(err);
        });
    });
    
    it('Delete Note - DELETE - /api/tasks/:id', (done) => {
        chai.request(server)        
        .delete(`/api/tasks/${idApp}`)
        .set('content-type', 'application/json')
        .send({
            "id":idApp,
        })
        .then((res) => {
            try {
                expect(JSON.parse(res.text).success).to.be.true;         
                expect(res).to.have.status(200);
                done();   
            } catch (error) {
                throw error
            }      
        }).catch(function(err){
            done(err);
        });
    });
});
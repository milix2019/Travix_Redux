const chai          = require('chai')
const chaiHttp      = require('chai-http')
chai.use(chaiHttp)
const expect        = chai.expect
const server        = require('../server')
let tokenSupreme    = null
let idApp           = ''

describe('Test API for module app', () => {

    it('Login as SUPREME - POST - /api/admin/login', (done) => {     
        chai.request(server)
			.post('/api/admin/login')
			.type('application/json')
			.send({
				"email" : "supreme@tractive.com.my",
				"password": "welcome"
			})
        .then((res) => {
			try {
                expect(JSON.parse(res.text).success).to.be.true;            
                expect(res).to.have.status(200);
                if(JSON.parse(res.text).success) {
                    tokenSupreme = JSON.parse(res.text).result[0].token;
                }
                done();   
            } catch (error) {
                throw error
            }
        }).catch(function(err){
            done(err);
        })
    });

    it('Create APP - POST - /api/app', (done) => {
        chai.request(server)        
        .post('/api/app')
        .set('Authorization', "Bearer " + tokenSupreme.toString())
        .send({
            "name": "Unit App"
        })
        .then((res) => {    
            try {
                idApp = JSON.parse(res.text).result._id;
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

    it('Read all APP - GET - /api/app', (done) => {
        chai.request(server)        
        .get('/api/app?pageIndex=0&limit=10')
        .set('Authorization', "Bearer " + tokenSupreme.toString())
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
    
    it('Read one APP - GET - /api/app/:idApp', (done) => {
        chai.request(server)        
        .get(`/api/app/${idApp}`)
        .set('Authorization', "Bearer " + tokenSupreme.toString())
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

    it('Update APP - PUT - /api/app/:idApp', (done) => {
        chai.request(server)        
        .put(`/api/app/${idApp}`)
        .set('Authorization', "Bearer " + tokenSupreme.toString())
        .send({
            "name": "Unit App Update"
        })
        .then((res) => {    
            try {
                expect(JSON.parse(res.text).success).to.be.true;         
                expect(res).to.have.status(200);
                expect(JSON.parse(res.text).result.name).to.equal('Unit App Update');
                done();   
            } catch (error) {
                throw error
            }      
        }).catch(function(err){
            done(err);
        });
    });

});
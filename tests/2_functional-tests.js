const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    // suite('POST request to /api/issues/{project}', () => {
    //     test('Every field filled in', (done) => {
    //         const issue = {
    //             issue_title: 'Test issue',
    //             issue_text: 'Test description',
    //             created_by: 'test',
    //             status_text: 'new',
    //             assigned_to: 'medium',
    //         }
    //         chai.request(server)
    //             .post('/api/issues/test')
    //             .send(issue)
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.property(res.body, 'issue_title');
    //                 assert.property(res.body, 'issue_text');
    //                 assert.property(res.body, 'created_by');
    //                 assert.property(res.body, 'status_text');
    //                 assert.property(res.body, 'assigned_to');
    //                 assert.equal(res.body.issue_title, issue.issue_title);
    //                 assert.equal(res.body.issue_text, issue.issue_text);
    //                 assert.equal(res.body.created_by, issue.created_by);
    //                 assert.equal(res.body.status_text, issue.status_text);
    //                 assert.equal(res.body.assigned_to, issue.assigned_to);
    //                 assert.equal(res.body.open, true);
    //                 done();
    //             });
    //     });

    //     test('only required fields', (done) => {
    //         const issue = {
    //             issue_title: 'Test issue2',
    //             issue_text: 'Test description2',
    //             created_by: 'test2',
    //         }
    //         chai.request(server)
    //             .post('/api/issues/test')
    //             .send(issue)
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.property(res.body, 'issue_title');
    //                 assert.property(res.body, 'issue_text');
    //                 assert.property(res.body, 'created_by');
    //                 assert.property(res.body, 'status_text');
    //                 assert.property(res.body, 'assigned_to');
    //                 assert.equal(res.body.issue_title, issue.issue_title);
    //                 assert.equal(res.body.issue_text, issue.issue_text);
    //                 assert.equal(res.body.created_by, issue.created_by);
    //                 assert.equal(res.body.assigned_to, '');
    //                 assert.equal(res.body.status_text, '');
    //                 assert.equal(res.body.open, true);
    //                 done();
    //         })
    //     })

    //     test('missing required fields', (done) => {
    //         const issue = {
    //             issue_text: 'Test description3',
    //             created_by: 'test3',
    //             assigned_to: 'medium'
    //         }
    //         chai.request(server)
    //             .post('/api/issues/test')
    //             .send(issue)
    //             .end((err, res) => {
    //                 assert.equal(res.status, 400);
    //                 assert.equal(res.body.error, 'required field(s) missing');
    //                 done();
    //             });
    //     })

    // })

    suite('GET request to /api/issues/{project}', () => {

        test('view issues on a project', (done) => {
            chai.request(server)
                .get('/api/issues/test')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    done();
                });
        })

        test('view issues on a project with a filter', (done) => {
            chai.request(server)
                .get('/api/issues/test?created_by=test2')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    done();
                });
        })

        test('view issues on a project with multiple filters', (done) => {
            chai.request(server)
                .get('/api/issues/test?created_by=test2&issue_title=Test issue2')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    done();
                });
        })
    })

});

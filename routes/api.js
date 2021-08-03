'use strict';
const IssueController = require('../controller/controller');

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(IssueController.retrieveIssues)
    
    .post(IssueController.createIssue)
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};

const mongoose = require('mongoose')
const issueSchema = new mongoose.Schema({
  issue_title: {
    type: String,
    required: 'Enter an issue_title'
  },
  issue_text: {
    type: String,
    required: 'please, add an issue text'
  },
  created_by: {
    type: String,
    required: 'Please, add the issue creator'
  },
  assigned_to: {
    type: String,
    default: ''
  },
  status_text: {
    type: String,
    default: ''
  },
  open: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: 'project name is required'
  },
  issues: [issueSchema]
})

module.exports = mongoose.model('Project', projectSchema)
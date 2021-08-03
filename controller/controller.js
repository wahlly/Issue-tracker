const Project = require('../models/project')
const Validator = require('../validator')

module.exports = class IssueController{
    static async createIssue(req, res) {
        try{
            const project = req.params.project
            const existingProject = await Project.findOne({projectName: project})
            const newIssue = req.body
            const { isValid, error } = await Validator.validateField(newIssue)
            if(!isValid){
                return res.status(400).json({ error: error.msg })
            }
            if(existingProject){
                let addIssue = await Project.findOneAndUpdate({projectName: project}, {$push: {issues: req.body}}, {new: true})
                return res.status(200).json(addIssue.issues[addIssue.issues.length - 1])
            }
            const newProject = await new Project({projectName: project})
            await newProject.issues.push(newIssue)
            await newProject.save()
            return res.status(200).json(newProject.issues[newProject.issues.length - 1])
        }
        catch(err){
            return res.status(500).json({ error: err.message })
        }
    }

    static async retrieveIssue(req, res) {
        try{
            const project = req.params.project
            const existingProject = await Project.findOne({projectName: project})
            if(existingProject){
                const issues = existingProject.issues.filter((issue) => {
                    return (req.query.created_by ? issue.created_by === req.query.created_by : true) &&
                        (req.query.issue_title ? issue.issue_title === req.query.issue_title : true) &&
                        (req.query.issue_text ? issue.issue_text === req.query.issue_text : true) &&
                        (req.query.assigned_to ? issue.assigned_to === req.query.assigned_to : true) &&
                        (req.query.status_text ? issue.status_text === req.query.status_text : true) &&
                        (req.query.open ? String(issue.open) == req.query.open.toLowerCase() : true) &&
                        (req.query.created_on ? new Date(issue.created_on).valueOf() == new Date(req.query.created_on).valueOf() : true) &&
                        (req.query.updated_on ? new Date(issue.updated_on).valueOf() == new Date(req.query.updated_on).valueOf() : true);
                })
                return res.status(200).json(issues)
            }
            return res.status(404).json({ error: 'Project not found' })
        }
        catch(err){
            return res.status(500).json({ error: err.message })
        }
    }
}
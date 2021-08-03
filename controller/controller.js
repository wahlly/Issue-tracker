const Project = require('../models/project')
const Validator = require('../validator')

module.exports = class IssueController{
    static async createIssue(req, res) {
        try{
            const project = req.params.project
            const newIssue = req.body
            const { isValid, error } = await Validator.validateField(newIssue)
            if(!isValid){
                return res.status(400).json({ error: error.msg })
            }
            //check if project exists
            const existingProject = await Project.findOne({projectName: project})
            if(existingProject){
                let addIssue = await Project.findOneAndUpdate({projectName: project}, {$push: {issues: req.body}}, {new: true})
                return res.status(200).json(addIssue.issues[addIssue.issues.length - 1])
            }
            //project does not exist, create new project
            const newProject = await new Project({projectName: project})
            await newProject.issues.push(newIssue)
            await newProject.save()
            return res.status(200).json(newProject.issues[newProject.issues.length - 1])
        }
        catch(err){
            return res.status(500).json({ error: err.message })
        }
    }

    static async retrieveIssues(req, res) {
        try{
            const project = req.params.project
            //check if project exists
            const existingProject = await Project.findOne({projectName: project})
            if(existingProject){
                //filter issues by supplied queries
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

    static async updateIssue(req, res) {
        try{
            const project = req.params.project
            const issue = req.body
            const { isValid, error } = await Validator.updateEntry(issue)
            if(!isValid){
                return res.status(400).json({ error: error.msg, _id: issue._id })
            }
            //check if project exists
            const existingProject = await Project.findOne({projectName: project})
            if(existingProject){
                const selectIssue = existingProject.issues.id(issue._id)
                if(!selectIssue){
                    return res.status(400).json({ error: 'could not update', _id: issue._id })
                }
                const {issue_title,
                    issue_text,
                    created_by,
                    assigned_to,
                    status_text,
                    open} = req.body

                    if(issue_title) selectIssue.issue_title = issue_title
                    if(issue_text) selectIssue.issue_text = issue_text
                    if(created_by) selectIssue.created_by = created_by
                    if(assigned_to) selectIssue.assigned_to = assigned_to
                    if(status_text) selectIssue.status_text = status_text
                    if(open) selectIssue.open = open
                    selectIssue.updated_on = new Date()
                    await existingProject.save()
                    return res.status(200).json({result: 'successfully updated', _id: selectIssue._id})
            }
            return res.status(400).json({ error: 'could not update', _id: issue._id })
        }
        catch(err){
            console.error(err)
            return res.status(500).json({ error: err.message })
        }
    }

    static async deleteIssue(req, res) {
        try{
            const project = req.params.project
            const issue = req.body
            if(!issue._id){
                return res.status(400).json({ error: 'missing _id' })
            }
            //check if project exists
            const existingProject = await Project.findOne({projectName: project})
            if(existingProject){
                const selectIssue = existingProject.issues.id(issue._id)
                if(!selectIssue){
                    return res.status(400).json({ error: 'could not delete' })
                }
                await selectIssue.remove()
                await existingProject.save()
                return res.status(200).json({result: 'successfully deleted', _id: selectIssue._id })
            }
            return res.status(400).json({ error: 'could not delete', _id: issue._id })
        }
        catch(err){
            console.error(err)
            return res.status(500).json({ error: err.message })
        }
    }
}

module.exports = class Validator {
    static async validateField(body) {
        let error = {}
        if((!body.issue_title || body.issue_title.trim().length == 0) || (!body.issue_text || body.issue_text.trim().length == 0)
        || (!body.created_by || body.created_by.trim().length == 0)){
            error.msg = 'required field(s) missing'
        }
        return {
            error,
            isValid: Object.keys(error).length == 0
        }
    }

    static async updateEntry(body) {
        let error = {}
        if(!body._id){
            error.msg = 'missing _id'
        }
        if((!body.issue_title || body.issue_title.trim().length == 0) && (!body.issue_text || body.issue_text.trim().length == 0) && (!body.created_by || body.created_by.trim().length == 0)
        && (!body.assigned_to || body.assigned_to.trim().length == 0) && (!body.status_text || body.status_text.trim().length == 0) && (!body.open || body.open.trim().length == 0)){
            error.msg = 'no update field(s) sent'
        }
        return {
            error,
            isValid: Object.keys(error).length == 0
        }
    }
}
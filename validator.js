
module.exports = class Validator {
    static async validateField(body) {
        let error = {}
        if(body.issue_title.trim().length == 0 || body.issue_text.trim().length == 0 || body.created_by.trim().length == 0){
            error.msg = 'required field(s) missing'
        }
        return {
            error,
            isValid: Object.keys(error).length == 0
        }
    }
}
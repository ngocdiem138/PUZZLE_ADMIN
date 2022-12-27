import api from '../constants/api'


const token = localStorage.getItem('login')

const skillService = {
    
    getAllSkill(){
        if(!token)
            return null
        return api.get('api/admin/get-all-extra-info',
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    getOneSkill(id){
        if(!token)
            return null
        return api.get('api/admin/get-extra-info/'+id,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    createNewSkill(data){
        if(!token)
            return null
        return api.post('api/admin/add-extra-info/', data,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    deleteSkill(id){
        if(!token)
            return null
        return api.get('api/admin/delete-extra-info/'+id,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },



}

export default skillService
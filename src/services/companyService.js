import api from '../constants/api'

const token = localStorage.getItem('login')

const companyService = {
    
    getAllCompany(){
        if(!token)
            return null
        return api.get('/api/admin/get-all-company',
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    getOneCompany(id){
        if(!token)
            return null
        return api.get('/api/admin/get-one-company/'+id,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    deleteCompany(id){
        if(!token)
            return null
        return api.get('/api/admin/delete-info-company/'+id,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    createCompany(data){
        if(!token)
            return null
        return api.post('/api/admin/add-company', data,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },


    updateCompany(data){
        if(!token)
            return null
        return api.put('/api/admin/update-info-company', data,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },


}

export default companyService
import api from '../constants/api'


const token = localStorage.getItem('login')

const statisticService = {
    
    getDataJoinLastWeek(){
        if(!token)
            return null
        return api.get('/api/admin/get-data-join-account-in-last-num-week/6',
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    getApplicationAmount(){
        if(!token)
            return null
        return api.get('api/admin/get-application-amount',
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    getJobAmount(){
        if(!token)
            return null
        return api.get('api/admin/get-job-post-amount',
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    getAmountAccount(id){
        if(!token)
            return null
        return api.get('/api/admin/get-account-amount',
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },



}

export default statisticService
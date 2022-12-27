import api from '../constants/api'

const token = localStorage.getItem('login')

const authService = {
    
    login(data){
        return api.post('/api/login', data,
        {headers: {
            'Content-Type': 'application/json'
        }})
    },
    logout(){
        return api.get('/api/logout',
        {headers: {
            Authorization: `Bearer ${token}`
        }})
    },

    getProfile(){
        return api.get('/api/user/profile',
        {headers: {
            Authorization: `Bearer ${token}`
        }})
    },

    changePassword(data){
        return api.post('/admin/auth/change-password', data)
    }
}

export default authService
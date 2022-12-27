import api from "../constants/api";

const token = localStorage.getItem("login");

const accountService = {

  getProfile() {
    if (!token) return null;
    return api.get("api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  
  getAllAccount() {
    if (!token) return null;
    return api.get("api/admin/get-all-account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getAccountById(id) {
    if (!token) return null;
    return api.get("/api/admin/get-account-by-id/"+id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  createAccount(data) {
    if (!token) return null;
    return api.post("/api/admin/add-account", data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateAccount(data) {
    if (!token) return null;
    return api.put("/api/admin/add-account", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteAccount(id){
    if (!token) return null;
    return api.delete("/admin/delete-account/"+id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });    

  }
};

export default accountService;

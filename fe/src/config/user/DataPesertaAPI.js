import api from '../index'

export default {
  get: () => api.get('/registrants?populate[1]=employee.grade&populate[2]=employee.level&populate[3]=employee.Photo&populate[4]=employee.position').then((res) => res.data),
  findByNIP: (query) => api.get(`/employees?filters[NIP][$eq]=${query}`).then((res) => res.data),  
  findEmployeeName: (query) => api.get(`/employees?filters[Name][$contains]=${query}`).then((res) => res.data),  
  add: (data) => api.post('/registrants', data).then((res) => res.data),
  delete: (id) => api.delete(`/registrants/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/registrants/${id}`, data).then((res) => res.data),
}
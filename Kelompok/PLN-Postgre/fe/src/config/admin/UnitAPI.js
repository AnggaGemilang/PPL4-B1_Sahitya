import api from '..'

export default {
  get: () => api.get("/units?populate=*").then((res) => res.data),
  add: () => api.get("/units?populate=*").then((res) => res.data),
  delete: () => api.get("/units?populate=*").then((res) => res.data),
  edit: () => api.get("/units?populate=*").then((res) => res.data),
}

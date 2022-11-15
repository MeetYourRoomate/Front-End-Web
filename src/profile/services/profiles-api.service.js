import http from '@/shared/services/http-common'

export default class ProfilesService {
  getAll () {
    return http.get('/profiles')
  }

  getByUserId (userId) {
    return http.get(`/users/${userId}/profiles`)
  }

  getById (id) {
    return http.get(`/profiles/${id}`)
  }

  create (data, userId) {
     
    return http.post(`/profiles?userId=${userId}`, JSON.stringify(data))
      .then(response => {
        if (response.data.resource) {
          const user = JSON.parse(localStorage.getItem('user'))
          user.hasProfile = true
          user.profileId = response.data.resource.id
          localStorage.setItem('user', JSON.stringify(user))
          return response.data.resource
        }
        return null
      })
  }

  update (id, data) {
    return http.put(`/profiles/${id}`, data)
  }

  delete (id) {
    return http.delete(`/profiles/${id}`)
  }
}

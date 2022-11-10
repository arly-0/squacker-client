import $api from "../http/axios";

export default class AuthService {
    static async register(data) {
        return $api.post('/auth/register', data)
    }

    static async login(data) {
        return $api.post('/auth/login', {data})
    }

    static async logout(refreshToken) {
        return $api.post('/auth/logout', {refreshToken})
    }

    static async activate(activationLink) {
        return $api.get(`/auth/activate/${activationLink}`)
    }

    static async refresh(refreshToken) {
        return $api.post('/auth/refresh', {refreshToken})
    }
}
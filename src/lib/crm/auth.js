import $api from "../http/axios";

export default class AuthService {
    static async register({email, password}) {
        return $api.post('/auth/register', {email, password})
    }

    static async login({email, password}) {
        return $api.post('/auth/login', {email, password})
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
import Form from "../components/global/Form";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useLoginMutation, useRegisterMutation} from "../lib/store/auth/auth-slice-api";
import {setCredendials} from "../lib/store/auth/auth-slice";

export default function Login() {
    const fields = [
        {
            name: 'email',
            placeholder: 'Enter email',
            label: 'Email',
            type: 'email',
            required: true
        },
        {
            name: 'password',
            placeholder: 'Enter password',
            label: 'Password',
            type: 'password',
            required: true,
            minLength: 3,
            maxLength: 32
        }
    ]
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [login] = useLoginMutation()
    const [register] = useRegisterMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const path = window.location.pathname
    const title = path === '/login' ? 'Sign In' : 'Sign Up'
    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = path === '/login' ? await login(data).unwrap() : await register(data).unwrap()
            dispatch(setCredendials(response))
            navigate('/')
        } catch (error) {
            setError(error?.data)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='container-fluid mt-5 d-flex justify-content-center align-items-center'>
            <Form fields={fields} title={title} submitFunction={onSubmit} error={error} loading={loading}>
                {path === '/login' && <button onClick={() => navigate('/register')} type='button' className='btn btn-outline-primary w-100'>Sign Up</button>}
            </Form>
        </div>
    )
}
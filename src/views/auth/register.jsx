import Form from "../../components/global/Form";
import {setCredentials} from "../../lib/store/auth/auth-slice";
import {useState} from "react";
import {useRegisterMutation} from "../../lib/store/auth/auth-slice-api";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Register() {
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
    const [register] = useRegisterMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        try {
            setError(null)
            setLoading(true)
            const response = await register(data).unwrap()
            dispatch(setCredentials(response))
            navigate('/')
        } catch (error) {
            setError(error?.data)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='container-fluid mt-5 d-flex justify-content-center align-items-center'>
            <Form fields={fields} title='Register' submitFunction={onSubmit} error={error} loading={loading}>
                <div className='card-link d-flex justify-content-sm-evenly mt-3'>
                    <p>Already have an account?</p>
                    <p role="button" className='link-primary'
                       onClick={() => navigate('/login')}>
                        Login here
                    </p>
                </div>
            </Form>
        </div>
    )
}
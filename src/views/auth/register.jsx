import Form from "../../components/global/Form";
import {setCredentials} from "../../lib/store/auth/auth-slice";
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
    const [register] = useRegisterMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const response = await register(data).unwrap()
        dispatch(setCredentials(response))
        navigate('/')
    }
    return (
        <div className='container-fluid mt-5 d-flex justify-content-center align-items-center'>
            <Form fields={fields} title='Register' submitFunction={onSubmit}>
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
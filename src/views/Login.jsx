import Form from "../components/global/Form";
import {useState} from "react";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../lib/store/auth/auth-slice-api";
import { setCredendials } from "../lib/store/auth/auth-slice";

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
    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        try {
            const response = await login(data).unwrap()
            dispatch(setCredendials(response))
            navigate('/')
        } catch (error) {
            setError(error.data)
        }
    }
    return (
        <div className='container-sm'>
           <Form fields={fields} submitFunction={onSubmit} error={error} loading={isLoading}/>
        </div>
    )
}
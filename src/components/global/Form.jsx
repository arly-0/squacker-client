import {useForm} from "react-hook-form";
import ErrorOrLoading from "./ErrorOrLoading";
import {useState} from "react";

export default function Form({fields, title, submitFunction, children}) {
    const {register, formState: {errors}, handleSubmit, reset} = useForm({mode: "onSubmit"})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const onSubmit = data => {
        setLoading(true)
        submitFunction(data).catch(error => {
            setError(error?.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    const onCancel = () => {
        reset()
        setError(null)
        setLoading(false)
    }
    return (
        <div className='card w-50'>
            {title && <div className='card-header font-monospace card-title h2'>{title}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
                {fields.map(field =>
                    <div key={field.name} className='mb-3'>
                        <input
                            className={['form-control', errors[field.name] ? 'is-invalid' : null].join(' ')}
                            type={field.type}
                            placeholder={field.placeholder}
                            {...register(field.name,
                                {
                                    required: {value: field.required, message: `${field.label} is required`},
                                    min: {
                                        value: field.min,
                                        message: `Minimum ${field.label} value is ${field.min}`
                                    },
                                    max: {
                                        value: field.max,
                                        message: `Maximum ${field.label} value is ${field.max}`
                                    },
                                    minLength: {
                                        value: field.minLength,
                                        message: `Minimum ${field.label} length is ${field.minLength}`
                                    },
                                    maxLength: {
                                        value: field.maxLength,
                                        message: `Maximum ${field.label} length is ${field.maxLength}`
                                    },
                                })} />
                        <div className='text-danger'>{errors?.[field.name]?.message}</div>
                    </div>
                )}
                <ErrorOrLoading error={error} loading={loading}/>
                <div className='card-footer bg-transparent d-flex justify-content-evenly align-items-center'>
                    <button className='btn btn-outline-success' type='submit'>Submit</button>
                    <button className='btn btn-outline-danger' onClick={onCancel} type='reset'>Cancel</button>
                </div>
                {children && <div className='card-footer bg-transparent'>{children}</div>}
            </form>
        </div>)
}
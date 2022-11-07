import {useForm} from "react-hook-form";

export default function Form({fields, submitFunction}) {
    const {register, formState: {errors}, handleSubmit, reset} = useForm({mode: "onSubmit"})
    const onSubmit = data => {
        submitFunction(data)
    }
    const onCancel = () => {
        reset()
    }
    return (<form onSubmit={handleSubmit(onSubmit)} className='container-fluid m-3'>
        {fields.map(field =>
            <div key={field.name} className='mb-3'>
                <input
                    className={['form-control', errors[field.name] ? 'is-invalid' : null].join(' ')}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name,
                        {
                            required: {value: field.required, message: `${field.label} is required`},
                            min: {value: field.min, message: `Minimum ${field.label} value is ${field.min}`},
                            max: {value: field.max, message: `Maximum ${field.label} value is ${field.max}`},
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
        <div className='btn-group gap-3'>
            <button className='btn btn-outline-success' type='submit'>Submit</button>
            <button className='btn btn-outline-danger' onClick={onCancel} type='reset'>Cancel</button>
        </div>
    </form>)
}
export default function ErrorOrLoading({error, loading}) {
    return (
        <>
            {error &&
                <div className='alert alert-danger'>
                    {error.message}
                    {error.errors.length > 0 && error.errors.map(error => <p>{error}</p>)}
                </div>}
            {loading && <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
        </>
    )
}
import PropTypes from 'prop-types';

const LoginWithEmail = ({ handleLogInWithEmail, pinError }) => {
    return (
        <div className="pt-10 min-h-screen">
            <div className="hero-content flex-col">

                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login</h1>
                    <p className="py-6 text-xl font-medium">
                        Use your email to log in to your account
                    </p>
                </div>

                <div className="card w-full shadow-2xl">
                    <form onSubmit={handleLogInWithEmail} className="card-body">

                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="Enter your email" className="input input-bordered" required />
                        </div>


                        {/* PIN */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PIN (must use 5 digit)</span>
                            </label>
                            <input name="pin" type="number" placeholder="Enter a 5 digit pin number (Not more or less than 5)" className="input input-bordered" required />
                            <p className='text-red-600'>{pinError}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

LoginWithEmail.propTypes = {
    handleLogInWithEmail: PropTypes.func,
    pinError: PropTypes.string,
}

export default LoginWithEmail;
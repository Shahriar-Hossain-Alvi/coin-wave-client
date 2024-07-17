import PropTypes from 'prop-types';

const LoginWithMobile = ({ handleLogInWithMobile, pinError }) => {
    return (
        <div className="min-h-screen pt-10">
            <div className="hero-content flex-col">

                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login</h1>
                    <p className="py-6 text-xl font-medium">
                        Use your mobile number to log in to your account
                    </p>
                </div>



                <div className="card w-full shadow-2xl">
                    <form onSubmit={handleLogInWithMobile} className="card-body">

                        {/* mobile number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mobile Number</span>
                            </label>
                            <input name="mobileNumber" type="number" placeholder="Enter your mobile number" className="input input-bordered" required />
                        </div>


                        {/* PIN */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PIN (must use 5 digit)</span>
                            </label>
                            <input name="pin" type="number" placeholder="Enter your 5 digit pin number (Not more or less than 5)" className="input input-bordered" required />
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

LoginWithMobile.propTypes = {
    handleLogInWithMobile: PropTypes.func,
    pinError: PropTypes.string,
}

export default LoginWithMobile;
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const UserSignupForm = ({ handleUserSignUp, pinError }) => {
    return (
        <div className="pt-20 min-h-screen">
            <Helmet>
                <title>User Registration | Coin Wave </title>
            </Helmet>

            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Sign Up</h1>
                    <p className="py-6 text-xl font-medium">
                        Fill up the form below to create a new account
                    </p>
                </div>

                <div className="card w-full shadow-2xl">
                    <form onSubmit={handleUserSignUp} className="card-body">
                        {/* name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" placeholder="Enter your name" className="input input-bordered" required />
                        </div>

                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="Enter your email" className="input input-bordered" required />
                        </div>


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
                            <input name="pin" type="number" placeholder="Enter a 5 digit pin number (Not more or less than 5)" className="input input-bordered" required />
                            <span className='text-red-600'>{pinError}</span>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-cwViolate text-white hover:bg-cwOrange">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

UserSignupForm.propTypes = {
    handleUserSignUp: PropTypes.func,
    pinError: PropTypes.string,
}

export default UserSignupForm;
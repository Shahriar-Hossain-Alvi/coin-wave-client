import PropTypes from 'prop-types';

const AgentSignUpForm = ({ handleAgentSignUp }) => {

    return (
        <div className="pt-20 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Sign Up</h1>
                    <p className="py-6 text-xl font-medium">
                        Fill up the form below to create a new agent account
                    </p>
                </div>

                <div className="card w-full shadow-2xl">
                    <form onSubmit={handleAgentSignUp} className="card-body">
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

AgentSignUpForm.propTypes = {
    handleAgentSignUp: PropTypes.func,
}

export default AgentSignUpForm;
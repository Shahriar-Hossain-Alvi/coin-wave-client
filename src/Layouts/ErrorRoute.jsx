import Lottie from "react-lottie";
import errorAnimation from "../assets/Animations/ErrorAnimation.json";
import { Link } from "react-router-dom";


const ErrorRoute = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: errorAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Lottie options={defaultOptions}
                height={500}
                width={500}
            />

            <h2 className="text-xl text-red-600 font-medium">Something wrong happened</h2>

            <Link className="mt-4 btn bg-cwViolate text-white hover:bg-cwOrange" to='/'>
                DASHBOARD
            </Link>
        </div>
    );
};

export default ErrorRoute;
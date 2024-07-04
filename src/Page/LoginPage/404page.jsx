import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Page404() {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate("/login");
        }, 5000); // Redirect after 5 seconds (5000 milliseconds)
        return () => {
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <main>
            <div className="container" style={{ padding: "30px" }}>
                <div className="row">
                    <div className="col-md-6 align-self-center">
                        <img
                            src="https://i.pinimg.com/564x/e1/c8/8a/e1c88a62b2902aed59ac32a499515d5f.jpg"
                            alt="404 Image"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                    <div className="col-md-6 align-self-center">
                        <h1>404 - Not Found</h1>
                        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                        <p>You will be redirected to the homepage in 5 seconds.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Page404;

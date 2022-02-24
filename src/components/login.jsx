import { useRef, useState } from 'react';

export default function Login() {
    const [account, setAccount] = useState({ userName: "", password: "" });
    const [error, setError] = useState({})
    const userName = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        validateInputs();
        // setAccount({ userName: "", password: "" })
    }

    const handleFieldChange = e => {
        const newAccount = { ...account };
        newAccount[e.target.name] = e.target.value;
        setAccount(newAccount);
    }

    const validateInputs = () => {
        const errorMsg = {}
        if (account.userName === "")
            errorMsg.userName = "User Name Required";
        if (account.password === "")
            errorMsg.password = "Password Required";

        console.log(errorMsg)
        setError(errorMsg);
    }

    return (
        <div className="d-flex justify-content-center">
            <div>
                <h3 className="d-flex justify-content-center mb-5">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">User Name</label>
                        <input ref={userName} id="userName" autoFocus={true} type="text" className="form-control" name="userName" value={account.userName} onChange={handleFieldChange} />
                        { error.userName &&
                            <div className='alert alert-danger' role="alert">{error.userName}</div>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input id="password" type="password" className="form-control" name="password" value={account.password} onChange={handleFieldChange} />
                        { error.password &&
                            <div className='alert alert-danger' role="alert">{error.password}</div>
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        </div>
    )
}
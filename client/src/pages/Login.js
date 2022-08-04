import React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (formData) => {
        const { data, status } = await axios.post("/user/login", formData);
        status === 200 && reset();
        console.log(data);
    };
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center">
                <div style={{ width: "35%" }}>
                    <h1>Login User</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                className="form-control"
                                placeholder="Enter Your Email"
                                id="email"
                                type="email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span style={{ color: "red" }}>E-Mail Id is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                placeholder="Enter Your Password"
                                className="form-control"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span style={{ color: "red" }}>Password is required</span>}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

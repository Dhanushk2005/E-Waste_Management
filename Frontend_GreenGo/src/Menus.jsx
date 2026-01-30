import React, { useEffect, useRef, useState } from "react";


export function Profile() {
    const user = JSON.parse(localStorage.getItem("userBody"));
    return (
        <div className="profile_container">
            <h3>{user.user_type}</h3>
            <p>Name : {user.fullName}</p>
            <p>Email : {user.email}</p>
        </div>
    )
}

export function AboutUs() {

}


export function NewRequest() {

    const formRef = useRef();
    const user = JSON.parse(localStorage.getItem("userBody"));
    const [category, setCategory] = useState("Phone");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [condition, setCondition] = useState("");
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState("");
    const email = user.email;
    const [frontImage, setFrontInage] = useState(null);
    const [backImage, setBackImage] = useState(null);

    const requestApi = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("category", category);
        formData.append("brand", brand);
        formData.append("model", model);
        formData.append("condition", condition);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("frontImage", frontImage);
        formData.append("backImage", backImage);
        const response = await fetch("http://localhost:789/request/sendRequest", {
            method: "POST",
            body: formData
        })
        const message = await response.text();
        alert(message);
        setAddress("");
        setBackImage(null);
        setBrand("");
        setCategory("");
        setCondition("");
        setFrontInage(null);
        setModel("");
        setPhone("");
        formRef.current.reset();

    }
    return (
        <div className="menus">
            <div className="Request_page">
                <h1>E-Waste Disposal</h1>
                <form ref={formRef} onSubmit={requestApi}>
                    <div className="user_request_container">
                        <div className="register_inputs">
                            <label htmlFor="category">Device Category : </label>
                            <select id="category" className="res_input" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="phone">Phone</option>
                                <option value="tablet">Tablet</option>
                                <option value="laptop">Laptop</option>
                                <option value="monitor/TV">Monitor/TV</option>
                                <option value="refrigerator">Refrigerator</option>
                                <option value="batteries">Batteries</option>
                                <option value="carger/adapters">Carger/Adapters</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        <div className="register_inputs">
                            <label htmlFor="brand">Brand : </label>
                            <input type="text" id="brand" className="res_input" value={brand} onChange={(e) => setBrand(e.target.value)} required></input>
                        </div>

                        <div className="register_inputs">
                            <label htmlFor="model">Model : </label>
                            <input type="text" id="model" className="res_input" value={model} onChange={(e) => setModel(e.target.value)} required></input>
                        </div>

                        <div className="register_inputs">
                            <label htmlFor="itemCondition">Device Condition : </label>
                            <input type="text" id="itemCondition" className="res_input" value={condition} onChange={(e) => setCondition(e.target.value)} required></input>
                        </div>

                        <div className="register_inputs">

                            <label htmlFor="phone">Contact Number : </label>
                            <input type="number" id="phone" className="res_input" value={phone} onChange={(e) => setPhone(e.target.value)} required></input>
                        </div>

                        <div className="register_inputs">
                            <label htmlFor="address">Address : </label>
                            <textarea id="address" className="res_input" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
                        </div>

                        <div className="register_inputs">
                            <label htmlFor="front_side_image"> Front Side Photo : </label>
                            <input type="file" id="front_side_image" className="res_input" onChange={(e) => setFrontInage(e.target.files[0])} required></input>
                        </div>

                        <div className="register_inputs">
                            <label htmlFor="back_side_image">Back Side Photo : </label>
                            <input type="file" id="back_side_image" className="res_input" onChange={(e) => setBackImage(e.target.files[0])} required></input>
                        </div>
                    </div>
                    <button type="submit" id="request_submit_button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export function RequestHistory() {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await fetch("http://localhost:789/request/getAll");
            const data = await response.json();
            setRequests(data);

        }
    }, [])

    return (
        <>
            <div>
                {
                    requests.forEach((request) => {
                        <h3>request.user.email</h3>
                    })
                }
            </div>
        </>
    )
}

export function ContactUs() {

}

export function UserRequest() {

}

export function Requests() {
    const [requests, setrequests] = useState([]);
    const [isUserDetails, setIsUserDetails] = useState();
    const [selectRequest, setSelectedRequest] = useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            const responce = await fetch("http://localhost:789/request/status", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ "status": "Waiting For Admin Approval" })
            })
            const data = await responce.json()
            setrequests(data)
        }
        fetchApi();
    }, [])

    const HandleClick = (req) => {
        setSelectedRequest(req);
        setIsUserDetails(true);
    }
    function CreateRequest() {

        return (
            <div className="menus">
                {!isUserDetails ? (
                    <table className="user_request_table">
                        <thead>
                            <tr>
                                <th>
                                    Request No.
                                </th>
                                <th>
                                    User
                                </th>
                                <th>
                                    Contact
                                </th>
                                <th>
                                    Status
                                </th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                requests.map((req, index) => {

                                    return (
                                        <tr key={index} className="request_rows">
                                            <td>
                                                <h3>{req.request_token}</h3>
                                            </td>
                                            <td>
                                                <h4 key={index} className="userNameInRequest" onClick={() => HandleClick(req)}>{req.user.fullName}</h4>

                                            </td>
                                            <td>
                                                <h4>{req.user.email}</h4>
                                                <p>{req.phone}</p>
                                            </td>
                                            <td>
                                                <h5>{req.status}</h5>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <div className="user_request_table">
                        <h1>{selectRequest.user.fullName}</h1>
                        <h3>{selectRequest.user.email}</h3>
                        <h3>{selectRequest.phone}</h3><br /> <br />
                        <h1>Request Detail</h1>
                        <div className="userRequestDeviceDetails">
                            <p>Device Category : {selectRequest.category}</p>
                            <p>Device Model : {selectRequest.model}</p>
                            <p>Device Condition : {selectRequest.itemCondition}</p>
                        </div>
                        <br />
                        <button className="userRequestButton" >Request Accept</button>
                    </div>
                )
                }
            </div>
        )
    }

    return (
        <div className="Request_container">
            <p className="user_message">Click the User name to Access the request details and accept the request</p>
            <CreateRequest />
        </div>
    )
}
import React, { useState, useEffect } from "react";
import './Admin.css'

function Admin() {
    useState[request, setRequest] = useState([]);


    // useEffect(() => {
    //     function requestUpdate() {
    //         fetch("").
    //             then(res => res.json).
    //             then(setRequest(res)).
    //             catch((err) => console.error("Error: ", err))
    //     }
    //     requestUpdate();
    //     const interval = setInterval(requestUpdate(), 5000);

    //     return () => clearImmediate(interval);
    // }, [])

    return (
        <div className="Admin_page">
            <div className="Admin_container">
                <select>
                    <option value="newRequest">
                        New Request
                    </option>
                    <option value="onGoing">
                        On Going
                    </option>
                    <option value="Completed">
                        Completed
                    </option>
                    <option value="Cancelled">
                        Cancelled
                    </option>
                </select>
                {/* <tabel id="User_request" className="request">
                    <tbody>
                        {
                            request.map((req) => {
                                <tr data-user={req.email}>
                                    <h3>
                                        Request Token : {req.request_token}
                                    </h3>
                                    <h4>
                                        Email : {req.email} <br />
                                    </h4>
                                    <br />
                                    <p>Status : {req.status}</p>
                                </tr>
                            })
                        }
                    </tbody>
                </tabel> */}

            </div>

        </div>
    );
}

export default Admin;
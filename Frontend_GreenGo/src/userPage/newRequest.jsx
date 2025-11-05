import { useState } from "react";

function NewRequest(){

     const [category, setCategory] = useState("Phone");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [condition, setCondition] = useState("");
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [frontImage, setFrontInage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    return(
        <div className="Request_page">
                <h1>E-Waste Disposal</h1>
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
                        <input type="text" id="brand" className="res_input" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
                    </div>

                    <div className="register_inputs">
                        <label htmlFor="model">Model : </label>
                        <input type="text" id="model" className="res_input" value={model} onChange={(e) => setModel(e.target.value)}></input>
                    </div>

                    <div className="register_inputs">
                        <label htmlFor="itemCondition">Device Condition : </label>
                        <input type="text" id="itemCondition" className="res_input" value={condition} onChange={(e) => setCondition(e.target.value)}></input>
                    </div>

                    <div className="register_inputs">

                        <label htmlFor="phone">Contact Number : </label>
                        <input type="number" id="phone" className="res_input" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                    </div>

                    <div className="register_inputs">
                        <label htmlFor="address">Address : </label>
                        <textarea id="address" className="res_input" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                    </div>

                    <div className="register_inputs">
                        <label htmlFor="front_side_image"> Front Side Photo : </label>
                        <input type="file" id="front_side_image" className="res_input" value={frontImage} onChange={(e) => setFrontInage(e.target.value)}></input>
                    </div>

                    <div className="register_inputs">
                        <label htmlFor="back_side_image">Back Side Photo : </label>
                        <input type="file" id="back_side_image" className="res_input" value={backImage} onChange={(e) => setBackImage(e.target.value)}></input>
                    </div>
                </div>
                <button type="submit" id="request_submit_button">Submit</button>
            </div>
    )
}
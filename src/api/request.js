import axios from "axios";

// axios.defaults.baseURL = process.env.NEXT_APP_API_URL;
// axios.defaults.baseURL = `https://weather-node-back-end.onrender.com/api/`;
axios.defaults.baseURL = `http://localhost:4000/api/`;

const request = (options) => {
    //Request header options
    let headers = {
        "Content-Type": "application/json",
    };

    //Assigning authorization token to the header object
    // if (localStorage.getItem("cred")) {
    //     let token = JSON.parse(localStorage.getItem("cred")).token;

    //     Object.assign(headers, { Authorization: "Bearer " + token });
    // }

    //Assigning header to options
    Object.assign(options, { headers });

    //Actual axios request
    return axios(options)
        .then((res) => {
            // console.log("response in request", res.data);
            return res.data;
        })
        .catch((err) => {
            console.log("error in request", err.response);
            return err.response.data;
        });
};

export default request;

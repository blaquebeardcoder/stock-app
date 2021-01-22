import React, { useState, useEffect } from "react";
import axios from "axios";

const STOCK_URL = `${process.env.REACT_APP_STOCK_URL}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const Microsoft = () => {

    const [msftSymbol, setMsftSymbol] = useState('');
    const [msftCompany, setMsftCompany] = useState('');
    const [msftPercent, setMsftPercent] = useState('');
    const [msftClose, setMsftClose] = useState('');

    useEffect(() => {
        const search = async () => {

            const { data } = await axios.get(`${STOCK_URL}/stable/stock/msft/quote?token=${API_KEY}`);
            setMsftSymbol(data.symbol);
            setMsftCompany(data.companyName);
            setMsftPercent((data.changePercent * 100).toFixed(2));
            setMsftClose(data.close);
        }
        search()
    }, []);

    const colorChange = msftPercent < 0 ? "red" : "green";

    return (
        <div className="stockCompany">
            <div className="flex">
                <h2>{msftSymbol}</h2>
                <p>{msftClose}</p>
            </div>
            <div className="flex-bottom">
                <p>{msftCompany}</p>
                <p className={`${colorChange}`}>{msftPercent}%</p>
            </div>
        </div>
    );
}

export default Microsoft;
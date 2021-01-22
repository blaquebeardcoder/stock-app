import React, { useState, useEffect } from "react";
import axios from "axios";

const STOCK_URL = `${process.env.REACT_APP_STOCK_URL}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const Amazon = () => {

    const [amznSymbol, setAmznSymbol] = useState('');
    const [amznCompany, setAmznCompany] = useState('');
    const [amznPercent, setAmznPercent] = useState('');
    const [amznClose, setAmznClose] = useState('');

    useEffect(() => {
        const search = async () => {

            const { data } = await axios.get(`${STOCK_URL}/stable/stock/amzn/quote?token=${API_KEY}`);
            setAmznSymbol(data.symbol);
            setAmznCompany(data.companyName);
            setAmznPercent((data.changePercent * 100).toFixed(2));
            setAmznClose(data.close);
        }
        search()
    }, []);

    const colorChange = amznPercent < 0 ? "red" : "green";

    return (
        <div className="stockCompany">
            <div className="flex">
                <h2>{amznSymbol}</h2>
                <p>{amznClose}</p>
            </div>
            <div className="flex-bottom">
                <p>{amznCompany}</p>
                <p className={`${colorChange}`}>{amznPercent}%</p>
            </div>
        </div>
    );
}

export default Amazon;
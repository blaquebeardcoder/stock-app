import React, { useState, useEffect } from "react";
import axios from "axios";

const STOCK_URL = `${process.env.REACT_APP_STOCK_URL}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const Apple = () => {

    const [aaplSymbol, setAaplSymbol] = useState('');
    const [aaplCompany, setAaplCompany] = useState('');
    const [aaplPercent, setAaplPercent] = useState('');
    const [aaplClose, setAaplClose] = useState('');

    useEffect(() => {
        const search = async () => {

            const { data } = await axios.get(`${STOCK_URL}/stable/stock/aapl/quote?token=${API_KEY}`);
            setAaplSymbol(data.symbol);
            setAaplCompany(data.companyName);
            setAaplPercent((data.changePercent * 100).toFixed(2));
            setAaplClose(data.close);
        }
        search()
    }, []);

    const colorChange = aaplPercent < 0 ? "red" : "green";

    return (
        <div className="stockCompany">
            <div className="flex">
                <h2>{aaplSymbol}</h2>
                <p>{aaplClose}</p>
            </div>
            <div className="flex-bottom">
                <p>{aaplCompany}</p>
                <p className={`${colorChange}`}>{aaplPercent}%</p>
            </div>
        </div>
    );
}

export default Apple;
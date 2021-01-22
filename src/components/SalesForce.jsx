import React, { useState, useEffect } from "react";
import axios from "axios";

const STOCK_URL = `${process.env.REACT_APP_STOCK_URL}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const SalesForce = () => {

    const [crmSymbol, setCrmSymbol] = useState('');
    const [crmCompany, setCrmCompany] = useState('');
    const [crmPercent, setCrmPercent] = useState('');
    const [crmClose, setCrmClose] = useState('');

    useEffect(() => {
        const search = async () => {

            const { data } = await axios.get(`${STOCK_URL}/stable/stock/crm/quote?token=${API_KEY}`);
            setCrmSymbol(data.symbol);
            setCrmCompany(data.companyName);
            setCrmPercent((data.changePercent * 100).toFixed(2));
            setCrmClose(data.close);
        }
        search()
    }, []);

    const colorChange = crmPercent < 0 ? "red" : "green";

    return (
        <div className="stockCompany">
            <div className="flex">
                <h2>{crmSymbol}</h2>
                <p>{crmClose}</p>
            </div>
            <div className="flex-bottom">
                <p>{crmCompany}</p>
                <p className={`${colorChange}`}>{crmPercent}%</p>
            </div>
        </div>
    );
}

export default SalesForce;
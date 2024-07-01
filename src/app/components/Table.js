"use client"
import React, { useState } from "react";
import tableData from '../constants/tableData'
import { BiInfoSquare } from "react-icons/bi";
import InfoButton from "./InfoButton";
const Table = () => {
    const [detailsVisible, setDetailsVisible] = useState(Array(tableData.length).fill(false));
    const toggleDetails = (index) => {
        const newDetailsVisible = [...detailsVisible];
        newDetailsVisible[index] = !newDetailsVisible[index];
        setDetailsVisible(newDetailsVisible);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="container mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="min-w-full bg-white border-collapse rounded-t-2xl overflow-hidden">
                        <thead>
                            <tr>
                                <th className="py-4 px-6 bg-[#784BF8] text-white text-left">Coin</th>
                                <th className="py-4 px-6 bg-[#784BF8] text-white text-left">Exchange</th>
                                <th className="py-4 px-6 bg-[#784BF8] text-white text-left">Quantity</th>
                                <th className="py-4 px-6 bg-[#784BF8] text-white text-left">$ PPU</th>
                                <th className="py-4 px-6 bg-[#784BF8] text-white text-left">Action</th>
                                <th className="py-4 px-6 bg-[#784BF8] text-white text-left">Edge</th>
                                <th className="py-4 px-6 bg-[#784BF8] text-white text-left">Fade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data, index) => (
                                <React.Fragment key={index}>
                                    <tr className="border-b">
                                        <td className="py-4 px-6 flex items-center ">
                                            <div
                                                className="mr-2 cursor-pointer"
                                                onClick={() => toggleDetails(index)}
                                            >
                                            <InfoButton/>
                                            </div>
                                            {data.coin}
                                        </td>
                                        <td className="py-4 px-6">{data.exchange}</td>
                                        <td className="py-4 px-6">{data.quantity}</td>
                                        <td className="py-4 px-6">{data.ppu}</td>
                                        <td className="py-4 px-6">{data.action}</td>
                                        <td className="py-4 px-6 text-green-500">{data.edge}</td>
                                        <td className="py-4 px-6 text-red-500">{data.fade}</td>
                                    </tr>
                                    {detailsVisible[index] && (
                                        <tr className="details active">
                                            <td colSpan="2" className="py-4 px-6">
                                                <div className="bg-white ">
                                                    <table className="min-w-full bg-white border-collapse">
                                                        <thead className="border-2 border-gray-200">
                                                            <tr className="border-2 border-gray-200">
                                                                <th className="py-2 px-4 text-left border-2 border-gray-200"></th>
                                                                <th className="py-2 px-4 text-left border-2 border-gray-200">3M</th>
                                                                <th className="py-2 px-4 text-left border-2 border-gray-200">10M</th>
                                                                <th className="py-2 px-4 text-left border-2 border-gray-200">16M</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="border-2 border-gray-200">
                                                            <tr className="border-2 border-gray-200">
                                                                <td className="py-2 px-4 border-2  border-2 border-gray-200 font-bold">R-EWMA:</td>
                                                                <td className="py-2 px-2 text-green-500 border-2 border-gray-200">{data.details.rewma['3M']}</td>
                                                                <td className="py-2 px-4 border-gray-200 border-2">{data.details.rewma['10M']}</td>
                                                                <td className="py-2 px-4 border-2 border-gray-200">{data.details.rewma['16M']}</td>
                                                            </tr>
                                                            <tr className="border-2 border-gray-200">
                                                                <td className="py-2 px-4 border-2 border-gray-200 font-bold">B-EWMA:</td>
                                                                <td className="py-2 px-4 border-2 border-gray-200">{data.details.bewma['3M']}</td>
                                                                <td className="py-2 px-4 border-2 border-gray-200">{data.details.bewma['10M']}</td>
                                                                <td className="py-2 px-4 border-2 border-gray-200">{data.details.bewma['16M']}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;

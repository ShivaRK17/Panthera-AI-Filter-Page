"use client";
import React, { useState } from "react";
import crypto from '../constants/crypto'
import 'tailwindcss/tailwind.css';
import exchanges from "../constants/exchanges";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";

const Header = () => {
    const [sortBy, setSortBy] = useState("");
    const [summaryType, setSummaryType] = useState(null);
    const [coinType, setCoinType] = useState("");
    const [selectedCoins, setSelectedCoins] = useState([]);
    const [selectedExchanges, setSelectedExchanges] = useState([])
    const [exchangeType, setExchangeType] = useState("");
    const [searchRange, setSearchRange] = useState(false);
    const [rangeFrom, setRangeFrom] = useState("");
    const [rangeTo, setRangeTo] = useState("");
    const [searchVolume, setSearchVolume] = useState(false);

    const [expanded, setExpanded] = useState(true)

    const toggleCoinSelection = (coin) => {
        setSelectedCoins(prevSelected =>
            prevSelected.includes(coin)
                ? prevSelected.filter(selected => selected !== coin)
                : [...prevSelected, coin]
        );
    };
    const toggleExchSelection = (exch) => {
        setSelectedExchanges(prevSelected =>
            prevSelected.includes(exch)
                ? prevSelected.filter(selected => selected !== exch)
                : [...prevSelected, exch]
        );
    };
    const filteredCrypto = crypto.filter(coin =>
        coinType === '' || coin.toLowerCase().includes(coinType.toLowerCase())
    );
    const filteredExchanges = exchanges.filter(exch =>
        exchangeType === '' || exch.toLowerCase().includes(exchangeType.toLowerCase())
    );
    const selectAllCoins = () => {
        setSelectedCoins(filteredCrypto);
    };
    const selectAllExhanges = () => {
        setSelectedExchanges(filteredExchanges);
    };
    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    const Button = ({ index, title, type }) => {
        return (
            <div className="p-2 text-white bg-[#784BF8] rounded-full flex min-w-[92px] justify-evenly items-center">
                <div className="py-1">
                    <AiFillCloseSquare className="text-base cursor-pointer" onClick={() => {
                        if (type === "exch") {
                            toggleExchSelection(title)
                        }
                        else {
                            toggleCoinSelection(title)
                        }
                    }} />
                </div>
                <button key={1} className="text-base font-normal">{title}</button>
            </div>
        )
    }
    return (
        <div className="p-4 font-inter">
            <div className="container mx-auto">
                <h1 className="text-center text-2xl font-bold text-purple-700 mb-8 mt-5">
                    Liquidity Summaries
                </h1>
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <div className="mb-6">
                        <div className="flex w-100 justify-between items-center">
                            <h2 className="text-xl font-bold mb-4">Filters</h2>
                            {expanded && <div className="p-1 cursor-pointer" onClick={toggleExpanded}><FaMinus size={26} /></div>}
                            {!expanded && <div className="p-1 cursor-pointer" onClick={toggleExpanded}><FaPlus size={26} /></div>}
                        </div>
                        {expanded ? <>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Sort By:</label>
                                <div className="flex space-x-4">
                                    <button
                                        className={`w-1/3 py-2 rounded-[15px] ${sortBy === 'Dollar Gains High to Low' ? 'bg-[#784BF8] text-white' : 'bg-gray-200'}`}
                                        onClick={() => setSortBy('Dollar Gains High to Low')}
                                    >
                                        Dollar Gains High to Low
                                    </button>
                                    <button
                                        className={`w-1/3 py-2 rounded-[15px] ${sortBy === '% Gains High to Low' ? 'bg-[#784BF8] text-white' : 'bg-gray-200'}`}
                                        onClick={() => setSortBy('% Gains High to Low')}
                                    >
                                        % Gains High to Low
                                    </button>
                                    {!searchVolume && < button
                                        className={`w-1/3 py-2 rounded-[15px] ${sortBy === 'Volume High to Low' ? 'bg-[#784BF8] text-white' : 'bg-gray-200'}`}
                                        onClick={() => setSortBy('Volume High to Low')}
                                    >
                                        Volume High to Low
                                    </button>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Summary Types:</label>
                                <div className="flex space-x-4">
                                    <button
                                        className={`w-1/2 py-2 rounded-[15px] ${summaryType === 'singles' ? 'bg-[#784BF8] text-white' : 'bg-gray-200'}`}
                                        onClick={() => setSummaryType('singles')}
                                    >
                                        Singles
                                    </button>
                                    <button
                                        className={`w-1/2 py-2 rounded-[15px] ${summaryType === 'pairs' ? 'bg-[#784BF8] text-white' : 'bg-gray-200'}`}
                                        onClick={() => setSummaryType('pairs')}
                                    >
                                        Pairs
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Coin Type:</label>
                                <div className="border-2 border-[#d5d1d1] p-4 rounded-[15px]">
                                    <div className="w-full mb-2 px-4 py-2 bg-white rounded-[15px] border border-gray-300 flex items-center">
                                        <div className="h-full">
                                            <IoSearchSharp className="text-lg mr-1" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search Coin Type"
                                            value={coinType}
                                            onChange={(e) => setCoinType(e.target.value)}
                                            className="h-full w-full outline-none"
                                        />
                                    </div>
                                    <button onClick={selectAllCoins} className="px-3 py-2 bg-gray-200 rounded-[15px] my-2">Select All</button>
                                    <div className="grid grid-cols-9 gap-2">
                                        {filteredCrypto.map((coin, ind) => {
                                            return <button key={ind} onClick={() => toggleCoinSelection(coin)} className={`py-2 rounded-[15px] ${selectedCoins.includes(coin) ? 'bg-[#784bf8] text-white' : 'bg-gray-200'}`}>{coin}</button>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Exchanges:</label>
                                <div className="border-2 border-[#d5d1d1] p-4 rounded-[15px]">
                                    <div className="w-full mb-2 px-4 py-2 bg-white rounded-[15px] border border-gray-300 flex items-center">
                                        <div className="h-full">
                                            <IoSearchSharp className="text-lg mr-1" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search Exchange Type"
                                            value={exchangeType}
                                            onChange={(e) => setExchangeType(e.target.value)}
                                            className="h-full w-full outline-none"
                                        />
                                    </div>
                                    <button onClick={selectAllExhanges} className="px-3 py-2 bg-gray-200 rounded-[15px] my-2">Select All</button>
                                    <div className="grid grid-cols-8 gap-2">
                                        {filteredExchanges.map((exch, ind) => {
                                            return <button key={ind} onClick={() => toggleExchSelection(exch)} className={`py-2 rounded-[15px] ${selectedExchanges.includes(exch) ? 'bg-[#784bf8] text-white' : 'bg-gray-200'}`}>{exch}</button>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </> : <>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Coin Type:</label>
                                <div className="border-2 border-[#d5d1d1] p-4 rounded-[15px]">
                                    <h5>{selectedCoins.length === 0 && 'No Coins Selected'}</h5>
                                    <div className="grid grid-cols-9 gap-2">
                                        {selectedCoins.map((coin, ind) => {
                                            return <Button type={"coin"} key={ind} title={coin} className={`py-2 rounded-[15px] ${selectedCoins.includes(coin) ? 'bg-[#784bf8] text-white' : 'bg-gray-200'}`}>{coin}</Button>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Exchanges:</label>
                                <div className="border-2 border-[#d5d1d1] p-4 rounded-[15px]">
                                    <h5>{selectedExchanges.length === 0 && 'No Exchanges Selected'}</h5>
                                    <div className="grid grid-cols-8 gap-2">
                                        {selectedExchanges.map((exch, ind) => {
                                            return <Button type={"exch"} key={ind} title={exch} className={`py-2 rounded-[15px] ${selectedExchanges.includes(exch) ? 'bg-[#784bf8] text-white' : 'bg-gray-200'}`}>{exch}</Button>
                                        })}
                                    </div>
                                </div>
                            </div>
                            {sortBy!=="" && <div className="mb-4 flex items-center w-full">
                                <label className="block font-semibold ">Sort By:</label>
                                <div className="flex space-x-4">
                                    <button
                                        className={`w-full px-3 py-1 mx-4 min-w-[240px] rounded-[15px] bg-[#784BF8] text-white`}
                                    >
                                        {sortBy}
                                    </button>
                                </div>
                            </div>}
                        </>}

                        <div className="flex justify-evenly items-center">
                            <div className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    id="search-range"
                                    checked={searchRange}
                                    onChange={() => setSearchRange(!searchRange)}
                                    className="mr-2"
                                />
                                <label htmlFor="search-range" className="mr-4 font-semibold">Search Range:</label>
                                <input
                                    type="text"
                                    value={rangeFrom}
                                    disabled={searchRange===false}
                                    onChange={(e) => setRangeFrom(e.target.value)}
                                    className="px-4 w-[160px] py-2 bg-gray-200 rounded-[15px] mr-2"
                                    placeholder=""
                                    />
                                <label htmlFor="to" className="mr-2">to</label>
                                <input
                                    type="text"
                                    value={rangeTo}
                                    disabled={searchRange===false}
                                    onChange={(e) => setRangeTo(e.target.value)}
                                    className="px-4 w-[160px] py-2 bg-gray-200 rounded-[15px]"
                                    placeholder=""
                                />
                            </div>
                            <div className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    id="search-volume"
                                    checked={searchVolume}
                                    onChange={() => setSearchVolume(!searchVolume)}
                                    className="mr-2"
                                />

                                <label htmlFor="search-volume mx-1 font-semibold">Search Volume:</label>
                                <input
                                    type="text"
                                    disabled={searchRange===false}
                                    className="px-4 mx-2 w-[160px] py-2 bg-gray-200 rounded-[15px]"
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Header;

import { useEffect, useMemo, useState } from "react";
import "./App.css";
import useRef from "react";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, useMap } from "react-leaflet";

import React from "react";

export const Map = (lat): JSX.Element => {
    console.log(lat?.lng);
    console.log(lat?.lat);

    return (
        <MapContainer
            className=""
            style={{ height: "50vh" }}
            center={[lat?.lat, lat?.lng]}
            zoom={13}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
};

function App() {
    const [value, setValue] = useState<string>("");
    const [info, setInfo] = useState<Array>();

    const getIpInfo = async (ip: number) => {
        try {
            const response = await fetch(
                `https://geo.ipify.org/api/v2/country,city?apiKey=at_ZOf6J9cGDgFHM8b5jPe0CqRvNUULo&ipAddress=${ip}`
            );
            const data = await response.json();
            setInfo(data);

            if (data.code == 422) alert("there are some mistake");
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSumbit = (e: React.FormEvent): void => {
        e.preventDefault();
        getIpInfo(value);

        setValue("");
    };
    const handleChange = (e: React.FormEvent): void => {
        setValue(e.target.value);
    };

    useEffect(() => {
        Map;
        Map();
    }, [info]);
    return (
        <div>
            <div className=" bg-no-repeat bg-cover relative flex justify-center flex-col bg-headBg p-10">
                <h1 className="text-white text-3xl font-bold text-center">
                    Ip tracker
                </h1>
                <form
                    action=""
                    className="text-center my-10"
                    onSubmit={handleSumbit}
                >
                    <input
                        className="p-3 rounded-l-xl "
                        type="text"
                        value={value}
                        onChange={handleChange}
                    />
                    <input
                        className="bg-gray-500 p-3 rounded-r-xl text-white"
                        type="submit"
                        placeholder="send"
                    />
                </form>

                <div className="flex min-w-1/2 gap-10  rounded-lg bg-white z-100  p-10 flex-col items-center md:flex-row justify-between">
                    <div className="flex flex-col text-center lg:text-start">
                        <p className="text-gray-400">ip address:</p>
                        <h1 className="text-xl"> {info?.ip}</h1>
                    </div>
                    <div className="flex flex-col text-center lg:text-start">
                        <p className="text-gray-400"> location:</p>
                        <h1 className="text-xl">
                            {info?.location?.city},{info?.location?.country}
                        </h1>
                    </div>
                    <div className="flex flex-col text-center lg:text-start">
                        <p className="text-gray-400"> timezone:</p>
                        <h1 className="text-xl">{info?.location?.timezone}</h1>
                    </div>{" "}
                    <div className="flex flex-col text-center lg:text-start">
                        <p className="text-gray-400"> isp:</p>
                        <h1 className="text-xl">{info?.isp}</h1>
                    </div>
                </div>
            </div>
            <div className="form"></div>

            <div className="info justify-center flex">
                {/* {info === undefined || info?.code === 422 ? null : ( */}
            </div>
            <div className="map -z-1">
                {info === undefined || info?.code === 422 ? null : (
                    <Map lat={info?.location?.lat} lng={info?.location?.lng} />
                )}
            </div>
        </div>
    );
}

export default App;

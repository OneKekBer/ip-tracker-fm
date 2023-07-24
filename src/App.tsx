import { useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./Map";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
function App() {
    const [value, setValue] = useState<string>("");
    const [info, setInfo] = useState<Array>();

    const getIpInfo = async (ip: number) => {
        try {
            const response = await fetch(
                `https://geo.ipify.org/api/v2/country?apiKey=at_ZOf6J9cGDgFHM8b5jPe0CqRvNUULo&ipAddress=${ip}`
            );
            const data = await response.json();
            setInfo(data);
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
    return (
        <div>
            <div className=" bg-no-repeat bg-headBg p-10">
                <h1 className="text-white text-xl text-center">Ip tracker</h1>
                <form action="" onSubmit={handleSumbit}>
                    <input type="text" value={value} onChange={handleChange} />
                    <input type="submit"></input>
                </form>
            </div>
            <div className="form"></div>

            <div className="info justify-center flex">
                {/* {info === undefined || info?.code === 422 ? null : ( */}
                <div className="flex w-1/2 border-2 p-10 justify-between">
                    <div>ip address: {info?.ip}</div>
                    <div>
                        location: {info?.location?.region},
                        {info?.location?.country}
                    </div>

                    <div>timezone: {info?.location?.timezone}</div>
                    <div>isp: {info?.isp}</div>
                </div>
                {/* )} */}
            </div>
            <div className="map">
                <MapContainer
                    className=""
                    style={{ height: "50vh" }}
                    center={[51.505, -0.09]}
                    zoom={13}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </div>
    );
}

export default App;

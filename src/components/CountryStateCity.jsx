import React, { useState } from "react";
import { CountrySelect, StateSelect, CitySelect  } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function CountryStateCity({ setCountry, country, currentCity, setCurrentCity, currentState, setCurrentState , error }) {

    return (
        <div>
            <CountrySelect
                containerClassName="form-group"
                inputClassName=""
                onChange={(_country) => setCountry(_country)}
                onTextChange={(_txt) => console.log(_txt)}
                placeHolder="Select Country"
            />
               {error.country && (
                    <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "75px" }}>
                        {error.country}
                    </div>
                )}

            <div className="row">
                <div className="col-lg-6">

                    <StateSelect
                        countryid={country?.id}
                        containerClassName="form-group"
                        inputClassName=""
                        onChange={(_state) => setCurrentState(_state)}
                        onTextChange={(_txt) => console.log(_txt)}
                        defaultValue={currentState}
                        placeHolder="Select State"
                    />
                </div>
                <div className="col-lg-6">
                    <CitySelect
                        countryid={country?.id}
                        stateid={currentState?.id}
                        onChange={(_city) => setCurrentCity(_city)}
                        defaultValue={currentCity}
                        placeHolder="Select City"
                    />
                </div>
            </div>

        </div>
    );
}
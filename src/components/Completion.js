import * as React from 'react';
import BasicTable from "./Assessment-basictable";

export default function CompletionPage() {

    return (
        <div>
            <div className="row">
                <div className="col-md-4 float-left mt-lg-5 ">
                    <label> {"Full Name: " + "Nikhil Matta \n"} </label>
                    <br />
                    <label> {"Phone Number: " + "9894349348 \n"} </label>
                    <br />
                    <label> {"Submitted On: " + "20-02-23 \n"} </label>
                </div>
                <div className="col-md-8 border border-dark">
                    <BasicTable className="w-75 pr-3 col-md-6"/>
                </div>
            </div>
        </div>
    );
}

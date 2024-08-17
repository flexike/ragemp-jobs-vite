import React from 'react';
import './jobcard.css'
import CrownIconSVG from "../assets/crown.svg"
import { createElement } from "react";

interface JobCardProps {
    jobName: string;
    jobLocked: boolean;
    jobTotalLvls: number;
    jobCurrentLvl: number;
    jobExpPerLevel: number;
}

function JobCard({ jobName, jobLocked, jobTotalLvls, jobCurrentLvl, jobExpPerLevel }: JobCardProps) {
    // IF JOB is disabled, render this
    if(jobLocked) {
        return (
            <div className="job-card-disabled">
                <div className="job-card-container">
                    <h3 className="job-card-name">{jobName}</h3>
                    <h5 className="job-card-progress">Недоступно</h5>
                </div>
            </div>
        )
    }

    // IF job is complete, render this
    if(jobCurrentLvl === jobTotalLvls) {
        return(
            <div className="job-max-card">
                <div className="job-card-container">

                    <div className="job-maxed-name-wrapper">
                        <h3 className="job-max-card-name">{jobName}</h3>
                        <img src={CrownIconSVG} alt="crownSVG" className="CrownIconSVG"/>
                    </div>

                    <h5 className="job-card-progress">У вас максимальний рівень</h5>
                    <div className="job-card-exp">
                        {createExpBar(jobTotalLvls, jobCurrentLvl)}
                    </div>
                </div>
            </div>
        )
    }


    // IF Job is in progress, render this
    return (
        <div className="job-card">
            <div className="job-card-container">
                <h3 className="job-card-name">{jobName}</h3>
                <h5 className="job-card-progress">До наступного рівня необхідно ще 1200 Exp</h5>
                <div className="job-card-exp">
                    {createExpBar(jobTotalLvls, jobCurrentLvl)}
                </div>
            </div>
        </div>
    )

    // create EXP BAR
    function createExpBar( jobTotalLvls: number, currentLvl: number) {

        // if there is decimals after current lvl; EXMPL Current lvl is 1.5, 2.7, 2.9 etc.
        if (currentLvl % 1 !== 0 && currentLvl <= jobTotalLvls) {

            // create ARRAY (of divs with uniq index) ACCORDING jobTotalLVLs lenght
            return Array.from({ length: jobTotalLvls }, (_, index) => {

                // if Current lvl is 2, then DIVs with index lower than 2, would get fully filled
                const isFilled = index < Math.floor(currentLvl);

                // here we find Current DIV to paing progress
                const isCurrentFilled = index === Math.floor(currentLvl);

                // width calculator for current progress
                let currentLVLperc:number = currentLvl % 1 * 100;

                return (
                    <div key={index}
                        className={`ExpBar 
                        ${isFilled ? 'filled' : ''} 
                        ${jobTotalLvls === currentLvl ? 'completed' : ''}
                        `}
                    >
                        <div className={`
                            ${isCurrentFilled ? `currentFilled` : ''}
                                        `}
                             style={{width: `${currentLVLperc}%`}}
                        >
                        </div>
                    </div>
                );
            });

        } else {
            // if there is no decimals after Current lvl; EXMPL: currentLvl is 1, 2 etc.
            return Array.from({length: jobTotalLvls}, (_, index) => (
                <div
                    key={index}
                    className={
                        `ExpBar 
                    ${index < currentLvl ? 'filled' : ''} 
                    ${jobTotalLvls === currentLvl ? 'completed' : ''}
                `}
                >
                </div>
            ));
        }
    }
}

export default JobCard;
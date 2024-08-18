import './jobcard.sass'
import CrownIconSVG from "../assets/crown.svg"

interface JobCardProps {
    jobName: string;
    jobLocked: boolean;
    jobTotalLvls: number;
    jobCurrentLvl: number;
    jobExpPerLevel: number;
}

function JobCard({ jobName, jobLocked, jobTotalLvls, jobCurrentLvl, jobExpPerLevel }: JobCardProps) {

    const maxLvlExpCalc: number = jobTotalLvls * jobExpPerLevel

    function toNextLvlEXPCalc(): number {
        // Calculate the experience needed to the next level
        const remainderXP = jobCurrentLvl % jobExpPerLevel;
        // If current experience is exactly at the level cap, they need one full level of experience to level up
        if (remainderXP === 0) {
            return jobExpPerLevel;
        } else {
            // Otherwise, they need (jobExpPerLevel - remainderXP) more XP to level up
            return jobExpPerLevel - remainderXP;
        }
    }

    return (
        // create Job Card
        // if DISABLED = ADD Disabled Class; if (CurrentLvl === TotalLvl) = ADD Completed class
        <div className={`job-card 
        
        ${ jobLocked ? "job-card-disabled" : ""} 
        ${ jobCurrentLvl >= maxLvlExpCalc ? "job-max-card" : ""}
        
        `}>
            <div className="job-card-container">

                {
                    // if (CurrentLvl === TotalLvl) then create Name + CROWN + div to wrap it together
                    jobCurrentLvl >= maxLvlExpCalc ? (
                        <div className="job-maxed-name-wrapper">
                            <h3 className="job-max-card-name">{jobName}</h3>
                            <img src={CrownIconSVG} alt="crownSVG" className="CrownIconSVG"/>
                        </div>
                    ) : // if (CurrentLvl === TotalLvl) is not true, leave name
                        (
                        <h3 className="job-card-name">{jobName}</h3>
                    )
                }
                {
                    // if Job IS disabled, render disabled and nothing else
                    jobLocked ? (
                        <h5 className="job-card-progress">Недоступно</h5>
                    ) : // if (jobCurrentLvl === jobTotalLvls) then render text about Completing and call EXPBar
                        jobCurrentLvl >= maxLvlExpCalc ? (
                        <>
                        <h5 className="job-card-progress">У вас максимальний рівень</h5>
                            <div className="job-card-exp">
                                {createExpBar(jobTotalLvls, jobCurrentLvl, jobExpPerLevel)}
                            </div>
                        </>
                    ) : // IF job isn't locked and completed, render this
                            (
                    <>
                     <h5 className="job-card-progress">До наступного рівня необхідно ще {toNextLvlEXPCalc()} Exp</h5>
                          <div className="job-card-exp">
                            {createExpBar(jobTotalLvls, jobCurrentLvl, jobExpPerLevel)}
                          </div>
                    </>
                )
                }
            </div>
        </div>
    )

    // IF JOB is disabled, render this
    // if (jobLocked) {
    //     return (
    //         <div className="job-card-disabled">
    //             <div className="job-card-container">
    //                 <h3 className="job-card-name">{jobName}</h3>
    //                 <h5 className="job-card-progress">Недоступно</h5>
    //             </div>
    //         </div>
    //     )
    // }
    // IF job is complete, render this
    // if(jobCurrentLvl === jobTotalLvls) {
    //     return(
    //         <div className="job-max-card">
    //             <div className="job-card-container">
    //
    //                 <div className="job-maxed-name-wrapper">
    //                     <h3 className="job-max-card-name">{jobName}</h3>
    //                     <img src={CrownIconSVG} alt="crownSVG" className="CrownIconSVG"/>
    //                 </div>
    //
    //                 <h5 className="job-card-progress">У вас максимальний рівень</h5>
    //                 <div className="job-card-exp">
    //                     {createExpBar(jobTotalLvls, jobCurrentLvl)}
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    // IF Job is in progress, render this
    // return (
    //     <div className="job-card">
    //         <div className="job-card-container">
    //             <h3 className="job-card-name">{jobName}</h3>
    //             <h5 className="job-card-progress">До наступного рівня необхідно ще 1200 Exp</h5>
    //             <div className="job-card-exp">
    //                 {createExpBar(jobTotalLvls, jobCurrentLvl)}
    //             </div>
    //         </div>
    //     </div>
    // )

    // create EXP BAR
    function createExpBar( jobTotalLvls: number, currentLvl: number, jobExpPerLevel: number) {

            // create ARRAY (of divs with uniq index) ACCORDING jobTotalLVLs lenght
        return Array.from({ length: jobTotalLvls }, (_, index) => {

            const ExpToMaxLvl: number = jobTotalLvls * jobExpPerLevel;
            const ExpBarStart: number = index * jobExpPerLevel; // X -> Y     ; [X - Y][X+1 - Y+1] etc.;
            const ExpBarEnd: number = (index + 1) * jobExpPerLevel; // X <- Y ; [0 - 20][20 - 40] etc.;

            let filledBar: number = 0;
            if( currentLvl >= ExpBarEnd ) {
                filledBar = 100;
            } else if ( currentLvl >= ExpBarStart) {
                filledBar = ((currentLvl - ExpBarStart) / jobExpPerLevel) * 100
            }

            console.log(currentLvl >= ExpToMaxLvl, currentLvl, ExpToMaxLvl)
            return (
                <div key={index} className={`ExpBar 
                ${ filledBar === 100 ? 'filled' : ''}
                ${ currentLvl >= ExpToMaxLvl ? 'completed' : ''}
                `}>
                    <div
                        className={`${ currentLvl >= ExpToMaxLvl ? '' : 'currentFilled'}`}
                        style={{ width: `${filledBar}%` }}
                    ></div>
                </div>
            );
        });
    }
}

export default JobCard;
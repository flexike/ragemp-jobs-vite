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

    return (

        // create Job Card
        // if DISABLED = ADD Disabled Class; if (CurrentLvl === TotalLvl) = ADD Completed class
        <div className={`job-card 
        
        ${ jobLocked ? "job-card-disabled" : ""} 
        ${ jobCurrentLvl === jobTotalLvls ? "job-max-card" : ""}
        
        `}>
            <div className="job-card-container">

                {
                    // if (CurrentLvl === TotalLvl) then create Name + CROWN + div to wrap it together
                    jobCurrentLvl === jobTotalLvls ? (
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
                        jobCurrentLvl === jobTotalLvls ? (
                        <>
                        <h5 className="job-card-progress">У вас максимальний рівень</h5>
                            <div className="job-card-exp">
                                {createExpBar(jobTotalLvls, jobCurrentLvl)}
                            </div>
                        </>
                    ) : // IF job isn't locked and completed, render this
                            (
                    <>
                     <h5 className="job-card-progress">До наступного рівня необхідно ще 1200 Exp</h5>
                          <div className="job-card-exp">
                            {createExpBar(jobTotalLvls, jobCurrentLvl)}
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
    function createExpBar( jobTotalLvls: number, currentLvl: number) {

        // if current lvl lower or same as total lvl then
        if (currentLvl <= jobTotalLvls) {
            // create ARRAY (of divs with uniq index) ACCORDING jobTotalLVLs lenght
            return Array.from({ length: jobTotalLvls }, (_, index) => {

                // if Current lvl is 2, then DIVs with index lower than 2, would get fully filled
                const isFilled = index < Math.floor(currentLvl);

                // here we find Current DIV to paing progress
                const isCurrentFilled = index === Math.floor(currentLvl);

                // width calculator for current progress
                const currentLVLperc:number = currentLvl % 1 * 100;

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
            // if current lvl higher than total render this
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
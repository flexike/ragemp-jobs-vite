import {useEffect, useState} from 'react';
import './App.css';
import JOBSfromSERVER from "./jobs.json";
import JobCard from "./components/JobCard";

function App() {

    const [data, setData] = useState<{ jobs: Array<any>} |null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        const jobslist = JOBSfromSERVER
        setData(jobslist)
    }

  return (
    <section className="job-section">
      <div className="job-container">
          <header className="job-header">
              none
          </header>
          <div className="job-main-block">
              <aside className="job-aside">
                  none
              </aside>
              {
                  data ?
                  <main className="job-main">
                      {data.jobs.map((job, index) => (
                           <JobCard
                               key = {index}
                               jobName={job.title}
                               jobLocked={job.isDisabled}
                               jobTotalLvls={job.level.totalLevels}
                               jobCurrentLvl={job.level.current}
                               jobExpPerLevel={job.level.expPerLevel}
                           />
                          ))
                      }
                  </main>
                       :
                  <div className="job-none">
                      <h5>
                        Ви ще не працювали на жодній роботі
                      </h5>
                  </div>
              }
          </div>
      </div>
    </section>
  );
}

export default App;

import {  useEffect, useReducer, useState } from "react";
import './../css/Calendar.css'
import {Button, ButtonToolbar} from 'react-bootstrap';

const currentDayAppLaunch = new Date();

const Calendar = () => {
    
    // Days in week
    const weekDays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    
    // Months names
    const monthsNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

    // Init state with current date / day
    const [currentDay, setCurrentDay] = useState(currentDayAppLaunch);

    const changeCurrentDay = (day) => setCurrentDay( new Date(day.year, day.month, day.number) );    

    const nextMonth = () => setCurrentDay( currentDay.getMonth() === 11 ? 
      new Date( currentDay.getFullYear() + 1, 0, 1 ) : 
      new Date( currentDay.getFullYear(), currentDay.getMonth() + 1, 1 ) );

    const previousMonth = () => setCurrentDay( currentDay.getMonth() === 0 ? 
      new Date( currentDay.getFullYear() - 1, 11, 1 ) : 
      new Date( currentDay.getFullYear(), currentDay.getMonth() - 1, 1 ) );


    const nextYear = () => setCurrentDay( new Date( currentDay.getFullYear() + 1, currentDay.getMonth(), currentDay.getDate() ) );

    const previousYear = () => setCurrentDay( new Date( currentDay.getFullYear() - 1, currentDay.getMonth(), currentDay.getDate() ) );


    const firstDayOfMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];
  
    for (let day = 0; day < 42; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      } else if (day === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
      } else {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }
  
      let calendarDay = {
        currentMonth: (firstDayOfMonth.getMonth() === currentDay.getMonth()),
        date: (new Date(firstDayOfMonth)),
        month: firstDayOfMonth.getMonth(),
        number: firstDayOfMonth.getDate(),
        selected: (firstDayOfMonth.toDateString() === currentDay.toDateString()),
        year: firstDayOfMonth.getFullYear()
      }
  
      currentDays.push(calendarDay);
    }



    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
      // 👇️ toggle
      setIsActive(current => !current);
  
      // setIsActive(true);
    };

    return (
        <div className="calendar d-flex flex-column my-3 m-auto">
          
          
          <div className="my-2">
            <div className="d-flex">
              <h2 className="m-auto">{monthsNames[currentDay.getMonth()]} {currentDay.getFullYear()}</h2>
            </div>

            {/* Part Month */}
            <div className="my-2 d-flex flex-column">
              
              <div>
                <p className="text-center m-auto">Changer de Mois</p>
              </div>

              <div className="w-25 h-100 d-flex align-self-center">
                <button onClick={() => previousMonth()}>
                {"<<"}
                  {/* <span className="material-icons">
                    arrow_back
                    </span> */}
                </button>
                <p className="m-auto">{monthsNames[currentDay.getMonth()]}</p>
                <button onClick={() => nextMonth()}>
                {">>"}
                  {/* <span className="material-icons">
                    arrow_forward
                    </span> */}
                </button>
              </div>
              
            </div>

            {/* Part Year */}
            <div className="my-2 d-flex flex-column">
              
              <div>
                <p className="text-center m-auto">Changer d'année Année</p>
              </div>

              <div className="w-25 h-100 d-flex align-self-center">
                <button onClick={() => previousYear()}>
                {"<<"}
                  {/* <span className="material-icons">
                    arrow_back
                    </span> */}
                </button>
                <p className="m-auto">{currentDay.getFullYear()}</p>
                <button onClick={() => nextYear()}>
                {">>"}
                  {/* <span className="material-icons">
                    arrow_forward
                    </span> */}
                </button>
              </div>
              
            </div>

          </div>


          <div className="w-100 flex-grow-1 d-flex flex-column">
            
            <div className="table-header w-100 d-flex align-items-center justify-content-evenly">
              {
                weekDays.map((weekDay) => {
                  return <div className="weekday"><p className="m-auto">{weekDay}</p></div>
                })
              }
            </div>

            <div className="my-3 table-content w-100 flex-grow-1 d-flex flex-wrap justify-content-center">
              { currentDays.map((day) => {
                  return (
                  <div className={"calendar-day" + (day.currentMonth ? " current" : "") + 
                    ( (day.month === currentDayAppLaunch.getMonth()) && 
                      (day.year === currentDayAppLaunch.getFullYear()) && 
                      (day.number === currentDayAppLaunch.getDate()) ? " selected" : "") +
                    ( (isActive) ? " addRDV" : "") }
                          onClick={() => changeCurrentDay(day)}>
                      <p>{day.number}</p>
                  </div>
                  )
              }) }
            </div>
            
          </div>

        </div>

      )
    
}

export default Calendar;
function CalendarDays(props) {
    const firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
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
        currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
        date: (new Date(firstDayOfMonth)),
        month: firstDayOfMonth.getMonth(),
        number: firstDayOfMonth.getDate(),
        selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
        year: firstDayOfMonth.getFullYear()
      }
  
      currentDays.push(calendarDay);
    }
  
    return (
      <div className="my-3 table-content w-100 flex-grow-1 d-flex flex-wrap justify-content-center">
        {
          currentDays.map((day, index) => {
            return (
              // <div key={index} className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
              //       onClick={() => props.changeCurrentDay(day)}>
              <div key={index} className={"calendar-day" + (day.currentMonth ? " current" : "") + 
                    ( (day.month === props.currentDayAppLaunch.getMonth()) && 
                      (day.year === props.currentDayAppLaunch.getFullYear()) && 
                      (day.number === props.currentDayAppLaunch.getDate()) ? " selected" : 
                        (localStorage.getItem(day.year + "-" + (day.month+1) + "-" + day.number)) ? " addRDV" : "") }
                          onClick={() => {props.changeCurrentDay(day);
                                          props.setShowEvent(true);
                                          props.setIsRDV(localStorage.getItem(day.year + "-" + (day.month+1) + "-" + day.number))
                                          }}>
                <p>{day.number}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
  
  export default CalendarDays;
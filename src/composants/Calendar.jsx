import { useEffect, useState } from "react";
import './../css/Calendar.css'
import CalendarDays from "./CalendarDays";

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

    
    const [showEvent, setShowEvent] = useState(false);
    const [formActive, setFormActive] = useState(false);
    
    const [initialValues, setInitialValues] = useState({
      titre: "",
      commentaire: "",
      dateRdv: ""
    });

    const [formValues, setFormValues] = useState([]);
  
    const submitForm = () => {
      if(localStorage.getItem(initialValues.dateRdv)) {
        const data = JSON.parse(localStorage.getItem(initialValues.dateRdv));
        console.log(data);
        const newData = JSON.stringify([...data, initialValues]) 
        localStorage.setItem(initialValues.dateRdv, newData);
      } else {
        setFormValues((prevFormValues) => [...prevFormValues, initialValues]);
      }
      setFormActive(false);
      setInitialValues({
        titre: "",
        commentaire: "",
        dateRdv: ""
      });
    };

    useEffect(() => {
      if(formValues.length) {
        localStorage.setItem(formValues[0].dateRdv, JSON.stringify(formValues));
        setFormValues([]);
      }
    }, [formValues]);

    useEffect(() => {
      if(formActive) {
        setInitialValues({ ...initialValues, dateRdv: currentDay.getFullYear() + "-" + (currentDay.getMonth()+1) + "-" + currentDay.getDate() });
      }
    }, [currentDay]);
    
    const [isRDV, setIsRDV] = useState(false);
    const events = () => {
        console.log(currentDay)
        
        let data = [];
        let date = currentDay.getFullYear() + "-" + (currentDay.getMonth()+1) + "-" + currentDay.getDate(); 
        if(localStorage.getItem(date)) {
          data = JSON.parse(localStorage.getItem(date));
        }

        return(data)
    }

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

              <CalendarDays day={currentDay} currentDayAppLaunch={currentDayAppLaunch} 
                changeCurrentDay={changeCurrentDay} setShowEvent={setShowEvent} setIsRDV={setIsRDV} />

            {showEvent &&
              <div className="my-3">
                <div className="d-flex justify-content-evenly">
                  <h3>Liste des RDV du : {currentDay.getDate()} {monthsNames[currentDay.getMonth()]} - {currentDay.getFullYear()}</h3>
                  <button onClick={() => setShowEvent(false)}>Cacher RDV</button>
                </div>
                <ul className="ulRDV">
                  { isRDV ?
                    events().map((event) => {
                      return (
                        <li>titre : {event.titre}, commentaire : {event.commentaire}, dateRdv : {event.dateRdv}</li>
                      )
                    }) : <p>Pas de RDV pour le moment.</p>
                  }
                </ul>

              </div>
            }

            <div className="m-auto">
              <button onClick={() => {
                                setFormActive(!formActive);
                                setInitialValues({ ...initialValues, dateRdv: currentDay.getFullYear() + "-" + (currentDay.getMonth()+1) + "-" + currentDay.getDate() }); 
                              }}>
              Ajouter un rdv
              </button>
            </div>
 
            {formActive &&
            <div className="form-box">

              <h5 className="titleForm">Formulaire RDV :</h5>
              <form className="formRdv" onSubmit={submitForm}>

                <div className="divFormLabel">
                  <label>
                    Titre :
                    <input type="text" required value={initialValues.titre}
                        onChange={(e) =>
                          setInitialValues({ ...initialValues, titre: e.target.value })
                        } />
                  </label>
                  
                  <label>
                    Commentaire :
                    <input type="text" value={initialValues.commentaire}
                      onChange={(e) =>
                        setInitialValues({ ...initialValues, commentaire: e.target.value })
                      } />
                  </label>
                  
                  <label>
                    Date :
                    <input type="date" required value={initialValues.dateRdv}
                      onChange={(e) =>
                        setInitialValues({ ...initialValues, dateRdv: e.target.value })
                      } />
                  </label>
                </div>

                <input className="formSubmit" type="submit" value="Sauvegarder" />
              
              </form>

            </div>}

          </div>
        </div>

      )
    
}

export default Calendar;
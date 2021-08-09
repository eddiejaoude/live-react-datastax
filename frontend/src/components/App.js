import { useState, useEffect } from 'react';
import Form from './Form';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/events')
    .then((response) => response.json())
    .then((responseData) => setEvents(responseData));
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark mb-4 shadow">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">EddieHub Members events</span>
        </div>
      </nav>


      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <Form setEvents={setEvents} events={events} />
            </div>
          { events.map((item, key) => <div className="col-4" key={key}>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src="https://user-images.githubusercontent.com/624760/114314271-ea156a80-9af1-11eb-97ca-977be7565aa6.png" className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.author}</p>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
          </div>) }
        </div>
      </div>
    </div>
  );
}

export default App;

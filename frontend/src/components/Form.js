import React, { Component } from 'react'

const FormGroup = ({
    Id,
    Label,
    Type,
    onChange,
    Value,
    defaultValue,
    Checked,
    defaultChecked,
    Desc
  }) => {
    return (
      <div className="form-group">
        <label htmlFor={Id}>{Label}</label>
        <input
          type={Type}
          className="form-control"
          id={Id}
          name={Id}
          onChange={onChange}
          value={Value}
          defaultValue={defaultValue}
          checked={Checked}
          defaultChecked={defaultChecked}
          aria-describedby={Id + "Help"}
        />
        {Desc && (
          <small id={Id + "Help"} className="form-text text-muted">
            {Desc}
          </small>
        )}
      </div>
    );
  };

export default class Form extends Component {
    state = { name: '', author: '', description: '' };
    render() {
        const handleSubmit = (e) => {
            e.preventDefault();
            
            fetch('/events', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then(response => response.json())
            .then(json => { this.props.setEvents([...this.props.events, json]) });
        }

        return (
            <form onSubmit={handleSubmit}>
                {Object.keys(this.state).map(key => <FormGroup 
                key={key} {...{ Id: key, 
                Label: key, 
                Value: this.state[key], 
                onChange: e => this.setState({ [key]: e.target.value })}} />)}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

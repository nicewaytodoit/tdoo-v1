import React from 'react';

export interface IValidationProps { id: string, name?: any; value?: any; }

class TestValidationPage extends React.Component<IValidationProps, any> {
    state = {
        name: '',
        age: 12,
        email: null,
        isNameValid: true,
    }

    NameChange = (e) => {
        this.setState({ name: e.target.value });
    }

    Validate = (val, prop) => {
        this.setState({ [`isNameValid`]: !val });
    }

    render() {
        return (
            <div>
                <h1>Validation Test</h1>
                <input value={this.state.name} onChange={this.NameChange} onBlur={(e) => this.Validate(e.target.value, 'name')} style={{ borderColor: this.state.isNameValid ? 'red' : 'green' }} />
                { !this.state.isNameValid ?<label> Empty </label> : '' }
            </div>
        );
    }

}

export default TestValidationPage;
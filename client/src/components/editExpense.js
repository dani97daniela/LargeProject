import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

const optionsMonth = [
  { value: 'Jan', label: 'Jan' },
  { value: 'Feb', label: 'Feb' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'Aug', label: 'Aug' },
  { value: 'Sep', label: 'Sep' },
  { value: 'Oct', label: 'Oct' },
  { value: 'Nov', label: 'Nov' },
  { value: 'Dec', label: 'Dec' }
];

const optionsDay = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
  { value: 11, label: 11 },
  { value: 12, label: 12 },
  { value: 13, label: 13 },
  { value: 14, label: 14 },
  { value: 15, label: 15 },
  { value: 16, label: 16 },
  { value: 17, label: 17 },
  { value: 18, label: 18 },
  { value: 19, label: 19 },
  { value: 20, label: 20 },
  { value: 21, label: 21 },
  { value: 22, label: 22 },
  { value: 23, label: 23 },
  { value: 24, label: 24 },
  { value: 25, label: 25 },
  { value: 26, label: 26 },
  { value: 27, label: 27 },
  { value: 28, label: 28 },
  { value: 29, label: 29 },
  { value: 30, label: 30 },
  { value: 31, label: 31 }
];

export default class EditExpense extends Component {

    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
		this.onChangeMonth = this.onChangeMonth.bind(this);
		this.onChangeDay = this.onChangeDay.bind(this);
		this.onChangeYear = this.onChangeYear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteExpense = this.deleteExpense.bind(this);

        this.state = {
            description: '',
            amount: '',
            month: '',
            day: '',
            year: ''
        }
    }

    componentDidMount() {
        axios.get('/expenses/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    amount: response.data.amount,
					month: response.data.month,
					day: response.data.day,
					year: response.data.year
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }
	
	onChangeMonth(selectedMonth) {
        this.setState({
            month: selectedMonth.value
        });
    }
	
	onChangeDay(selectedDay) {
        this.setState({
            day: selectedDay.value
        });
    }
	
	onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            description: this.state.description,
            amount: this.state.amount,
            month: this.state.month,
            day: this.state.day,
            year: this.state.year
        };
        console.log(obj);
        axios.post('/expenses/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }
	
	deleteExpense() {	
        axios.delete('/expenses/delete/'+this.props.match.params.id)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
		const { selectedMonth } = this.state;
		const { selectedDay } = this.state;
	
        return (
            <div>
                <h3 align="center">Update Expense</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Amount: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.amount}
                                onChange={this.onChangeAmount}
                                />
                    </div>
					<div className="form-group">
					  <label>Month: </label>
					  <Select
						name="Month"
						placeholder={this.state.month}
						value={selectedMonth}
						options={optionsMonth}
						onChange={this.onChangeMonth}
					  />
					</div>					
					<div className="form-group">
					  <label>Day: </label>
					  <Select
						name="Day"
						placeholder={this.state.day}
						value={selectedDay}
						options={optionsDay}
						onChange={this.onChangeDay}
					  />
					</div>
					<div className="form-group"> 
                        <label>Year: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.year}
                                onChange={this.onChangeYear}
                                />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Expense" className="btn btn-success" />
						<button type="submit" class="btn btn-danger" onClick={() => {this.deleteExpense()}}>Delete</button>
                    </div>
                </form>
            </div>
        )
    }
}
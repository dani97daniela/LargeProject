import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';

var temp = [];
var i = 0;
var sum = 0;
var length = 0;

const Expense = props => (
    <tr>
        <td>{props.item.description}</td>
        <td>{props.item.amount}</td>
        <td>{props.item.month}</td>
        <td>{props.item.day}</td>
        <td>{props.item.year}</td>
        <td>
            <Link to={"/edit/"+props.item._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
		
		this.onChangeSort = this.onChangeSort.bind(this);
		this.totalAmount = this.totalAmount.bind(this);
		
        this.state = {
			todos: [],
			total: 0
		};
    }

    componentDidMount() {
        axios.get('/expenses/getAllExpenses')
            .then(response => {
				temp = response.data;
				temp = sortBy(temp, ['description', 'amount']);
				sum = sumBy(temp, 'amount');
                this.setState({ 
					todos: temp,
					total: sum
				});
            })
            .catch(function (error){
                console.log(error);
            })
    }
	
	onChangeSort(sortItem) {
		temp = this.state.todos;
		temp = sortBy(temp, sortItem);
		sum = sumBy(temp, 'amount');
		this.setState({ 
					todos: temp,
					total: sum
				});
		console.log(temp);
    }

    listOfExpenses() {
        return this.state.todos.map(function(currentExpense, i){
            return <Expense item={currentExpense} key={i} />;
        })
    }
	
	totalAmount() {
		i = 0;
		sum = 1;
		length = this.state.todos.length;
		for(i; i <length; i++)
			sum += this.state.todos[i].amount;
		this.setState({ total: sum });
		console.log(sum);
		
		return sum;
	}

    render() {	
        return (
            <div>
                <h3><center>All Expenses</center></h3>
                <h5>Total: ${this.state.total} </h5>
                <table className="table table-striped table-bordered" 
				  style={{ marginTop: 30 }} >
				  
                    <thead className="thead-dark">
                        <tr>
                            <th data-field="description" 
								onClick={() => {this.onChangeSort('description')}
								}>Description</th>
                            <th data-field="amount" 
								onClick={() => {this.onChangeSort('amount')}
								}>Amount</th>
                            <th data-field="month" 
								onClick={() => {this.onChangeSort('month')}
								}>Month</th>
                            <th data-field="day" 
								onClick={() => {this.onChangeSort('day')}
								}>Day</th>
                            <th data-field="year" 
								onClick={() => {this.onChangeSort('year')}
								}>Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.listOfExpenses() }
                    </tbody>
                </table>
            </div>
        )
    }
}
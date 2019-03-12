import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        this.state = {
			todos: [],
			total: 0,
			i: 0
		};
    }

    componentDidMount() {
        axios.get('/expenses/getAllExpenses')
            .then(response => {
				response.data.sort(function(a, b) {
					return a.description > b.description;
				});
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
	
	onChangeSort(sort) {
		this.state.todos.sort(function(a, b) {
			return a.sort > b.sort;
		});
		
		console.log(sort);
    }

    todoList(newList) {
        return newList.map(function(currentExpense, i){
            return <Expense item={currentExpense} key={i} />;
        })
    }
	
	totalAmount(listOfExpenses) {
		for(this.state.i = 0; this.state.i <this.state.todos.length; this.state.i++)
			this.state.sum += this.state.todos[this.state.i].amount;
	}

    render() {
		var updatedList = this.state.todos;
	
        return (
            <div>
                <h3><center>All Expenses</center></h3>
                <h5>Total: ${this.state.total} </h5>
                <table className="table table-striped" style={{ marginTop: 30 }} >
                    <thead className="thead-dark">
                        <tr>
                            <th onClick={() => {this.onChangeSort('description')}}>Description</th>
                            <th onClick={() => {this.onChangeSort('amount')}}>Amount</th>
                            <th onClick={() => {this.onChangeSort('month')}}>Month</th>
                            <th onClick={() => {this.onChangeSort('day')}}>Day</th>
                            <th onClick={() => {this.onChangeSort('year')}}>Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList(updatedList) }
                    </tbody>
                </table>
            </div>
        )
    }
}
import React from 'react';
import { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import MaterialTable, { Column } from 'material-table';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Ingredients } from './Ingredients';
import Button from '@material-ui/core/Button';

const uri = "api/Dishes";

interface Dish {
    id: number;
    name: string;
    dishTypeId: number;
    dishType: DishType;
    dishIngredients: Array<DishIngredient>
}

interface DishType {
    id: number;
    name: string;
}

interface DishIngredient {
    id: number;
    amount: number;
    ingredientId: number;
    ingredient: Ingredient;
    dishId: number;
    dish: Dish;
}

interface Ingredient {
    id: number;
    name: string;
    unitOfMeassureId: number;
    unitOfMeassure: UnitOfMeasure;
}

interface UnitOfMeasure {
    id: number;
    name: string;
}

interface TableState {
    columns: Array<Column<Dish>>;
    data: Dish[];
    dishTypeData: Array<DishType>;
}

function createDishTypeLookup(unitsOfMeasure: DishType[]): object {
    var dynamicObject: {[k: string]: any} = {};

    unitsOfMeasure.forEach(function(element, index, array) {
        dynamicObject[element.id] = element.name;
    });

    return dynamicObject;
}

function renderIngreditnsLink(row: Dish) {
    if (row == undefined)
        return;

    var link = `/dish-ingredients/${row.id}`;
    return <NavLink tag={Link} to={link} className="ingredients-button">
                <Button variant="contained">
                    Ingredients
                </Button>
            </NavLink>;
}

export class Dishes extends Component<TableState, TableState> {

    constructor(props: any) {
        super(props);
        this.state = { 
            columns: [ { title: 'Name', field: 'name' },
                        {title: 'Dish type', field: 'dishType.name'} ],
            data: [],
            dishTypeData: [],
        };
    }

    componentDidMount() {
        this.populateDishTypeData();
        this.populateData();
    }

    async populateData() {
        const token = await authService.getAccessToken();

        await fetch(`${uri}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data });
            });
    }

    async populateDishTypeData() {
        const token = await authService.getAccessToken();

        await fetch('api/DishTypes', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ dishTypeData: data });
                this.setState({
                    columns:
                        [
                            { title: 'Name', field: 'name' },
                            { title: 'Dish type', field: 'dishType.id', lookup: createDishTypeLookup(data) },
                            { title: 'Ingredients', render: rowData => renderIngreditnsLink(rowData)} 
                        ]
                });
            });
    }

    async handleAdd(row: Dish) {
        row.dishTypeId = row.dishType.id;
        row.dishType = null;

        fetch(`${uri}`, {
            method: "POST",
            headers: { "content-type": "application/json"},
            body: JSON.stringify(row)
        })
            .then(() => {
                this.populateData();
            });
    }

    async handleDelete(row: Dish) {
        fetch(`${uri}/${row.id}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(row)
        })
            .then(() => {
                this.populateData();
            });
    }

    async handleModify(row: Dish) {
        fetch(`${uri}/${row.id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(row)
        })
            .then(() => {
                this.populateData();
            });
    }

    render() {
        return (
            <MaterialTable
                title="Dishes"
                options = {{
                    pageSize: 20
                }}
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                    onRowAdd: (newData) => this.handleAdd(newData), 
                    onRowUpdate: (newData) => this.handleModify(newData),
                    onRowDelete: (oldData) => this.handleDelete(oldData),
                }}
            />
        );
    }

}

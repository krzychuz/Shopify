import * as React from 'react';
import { Component } from 'react';
import MaterialTable, { Column } from 'material-table';
import authService from './api-authorization/AuthorizeService'
import { UnitOfMeasure, UnitsOfMeasure } from './UnitsOfMeasure';

interface Ingredient {
    id: number;
    name: string;
    unitOfMeassureId: number;
    unitOfMeassure: UnitOfMeasure;
}

interface TableState {
    columns: Array<Column<Ingredient>>;
    data: Ingredient[];
    uomData: UnitOfMeasure[];
}


function createUomLookup(unitsOfMeasure: UnitOfMeasure[]): object {
    var dynamicObject: {[k: string]: any} = {};

    unitsOfMeasure.forEach(function(element, index, array) {
        dynamicObject[element.id] = element.name;
    });

    return dynamicObject;
} 

export class Ingredients extends Component<TableState, TableState> {
    constructor(props: any) {
        super(props);
        this.state = { 
            columns: [],
            data: [],
            uomData: []
        };
    }

    componentDidMount() {
        this.populateUomData();
        this.populateData();
    }

    async populateUomData() {
        const token = await authService.getAccessToken();

        await fetch('api/UnitOfMeassures', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ uomData: data });
                this.setState({
                    columns:
                        [
                            { title: 'Name', field: 'name' },
                            { title: 'Unit of measure', field: 'unitOfMeassure.id', lookup: createUomLookup(data) } 
                        ]
                });
            });
    }

    async populateData() {
        const token = await authService.getAccessToken();

        await fetch('api/Ingredients', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data });
            });
    }

    async handleAdd(row: Ingredient) {
        row.id = 0;
        row.unitOfMeassureId = row.unitOfMeassure.id;
        row.unitOfMeassure = null;

        fetch("api/Ingredients", {
            method: "POST",
            headers: { "content-type": "application/json"},
            body: JSON.stringify(row)
        })
            .then(() => {
                this.populateData();
            });
    }

    async handleDelete(row: Ingredient) {
        fetch(`api/Ingredients/${row.id}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(row)
        })
            .then(() => {
                this.populateData();
            });
    }

    async handleModify(newRow: Ingredient, oldRow: Ingredient) {
        fetch(`api/Ingredients/${newRow.id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newRow)
        })
            .then(() => {
                this.populateData();
            });
    }

    render() {
        return (
            <MaterialTable
                title="Units of measure"
                options = {{
                    pageSize: 20
                }}
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                    onRowAdd: (newData) => this.handleAdd(newData), 
                    onRowUpdate: (newData, oldData) => this.handleModify(newData, oldData),
                    onRowDelete: (oldData) => this.handleDelete(oldData),
                }}
            />
        );
    }
}

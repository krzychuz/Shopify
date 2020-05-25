import * as React from 'react';
import { Component } from 'react';
import MaterialTable, { Column } from 'material-table';
import authService from './api-authorization/AuthorizeService'

export interface UnitOfMeasure {
    id: number;
    name: string;
}

interface TableState {
    columns: Array<Column<UnitOfMeasure>>;
    data: UnitOfMeasure[];
}

export class UnitsOfMeasure extends Component<TableState, TableState> {
    constructor(props: any) {
        super(props);
        this.state = { 
            columns: [ { title: 'Name', field: 'name' } ],
            data: []
        };
    }

    componentDidMount() {
        this.populateData();
    }

    async populateData() {
        const token = await authService.getAccessToken();

        await fetch('api/UnitOfMeassures', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data });
            });
    }

    async handleAdd(row: UnitOfMeasure) {
        row.id = 0;

        fetch("api/UnitOfMeassures", {
            method: "POST",
            headers: { "content-type": "application/json"},
            body: JSON.stringify(row)
        })
            .then(() => {
                this.populateData();
            });
    }

    async handleDelete(row: UnitOfMeasure) {
        fetch(`api/UnitOfMeassures/${row.id}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(row)
        })
            .then(() => {
                this.populateData();
            });
    }

    async handleModify(newRow: UnitOfMeasure, oldRow: UnitOfMeasure) {
        fetch(`api/UnitOfMeassures/${newRow.id}`, {
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

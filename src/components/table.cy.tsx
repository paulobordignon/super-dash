import React from "react";
import MockData from "@/../cypress/fixtures/table.json";
import { Table } from "./table";

describe("<Table />", () => {
  it("Test simple table", () => {
    cy.mount(
      <Table
        title={MockData.table1.title}
        columnsTitles={MockData.table1.columnsTitles}
        rowValues={MockData.table1.rowValues}
      />
    );

    //CHECK TABLE TITLE
    cy.contains(`${MockData.table1.title}`);
    //CHECK TABLE COLUMNS
    cy.get('[data-cy="table-component"]')
      .find("thead tr th")
      .should("have.length", MockData.table1.columnsTitles.length);
    //CHECK TABLE ROWS
    cy.get('[data-cy="table-component"]')
      .find("tbody tr")
      .should("have.length", MockData.table1.rowValues.length);
  });

  it("Test filter element and pagination", () => {
    cy.mount(
      <Table
        title={MockData.table2.title}
        columnsTitles={MockData.table2.columnsTitles}
        rowValues={MockData.table2.rowValues}
        filterElement={
          <input placeholder="Filtrar" type="text" data-cy="filter-element" />
        }
        totalPages={MockData.table2.totalPages}
      />
    );

    //CHECK TABLE TITLE
    cy.contains(`${MockData.table2.title}`);
    //CHECK TABLE COLUMNS
    cy.get('[data-cy="table-component"]')
      .find("thead tr th")
      .should("have.length", MockData.table2.columnsTitles.length);
    //CHECK TABLE ROWS
    cy.get('[data-cy="table-component"]')
      .find("tbody tr")
      .should("have.length", MockData.table2.rowValues.length);
    // CHECK FILTER ELEMENT
    cy.get('[data-cy="filter-element"]').type("abc123{enter}");
    cy.get('[data-cy="filter-element"]').should("have.value", "abc123");
    // CHECK PAGINATION ELEMENT
    cy.get('[data-cy="pagination-element"]')
      .find("ul li")
      .should("have.length", MockData.table2.totalPages);
  });
});

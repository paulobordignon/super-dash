import React from "react";
import { Sidebar } from "./sidebar";
import MenuData from "@/assests/menu.json";

describe("<Sidebar />", () => {
  it("Test sidebar", () => {
    cy.mount(<Sidebar />);

    //CHECK SIDEBAR ROWS
    cy.get('[data-cy="sidebar-component"]')
      .find("ul>div")
      .should("have.length", MenuData.length);

    //CHECK SIDEBAR HREF
    cy.get('[data-cy="sidebar-component"]')
      .find("ul > div:nth-child(1) > a")
      .should("have.attr", "href", MenuData[0].path);
  });
});

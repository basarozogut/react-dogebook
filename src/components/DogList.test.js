import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import DogList from "./DogList"

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders loading if data is still getting fetched nothing if data is loaded", () => {
    act(() => {
        render(<DogList loading={true} />, container);
    }); 
    expect(container.querySelector("p").textContent).toBe("Please wait while doges are loaded...");

    act(() => {
        render(<DogList loading={false} />, container);
    }); 
    expect(container.querySelector("p")).toBeNull();
});

it("renders dog list when the list of dog breeds are provided", () => {
    const fakeDogs = [
        "poodle", "shiba"
    ];
    act(() => {
        render(<DogList dogs={fakeDogs} />, container);
    });
    expect(container.querySelector(".list-group-item")).not.toBeNull();
    expect(container.textContent).toContain("poodle");
    expect(container.textContent).toContain("shiba");

    act(() => {
        render(<DogList />, container);
    }); 
    expect(container.querySelector(".list-group-item")).toBeNull();
    expect(container.textContent).not.toContain("poodle");
    expect(container.textContent).not.toContain("shiba");
});
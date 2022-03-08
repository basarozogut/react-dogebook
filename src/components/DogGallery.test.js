import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";;
import api from "../api/api";
import AxiosMockAdapter from "axios-mock-adapter";
import DogGallery from "./DogGallery";

var mock = new AxiosMockAdapter(api, { onNoMatch: "throwException" });

let container = null;
beforeEach(() => {
    mock.reset();
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders dog images when breed is provided", async () => {
    mock.onGet("breed/shiba/images").reply(200, {
        message: ["image1.jpg", "image2.jpg"],
    });

    await act(async () => {
        render(<DogGallery breed={"shiba"} />, container);
    });
    expect(container.querySelector("h3").textContent).toBe("shiba");
    expect(container.querySelectorAll("img")[0].getAttribute('src')).toBe("image1.jpg");
    expect(container.querySelectorAll("img")[1].getAttribute('src')).toBe("image2.jpg");
});

it("doesn't render dog images when breed is not provided", async () => {
    await act(async () => {
        render(<DogGallery />, container);
    });
    expect(container.querySelector("h3").textContent).toBe("");
    expect(container.querySelector("img")).toBeNull();
});
"use client";

import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import Carousel from "@/components/Carousel";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function CreateThreadContent() {
  const { threadId } = useParams();

  // useEffect(() => {
  //   console.log(threadId);
  // }, []);
  // confirmed that threadId is being passed correctly

  const imageArr = [
    "https://i.pinimg.com/564x/f2/8b/b9/f28bb92377db206cdcbf1948d69fcfd7.jpg",
    "https://i.pinimg.com/236x/16/13/d2/1613d2927c0c9f1a7ac7f7b8b0d7c31e.jpg",
    "https://i.pinimg.com/236x/75/e9/ef/75e9ef58248657fc164181b57a68c42c.jpg",
  ];

  return (
    <div className="page-container">
      <PageHeaderWithBackBtn title="Create Thread Content" />

      {/* CAROUSEL */}
      <Carousel images={imageArr} />

      {/* CATEGORY SELECT */}
      <div className="my-3 form-floating">
        <select
          className="form-select"
          aria-label="category"
          id="floatingSelect"
          onChange={(e) => {
            setThreadData((prevState) => ({
              ...prevState,
              category: e.target.value,
            }));
          }}
        >
          <option disabled selected value style={{ display: "none" }}></option>
          <option value="1">Map</option>
          <option value="2">Category</option>
          <option value="3">Here</option>
        </select>
        <label htmlFor="floatingSelect">Category</label>
      </div>

      {/* LOCATION INPUT */}

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="locationInput"
          placeholder="Location"
          onChange={(e) => {
            setThreadData((prevState) => ({
              ...prevState,
              location: e.target.value,
            }));
          }}
        />
        <label className="form-label" htmlFor="locationInput">
          Location
        </label>
      </div>

      {/* RECOMMENDED TIME INPUT  */}
      <div className="form-floating mb-3">
        <input
          type="time"
          className="form-control"
          id="timeInput"
          placeholder="Time"
          onChange={(e) => {
            setThreadData((prevState) => ({
              ...prevState,
              time: e.target.value,
            }));
          }}
        />
        <label className="form-label" htmlFor="timeInput">
          Time
        </label>
      </div>

      {/* DESCRIPTION INPUT */}

      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Description"
          id="descriptionInput"
          style={{ height: "100px" }}
        ></textarea>
        <label htmlFor="descriptionInput">Description</label>
      </div>
      <button
        // onClick={handleSubmit}

        className="btn btn-submit-form"
      >
        Post
      </button>
      {/* spacer is needed as navbar is sticky nad will block out the lowest elements on page */}
      <div className="spacer"></div>
    </div>
  );
}

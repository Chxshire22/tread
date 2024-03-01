"use client";

import Carousel from "@/components/Carousel";
import { useEffect, useState } from "react";
import { imgOptimization } from "./CreateThreadForm";
import { CardImage, PlusSquareFill } from "react-bootstrap-icons";

export default function CreateThreadContentForm({ threadId }) {
  const [imgArr, setImgArr] = useState([]);
  const [threadsContentData, setThreadsContentData] = useState({
    location: "",
    time: "",
    description: "",
  });

  const imageArr = [
    "https://i.pinimg.com/564x/f2/8b/b9/f28bb92377db206cdcbf1948d69fcfd7.jpg",
    "https://i.pinimg.com/236x/16/13/d2/1613d2927c0c9f1a7ac7f7b8b0d7c31e.jpg",
    "https://i.pinimg.com/236x/75/e9/ef/75e9ef58248657fc164181b57a68c42c.jpg",
  ];


  // NOTE: Thread content category is to be posted to threads_contents_categories table
  // NOTE: Thread content images to be posted to threads_contents_display_picture table
  // The rest (location, description, recommended time) is to be posted to threads_content table

  /**
   * This asynchronous function handles the change event of an input element of type file.
   * It optimizes each selected image by resizing it to a width of 768 pixels while maintaining the aspect ratio.
   * The optimized images are then added to the imgArr state.
   *
   * @param {Event} e - The event object.
   */
  const handleImageChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // const blob = new Blob([file], { type: file.type });
      const optimizedImgs = await imgOptimization(file, 768);
      setImgArr((prevState) => [...prevState, optimizedImgs]);
    }
  };

  useEffect(() => {
    console.log(imgArr);
  }, [imgArr]);

  return (
    <div>
      {/* CAROUSEL */}
      {imgArr.length >= 1 ? (
        <Carousel images={imgArr} setImgArr={setImgArr} />
      ) : (
        <div className="img-preview-placeholder">
          <CardImage size={40} /> <p>Image Preview</p>
        </div>
      )}

      <div className="mt-3">
        <label htmlFor="file-upload-multiple" className="form-label">
          <div className="btn">
            <PlusSquareFill size={30} color="#00a0f3" />
          </div>
        </label>
        <input
          type="file"
          accept="images/*"
          id="file-upload-multiple"
          multiple
          onChange={handleImageChange}
        />
      </div>

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
            setThreadsContentData((prevState) => ({
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
            setThreadsContentData((prevState) => ({
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
          onChange={(e) => {
            setThreadsContentData((prevState) => ({
              ...prevState,
              description: e.target.value,
            }));
          }}
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

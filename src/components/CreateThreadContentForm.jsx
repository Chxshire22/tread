"use client";

import Carousel from "@/components/Carousel";
import { useEffect, useState } from "react";
import {
  CardImage,
  JournalMedical,
  PlusSquareFill,
} from "react-bootstrap-icons";
import Select from "react-select";
import { imgOptimization } from "@/utils/imageOptimization";
import axios from "axios";
import { BACKEND_URL } from "@/app/constants";

export default function CreateThreadContentForm({ threadId }) {
  // SET UP FORM
  const [imgArr, setImgArr] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [loading, setLoading] = useState(false);

  // SEND TO BACKEND

  const [threadsContentData, setThreadsContentData] = useState({
    location: "",
    time: "",
    description: "",
  });
  const [categoriesForBackend, setCategoriesForBackend] = useState([]);

  console.log(threadsContentData);

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
      const optimizedImgs = await imgOptimization(file, 768);
      setImgArr((prevState) => [...prevState, optimizedImgs]);
    }
  };

  /**
   * This code block contains two functions that work together to fetch categories from a backend API and handle changes to a dropdown menu.
   *
   * useEffect() is used to fetch categories from a backend API when the component mounts. The categories are then mapped to an array of objects, each containing a value (the category id) and a label (the category name), and this array is stored in the state using the setCategoriesArr function.
   *
   * handleDropDownChange() maps the selected categories to an array of objects, each containing a categoriesId (the category id) and a threadsContentId (the thread id). This array is then stored in the state using the setCategoriesForBackend function.
   *
   * @param {Event} e - The event object from the dropdown menu change event.
   */
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await axios.get(`${BACKEND_URL}/api/categories`);
      const categoriesData = categories.data;
      const categoriesArr = categoriesData.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategoriesArr(categoriesArr);
    };
    fetchCategories();
  }, []);

  const handleDropDownChange = (e) => {
    const categoryIdForBackend = e.map((each) => ({
      categoriesId: each.value,
      threadsContentId: Number(threadId),
    }));
    console.log(categoryIdForBackend);
    setCategoriesForBackend(categoryIdForBackend);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

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

      <Select
        isMulti
        name="categories"
        options={categoriesArr}
        className="basic-multi-select my-3 dropdown-package"
        classNamePrefix="select"
        placeholder="Categories"
        maxMenuHeight={150}
        onChange={handleDropDownChange}
      />

      {/* LOCATION INPUT */}

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="locationInput"
          placeholder="Location"
          maxMenuHeight={150}
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
          placeholder="Recommended Time"
          onChange={(e) => {
            setThreadsContentData((prevState) => ({
              ...prevState,
              time: e.target.value,
            }));
          }}
        />
        <label className="form-label" htmlFor="timeInput">
          Recommended Time
        </label>
      </div>

      {/* DESCRIPTION INPUT */}

      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Share your experience!"
          id="descriptionInput"
          style={{ height: "100px" }}
          onChange={(e) => {
            setThreadsContentData((prevState) => ({
              ...prevState,
              description: e.target.value,
            }));
          }}
        ></textarea>
        <label htmlFor="descriptionInput">Share your experience!</label>
      </div>
      <button
        onClick={handleSubmit}
        disabled={
          imgArr.length === 0 ||
          threadsContentData.description == "" ||
          threadsContentData.location == ""
            ? true
            : false
        }
        className="btn btn-submit-form"
      >
        {loading ? (
          <div
            class="spinner-border"
            style={{ width: "1.5rem", height: "1.5rem" }}
            role="status"
          ></div>
        ) : (
          `Post`
        )}
      </button>
      {/* spacer is needed as navbar is sticky nad will block out the lowest elements on page */}
      <div className="spacer"></div>
    </div>
  );
}

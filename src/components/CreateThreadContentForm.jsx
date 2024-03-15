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
import {
  ref as storageRef,
  getDownloadURL,
  uploadString,
} from "@firebase/storage";
import { useRouter } from "next/navigation";

import {
  storage,
  DB_STORAGE_THREAD_CONTENT_IMAGE_KEY,
  DB_STORAGE_THREAD_IMAGE_KEY,
} from "@/utils/firebase";

export default function CreateThreadContentForm({ threadId }) {
  // SET UP FORM
  const [imgArr, setImgArr] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // SEND TO BACKEND

  const [threadsContentData, setThreadsContentData] = useState({
    location: "",
    time: "",
    description: "",
    threadId: Number(threadId),
  });
  const [categoriesForBackend, setCategoriesForBackend] = useState([]);

  console.log(threadsContentData);

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
      // threadsContentsId: Number(threadId),
    }));
    console.log(categoryIdForBackend);
    setCategoriesForBackend(categoryIdForBackend);
  };

  /**
   * This asynchronous function handles the submission of a form.
   * It performs the following operations:
   * 1. Prevents the default form submission behavior.
   * 2. Sets the loading state to true.
   * 3. Sends a POST request to the backend to create a new thread content.
   * 4. Sends another POST request to the backend to associate categories with the newly created thread content.
   * 5. Loops through each image in the imgArr state, uploads it to a storage service, and stores the download URL in the imgUrls array.
   * 6. Maps the imgUrls array to an array of objects, each containing the id of the thread content and the URL of an image.
   * 7. Sends a POST request to the backend to associate the images with the newly created thread content.
   * 8. Sets the loading state to false.
   * If any error occurs during these operations, it is logged to the console.
   *
   * @param {Event} e - The event object from the form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imgUrls = [];
    try {
      const sendThreadsContentData = await axios.post(
        `${BACKEND_URL}api/threads-contents`,
        threadsContentData
      );
      const sendCategoriesData = await axios.post(
        `${BACKEND_URL}api/threads-contents/categories`,
        {
          threadContentCategories: categoriesForBackend.map((categories) => ({
            ...categories,
            threadsContentsId: sendThreadsContentData.data.id,
          })),
        }
      );
      for (let image of imgArr) {
        const storageRefInstance = storageRef(
          storage,
          DB_STORAGE_THREAD_IMAGE_KEY +
            `${threadId}/` +
            DB_STORAGE_THREAD_CONTENT_IMAGE_KEY +
            `${sendThreadsContentData.data.id}/` +
            image.split(",")[1].substring(4, 14)
        );
        await uploadString(storageRefInstance, image, "data_url");
        const imageUrl = await getDownloadURL(storageRefInstance);
        imgUrls.push(imageUrl);
      }
      const imgUrlAndId = imgUrls.map((imgUrl) => ({
        threadsContentsId: sendThreadsContentData.data.id,
        url: imgUrl,
      }));
      const sendImagesForBackend = await axios.post(
        `${BACKEND_URL}api/threads-contents/display-pictures`,
        { threadContentImages: imgUrlAndId }
      );
      setLoading(false);
      router.push(`/threads/${threadId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* CAROUSEL */}
      {imgArr.length >= 1 ? (
        <Carousel images={imgArr} setImgArr={setImgArr} allowDelete={true} />
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
            className="spinner-border"
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

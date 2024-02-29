"use client";
import { CardImage } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";

export default function CreateThreadsPage() {
  const router = useRouter();

  return (
    <div className="page-container">
      <PageHeaderWithBackBtn title="Create Thread" />
      <div className="img-preview-placeholder ">
        <CardImage size={40} /> <p>Upload Tread Picture</p>
      </div>

      {/* Select country */}
      <div className="my-3">
        <select className="form-select" aria-label="Country">
          <option defaultValue={null}>Select country</option>
          <option value="1">Map</option>
          <option value="2">Countries</option>
          <option value="3">Here</option>
        </select>
      </div>
      {/* Input title */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="titleInput"
          placeholder="Title"
        />
        <label className="form-label" htmlFor="floatingPassword">
          Title
        </label>
      </div>
      {/* Input Dates */}
      <div className="start-end-input">
        <div className="form-floating mb-3 date-input">
          <input type="date" className="form-control" id="startDateInput" />
          <label htmlFor="startDateInput">End date</label>
        </div>
        <div className="form-floating mb-3 date-input">
          <input type="date" className="form-control" id="endDateInput" />
          <label htmlFor="endDateInput">End date</label>
        </div>
      </div>

      <button type="submit" className="btn btn-submit-form">
        Post
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import buttonStyle from "../../styles/buttons.module.css";
import { ArrowLeftSquareFill, PlusCircleFill } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";

export default function CreatePostButton() {
  const router = useRouter();

  return (
    <div className="page-container">
      <header className="page-header-back">
        <a onClick={() => router.back()}>
          <ArrowLeftSquareFill /> <label className="back label">Back</label>
        </a>
      </header>
    </div>
  );
}

"use client";
import { ArrowLeftSquareFill } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";

export default function PageHeaderWithBackBtn({ title}) {
  
  const router = useRouter();

  return (
    <>
      <header className="">
        <a className="page-header-back" onClick={() => router.back()}>
          <ArrowLeftSquareFill color="#00a0f3" size={27} />{" "}
          <label className="page-label">{title}</label>
        </a>
      </header>
      <hr/>
    </>
  );
}

import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";
import Carousel from "@/components/Carousel";

export default function CreateThreadContent() {
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
    </div>
  );
}

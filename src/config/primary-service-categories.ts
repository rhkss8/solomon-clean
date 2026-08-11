import { serviceImages } from "./service-images.ts";
import type { ServiceSlug } from "../domain/site.ts";

type PrimaryServiceCategory = {
  slug: ServiceSlug;
  label: string;
  description: string;
  price: string;
  priceHref: string;
  image: string;
  priority: boolean;
  imageClassName?: string;
};

/** Shared category order and artwork for the homepage quick menu and price directory. */
export const primaryServiceCategories = [
  {
    slug: "move-in-cleaning",
    label: "입주·이사·준공청소",
    description: "입주·이사 전후와 준공 공간의 전체 청소",
    price: "150,000원 ~",
    priceHref: "/livingclean-price",
    image: serviceImages["move-in-cleaning"],
    priority: true,
    imageClassName: "service-quick__art--move-in",
  },
  {
    slug: "waste-disposal",
    label: "폐기물처리",
    description: "가정·이사·사업장 폐기물 수거와 정리",
    price: "250,000원 ~",
    priceHref: "/prices-waste",
    image: serviceImages["waste-disposal"],
    priority: true,
  },
  {
    slug: "hoarding-cleanup",
    label: "쓰레기집청소",
    description: "대량 폐기물 수거부터 청소·탈취까지",
    price: "700,000원 ~",
    priceHref: "/prices-clean",
    image: serviceImages["hoarding-cleanup"],
    priority: false,
  },
  {
    slug: "deep-cleaning",
    label: "특수청소",
    description: "일반 청소로 해결하기 어려운 오염·악취 현장",
    price: "상담 견적",
    priceHref: "/prices-deep_clean",
    image: serviceImages["deep-cleaning"],
    priority: false,
  },
  {
    slug: "estate-clearing",
    label: "유품정리",
    description: "보관품 구분부터 폐기·정리·청소까지",
    price: "600,000원 ~",
    priceHref: "/services/estate-clearing",
    image: serviceImages["estate-clearing"],
    priority: false,
  },
  {
    slug: "home-organizing",
    label: "정리수납",
    description: "생활 동선에 맞춘 분류와 수납 체계 정리",
    price: "350,000원 ~",
    priceHref: "/services/home-organizing",
    image: serviceImages["home-organizing"],
    priority: false,
  },
] as const satisfies readonly PrimaryServiceCategory[];

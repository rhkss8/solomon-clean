CREATE TABLE "work_cases" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"before_image_url" text NOT NULL,
	"after_image_url" text NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

INSERT INTO "work_cases" ("id", "title", "category", "description", "before_image_url", "after_image_url", "published", "display_order") VALUES
('08cd0a44-9ed2-4a56-8d20-23da8e3b4c01', '쓰레기집 청소', '특수청소', '적치물을 분류·반출하고 생활 공간을 다시 사용할 수 있도록 정리한 현장입니다.', '/blog-images/223234046342.jpg', '/blog-images/223234110284.jpg', true, 10),
('08cd0a44-9ed2-4a56-8d20-23da8e3b4c02', '폐기물 정리', '폐기물처리', '폐기물의 종류와 반출 동선을 확인한 뒤 수거와 마무리 청소를 진행한 현장입니다.', '/blog-images/223235919143.jpg', '/blog-images/223235940657.jpg', true, 20),
('08cd0a44-9ed2-4a56-8d20-23da8e3b4c03', '입주·거주 청소', '일반청소', '주방과 생활 공간의 오염 상태를 확인하고 공간별로 청소한 현장입니다.', '/blog-images/223238169925.jpg', '/blog-images/223238397121.jpg', true, 30);

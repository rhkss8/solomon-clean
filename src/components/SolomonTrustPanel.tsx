import Image from "next/image";

export function SolomonTrustPanel() {
  return (
    <section aria-label="솔로몬 청소 서비스 안내" className="solomon-trust">
      <Image
        alt="청소부터 폐기물 처리까지 한 번에 해결하는 솔로몬 종합청소 서비스 안내"
        className="solomon-trust__image"
        height={1464}
        sizes="(max-width: 768px) 100vw, 900px"
        src="/solomon-cleaning-infographic-v2.png"
        width={1074}
      />
    </section>
  );
}

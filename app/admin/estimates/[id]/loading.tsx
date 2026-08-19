import styles from "./loading.module.css";

export default function AdminEstimateLoading() {
  return <div aria-live="polite" className={styles.loading} role="status">
      <span aria-hidden="true" className={styles.spinner} />
      <strong>견적 상세를 불러오는 중입니다.</strong>
      <p>고객 정보와 첨부 사진을 확인하고 있습니다.</p>
      <div aria-hidden="true" className={styles.skeleton}>
        <i /><i /><i />
      </div>
  </div>;
}

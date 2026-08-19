"use client";

import { useState } from "react";
import { deleteEstimate } from "@/app/admin/actions";
import styles from "./DeleteEstimateButton.module.css";

export function DeleteEstimateButton({ id, reference }: { id: string; reference: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  return <form
    action={deleteEstimate}
    className={styles.form}
    onSubmit={(event) => {
      if (!window.confirm(`${reference} 견적을 삭제할까요?\n첨부된 현장 사진도 함께 삭제되며 복구할 수 없습니다.`)) {
        event.preventDefault();
        return;
      }
      setIsDeleting(true);
    }}
  >
    <input name="id" type="hidden" value={id} />
    <button disabled={isDeleting} type="submit">{isDeleting ? "삭제 중…" : "견적 삭제"}</button>
    <small>고객 정보와 첨부 사진이 함께 삭제됩니다.</small>
  </form>;
}

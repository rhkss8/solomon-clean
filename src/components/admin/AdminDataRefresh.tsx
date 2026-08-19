"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
export function AdminDataRefresh(){const router=useRouter();const[pending,startTransition]=useTransition();return <button disabled={pending} onClick={()=>startTransition(()=>router.refresh())} style={{minHeight:38,padding:"0 12px",border:"1px solid #ccd3dc",borderRadius:7,background:"#fff",color:pending?"#7f8996":"#26303c",fontSize:13,fontWeight:750,cursor:pending?"wait":"pointer"}} type="button">{pending?"불러오는 중…":"데이터 새로고침"}</button>}

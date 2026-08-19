import { getDatabaseClient } from "@/db";
export async function getAdminNavigationCounts(){const rows=await getDatabaseClient().unsafe("SELECT (SELECT COUNT(*)::int FROM estimates) AS estimates, (SELECT COUNT(*)::int FROM work_cases) AS work_cases");const row=rows[0] as {estimates?:number;work_cases?:number}|undefined;return {estimates:row?.estimates??0,workCases:row?.work_cases??0};}

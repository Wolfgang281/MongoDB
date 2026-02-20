// ============================================================
//
// NEW FIELDS ADDED TO emp:
//   salary, grade, phoneNumber, workingHoursPerDay, overtimeHours,
//   leaveBalance, lastIncrement(date), officeEquipment(array),
//   taskCompleted, targetAssigned, weeklyHours(array),
//   monthlySalaryHistory(array), address(object), shiftType,
//   probationPeriod(bool), contractType
//
// NEW FIELDS ADDED TO dept:
//   monthlyExpenses(array), yearlyBudgetHistory(array),
//   hqDistance, avgEmployeeAge, parkingSpots, meetingRooms,
//   remoteEmployees, deptCode, contactEmail, establishedYear,
//   maxHeadcount, currentProjects(array), softwareTools(array),
//   lastAuditDate(date), certification, rating
// ============================================================

// ============================================================
// SECTION 1: QUERY OPERATORS — COMPARISON
// ($eq, $ne, $gt, $gte, $lt, $lte, $in, $nin)
// ============================================================

// $eq
// 1.  Find the employee whose empNo equals 7839.
// 2.  Find all employees whose job equals "clerk".
// 3.  Find all employees whose grade equals "A".
// 4.  Find all departments whose dName equals "sales".
// 5.  Find all employees whose shiftType equals "flexible".

// $ne
// 6.  Find all employees whose job is not "clerk".
// 7.  Find all employees whose contractType is not "contract".
// 8.  Find all departments where officeType is not "warehouse".
// 9.  Find employees whose shiftType is not "morning".
// 10. Find departments whose region is not "Northeast".

// $gt / $gte
// 11. Find all employees whose sal is greater than 2000.
// 12. Find employees whose experience is greater than 10.
// 13. Find employees whose age is greater than or equal to 35.
// 14. Find departments whose budget is greater than or equal to 180000.
// 15. Find employees whose leaveBalance is greater than 12.

// $lt / $lte
// 16. Find all employees whose sal is less than 1500.
// 17. Find employees whose overtimeHours is less than 10.
// 18. Find departments whose employeeCount is less than or equal to 3.
// 19. Find employees whose totalHoursWorked is less than or equal to 1900.
// 20. Find departments whose rating is less than 3.0.

// $in
// 21. Find employees whose deptNo is in [10, 30].
// 22. Find employees whose job is in ["manager", "analyst"].
// 23. Find employees whose education is in ["master", "phd", "mba"].
// 24. Find departments whose region is in ["Northeast", "West"].
// 25. Find employees whose grade is in ["A+", "S"].

// $nin
// 26. Find employees whose empNo is not in [7369, 7499, 7521].
// 27. Find employees whose job is not in ["clerk", "salesman"].
// 28. Find employees whose shiftType is not in ["morning", "afternoon"].
// 29. Find departments whose officeType is not in ["warehouse", "tech_hub"].
// 30. Find employees whose grade is not in ["C+", "B"].

// ============================================================
// SECTION 2: QUERY OPERATORS — LOGICAL
// ($and, $or, $not, $nor)
// ============================================================

// $and
// 31. Find employees whose sal > 2000 AND deptNo is 20.
// 32. Find employees whose job is "manager" AND education is "master".
// 33. Find departments that are isActive AND budget > 150000.
// 34. Find employees whose age >= 30 AND age <= 45.
// 35. Find remote employees (isRemote: true) AND havingInsurance: true.

// $or
// 36. Find employees whose job is "manager" OR job is "president".
// 37. Find employees whose city is "Chicago" OR city is "Dallas".
// 38. Find departments that are NOT active OR have 0 employees.
// 39. Find employees whose sal > 3000 OR bonus > 1500.
// 40. Find employees whose education is "phd" OR grade is "S".

// $not
// 41. Find employees whose sal is NOT less than 2000.
// 42. Find employees whose age is NOT greater than 40.
// 43. Find departments where budget is NOT greater than 200000.
// 44. Find employees who are NOT in department 30.
// 45. Find employees whose experience is NOT less than 10.

// $nor
// 46. Find employees who are neither a "clerk" NOR in department 10.
// 47. Find employees who neither have insurance NOR are remote.
// 48. Find departments that are neither active NOR have employees > 3.
// 49. Find employees whose salary is neither < 1000 NOR > 3500.
// 50. Find employees who neither work in "Chicago" NOR "Noida".

// ============================================================
// SECTION 3: QUERY OPERATORS — ELEMENT
// ($exists, $type)
// ============================================================

// $exists
// 51. Find all employees who have an "incentive" field.
// 52. Find all employees who do NOT have an "incentive" field.
// 53. Find all employees who have a "territory" field.
// 54. Find all departments where "headOfDept" field exists (even if null).
// 55. Find all employees where "managedEmployees" field exists.
// 56. Find employees where "phoneNumber" exists AND sal > 2000.
// 57. Find departments where "territories" field does NOT exist.
// 58. Find employees where "probationPeriod" field exists.
// 59. Find all departments where "certification" field exists.
// 60. Find all employees where "address.state" nested field exists.

// $type
// 61. Find employees where "sal" field is of type "number" (double).
// 62. Find employees where "skills" field is of type "array".
// 63. Find employees where "empName" is of type "string".
// 64. Find departments where "headOfDept" is of type "null".
// 65. Find employees where "isRemote" is of type "bool".
// 66. Find departments where "teamLeads" is of type "array".
// 67. Find employees where "hireDate" field is of type "date".
// 68. Find employees where "probationPeriod" is of type "bool".
// 69. Find employees where "experience" is of type "double".
// 70. Find departments where "rating" is of type "double".

// ============================================================
// SECTION 4: QUERY OPERATORS — EVALUATION
// ($regex, $expr, $mod)
// ============================================================

// $regex
// 71.  Find employees whose empName starts with "m" (case-insensitive).
// 72.  Find employees whose empName ends with "s" (case-insensitive).
// 73.  Find employees whose empName contains "ar" (case-insensitive).
// 74.  Find departments whose dName contains "ing" (case-insensitive).
// 75.  Find employees whose city starts with "N" (case-insensitive).
// 76.  Find departments whose loc ends with "go" (case-insensitive, Chicago).
// 77.  Find employees whose grade matches pattern "A" at the start (A, A+, A-).
// 78.  Find employees whose contactEmail (address nested) — skip; use dept contactEmail ending with "@corp.com".
// 79.  Find employees whose job contains "man" (manager, salesman).
// 80.  Find departments whose deptCode is exactly 2 characters long (regex: ^[A-Z]{2}$).

// $expr
// 81.  Find employees where sal > bonus (compare two fields).
// 82.  Find employees where totalHoursWorked > sal * 0.5.
// 83.  Find employees where (sal + bonus) > 3500.
// 84.  Find employees where taskCompleted >= targetAssigned.
// 85.  Find departments where budget > employeeCount * 30000.
// 86.  Find employees where overtimeHours > leaveBalance.
// 87.  Find employees where age * 100 < sal.
// 88.  Find departments where annualRevenue > budget * 10.
// 89.  Find employees where (sal + comm + bonus) > 4000.
// 90.  Find employees where experience * 200 > sal.

// $mod
// 91.  Find employees whose sal is even (divisible by 2).
// 92.  Find employees whose sal is odd (divisible by 2, remainder 1).
// 93.  Find employees whose empNo is divisible by 3.
// 94.  Find employees whose bonus is divisible by 500.
// 95.  Find departments whose dept number is divisible by 10.
// 96.  Find employees whose age is divisible by 5.
// 97.  Find employees whose totalHoursWorked divided by 100 gives remainder 0.
// 98.  Find departments whose budget divided by 10000 gives remainder 0.
// 99.  Find employees whose empNo ends in 0 (divisible by 10).
// 100. Find employees whose comm divided by 400 gives remainder 0.

// ============================================================
// SECTION 5: QUERY OPERATORS — ARRAY
// ($all, $elemMatch, $size)
// ============================================================

// $all
// 101. Find employees who have both "sql" and "python" in skills.
// 102. Find employees who have both "html" and "java" in skills.
// 103. Find employees working on both "project_alpha" and "research_initiative".
// 104. Find departments that have both "conference_room" and "printer" in facilities.
// 105. Find departments whose softwareTools include both "python" and "jupyter".

// $elemMatch
// 106. Find employees where weeklyHours array has at least one element > 50.
// 107. Find employees where monthlySalaryHistory has at least one element > 2800.
// 108. Find departments where monthlyExpenses has at least one value > 19000.
// 109. Find employees where weeklyHours has at least one value between 45 and 55 (inclusive).
// 110. Find departments where yearlyBudgetHistory has a value >= 230000.

// $size
// 111. Find employees who have exactly 3 skills.
// 112. Find employees who have exactly 4 skills.
// 113. Find employees who have exactly 5 skills.
// 114. Find departments with exactly 3 facilities.
// 115. Find departments with exactly 5 facilities.
// 116. Find employees with exactly 2 projects.
// 117. Find employees with exactly 1 certification.
// 118. Find employees with exactly 0 certifications.
// 119. Find departments with exactly 2 teamLeads.
// 120. Find employees with exactly 3 monthlySalaryHistory entries.

// $expr + $size (for greater than / less than comparisons on arrays)
// 121. Find employees who have more than 3 skills (use $expr with $size).
// 122. Find employees who have more than 2 projects.
// 123. Find employees who have at least 2 certifications.
// 124. Find departments with more than 4 facilities.
// 125. Find departments with at least 3 softwareTools.

// ============================================================
// SECTION 6: UPDATE OPERATORS — FIELD
// ($set, $unset, $rename, $setOnInsert)
// ============================================================

// $set
// 126. Update employee "smith" salary to 1500.
// 127. Update department 40 isActive to true.
// 128. Update employee "king" grade to "A+" (from "S").
// 129. Set employee "james" contractType to "permanent".
// 130. Set department 50 headOfDept to 7839 (king).
// 131. Set employee "ward" shiftType to "morning".
// 132. Update department 20 rating to 4.8.
// 133. Set employee "turner" leaveBalance to 10.
// 134. Update nested field: set employee "smith" performance.rating to 4.0.
// 135. Set department 40 certification to "ISO-9001".

// $unset
// 136. Remove "incentive" field from employee "ward".
// 137. Remove "territory" field from employee "martin".
// 138. Remove "territory" field from ALL salesmen.
// 139. Remove "avgEmployeeAge" field from departments with 0 employees.
// 140. Remove "probationPeriod" field from employee "james".

// $rename
// 141. Rename field "sal" to "salary" for employee "smith" (if sal still exists).
// 142. Rename field "comm" to "commission" for all employees.
// 143. Rename field "loc" to "location" for all departments.
// 144. Rename "dName" to "deptName" for department 50.
// 145. Rename "totalHoursWorked" to "hoursWorked" for employee "jones".

// $setOnInsert (used with upsert: true)
// 146. Upsert: if employee empNo 9999 does not exist, insert with name "newbie", job "intern",
//      and use $setOnInsert to set createdAt to current date and deptNo to 10.
// 147. Upsert: if department dept 60 does not exist, insert with dName "marketing",
//      and $setOnInsert to set isActive: true and establishedYear: 2024.
// 148. Upsert: find employee empNo 8000 (does not exist); use $set for empName "ghost"
//      and $setOnInsert for contractType "contract".
// 149. Upsert on dept 70: $set dName "legal", $setOnInsert budget to 90000.
// 150. Explain the difference: why $setOnInsert fields do NOT update if the document already exists.

// ============================================================
// SECTION 7: UPDATE OPERATORS — ARITHMETIC
// ($inc, $mul, $min, $max, $currentDate)
// ============================================================

// $inc
// 151. Increase salary of employee "adams" by 500.
// 152. Decrease comm of employee "martin" by 200.
// 153. Increase bonus of all clerks by 300.
// 154. Increase budget of department 20 by 50000.
// 155. Decrease totalHoursWorked of employee "turner" by 50.
// 156. Increase performance.rating of employee "ford" by 0.2.
// 157. Increase leaveBalance of all remote employees by 5.
// 158. Increase employeeCount of department 30 by 1.
// 159. Decrease overtimeHours of employee "james" by 10 (to minimum 0 — use $max after).
// 160. Increase age of employee "miller" by 1.

// $mul
// 161. Multiply salary of employee "king" by 1.1 (10% raise).
// 162. Multiply bonus of all analysts by 1.15 (15% increase).
// 163. Multiply budget of all active departments by 1.05 (5% increase).
// 164. Multiply totalHoursWorked of employee "jones" by 1.02 (2% adjustment).
// 165. Multiply annualRevenue of department 30 by 1.20 (20% growth).

// $min
// 166. Update employee "james" salary to 1000 only if 1000 is LESS than current sal.
// 167. Set leaveBalance of all employees to minimum of 5 (using $min).
// 168. Set department 30 budget to 175000 only if 175000 < current budget.
// 169. Set employee "turner" overtimeHours to 0 only if 0 < current overtimeHours.
// 170. Set all employees' leaveBalance to at most 20 (using $min: 20).

// $max
// 171. Update employee "smith" salary to 1500 only if 1500 is GREATER than current sal.
// 172. Set floor of department 10 to 6 only if 6 > current floor.
// 173. Set employee "adams" totalHoursWorked to minimum 2000 (using $max: 2000).
// 174. Update department 20 employeeCount to at least 5 (using $max: 5).
// 175. Set employee "king" bonus to 2500 only if 2500 > current bonus.

// $currentDate
// 176. Set lastIncrement of employee "smith" to current date.
// 177. Set lastAuditDate of department 20 to today.
// 178. Set performance.lastReviewDate of employee "miller" to current date (as Date type).
// 179. Set lastIncrement of all clerks to current date.
// 180. Set lastAuditDate of all active departments to current date.

// ============================================================
// SECTION 8: UPDATE OPERATORS — ARRAY (ADD)
// ($push, $addToSet, $push + $each, $push + $each + $position,
//  $push + $each + $slice, $push + $each + $sort)
// ============================================================

// $push (single element)
// 181. Add skill "mongodb" to employee "smith".
// 182. Add project "mobile_app" to employee "allen".
// 183. Add facility "parking_lot" to department 10.
// 184. Add skill "docker" to employee "jones".
// 185. Add project "cloud_migration" to employee "king".
// 186. Add weeklyHour value 44 to employee "smith" weeklyHours array.
// 187. Add facility "recreation_room" to department 20.
// 188. Add project "api_development" to employee "ward".
// 189. Add tool "slack" to department 30 softwareTools.
// 190. Add skill "typescript" to all employees in department 30.

// $push + $each (multiple elements)
// 191. Add skills ["angular", "vue", "svelte"] to employee "turner".
// 192. Add projects ["project_beta", "project_gamma"] to employee "blake".
// 193. Add facilities ["elevator", "emergency_exit"] to department 30.
// 194. Add skills ["nodejs", "express", "nestjs"] to employee "adams".
// 195. Add projects ["security_audit", "compliance_review"] to employee "clark".
// 196. Add weeklyHours [46, 47] to employee "jones" weeklyHours array.
// 197. Add softwareTools ["github", "bitbucket"] to department 20.
// 198. Add skills ["aws", "azure", "gcp"] to all managers.
// 199. Add monthlySalaryHistory entries [3100, 3200] to employee "scott".
// 200. Add projects ["training_program", "onboarding_system"] to employee "ford".

// $push + $each + $position (insert at index)
// 201. Add skill "leadership" at position 0 of skills array for employee "jones".
// 202. Add project "priority_project" at position 0 for employee "king".
// 203. Add facility "reception" at position 0 for department 20.
// 204. Add skill "problem_solving" at position 1 in skills for employee "scott".
// 205. Add project "urgent_fix" at position 0 for all analysts.

// $push + $each + $slice (limit array size after push)
// 206. Add skill "graphql" to employee "ward" and keep only the last 5 skills.
// 207. Add project "new_feature" to employee "martin" and keep only last 3 projects.
// 208. Add facility "old_store" to department 40 and keep only first 2 facilities (slice: 2).
// 209. Add skill "solidity" to employee "adams" and keep only last 4 skills.
// 210. Add project "optimization" to employee "blake" and keep only last 4 projects.

// $push + $each + $sort (sort array after push)
// 211. Add skill "animation" to employee "allen" and sort all skills alphabetically (ascending).
// 212. Add project "analytics_dashboard" to employee "scott" and sort projects descending.
// 213. Add facility "auditorium" to department 20 and sort facilities alphabetically.
// 214. Add skill "testing" to employee "turner" and sort skills ascending.
// 215. Add skills ["redis", "kafka"] to employee "ford" and sort all skills ascending.

// $push + $each + $position + $slice + $sort (all combined)
// 216. Add "team_lead" skill at position 0 to "jones", keep last 6 skills, sort ascending.
// 217. Add projects ["refactoring", "docs"] at position 0 to "clark", keep last 5, sort ascending.
// 218. Add facility "innovation_lab" to dept 20 at position 1, keep last 4, sort ascending.

// $addToSet (unique add)
// 219. Add skill "python" to employee "clark" only if it doesn't exist.
// 220. Add project "project_alpha" to employee "jones" only if not already present.
// 221. Add facility "conference_room" to department 10 only if not already there.
// 222. Add skill "sql" to employee "smith" (it exists — observe no duplicate is added).
// 223. Add project "sales_campaign_q1" to employee "blake" only if not already added.
// 224. Add skill "html" to all employees in dept 30 avoiding duplicates.

// $addToSet + $each (multiple unique adds)
// 225. Add skills ["react", "angular", "vue"] to employee "ward" avoiding duplicates.
// 226. Add projects ["audit_2024", "compliance_check"] to employee "king" without duplicates.
// 227. Add facilities ["first_aid", "fire_extinguisher"] to dept 30 avoiding duplicates.
// 228. Add skills ["agile", "scrum", "kanban"] to all managers without duplicates.
// 229. Add tools ["git", "github"] to all departments, avoiding duplicates in softwareTools.
// 230. Add projects ["code_review", "peer_testing"] to all analysts without duplicates.

// ============================================================
// SECTION 9: UPDATE OPERATORS — ARRAY (REMOVE)
// ($pop, $pull, $pullAll)
// ============================================================

// $pop
// 231. Remove the LAST skill from employee "turner".
// 232. Remove the FIRST project from employee "blake".
// 233. Remove the LAST facility from department 20.
// 234. Remove the FIRST skill from employee "clark".
// 235. Remove the LAST project from all analysts.
// 236. Remove the FIRST facility from department 30.
// 237. Remove the last weeklyHour entry from employee "james".
// 238. Remove the first monthlySalaryHistory entry from employee "king".
// 239. Remove the last softwareTool from department 40.
// 240. Remove the first element from officeEquipment array of employee "miller".

// $pull (remove matching element)
// 241. Remove skill "html" from employee "jones".
// 242. Remove project "data_entry" from employee "james".
// 243. Remove facility "storage" from department 40.
// 244. Remove skill "sql" from employee "smith".
// 245. Remove project "web_portal" from employee "turner".
// 246. Remove facility "loading_dock" from all departments that have it.
// 247. Remove skill "excel" from all clerks.
// 248. Remove project "sales_campaign_q1" from all employees in dept 30.
// 249. Remove facility "coffee_machine" from department 10.
// 250. Remove skill "powerpoint" from employee "martin".

// $pull with condition (remove elements satisfying a condition)
// 251. Remove from weeklyHours all values < 40 for employee "smith".
// 252. Remove from monthlySalaryHistory all values < 1200 for employee "allen".
// 253. Remove from monthlyExpenses all values < 9000 for department 40.
// 254. Remove all skills that start with "ex" using $regex from employee "clark".
//      (Hint: { $pull: { skills: { $regex: /^ex/ } } })
// 255. Remove all projects ending with "_q1" from all salesmen.

// $pullAll (remove multiple specific values)
// 256. Remove skills ["sql", "excel"] from employee "james".
// 257. Remove projects ["sales_campaign_q1", "sales_campaign_q2"] from employee "allen".
// 258. Remove facilities ["storage", "loading_dock"] from department 40.
// 259. Remove skills ["html", "php"] from employee "turner".
// 260. Remove projects ["project_alpha", "research_initiative"] from employee "smith".
// 261. Remove facilities ["printer", "coffee_machine"] from department 10.
// 262. Remove skills ["blockchain", "ai"] from all employees in dept 20.
// 263. Remove tools ["erp", "excel"] from department 40 softwareTools.
// 264. Remove weeklyHours values [40, 40] from employee "james" (note: removes both occurrences).
// 265. Remove monthlySalaryHistory entries [900, 920] from employee "james".

// ============================================================
// SECTION 10: UPDATE OPERATORS — POSITIONAL
// ($, $[], $[<identifier>])
// ============================================================

// $ (positional — updates FIRST matching array element)
// 266. Employee "clark" has skills ["java","python","html","accounting","sql"].
//      Query by skill "python" and update that element to "python3".
// 267. Employee "turner" has skills. Update first "javascript" to "javascript_es6".
// 268. Department 20 facilities: update first "conference_room" to "conference_room_A".
// 269. Employee "jones": update project "project_alpha" to "project_alpha_v2".
// 270. Employee "smith": update skill "sql" to "postgresql" (query by skill: "sql").
// 271. Department 30: update first facility "meeting_room" to "boardroom".
// 272. Employee "ford": update first skill "python" to "python3".
// 273. Update first weeklyHour value of 40 to 42 for employee "james".
// 274. Employee "king": update first project "company_expansion" to "global_expansion".
// 275. Department 10: update softwareTool "quickbooks" to "quickbooks_online".

// $[] (all positional — updates ALL elements in array)
// 276. Append "_v2" to all skills of employee "adams"
//      (use $addFields or $set with $map in aggregation pipeline update, or demonstrate $[]).
// 277. Add 2 to every value in weeklyHours for employee "james" (use $inc with $[]).
// 278. Add 100 to every entry in monthlySalaryHistory of employee "smith".
// 279. Add "_done" suffix to all projects of employee "martin" (use $[] with aggregation update).
// 280. Add 500 to every entry in yearlyBudgetHistory of department 20.

// $[<identifier>] + arrayFilters (updates elements matching a condition)
// 281. Employee "clark" has skills. Update all skills with length > 5 chars to add "_adv" suffix.
//      arrayFilters: [{ "el": { $regex: /^.{6,}/ } }]
// 282. For employee "blake", update all projects containing "sales" to add "_priority" suffix.
//      arrayFilters: [{ "proj": { $regex: /sales/ } }]
// 283. Update all facilities in dept 20 starting with "conference" to add "_renovated" suffix.
// 284. For employee "turner", update skills ["javascript","html","php"] to add "_legacy".
//      arrayFilters: [{ "sk": { $in: ["javascript","html","php"] } }]
// 285. Update all weeklyHours values > 45 for employee "jones" to set them to 45 (cap at 45).
//      arrayFilters: [{ "hr": { $gt: 45 } }]
// 286. Update all monthlySalaryHistory entries < 1300 for employee "smith" to 1300.
//      arrayFilters: [{ "m": { $lt: 1300 } }]
// 287. For all employees, update projects containing "sales_campaign" to add "_archived".
//      arrayFilters: [{ "proj": { $regex: /sales_campaign/ } }]
// 288. Update yearlyBudgetHistory entries < 150000 in dept 20 to 150000.
//      arrayFilters: [{ "yr": { $lt: 150000 } }]
// 289. Update all weeklyHours < 40 in ALL employees to 40 (using updateMany + $[identifier]).
// 290. For dept 30, update all monthlyExpenses > 15000 to 15000 (cap).

// ============================================================
// SECTION 11: AGGREGATION — BASIC STAGES
// ($match, $project, $sort, $limit, $skip, $count)
// ============================================================

// $match
// 291. Find all employees with sal > 2000.
// 292. Find employees in department 20 or 30.
// 293. Find all managers and analysts.
// 294. Find employees with performance rating above 4.5.
// 295. Find all active departments.
// 296. Find employees hired after 1985.
// 297. Find all remote employees.
// 298. Find departments with budget > 150000.
// 299. Find employees with havingInsurance: true.
// 300. Find salesmen with comm > 500.

// $project
// 301. Show only empName, job, and sal for all employees (exclude _id).
// 302. Show deptNo, dName, and budget for all departments.
// 303. Show employee name and annualSalary (sal * 12).
// 304. Show empName and totalCompensation (sal + bonus + comm).
// 305. Show department name and budget in thousands (budget / 1000).
// 306. Show empName and a boolean isHighEarner (sal > 2000).
// 307. Show empName, job; exclude _id and skills.
// 308. Show first 3 chars of empName (use $substrCP).
// 309. Show department name in uppercase.
// 310. Show empName and skillCount (number of skills using $size).

// $sort
// 311. Sort employees by sal descending.
// 312. Sort departments by budget ascending.
// 313. Sort employees by hireDate ascending (oldest first).
// 314. Sort employees by performance.rating descending.
// 315. Sort employees by empName alphabetically.
// 316. Sort departments by employeeCount descending.
// 317. Sort employees by age ascending.
// 318. Sort employees first by deptNo ascending, then by sal descending.
// 319. Sort employees by totalHoursWorked descending.
// 320. Sort departments by established date ascending.

// $limit and $skip
// 321. Get top 5 highest-paid employees (sort + limit).
// 322. Get top 3 departments by budget.
// 323. Skip first 3 employees (sorted by empNo) and show next 5.
// 324. Get employees ranked 4–7 by salary (skip 3, limit 4).
// 325. Show only the first 2 active departments.

// $count
// 326. Count total number of employees.
// 327. Count employees with sal > 2000.
// 328. Count departments with budget > 150000.
// 329. Count remote employees.
// 330. Count employees with havingInsurance: true.

// ============================================================
// SECTION 12: AGGREGATION — GROUP & ACCUMULATORS
// ($group, $sum, $avg, $min, $max, $first, $last, $push, $addToSet)
// ============================================================

// $group + $sum
// 331. Count total employees in each department.
// 332. Find total sal expense by department.
// 333. Find total bonus paid by department.
// 334. Count employees by job role.
// 335. Find total comm paid by department.
// 336. Find total overtime hours by city.
// 337. Count remote vs non-remote employees.
// 338. Count employees by contractType.
// 339. Find total taskCompleted by department.
// 340. Count employees by shiftType.

// $group + $avg
// 341. Find average sal by department.
// 342. Find average performance.rating by job role.
// 343. Find average age by education level.
// 344. Find average bonus by department.
// 345. Find average totalHoursWorked by job role.
// 346. Find average leaveBalance by department.
// 347. Find average overtimeHours by shiftType.
// 348. Find average experience by education level.
// 349. Find average sal by city.
// 350. Find average rating by department.

// $group + $min / $max
// 351. Find maximum sal in each department.
// 352. Find minimum sal in each department.
// 353. Find the highest bonus in each job category.
// 354. Find the minimum age by department.
// 355. Find the maximum experience by education level.
// 356. Find the earliest hireDate by department.
// 357. Find the latest hireDate per job role.
// 358. Find max leaveBalance by city.
// 359. Find min totalHoursWorked by department.
// 360. Find max overtimeHours by contractType.

// $group + $first / $last
// 361. For each department, get the name of the first employee (sorted by empNo).
// 362. For each job role, get the last hired employee name.
// 363. For each city, get the first employee alphabetically (sort by empName first).
// 364. For each department, get the highest-paid employee's empName (sort by sal desc, take $first).
// 365. For each education level, get the $first empName encountered.

// $group + $push / $addToSet
// 366. For each department, collect all employee names into an array ($push).
// 367. For each job role, collect unique cities where employees work ($addToSet).
// 368. For each department, collect all projects worked on ($push from each employee).
// 369. For each city, collect unique job roles ($addToSet).
// 370. For each education level, push all skills into one array (unwind skills first, then push).

// ============================================================
// SECTION 13: AGGREGATION — TRANSFORM & RESHAPE
// ($addFields/$set, $unset, $replaceRoot/$replaceWith, $project expressions)
// ============================================================

// $addFields / $set
// 371. Add field "annualSalary" (sal * 12) to all employees.
// 372. Add field "totalCompensation" (sal + bonus + comm).
// 373. Add field "isHighPerformer" (true if performance.rating >= 4.5).
// 374. Add field "skillCount" (number of skills).
// 375. Add field "projectCount" (number of projects).
// 376. Add field "hourlyRate" (sal / totalHoursWorked).
// 377. Add field "budgetPerEmployee" to departments (budget / employeeCount). Handle div by 0.
// 378. Add field "achievementRate" to employees (taskCompleted / targetAssigned * 100).
// 379. Add field "seniorityLevel": "Junior" if experience < 5, "Mid" if 5–15, "Senior" if > 15.
//      (Use $cond or $switch)
// 380. Add field "fullAddress" by concatenating address.street, address.state.

// $unset
// 381. Remove field "_id" and "mgr" from employee output.
// 382. Remove "budget" and "costCenter" from department output.
// 383. Remove "comm" and "overtimeHours" from employee aggregation result.
// 384. Remove nested field "performance.reviewedBy" from output.
// 385. Remove "_id", "hireDate", and "address" from employee output.

// $replaceRoot / $replaceWith
// 386. Replace root with performance sub-document for all employees.
// 387. Promote the "address" sub-document as the root.
// 388. Use $replaceWith to make each employee's performance object the new root.
// 389. After $lookup join, replace root with the merged employee + department document.
// 390. Replace root with an object containing only empName, sal, and job (use $replaceWith + mergeObjects).

// ============================================================
// SECTION 14: AGGREGATION — ARRAY STAGES
// ($unwind, $filter, $map, $reduce, $arrayElemAt, $concatArrays)
// ============================================================

// $unwind
// 391. Unwind skills array — one document per skill per employee.
// 392. Unwind projects array for all employees.
// 393. Unwind facilities array for departments.
// 394. Count how many employees have each specific skill (unwind + group).
// 395. List all projects with employee names (unwind projects + project empName).
// 396. Unwind weeklyHours and find average hours per employee.
// 397. Unwind monthlySalaryHistory and find the average across all history entries.
// 398. Unwind officeEquipment and count total equipment pieces per department city.
// 399. Unwind skills and count total unique skills in the company.
// 400. Unwind certifications and group by certification name to count how many have each.

// $filter (in $project / $addFields)
// 401. For each employee, show only skills that contain "sql" or "python" (use $filter with $in or $regexMatch).
// 402. For each employee, filter weeklyHours to keep only values > 42.
// 403. For each employee, filter projects to keep only those containing "sales".
// 404. For each department, filter facilities to keep only those starting with "conference".
// 405. For each employee, filter monthlySalaryHistory to keep values > 1200.

// $map
// 406. For each employee, convert all skills to uppercase using $map + $toUpper.
// 407. For each employee, double each weeklyHour value using $map + $multiply.
// 408. For each department, append "_dept" to each softwareTool using $map + $concat.
// 409. For each employee, add 100 to each monthlySalaryHistory entry.
// 410. For each employee, calculate each weeklyHour as percentage of 50 (weeklyHour/50*100).

// $reduce
// 411. For each employee, calculate total of all weeklyHours using $reduce.
// 412. For each employee, calculate total monthlySalaryHistory sum using $reduce.
// 413. For each department, sum all monthlyExpenses using $reduce.
// 414. For each employee, find the maximum weeklyHour using $reduce.
// 415. For each department, find the minimum yearlyBudgetHistory entry using $reduce.

// $arrayElemAt / $first / $last
// 416. Get the first skill of each employee.
// 417. Get the last project of each employee.
// 418. Get the first facility of each department.
// 419. Get the 3rd weekly hour (index 2) for each employee.
// 420. Get the last entry in monthlySalaryHistory for each employee.

// $concatArrays
// 421. Combine "skills" and "certifications" arrays for each employee into one array.
// 422. Combine "facilities" and "softwareTools" for each department into one array.
// 423. Combine "projects" and "currentProjects" from employee + their department.
//      (Requires $lookup first)
// 424. For employee "king", combine skills and managedEmployees (cast to strings) into one array.
// 425. Combine weeklyHours and monthlySalaryHistory for each employee into one array.

// ============================================================
// SECTION 15: AGGREGATION — JOINS
// ($lookup, $graphLookup)
// ============================================================

// $lookup (basic)
// 426. Join employees with their department information (localField: deptNo, foreignField: dept).
// 427. Join departments with their employees (localField: dept, foreignField: deptNo).
// 428. For each employee, show empName, sal, dName, and loc (join + project).
// 429. For each department, show dName and all employee names working there.
// 430. Join and show only departments with at least one employee (filter after lookup using $match + $size).

// $lookup with pipeline (advanced)
// 431. Join employees with departments but only show department budget > 150000.
// 432. Join and add a field "deptBudgetShare" = sal / dept.budget.
// 433. Join employees to departments and show dept rating alongside employee rating.
// 434. Join department with employees and compute average sal of employees per dept.
// 435. Join employees with their manager's record (self-join emp to emp using mgr → empNo).

// $graphLookup
// 436. Starting from "smith" (empNo 7369), recursively trace the management chain upward
//      (connectFromField: mgr, connectToField: empNo) to get the full hierarchy.
// 437. Starting from "king" (empNo 7839), find all employees directly or indirectly managed by king.
//      (Use graphLookup downward via managedEmployees array or empNo → mgr reverse.)
// 438. Find all employees in the same org chain as "jones" (upward + downward combined — two passes).
// 439. For each employee, show the depth of their management level (how many hops to king).
// 440. Use $graphLookup to build an org chart starting from the president.

// ============================================================
// SECTION 16: AGGREGATION — CONDITIONAL & BUCKETING
// ($cond, $switch, $ifNull, $bucket, $bucketAuto)
// ============================================================

// $cond
// 441. Label employees: "High" if sal > 2500, else "Standard".
// 442. Add field "bonusEligible": true if performance.rating >= 4.0, else false.
// 443. Add field "insuranceStatus": "Covered" if havingInsurance is true, else "Uncovered".
// 444. Add field "remoteFlag": "Remote" if isRemote true, else "On-site".
// 445. Add field "overtimeFlag": "Yes" if overtimeHours > 20, else "No".

// $switch
// 446. Classify employees: "Junior" (sal < 1500), "Mid" (1500–3000), "Senior" (> 3000).
// 447. Categorize performance: "Excellent" (> 4.5), "Good" (3.5–4.5), "Needs Improvement" (< 3.5).
// 448. Label departments: "Large" (> 5 emp), "Medium" (3–5), "Small" (< 3), "Empty" (0).
// 449. Classify age groups: "Young" (< 30), "Mid-career" (30–45), "Senior" (> 45).
// 450. Classify experience: "Fresher" (< 2), "Junior" (2–7), "Mid" (7–15), "Expert" (> 15).

// $ifNull
// 451. Show headOfDept; if null, display "No Head Assigned".
// 452. Show employee comm; if null, display 0.
// 453. Show department certification; if null, display "Not Certified".
// 454. Show employee territory; if null (field missing), display "N/A".
// 455. Show employee incentive; if null or missing, display "No Incentive".

// $bucket
// 456. Group employees into salary ranges: [0, 1500), [1500, 3000), [3000, 6000).
// 457. Group employees by age ranges: [20, 30), [30, 40), [40, 50), [50, 60).
// 458. Group departments by budget ranges: [0, 150000), [150000, 200000), [200000, 300000).
// 459. Group employees by performance rating: [0, 3.5), [3.5, 4.5), [4.5, 5.1).
// 460. Group employees by experience: [0, 5), [5, 15), [15, 35).

// $bucketAuto
// 461. Auto-bucket employees into 3 groups by sal.
// 462. Auto-bucket employees into 4 groups by age.
// 463. Auto-bucket departments into 3 groups by budget.
// 464. Auto-bucket employees into 5 groups by experience.
// 465. Auto-bucket employees into 3 groups by totalHoursWorked.

// ============================================================
// SECTION 17: AGGREGATION — STRING OPERATORS
// ($concat, $toUpper, $toLower, $trim, $split, $substrCP,
//  $strLenCP, $replaceOne, $replaceAll, $regexMatch)
// ============================================================

// 466. Create fullTitle: "Mr./Ms. [empName] - [job]" (use $concat).
// 467. Convert all department names to uppercase.
// 468. Extract first 3 letters of each employee's name.
// 469. Concatenate dept dName and loc: "Sales - Chicago".
// 470. Convert all employee names to lowercase.
// 471. Trim spaces from empName (simulate with a computed field).
// 472. Split city name by space (e.g., "New York" → ["New", "York"]).
// 473. Show length of each employee's name (number of characters).
// 474. Check if employee empName matches regex "^[a-m]" (name starts with a–m) — use $regexMatch.
// 475. Replace first occurrence of "sales" in project names with "revenue" using $replaceOne.
// 476. Replace all underscores "_" in project names with "-" using $replaceAll.
// 477. Create a display string: "[empName] (Dept [deptNo]) - Grade: [grade]".
// 478. Check if any skill contains "python" for each employee using $regexMatch inside $filter.
// 479. Show department deptCode in lowercase using $toLower.
// 480. Extract characters 0–4 from empName using $substrCP.

// ============================================================
// SECTION 18: AGGREGATION — DATE OPERATORS
// ($year, $month, $dayOfMonth, $hour, $dayOfWeek,
//  $dateToString, $dateFromString, $dateAdd, $dateDiff)
// ============================================================

// 481. Extract hire year for all employees.
// 482. Extract hire month for all employees.
// 483. Extract day of month from hireDate.
// 484. Find employees hired in April (month = 4).
// 485. Find employees hired in December (month = 12).
// 486. Find employees hired in the year 1981.
// 487. Format hireDate as "DD-MM-YYYY" string.
// 488. Format lastIncrement as "YYYY/MM/DD".
// 489. Calculate years of service: currentYear - hireYear.
// 490. Group employees by hire year and count.
// 491. Find employees hired on a Monday (dayOfWeek = 2).
// 492. Show established year for each department.
// 493. Calculate how many days since lastAuditDate for each department.
// 494. Add 365 days to lastIncrement of each employee and show new date.
// 495. Find departments whose lastAuditDate was in 2024.

// ============================================================
// SECTION 19: AGGREGATION — MULTI-STAGE COMPLEX PIPELINES
// ============================================================

// 496. Find average sal per dept → filter depts with avg > 2000 → sort by avg descending.
// 497. Count employees by city → show only cities with > 2 employees.
// 498. Calculate total compensation (sal + bonus + comm) per dept → sort desc → limit top 3.
// 499. Unwind skills → group by skill → count → sort by count desc → limit top 5 skills.
// 500. Join emp with dept → show empName, sal, dName, loc → sort by sal desc.
// 501. Group by education → find avg sal, avg age, and count → sort by avg sal desc.
// 502. Find employees earning more than their department average salary.
//      (Use $lookup + $group to get dept avg, then $match using $expr)
// 503. Calculate dept-wise performance metrics: avg rating, total bonus, min sal, max sal.
// 504. Find top performer (highest rating) in each department.
// 505. Hiring trends: count employees hired each year → sort by year.
// 506. Find departments where avg employee performance rating > 4.0 (join + group + match).
// 507. List all unique skills in company with count of employees having each skill.
// 508. Department efficiency: budget per employee (budget / employeeCount) → sort → show top 3.
// 509. Unwind projects → group by project → collect employee names → sort by project name.
// 510. Find employees working on more than 2 projects AND earning > dept average salary.

// ============================================================
// SECTION 20: AGGREGATION — SPECIAL STAGES
// ($facet, $sample, $sortByCount, $out, $merge, $unionWith)
// ============================================================

// $facet
// 511. Get: (a) top 5 earners AND (b) average sal by department — in one query.
// 512. Get: (a) total employee count AND (b) employees grouped by job role.
// 513. Get: (a) max sal, (b) min sal, (c) avg sal — all in one $facet.
// 514. Get: (a) salary bucket distribution AND (b) count by education level.
// 515. Get: (a) remote employee count, (b) on-site count, (c) avg sal for each group.

// $sample
// 516. Get 5 random employees.
// 517. Get 2 random departments.
// 518. Get 3 random managers.
// 519. Get a random employee from each department (use $group with $sample workaround).
// 520. Get 4 random employees who are remote.

// $sortByCount
// 521. Count employees by job role and sort by count descending.
// 522. Count employees by city and sort.
// 523. Count employees by education level and sort.
// 524. Count departments by region and sort.
// 525. After unwind skills, count and sort by skill frequency.

// $out
// 526. Create new collection "high_performers" with employees having rating > 4.5.
// 527. Create "dept_summary" with employeeCount, avg sal, and total bonus per dept.
// 528. Output top 5 earning employees to "top_earners" collection.
// 529. Export employees hired before 1982 to "legacy_employees" collection.
// 530. Export aggregated city-wise salary data to "city_salary_report".

// $merge
// 531. Merge aggregation results (avg sal per dept) into existing "dept" collection
//      adding field "avgSalary" using $merge with whenMatched: "merge".
// 532. Upsert salary statistics per employee into a "salary_stats" collection.
// 533. Update "dept" collection with total bonus per department using $merge.
// 534. Use $merge to add "topSkill" field (most common skill) per dept into dept collection.
// 535. Merge remote work statistics per department into the dept collection.

// $unionWith
// 536. Combine employees from dept 10 and dept 20 using $unionWith.
// 537. Union remote employees with employees earning > 3000 (may overlap — observe duplicates).
// 538. Union analysts and managers into one result set.
// 539. After creating "high_performers" collection, union it with "top_earners".
// 540. Union current employees with a hypothetical "archived_employees" collection.

// ============================================================
// SECTION 21: AGGREGATION — WINDOW FUNCTIONS
// ($setWindowFields)
// ============================================================

// 541. Rank employees by sal within their department (use $rank).
// 542. Calculate running total of sal by department, sorted by sal.
// 543. Find salary difference between each employee and dept average (use $avg window).
// 544. Assign row numbers to employees sorted by hireDate ($documentNumber).
// 545. Calculate moving average of last 3 monthlySalaryHistory entries (if using unwind) or
//      calculate overall running sal sum sorted by empNo across the whole collection.
// 546. Rank employees globally by performance rating.
// 547. Compute cumulative sum of bonus ordered by empNo.
// 548. Rank employees by experience within each job role.
// 549. Find the salary percentile rank of each employee.
// 550. Compute the difference between each employee's sal and the previous employee's sal
//      (sorted by sal), using $shift.

// ============================================================
// SECTION 22: COMBINED / ADVANCED SCENARIOS
// ============================================================

// 551. Increase salary by 10% for all employees with performance.rating > 4.5.
// 552. Add "seniorEmployee: true" for employees hired before 1982.
// 553. Set comm to 0 for all employees whose job is NOT "salesman".
// 554. Increase budget by 20000 for departments with employeeCount > 4.
// 555. Add "trainingRequired: true" for clerks with performance.rating < 4.0.
// 556. Decrease bonus by 100 for employees without insurance.
// 557. Add "performanceBonus: 500" for employees with rating exactly 5.0.
// 558. Update totalHoursWorked to at least 2000 for all employees (use $max: 2000).
// 559. Set all commissions to at most 1000 (use $min: 1000 for any comm > 1000).
// 560. Remove skills ["html","css"] from all employees and add ["react","nextjs"] without duplicates.
// 561. For all employees in dept 10, increase sal by 300 AND bonus by 150 in one update.
// 562. For employee "scott": increase sal by 500 AND add field "certified: true".
// 563. For all salesmen: increase comm by 100 AND add "targetAchieved: true".
// 564. For dept 20: increase budget by 30000 AND add facility "cafeteria".
// 565. For remote employees: increase bonus by 400 AND add "remoteAllowance: 200".
// 566. Find the department with the highest average employee salary (full pipeline).
// 567. Find the top 3 most common skills across all employees (unwind + sortByCount + limit).
// 568. List employees earning above their department average with the salary difference.
// 569. Compute manager-to-employee ratio per department.
// 570. Build a full salary report: dept name, total employees, avg sal, max sal, min sal, total cost.

# MongoDB Positional Operators — Question Bank

### Dataset: `employees` collection (8 documents)

> Each document has: `name`, `role`, `department`, `skills[]`, `projects[]`, `reviews[]`

---

## 🟢 EASY — `$` (First Positional Match)

> **Rule:** `$` updates the **first** array element that matched the query condition. Only one element gets updated per document.

---

**Q1.**
A developer just got React certified. Update the **first** skill named `"React"` for the employee named `"Arjun Mehta"` — set `certified: true`.

```js
// Hint: use $elemMatch in query + $ in update
```

---

**Q2.**
The `"PaymentGateway"` project has been cleared of all bugs. For the employee `"Sneha Patel"`, find the first project named `"PaymentGateway"` and set `bugs: 0`.

---

**Q3.**
`"Kiran Nair"`'s `"AuthService"` project should be marked `status: "archived"`. Update only the first matching project with that name.

---

**Q4.**
For `"Priya Sharma"`, mark the first skill with `level: "expert"` as `certified: true`.

> ⚠️ Think: which skill gets updated if there are two experts?

---

**Q5.**
`"Ravi Kumar"` just fixed all bugs in one of his active projects. Set `bugs: 0` for the **first** project where `status: "active"` in his document.

---

---

## 🟡 MEDIUM — `$[]` (All Array Elements)

> **Rule:** `$[]` updates **every** element in the array for all matched documents — no filter applied to individual elements.

---

**Q6.**
HR wants to reset all reviews for all employees, setting `approved: false` and `bonus: 0` across every quarter. Use `$[]` to update all review entries for every employee in the Engineering department.

---

**Q7.**
The company decided every project across the entire company needs a new field `auditRequired: true` added — regardless of status or priority. Write the update using `$[]`.

---

**Q8.**
A compliance rule says all skills listed under `"Meera Iyer"` must have a field `securityCleared: true`. Add this field to every skill in her document.

---

**Q9.**
For all employees in the `"Infrastructure"` department, add a field `infrastructureTeam: true` to **every element** in their `skills` array.

> 💡 What's the difference between this and Q7 in terms of which documents are touched?

---

**Q10.**
The company is wiping bonus history. For all employees whose reviews include a `rating` of 5 in any quarter, set `bonus: 0` on **all** review entries (not just the 5-rated one).

> ⚠️ Why can't `$` alone solve this?

---

---

## 🔴 HARD — `$[identifier]` + `arrayFilters` (Filtered Positional)

> **Rule:** `$[identifier]` updates only the array elements that satisfy the condition in `arrayFilters`. Multiple elements in a single document can be updated.

---

**Q11.**
Add `wfhEligible: true` to all skills where `yearsUsed < 1` — but only for employees in the `"Engineering"` department.

```js
// Hint:
arrayFilters: [{ "s.yearsUsed": { $lt: 1 } }];
```

---

**Q12.**
For all employees, set `approved: true` and `bonus: 15000` on all reviews where `rating >= 5`. Leave lower-rated reviews untouched.

---

**Q13.**
The `"BillingSystem"` project is critical and has too many bugs. For any employee working on it, flag all projects with `bugs >= 5` as `needsReview: true`.

---

**Q14.**
Employees with `"expert"` level skills that are not yet certified should have `certificationPending: true` added to those specific skill entries. Apply this across all employees.

---

**Q15.**
For all employees in the `"AI"` or `"Data"` departments, set `deprecated: true` on all skills where `yearsUsed < 1` AND `certified: false`.

```js
// Hint: arrayFilters support compound conditions
arrayFilters: [{ "s.yearsUsed": { $lt: 1 }, "s.certified": false }];
```

---

**Q16.**
A new policy: all active projects with `priority: "critical"` and `bugs > 5` must have `escalated: true` set. Write a single `updateMany` that handles this for all employees.

---

**Q17. (Boss Level 🔥)**
Write an update that does **all three** in one operation on the `employees` collection:

- For all employees in `"Engineering"` department:
  1. Set `certified: true` on skills where `level: "expert"` (`$[expert]`)
  2. Set `onWatch: true` on projects where `bugs > 5` (`$[buggy]`)
  3. Set `approved: true` on reviews where `rating >= 4` (`$[good]`)

```js
// Hint: you can have multiple identifiers in arrayFilters
arrayFilters: [
  { "expert.level": "expert" },
  { "buggy.bugs": { $gt: 5 } },
  { "good.rating": { $gte: 4 } },
];
```

> 🤔 Why doesn't `$` work here? Why doesn't `$[]` work here? Why is `$[identifier]` the only correct choice?

---

## 🧠 Conceptual Questions

**C1.** What happens when you use `$` in `updateMany` and a document has **two** array elements that match the query? Which one gets updated?

**C2.** If you use `$[]` but forget to filter your top-level query, what could go wrong in a production database?

**C3.** Can you use both `$[]` and `$[identifier]` in the same update statement? If yes, give a real-world scenario.

**C4.** Why does `$[identifier]` require `arrayFilters` while `$[]` does not?

**C5.** You need to set `isLead: true` on all `"expert"` skills for employees who have **at least one** critical project. Which positional operator combination and what query would you use?

---

> 💡 **Quick Reference Cheatsheet**
>
> | Operator                 | Scope                         | Use When                                                 |
> | ------------------------ | ----------------------------- | -------------------------------------------------------- |
> | `$`                      | First matched element only    | You want to update the one element the query matched     |
> | `$[]`                    | All elements, no condition    | You want every element in the array updated              |
> | `$[id]` + `arrayFilters` | Matched elements by condition | You want fine-grained control over which elements change |

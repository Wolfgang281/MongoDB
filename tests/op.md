# MongoDB Focused Practice — 15 Questions

**Q1.** Find all employees whose `sal` is between **1250 and 2975** (both inclusive). Show only `empName`, `sal`, and `job`. Exclude `_id`.

**Q2.** Find employees whose `grade` is one of `"A+"`, `"S"`, or `"A-"` using `$in`. Return only `empName` and `grade`.

**Q3.** Find all employees who are **NOT** `clerk` or `salesman` AND whose `sal` is **NOT** in `[950, 1100]` using `$nin`. Return `empName`, `job`, and `sal`.

---

**Q4.** Find employees whose `age` is **strictly between 28 and 45** (exclusive on both ends). Use explicit `$and` since both conditions target the same field. Return `empName` and `age`.

**Q5.** Find employees who are either a `"manager"` or `"president"` **OR** have a `sal` greater than `3000`. Use `$or`. Return `empName`, `job`, and `sal`.

**Q6.** Find employees whose `sal` is **NOT** less than `2000` using `$not`. Return `empName` and `sal`.

**Q7.** Find employees who are **neither** a `"clerk"` **nor** working in `deptNo` 10 using `$nor`. Return `empName`, `job`, and `deptNo`.

---

**Q8.** Find all employees whose `empName` starts with the letter `"s"` or `"k"` (case-insensitive) using `$regex`. Return `empName` and `job`.

**Q9.** Find all departments whose `dName` contains the substring `"ing"` (case-insensitive) using `$regex`. Return `dName` and `loc`.

**Q10.** Find all employees where `sal` is **greater than** `bonus`. Return `empName`, `sal`, and `bonus`.

**Q11.** Find all employees where `taskCompleted` is **greater than or equal to** `targetAssigned`. Return `empName`, `taskCompleted`, and `targetAssigned`.

---

**Q12.** Find all employees whose `hireDate` is **before January 1, 1982** using a date comparison. Return `empName` and `hireDate`.

**Q13.** Find all employees whose `rating` is **greater than 4.5**. Return `empName`, `job`, and `rating` only.

**Q14.** Find all employees whose `lastReviewDate` falls **in the year 2024**. Return `empName` and `lastReviewDate`.

**Q15** Update the `rating` to `5.0` for the employee whose `_id` is `ObjectId("66a23517b5c6990483c4e49f")`.

**Q16** Set `lastIncrement` to today's date for **all employees** whose `hireDate` is before `1982-01-01`.

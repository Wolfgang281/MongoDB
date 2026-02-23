# MongoDB & Databases — Practice Questions

---

## Section 1: Data, Databases & Core Concepts

**Q1.** What is the difference between **data** and **information**? Give one example of each. Also, what does DBMS stand for, and name 3 examples of a DBMS.

---

**Q2.** List the 4 CRUD operations and their corresponding SQL commands. Then explain what the following does:

```sql
DELETE FROM users WHERE name = 'Ashwin';
```

---

**Q3.** Compare SQL and NoSQL across these 5 dimensions: schema type, data format, scaling approach, transaction model, and rollback support.

---

## Section 2: NoSQL Types & Scaling

**Q4.** Describe all **4 types of NoSQL databases**, giving one example DB and one real-world use case for each type.

---

**Q5.** Explain **vertical scaling** vs **horizontal scaling**. Which type of database primarily uses each, and what are the pros/cons of each approach?

---

## Section 3: JSON, BSON & JavaScript Objects

**Q6.** Identify the errors in the following JSON and rewrite it correctly:

```json
{
  name: "Varun",
  "age": 34,
  "isMarried": true,
  "bonus": undefined,
  "hireDate": new Date(),
  "skills": ["js", "mongo",],
}
```

---

**Q7.** What is BSON? List **3 key differences** between JSON and BSON, and name 3 data types that BSON supports but JSON does not.

---

## Section 4: ACID, BASE & CAP Theorem

**Q8.** Explain the **ACID** properties using a bank transfer example (deducting ₹1000 from Account A and adding it to Account B). What happens if the server crashes after step 1?

---

**Q9.** Expand **BASE** and explain each letter with a real-world social media analogy. How does it differ from ACID in terms of priorities?

---

**Q10.** Explain the **CAP Theorem**. Why is Partition Tolerance always required? What would a banking app choose (CP or AP) and why?

---

## Section 5: MongoDB Shell, ObjectId & CRUD

**Q11.** Answer the following about MongoDB:

- What is the default port MongoDB runs on?
- What is the default database when you open `mongosh`?
- What command lists all databases, and why might a newly created database not appear?
- Can you rename a database in MongoDB? What's the workaround?

---

**Q12.** Break down this ObjectId into its 3 parts and explain what each part stores:

```
ObjectId("69959910aba5099b6c73518a")
```

Also — can you change a document's `_id` after insertion? Why or why not?

---

**Q13.** What is the difference between `ordered: true` and `ordered: false` in `insertMany()`? Given this operation:

```javascript
db.students.insertMany(
  [
    { name: "Alice", _id: "1" },
    { name: "Bob", _id: "2" }, // _id "2" already exists
    { name: "Charlie", _id: "3" },
  ],
  { ordered: false },
);
```

Which documents get inserted and which don't?

---

## Section 6: Query Operators

**Q14.** Write MongoDB queries for each of the following on an `emp` collection:

1. Find all employees with salary between 1000 and 3000 (inclusive)
2. Find employees whose job is either `"clerk"` or `"manager"`
3. Find employees with age NOT greater than 28
4. Find employees in `deptNo` 10 with bonus >= 500

---

**Q15.** Explain the **critical difference** between these two queries. Which one is correct for finding salaries between 1000 and 2000, and why does the other fail?

```javascript
// Query A
db.emp.find({ sal: { $gte: 1000 }, sal: { $lte: 2000 } });

// Query B
db.emp.find({ $and: [{ sal: { $gte: 1000 } }, { sal: { $lte: 2000 } }] });
```

---

## Answer Key Hints

| Q   | Key Topic                            |
| --- | ------------------------------------ |
| 1   | Data vs Information, DBMS            |
| 2   | CRUD operations                      |
| 3   | SQL vs NoSQL comparison              |
| 4   | NoSQL types (Document/KV/Graph/Wide) |
| 5   | Vertical vs Horizontal Scaling       |
| 6   | JSON rules and valid datatypes       |
| 7   | BSON vs JSON                         |
| 8   | ACID (Atomicity focus)               |
| 9   | BASE transactions                    |
| 10  | CAP Theorem                          |
| 11  | MongoDB shell basics & ObjectId      |
| 12  | ObjectId anatomy & immutability      |
| 13  | insertMany ordered option            |
| 14  | Comparison & logical operators       |
| 15  | Same-field condition pitfall         |

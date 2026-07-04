
```Project Name:"Student Result Processor" ```


const students = [
  { id: 1, fullName: "Ahmed Raza",
     marks: { math: 88, english: 76, science: 91 },
      status: "active" },

  { id: 2, fullName: "Sara Khan", 
    marks: { math: 95, english: 89, science: 92 },
     status: "active" },

  { id: 3, fullName: "Umar Farooq",
     marks: { math: 60, english: 55, science: 70 },
      status: "inactive" },

  { id: 4, fullName: "Hina Malik",
     marks: { math: 72, english: 80, science: 68 },
      status: "active" },

  { id: 5, fullName: "Bilal Ahmed",
     marks: { math: 45, english: 50, science: 40 },
      status: "active" }
];


// Extract first and remaining students

const [ topStudent, ...remaining]= students
console.log("Top Student:", topStudent)
console.log("other students",remaining.length)

// Destructure nested object

const { fullName, marks:{math,english , science}}= topStudent
console.log(`${fullName} Math: ${math} English: ${english}  Science: ${science}`)

// Update a student record

const st2= students[2]
const updatedStudent = {...students[2],status:"active", remarks:"Need Improvement"}
// const update = {...students[2], ...updatedStudent} x
console.log(st2)
console.log(updatedStudent)

// Merge two departments

const classA = [students[0], students[1]];
const classB = [students[2], students[3], students[4]];

const fullClass= [...classA, ...classB]
console.log("Total students in class :" ,fullClass.length)

// Build a summary object

const saraStudent = students[1]
console.log(saraStudent)

const { id, fullName: Name, marks: { math:saraMath, english:saraEnglish, science:saraScience } } = saraStudent 
const totalMarks = saraMath + saraEnglish + saraScience
console.log(totalMarks)
const highestMark = Math.max(saraMath, saraEnglish, saraScience); 
console.log(highestMark)

const summary = {
  id: id,           // already a variable
  name: Name,   // rename it to match required output
  TotalMarks: totalMarks,   // already calculated
  HighestMark:highestMark,  // already calculated
  grade: "A"    // hardcode this
}
console.log(summary)
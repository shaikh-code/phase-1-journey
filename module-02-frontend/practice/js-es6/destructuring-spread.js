// Destructuring
let arr = [3, 5, 8, 9, 12, 14]

// let [a,b,c,d,...rest] = arr
// console.log(a,b,c,d,rest)

// let [a, ,b ,...rest] = arr
// console.log(a,b,rest)

let { a, b } = { a: 1, b: 5 }
console.log(a, b)


// Spread operator
let arr1 = [3, 5, 8]
let obj1 = { ...arr1 }
console.log(obj1)

function sum(v1, v2, v3) {
    return v1 + v2 + v3
}
console.log(sum(...arr1))

let obj2 = {
    name: "A.Moiz",
    company: "yumpum",
    address: "xyz"
}
// console.log(obj2)
console.log({ ...obj2, name: "Shaikh Abdul Moiz", company: "Two Oaks" })


const alphabet = ['A', 'B', 'C', 'D', 'E', 'F']
const numbers = ['1', '2', '3', '4', '5', '6']
const newArray = [...alphabet, ...numbers]
console.log(newArray)

function sumAndMultiply(a, b) {
    return [a + b, a * b, a / b]
}
const [sumResult, multiplyResult, divisionResult] = sumAndMultiply(2, 3)
console.log(sumResult)
console.log(multiplyResult)
console.log(divisionResult)


// Simple object
const personOne = {
    name: "Abdul Moiz",
    age: 20,
    isStudent: true,
    favFood: "Biryani"
};

// Object with nested object
const personTwo = {
    name: "Sally",
    age: 20,
    isStudent: true,
    favFood: "Watermelon",
    address: {
        city: "Lahore",
        province: "Punjab"
    }
};

// ❌ FIXED: "performance" → "personTwo"
const personThree = { ...personOne, ...personTwo }

const { name: firstName, address: { city } } = personTwo
console.log(personThree)
console.log(firstName)
console.log(city)

function printUser({ name, age, favFood = "Rosh" }) {
    console.log(`Name is : ${name}. Age is ${age}. Food is ${favFood}`)
}
printUser(personOne)

const apiResponse = {
    userId: 101,
    userName: "ahmed_raza",
    email: "ahmed@gmail.com",
    country: "Pakistan"
};

const { userId: id, userName: username1, role = "guest", country } = apiResponse
console.log(id, username1, country, role)


const originalProduct = {
    id: 55,
    name: "Keyboard",
    price: 45,
    stock: 200
};

const discountedProduct = { ...originalProduct, price: 35 }
const outOfStock = { ...discountedProduct, stock: 0 }

console.log(discountedProduct)
console.log(outOfStock)


const students = [
    { name: "Ali", score: 88 },
    { name: "Sara", score: 92 },
    { name: "Umar", score: 75 },
    { name: "Hina", score: 95 }
];

const [firstStudent, ...remainingStudents] = students
const { name: studentName, score: studentScore } = firstStudent

console.log(studentName, studentScore)
console.log("remaining students:", remainingStudents.length)


const player = {
    username: "xAli99",
    level: 14,
    score: 4500
};

const { username: playerUsername, score: playerScore } = player
console.log(playerUsername, playerScore)


const items = ["laptop", "mouse", "keyboard", "monitor"]
const [firstItem, , thirdItem] = items
console.log(firstItem, thirdItem)


function displayUser(name, city, age) {
    console.log(name, city, age);
}

const info = ["Ahmed", "Karachi", 27]
displayUser(...info)
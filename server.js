const express = require('express')
const app = express()
const figlet = require('figlet')

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/api/meatCount=:meatCount&veggiesCount=:veggiesCount', (req, res) => {
    const pizzaObj = generateIngredients(req.params.meatCount, req.params.veggiesCount)
    res.json(pizzaObj)
})

// Middleware functions that are only called if no route handles the HTTP request
const unknownEndpoint = (req, res) => {
    figlet('404!!', (err, data) => {
        if (err) {
          console.log('Something went wrong...')
          console.dir(err)
          return
        }
        res.write(data)
        res.end()
    })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 9512
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})


function generateIngredients(meatCount, veggiesCount) {
    // Available meats and veggies
    const PIZZA_MEAT = ['pepperoni', 'sausage', 'bacon', 'meatball', 'ham', 'chicken', 'beef', 'pork']
    const PIZZA_VEGGIES = ['mushrooms', 'onions', 'pineapple', 'black olives', 'bell peppers', 'banana peppers', 'jalapeno', 'tomato']
  
    // Converts input to Number
    meatCount = +meatCount 
    veggiesCount = +veggiesCount 
  
    // Cleans up input
    if (meatCount < 0)
      meatCount = 0
    else if (meatCount > PIZZA_MEAT.length)
      meatCount = PIZZA_MEAT.length
  
    if (veggiesCount < 0)
      veggiesCount = 0
    else if (veggiesCount > PIZZA_VEGGIES.length)
      veggiesCount = PIZZA_VEGGIES.length
  
    // User Pizza Ingredients
    const meatIngredients = []
    const veggiesIngredients = []
  
    // Meat Loop
    // Perform loop until user's ingredient array is desired length
    while (meatIngredients.length < meatCount) {
      let rand = Math.floor(Math.random() * PIZZA_MEAT.length)
  
      if (meatIngredients.includes(PIZZA_MEAT[rand]))
        continue
      else
        meatIngredients.push(PIZZA_MEAT[rand])
    }
  
    // Vegetable Loop
    while (veggiesIngredients.length < veggiesCount) {
      let rand = Math.floor(Math.random() * PIZZA_VEGGIES.length)
  
      if (veggiesIngredients.includes(PIZZA_VEGGIES[rand]))
        continue
      else
        veggiesIngredients.push(PIZZA_VEGGIES[rand])
    }
  
    const pizzaIngredients = {
      meat: meatIngredients,
      veggies: veggiesIngredients
    }
  
    return pizzaIngredients
}
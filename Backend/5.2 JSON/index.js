import express from "express"; //IMPORTING EXPRESS
import bodyParser from "body-parser"; // importing body parser jo ki post request ke data ko read krne mein help krta h

const app = express(); //express app create kra h jisme hm routes ur middleware set krte h 
const port = 3000; 

app.set("view engine", "ejs"); //express ko bta h ejs use kr rhe h 


//Step 1: Run the solution.js file without looking at the code.
//Step 2: You can go to the recipe.json file to see the full structure of the recipeJSON below.
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';
// 3 RECIPES ko JSON string ke form mein likha gya h, isko baad mein parse krke use krege 

app.use(express.static("public"));// express public folder ur uske andar ki files ko static rakh rha h
app.use(bodyParser.urlencoded({ extended: true }));
// express ko bola h form ke data ko URL form mein parse kro 

let data; // global variable create kra h jisme currently selected recipe store krege 

// jab home page pe jayega toh ejs file render hogi ur usme recipe naam ka object bheja h
// data pehle undefined hoga jab tk user button press nhi krega  
app.get("/", (req, res) => {
  res.render("index.ejs", { recipe: data }); // rendering frontend
});

// jab koi form se button click krega Post request bhejega recipe route pr switch function chalega
// req.body se form ke andar se jo data aayega uske acc recipe select hogi
app.post("/recipe", (req, res) => {
  //Step 3: Write your code here to make this behave like the solution website.
  //Step 4: Add code to views/index.ejs to use the recieved recipe object.
  switch(req.body.choice) {
    case "chicken":
      data = JSON.parse(recipeJSON)[0];//parse is used to convert JSON string into JS object.
      break;
    case "beef":
      data = JSON.parse(recipeJSON)[1];
      break;
    case "fish":
      data = JSON.parse(recipeJSON)[2];
      break;
      default:
        break;
  }
  res.redirect("/");// post request ke baad user ko wapas homepage pe bhej do jaha pr recipe dikhegi
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

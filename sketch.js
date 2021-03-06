//Create variables here
var dog, happyDog, database, foodS, foodStock, dogImage; 
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(50, 70, 80, 90);
  dog.addImage(dogImage)
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = createSprite(400, 70, 30, 40)
  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFood)
  
}


function draw() {  

background(46,139,87)

fedTime= dataBase.ref('FeedTime');
fedTime.on("value", function(data){
   lastFed=data.val
});

  drawSprites();
  //add styles here
  text("Note: Press Up_ARROW key to feed the Drago Milk!")
  textSize(15)
  fill(255, 255, 254)
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350, 30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed :"+lastFed + "AM", 350, 30)
  }



}

function readStock(data){
  foodS= data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })

  
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
     
  })

}









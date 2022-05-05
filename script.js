let kittens = []
let targetKitten = ""
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let submittedKitten = form.name.value
  let currentKitten = kittens.find(xyz => xyz.name == submittedKitten)
  console.log(currentKitten)
  console.log(kittens)

  if (!currentKitten) {
    let pushingKitten = { name: submittedKitten, mood: "tolerant", affection: 5, id: generateId() }
    kittens.push(pushingKitten)
  }
  else {
    console.log("That Kitten Has Been Submitted Already")
  }
  form.reset()
  saveKittens()
  drawKittens()
}



/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = ``
  kittens.forEach(kitten => {
    template += `<div class="card m-1" id = "card-${kitten.id}">
    <img class = "kitten ${kitten.mood}" src="clipart140253.png" id = "photo-${kitten.id}" alt="picture of cat">
    <H3 class = "d-flex align-center wrap-text">${kitten.name}</H3>
    <button class = "btn-dark btn-${kitten.mood}" onclick=pet("${kitten.id}")>
      Pet
    </button>
    <button class = btn-${kitten.mood} id = "btn-catnip-${kitten.id}" onclick=catnip("${kitten.id}")>
      Catnip
    </button>
    <h5>Affection: ${+ kitten.affection} / 10</h5>
    <h5>Mood : ${kitten.mood}</h5>
  </div>`
  })
  document.getElementById("kittens").innerHTML = template


}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  loadKittens()

  targetKitten = kittens.find(kitten => kitten.id == id)
  console.log(targetKitten)
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  findKittenById(id)
  let randNum = Math.random()
  // @ts-ignore
  if (randNum >= .5 && targetKitten.affection < 10) {
    // @ts-ignore
    targetKitten.affection += 1
  }
  else if (randNum >= .5) {
    // @ts-ignore
    targetKitten.affection = targetKitten.affection
  }
  else {
    // @ts-ignore
    targetKitten.affection -= 1
  }
  console.log(targetKitten)
  console.log(kittens)
  setKittenMood(id)
  saveKittens()
  drawKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  findKittenById(id)
  // @ts-ignore
  targetKitten.affection = 5
  setKittenMood(id)
  saveKittens()
  drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(id) {
  if (targetKitten.affection >= 7) {
    targetKitten.mood = "happy"
  }
  else if (targetKitten.affection >= 5) {
    targetKitten.mood = "tolerant"
  }
  else if (targetKitten.affection >= 3) {
    targetKitten.mood = "angry"
  }
  else if (targetKitten.affection == 0) {
    targetKitten.mood = "gone"
  }
  drawKittens()

}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  kittens = []
  drawKittens()
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("kittens").classList.remove("hidden")
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
console.log(kittens);
const btn = document.getElementById("btn")
const data = document.getElementById("data")
const data_container = document.getElementById("data-container")

let AllProducts = []

const fetchapi = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products")
    const json = await res.json()
    AllProducts = json.products
    showProducts(AllProducts) 
  } catch (err) {
    console.log(err)
  }
}

const showProducts = (products) => {
  data_container.innerHTML = ""

  if (!products.length) {
    data_container.innerHTML = "<p>Product not found</p>"
    return
  }

  products.forEach((itm) => {
    const div = document.createElement("div")
    div.className = "p-3 bg-gray-100 my-2 border rounded"

    div.innerHTML = `
      <h4 class="font-bold">${itm.title}</h4>
      <p class="text-sm">Category: ${itm.category}</p>
      <p class="text-sm">Price: $${itm.price}</p>
    `

    data_container.appendChild(div); 
  })
}

btn.addEventListener("click", () => {
  const text = data.value.trim().toLowerCase()

  if (text === "") {
    showProducts(AllProducts)
  } else {
    const filter = AllProducts.filter((itm) =>
      itm.category.toLowerCase().includes(text)
    );
    showProducts(filter)
  }
});

fetchapi()

console.log("Mochammad Tressa Family Tree Slide App Loaded");

// Slide Control
function showSlide(id){
  const slides = document.querySelectorAll(".slide");
  slides.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  const buttons = document.querySelectorAll(".navbar button");
  buttons.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.navbar button[onclick="showSlide('${id}')"]`).classList.add("active");
}

showSlide('input');

// Tree data awal
let familyTree = {
  nama: "Yulianti Ramadhan",
  avatar: "assets/mom.png",
  anak: [
    { nama: "Juan Calvin Dzikir Suitela", avatar: "assets/juan.png", anak: [] },
    { nama: "Mochammad Tressa Marino Suitela", avatar: "assets/tressa.png", anak: [] }
  ]
};

// Render tree dengan gambar
function renderTree(node, container){
  const div = document.createElement("div");
  div.className = "node";

  const img = document.createElement("img");
  img.src = node.avatar || "assets/avatar.png";
  img.alt = node.nama;

  const span = document.createElement("span");
  span.textContent = node.nama;

  div.appendChild(img);
  div.appendChild(span);
  container.appendChild(div);

  node.anak.forEach(child => renderTree(child, div));
}

const treeContainer = document.getElementById("tree");
renderTree(familyTree, treeContainer);

// Form Input anggota
const form = document.getElementById("input-form");
form.addEventListener("submit", function(e){
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const parentName = document.getElementById("parent").value.trim();
  const avatar = document.getElementById("avatar").value.trim() || "assets/avatar.png";
  if(!nama) return alert("Nama harus diisi");

  const parentNode = findNode(familyTree, parentName) || familyTree;
  parentNode.anak.push({nama: nama, avatar: avatar, anak: []});

  treeContainer.innerHTML = "";
  renderTree(familyTree, treeContainer);
  form.reset();
});

// Cari node berdasarkan nama
function findNode(node, name){
  if(node.nama === name) return node;
  for(let child of node.anak){
    const found = findNode(child, name);
    if(found) return found;
  }
  return null;
}

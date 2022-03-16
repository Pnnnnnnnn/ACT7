
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCzhQpjj9cvzyb8kqrP4YgXnaKEr8uIJUQ",
    authDomain: "act7-11f94.firebaseapp.com",
    projectId: "act7-11f94",
    storageBucket: "act7-11f94.appspot.com",
    messagingSenderId: "1062975103722",
    appId: "1:1062975103722:web:e6a4f1f9141ec6bb99ed93"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

const db = getFirestore();
const items_ref = collection(db, 'items');

async function showItemsInTable() {
    const table_body = document.getElementById('main-table');

    table_body.innerHTML = `<thead>
                            <th>ของที่ฝากซื้อ</th>
                            <th>ชื่อผู้ฝากซื้อ</th>
                            <th>ราคา (บาท)</th>
                            <th>ดำเนินการ</th>
                            </thead>`;
    const collection = items_ref;
    const items = await getDocs(items_ref);
    items.docs.map((item) => {
        table_body.innerHTML += `
                                <tr id="${item.docId}">
                                <td>${item.data().item}</td>
                                <td>${item.data().name}</td>
                                <td>${item.data().price}</td>
                                <td><button class="delete-row" onclick="deleteItem('${item.id}')">ลบ
                                </button></td>
                                </tr>
                                `
    })
    table_body.innerHTML += `<tr id='row-0'>
                            <td><input type="text" id="item-to-add"> </td>
                            <td><select id="name-to-add">
                            <option>--เลือกผู้ฝากซื้อ--</option>
                            <option >ณพรรฒ ลิมสัมพันธ์เจริญ</option>
                            <option >ศุภกร กานต์ธีรดา</option>
                            <option >ภูมิพัฒน์ ชัยประเสริฐสุด</option>
                            </select></td>
                            <td><input type="text"  id="price-to-add"> </td>
                            <td><button id="add-newrow" onclick = 'addItem()'>เพิ่ม</button></td> 
                            </tr>`
}
document.addEventListener("DOMContentLoaded", function (event) {
    console.log('showing items from database')
    showItemsInTable()
});
function redrawDOM() {
    window.document.dispatchEvent(new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true
    }));
}
async function addItem() {
    console.log('addItem');

    const item = document.getElementById('item-to-add').value;
    const name = document.getElementById('name-to-add').value;
    const price = document.getElementById('price-to-add').value;

    await addDoc(items_ref,{
        item,
        name,
        price,
    });
    redrawDOM();
}

// var addButton = document.querySelector("#add-newrow");
// addButton.onclick = async () => {
//     addItem().then(() => {
//         redrawDOM()
//     })
// }
async function deleteItem(docId) {
    console.log('deleteItem');

    const docRef = doc(db, `items/${docId}`);

    await deleteDoc(docRef);
    redrawDOM();
}

window.addItem = addItem;
window.deleteItem = deleteItem;
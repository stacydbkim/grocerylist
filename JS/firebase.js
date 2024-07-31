import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyADzuQM5Gvfr2LN9IRd_K2jXzHJsFCnopw",
  authDomain: "uidesign-710d2.firebaseapp.com",
  projectId: "uidesign-710d2",
  storageBucket: "uidesign-710d2.appspot.com",
  messagingSenderId: "175299056020",
  appId: "1:175299056020:web:2fd8446c7cc069bcc47f81",
  measurementId: "G-DHSBYNTY1X",
  databaseURL: "https://uidesign-710d2-default-rtdb.firebaseio.com",
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();


$(document).ready(function(){
  console.log("ready?")
  showData();
   $(".submit-button").on("click",function(){
    var answerValue = $("#input").val();
    console.log($("#input").val())
      // console.log("submit-button",answerValue)
      updateAnswer($("#input").val())
  })
})


var answerLength = 0;
  

function showData() {
  console.log("show");
  const dbref = ref(db);
  get(child(dbref, "/bucket"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        var array = snapshot.val();
        console.log(array)
        var appendHtml = ""
        $.each(array,function(i,d){
          appendHtml+= `<div class="text-box ${d.progress}">${d.name}</div>`;
          console.log(d)
        })
        answerLength = array.length
        $(".output-container").html(appendHtml);
     
      } else {
        alert("No data");
      }
    })
    .catch((error) => {
      alert(error, error);
    });
}

function updateAnswer(d) {
  var data = {
    name: d,
    progress: false,
  };
  console.log(d);
  set(ref(db, `bucket/${answerLength}`), data)
    .then(() => {
      alert("Answer submitted successfully.");
    })
    .catch((error) => {
      alert("Error submitting answer.");
    });
}



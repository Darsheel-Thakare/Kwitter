var firebaseConfig = {
      apiKey: "AIzaSyCzXt21hqWawWPQlbJOLdi1TL16bn-q2vs",
      authDomain: "kwitter-6d204.firebaseapp.com",
      databaseURL: "https://kwitter-6d204-default-rtdb.firebaseio.com",
      projectId: "kwitter-6d204",
      storageBucket: "kwitter-6d204.appspot.com",
      messagingSenderId: "205675878873",
      appId: "1:205675878873:web:664422409fa0c2ec26e1c8",
      measurementId: "G-683KZHZJ90"
    };
     firebase.initializeApp(firebaseConfig);
user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");
function send(){
      message=document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:message,
            likes:0
      });
      document.getElementById("message").value="";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
console.log(" firebase_message_id");
console.log("message_data");
name1=message_data['name'];
message=message_data['message'];
like=message_data['like'];

name_with_tag="<h4>"+name1+"<img class='user_tick' src='tick.png'/> </h4>";
message_with_tag="<h4 class='message_h4'>"+messsage+"</h4>";
likeButton = "<button class='btn-warning' id="+firebase_message_id+"value="+like+" onclick='updateLike(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like:"+like+"</span> </button> </hr>";
row=name_with_tag+message_with_tag+likeButton+span_with_tag;
document.getElementById("output").innerHTML+=row;

      } });  }); }
      function updateLike(msgID){
            buttonid=msgID;
            likes=document.getElementById(buttonid).value;
            updated_likes=Number(likes)+1;
            firebase.database().ref(room_name).child(msgID).update({
                  like:updated_likes
            })
      }
getData();
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html"; 
}

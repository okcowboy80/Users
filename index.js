
function removePosts() {
   const paragraphs = document.querySelectorAll('p');
   paragraphs.forEach(p => {
   p.remove();
   const hrs = document.querySelectorAll('hr');
   hrs.forEach(hr => {
      hr.remove();
   })
});
}

function addPosts(element) {
   fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) => {
   removePosts();
   for (let key in data){
      if(data[key]["userId"] == element.id){
         for (let [key2, value2] of Object.entries(data[key])) {
            const div = document.createElement('div');
            let p = document.createElement('p');
            p.innerHTML = `<strong>${key2}:</strong> ${value2}`
            div.appendChild(p)
            document.querySelector('body').appendChild(div);
         }
         const hr = document.createElement('hr');
         document.querySelector('body').appendChild(hr);
      }

  }});
}

function createUsers() {
   fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((data) => {
   
   var usersTable = document.createElement('table')
   var usersTableBody = document.createElement('tbody')

   for(var i = 0; i < data.length; i++) {
      const row = document.createElement('tr')
      row.setAttribute('id', i+1)
      row.addEventListener("click", function () { addPosts(row); }, false);
      
      if(i % 2 === 0) {
         row.setAttribute("style", "background-color: #F0F8FF;")
      }
      row.style.cursor="pointer";
      for (const [key, value] of Object.entries(data[i])) {
         if(typeof value === "object") continue;
         var cell = document.createElement('td');
         var cellText = document.createTextNode(`${key}: ${value}`);
         cell.appendChild(cellText)
         cell.setAttribute("style", "padding: 5px;");
         row.appendChild(cell)
       }
       usersTableBody.appendChild(row)
   }

   usersTable.appendChild(usersTableBody)
   usersTable.setAttribute("border", "2");
   var myDiv = document.getElementById("wrapper")
   myDiv.appendChild(usersTable)
   document.querySelector('body').setAttribute('style', 'font-family: arial;')
   var posts = document.createElement('h2');
   posts.innerHTML = "POSTS:"
   document.querySelector('body').appendChild(posts);
   });
}

createUsers();



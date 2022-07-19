const STAFF_URL = "https://le-restapi-test.herokuapp.com/api/v1/staff";

async function staffList(API_URL) {
  const response = await fetch(API_URL);
  const staffData = await response.json();

  if (response.status !== 200) {
    console.log(response.status + staffData.message);
  } else {
    console.log("todo bien ");

      

    const teamMemberList = document.getElementById("teamMemberList");
    //console.log(typeof(staffData))
    //console.log( staffData )
    
    staffData.map((element)=>{
      console.log(element)
      const card = document.createElement("article");
      card.className = "teamCard";
      teamMemberList.appendChild(card);

      //Staff picture
      const img = document.createElement('img')
      img.src = element.profile_photo
      img.alt = element.name+' staff member'
      card.appendChild(img)

      //Staff Data
      const teamInfo = document.createElement('div')
      teamInfo.className= 'teamInfo'
      teamInfo.innerHTML= `<h3>${element.name}</h3><p>${element.title}</p>`
       
      card.appendChild(teamInfo)
    })
  
  
  }
}

async function carrersList(API_URL){
  const response = await fetch(API_URL);
  const carrersData = await response.json();
}

staffList(STAFF_URL);

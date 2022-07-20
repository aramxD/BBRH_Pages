const STAFF_URL = "https://le-restapi-test.herokuapp.com/api/v1/staff";
const JOBS_URL = "https://le-restapi-test.herokuapp.com/api/v1/jobs";

async function staffList(API_URL) {
  const response = await fetch(API_URL);
  const staffData = await response.json();

  if (response.status !== 200) {
    console.log(response.status + staffData.message);
  } else {
    //Separamos los distintos departamentos de trabajo
    const depStaff = [];
    staffData.map((element) => {
      depStaff.push(element.departement);
    });
    //Eliminamos elementos duplicados de array
    const depStaffFinal = depStaff.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
    //Organizamos alfabeticamente
    const sortedDepartments = depStaffFinal.sort();
    //console.log(sortedDepartments)

    //Staff separeted on departments

    const teamMemberList = document.getElementById("teamMemberList");

    sortedDepartments.map((element) => {
      const departmentStaff = document.createElement("div");
      departmentStaff.className = "departStaff";
      departmentStaff.innerHTML = `<h3>${element}</h3>`;
      teamMemberList.appendChild(departmentStaff);

      const filterStaff = staffData.filter(
        (staff) => staff.departement === element
      );
      //console.log(filterStaff)

      filterStaff.map((element) => {
        //console.log(element)
        const card = document.createElement("article");
        card.className = "teamCard";
        departmentStaff.appendChild(card);

        //Staff picture
        const img = document.createElement("img");
        img.src = element.profile_photo;
        img.alt = element.name + " staff member";
        card.appendChild(img);

        //Staff Data
        const teamInfo = document.createElement("div");
        teamInfo.className = "teamInfo";
        teamInfo.innerHTML = `<h3>${element.name}</h3><p>${element.title}</p>`;

        card.appendChild(teamInfo);
      });
    });
  }
}

async function carrersList(API_URL) {
  const response = await fetch(API_URL);
  const carrersData = await response.json();
  console.log(carrersData);
  if (response.status !== 200) {
    console.log(response.status + staffData.message);
  } else {
    const jobsList = document.getElementById("jobsList");

    carrersData.map((element) => {
      const jobOffer = document.createElement("details");
      jobOffer.className = "jobOffer";
      jobsList.appendChild(jobOffer);

      const offerTitle = document.createElement("summary");
      offerTitle.innerHTML = `<h3>${element.name}</h3>`;
      jobOffer.appendChild(offerTitle);

      const offerText = document.createElement("div");
      offerText.className = "offerText";
      offerText.innerHTML = `<p>${element.description}</p><p>${element.timestamp}</p>`;
      jobOffer.appendChild(offerText);

      const jobButton = document.createElement("button");
      jobButton.innerHTML = `Apply Now`;
      jobButton.value = element.id;
      jobButton.className = "jobButton buttonPrimary";
      jobOffer.appendChild(jobButton);

      jobButton.onclick = () => {
        //console.log(`el id del elemento es ${element.id}`);
        const formTitle = document.getElementById("formTitle");
        formTitle.innerHTML = `<h3>Apply for ${element.name}</h3>`;

        const jobFormCard = document.getElementById("jobFormCard");
        const jobForm = document.getElementById("jobForm");

        console.log(jobButton);
        console.log(jobFormCard);

        jobFormCard.classList.toggle("spread");
        jobForm.classList.toggle("spread");

        // window.addEventListener("click", (e) => {
        //   if (
        //     jobFormCard.classList.contains("spread") &&
        //     e.target != jobFormCard &&
        //     e.target != jobButton
        //   ) {
        //     jobFormCard.classList.toggle("spread");
        //   }
        // });
      };
    });
  }
}

const applyButton = document.getElementById("applyButton");
applyButton.onclick = () => {
  jobApplication();
};

function jobApplication() {
  var formdata = new FormData();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var linkedin_url = document.getElementById("linkedIn").value;
  var portfolio_url = document.getElementById("portfolio").value;

  formdata.append("full_name", name);
  formdata.append("email", email);
  isUrlValid(linkedin_url)
    ? formdata.append("linkedin_url", linkedin_url)
    : null;
  isUrlValid(portfolio_url)
    ? formdata.append("portfolio_url", portfolio_url)
    : null;
  const formError = document.getElementById("formError");

  function isUrlValid(userInput) {
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) return false;
    else return true;
  }

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(
    "https://le-restapi-test.herokuapp.com/api/v1/postulations",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  const inputs = document.querySelectorAll(
    "#name, #email, #linkedIn, #portfolio"
  );

  inputs.forEach((input) => {
    input.value = "";
  });
  const jobFormCard = document.getElementById("jobFormCard");
  jobFormCard.classList.toggle("spread");
}

staffList(STAFF_URL);
carrersList(JOBS_URL);

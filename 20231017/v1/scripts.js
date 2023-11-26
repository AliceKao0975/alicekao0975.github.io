// Source
const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
  ];
const initialFacts = [
    {
      id: 1,
      text: "React is being developed by Meta (formerly facebook)",
      source: "https://opensource.fb.com/",
      category: "technology",
      votesInteresting: 24,
      votesMindblowing: 9,
      votesFalse: 4,
      createdIn: 2021,
    },
    {
      id: 2,
      text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
      source:
        "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
      category: "society",
      votesInteresting: 11,
      votesMindblowing: 2,
      votesFalse: 0,
      createdIn: 2019,
    },
    {
      id: 3,
      text: "Lisbon is the capital of Portugal",
      source: "https://en.wikipedia.org/wiki/Lisbon",
      category: "society",
      votesInteresting: 8,
      votesMindblowing: 3,
      votesFalse: 1,
      createdIn: 2015,
    },
  ];
// Select DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".factform");
const btnNormalContent = btn.textContent;
// Create DOM element
const factList = document.querySelector(".fact-list");
// 清空列表
factList.innerHTML = "";
loadFact();
// Load data from Supabase
async function loadFact(){
    const res = await fetch("https://eifgreidouvadmhsaxcc.supabase.co/rest/v1/facts", {
        headers : {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZmdyZWlkb3V2YWRtaHNheGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3MTcwODgsImV4cCI6MjAxNjI5MzA4OH0.w0_U6AUGGPDWmm6pyfiPQ_dTMDUjXrOh5vjyOD4hrdw", 
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZmdyZWlkb3V2YWRtaHNheGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3MTcwODgsImV4cCI6MjAxNjI5MzA4OH0.w0_U6AUGGPDWmm6pyfiPQ_dTMDUjXrOh5vjyOD4hrdw",
        },

    });
    const data = await res.json();
    //console.log(res);
    //console.log(data);    
    
    //const filiterData = data.filter((fact)=> fact.tag === "history");
    //console.log(filiterData);

    //const findData = data.find((fact)=> fact.tag ==="history");
    
    createFactList(data);
}

function createFactList(dataArray)
{
    const htmlArray = dataArray.map((fact) =>
    `<li class="fact">
        <p>${fact.text}
            <a class="source" href="${fact.source}" target="_blank">(Source)</a>
        </p>
        <span class="tag" style="background-color: ${CATEGORIES.find((pairData)=> pairData.name === fact.tag).color};">${fact.tag}</span>
        <div class="vote-buttons">
            <button>👍 ${fact.vote_thumb}</button>
            <button>😲 ${fact.vote_excited}</button>
            <button>❌ ${fact.vote_false}</button>
        </div>
    </li>`            
    );
    //console.log(htmlArray);
    const html = htmlArray.join("");
    factList.insertAdjacentHTML("afterbegin", html);
}

// Toggle from visibility
btn.addEventListener("click", function () {
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        btn.textContent = "Close";
    }
    else {
        form.classList.add("hidden");
        btn.textContent = btnNormalContent;
    }
});
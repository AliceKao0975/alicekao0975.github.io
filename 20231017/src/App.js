import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

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
    tag: "technology",
    vote_thumb: 24,
    vote_excited: 9,
    vote_false: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    tag: "society",
    vote_thumb: 11,
    vote_excited: 2,
    vote_false: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    tag: "society",
    vote_thumb: 8,
    vote_excited: 3,
    vote_false: 1,
    createdIn: 2015,
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [nowCategory, setNowCategory] = useState("all");

  // get database from supabase
  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);
        let query = supabase.from("facts").select("*");
        if (nowCategory !== "all") query = query.eq("tag", nowCategory);

        const { data: facts, error } = await query
          .order("vote_thumb", { ascending: false })
          .limit(30);

        if (!error) {
          //console.log(facts);
          setFacts(facts);
          setIsLoading(false);
        } else {
          alert("There is a problem. Call coder to fixed this.");
        }
      }

      getFacts();
    },
    [nowCategory]
  );

  return (
    <>
      <CreateHeader visible={visible} setShowForm={setShowForm} />
      {/* if visible show NewFactForm */}
      {visible ? (
        <NewFactForm
          facts={facts}
          setFacts={setFacts}
          setShowForm={setShowForm}
        />
      ) : null}
      <main className="main">
        <CategoryFilter setNowCategory={setNowCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="msg">Loading...</p>;
}

function CreateHeader({ visible, setShowForm }) {
  const appTitle = "Thinking Title";
  // here is JSX code, "class" need to change to "className" }
  return (
    <header className="bodyheader">
      <div className="logo">
        <img src="logo.png" alt="logo" />
        <h1>{appTitle}</h1>
      </div>
      {/* not use let visiable = !visiable, because it not to render react, just only change value */}
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm(!visible)}
      >
        {visible ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
function NewFactForm({ facts, setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const maxTextLength = 200;
  const textLength = text.length;

  function onTextChange(e) {
    if (e.target.value.length <= maxTextLength) {
      setText(e.target.value);
    } else {
      setText(e.target.value.substring(0, maxTextLength));
    }
  }

  async function handleSubmit(e) {
    // prevent browser reload
    e.preventDefault();

    // 2. Check value is valid
    if (text && isValidUrl(source) && category && textLength <= maxTextLength) {
      console.log(text, source, category);
      setIsUploading(true);

      // 3.2 Upload to supabase
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text: text, source: source, tag: category }])
        .select();
      setIsUploading(false);
      // 3.1 Creat a new fact object
      //const newFact = {
      //  id: new Date().getUTCMinutes(),
      //  text: text,
      //  source: source,
      //  category: category,
      //  votesInteresting: 0,
      //  votesMindblowing: 0,
      //  votesFalse: 0,
      //  createdIn: new Date().getFullYear(),
      //};

      // 4. Add the new fact to the UI
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 5. Reset input filed
      setText("");
      setSource("");
      setCategory("");

      // 6. Close form
      setShowForm(false);
    }
  }

  return (
    <form className="factform" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the words..."
        value={text}
        onChange={onTextChange}
        disabled={isUploading}
      />
      <span>{maxTextLength - textLength}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category</option>
        {CATEGORIES.map((data) => (
          <option key={data.name} value={data.name}>
            {data.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setNowCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setNowCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((data) => (
          <li key={data.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: data.color }}
              onClick={() => setNowCategory(data.name)}
            >
              {data.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0)
    return <p className="msg">No facts for this category yet! Create one.</p>;

  return (
    <section>
      <ul className="fact-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpload, setIsUpload] = useState(false);

  async function handleVote(voteType) {
    setIsUpload(true);
    const { data: updateFact, error } = await supabase
      .from("facts")
      .update({ [voteType]: fact[voteType] + 1 })
      .eq("id", fact.id)
      .select();
    //console.log(updateFact[0]);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updateFact[0] : f))
      );

    setIsUpload(false);
  }

  //console.log(fact);
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      {/*
              ${CATEGORIES.find((pairData)=> pairData.name === fact.tag).color}
               */}
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(
            (pairData) => pairData.name === fact.tag
          ).color,
        }}
      >
        {fact.tag}
      </span>
      <div className="vote-buttons">
        <button onClick={() => handleVote("vote_thumb")} disabled={isUpload}>
          👍 {fact.vote_thumb}
        </button>
        <button onClick={() => handleVote("vote_excited")} disabled={isUpload}>
          😲 {fact.vote_excited}
        </button>
        <button onClick={() => handleVote("vote_false")} disabled={isUpload}>
          ❌ {fact.vote_false}
        </button>
      </div>
    </li>
  );
}
export default App;

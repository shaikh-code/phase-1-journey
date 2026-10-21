import JSXComponentsProps from "./React-concepts/JSX-Components-Props";
import StateAndUseState from "./React-concepts/State-And-Use-State";
import Events from "./React-concepts/Events";
import ListAndKeys from "./React-concepts/ListAndKeys";
import LiftState from "./React-concepts/LiftState";
import UseEffect from "./React-concepts/UseEffect";
import UseRef from "./React-concepts/UseRef";

import UseContext from "./React-concepts/UseContext";
import CustomHooks from "./React-concepts/CustomHooks";
import Routing from "./React-concepts/Routing";

import { Routes, Route, NavLink } from "react-router-dom";

import "./App.css";


const App = () => {
    return (
        <div>
    <section className="topic">
  <h1 className="topic-title">01. State & useState</h1>
  <div className="topic-content">
    <StateAndUseState />
  </div>
</section>

<section className="topic">
  <h1 className="topic-title">02. Events</h1>
  <div className="topic-content">
    <Events />
  </div>
</section>

<section className="topic">
  <h1 className="topic-title">03. Lists & Keys</h1>
  <div className="topic-content">
    <ListAndKeys />
  </div>
</section>

<section className="topic">
  <h1 className="topic-title">04. Lifting State</h1>
  <div className="topic-content">
    <LiftState />
  </div>
</section>

<section className="topic">
  <h1 className="topic-title">05. useEffect</h1>
  <div className="topic-content">
    <UseEffect />
  </div>
</section>

<section className="topic">
  <h1 className="topic-title">06. useRef</h1>
  <div className="topic-content">
    <UseRef />
  </div>
</section>

<section className="topic">
  <h1 className="topic-title">07. useContext</h1>
  <div className="topic-content">
    <UseContext />
  </div>
</section>

<section className="topic">
  <h1 className="topic-title">08. Custom Hooks</h1>
  <div className="topic-content">
    <CustomHooks />
  </div>
</section>
<Routing></Routing>
        </div>
    );
};

export default App;
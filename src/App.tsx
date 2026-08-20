import { useState } from "react";
import Button from "./components/Button";
import type { ButtonData } from "./components/Button";
import "./App.css";

function App() {
  const [buttonsData, setButtonsData] = useState<ButtonData[]>([
    { id: crypto.randomUUID(), count: 0 },
  ]);

  const [hiddenTotal, setHiddenTotal] = useState(0);
  const visibleTotal = hiddenTotal - (hiddenTotal % 10);

  function addClick(buttonData: ButtonData): void {
    setButtonsData((prev) =>
      prev.map((x) =>
        x.id === buttonData.id ? { ...x, count: x.count + 1 } : x,
      ),
    );
    const total = hiddenTotal + 1;
    setHiddenTotal(total);
    if (total % 10 === 0) resetCounters();
  }

  function addButton() {
    setButtonsData((prev) => [...prev, { id: crypto.randomUUID(), count: 0 }]);
  }

  function removeButton(buttonData: ButtonData) {
    setHiddenTotal((prev) => prev - buttonData.count);
    setButtonsData((prev) => prev.filter((data) => data.id !== buttonData.id));
  }

  function resetCounters() {
    setButtonsData((prev) =>
      prev.map((x) => ({
        ...x,
        count: 0,
      })),
    );
  }

  function resetEverything() {
    resetCounters();
    setHiddenTotal(0);
  }

  function renderButton() {
    return (
      <div className="flex flex-row">
        <div className="flex flex-row flex-wrap ">
          {buttonsData.map((data: ButtonData) => (
            <div key={data.id}>
              <Button
                onRemoveButton={removeButton}
                onAddClick={addClick}
                buttonData={data}
              ></Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <section id="center">
        <div className="flex flex-row justify-center gap-10">
          <h1 className="text-gray-500">Hidden total count: {hiddenTotal}</h1>
          <h1 className="text-white">Total count: {visibleTotal}</h1>
        </div>
        <button className="menuButton" onClick={addButton}>
          Add New
        </button>
        <button className="menuButton" onClick={resetEverything}>
          Reset Everything
        </button>
        {renderButton()}
      </section>
    </>
  );
}

export default App;

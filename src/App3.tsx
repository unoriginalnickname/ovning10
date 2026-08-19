import { useState } from "react";

export default function App() {
  const [collector, setCollector] = useState(0);
  const [nextId, setNextId] = useState(5);

  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
  ]);

  const total = counters.reduce((sum, counter) => sum + counter.value, 0);

  function increment(id: number) {
    const updatedCounters = counters.map((counter) =>
      counter.id === id && counter.value < 3
        ? { ...counter, value: counter.value + 1 }
        : counter,
    );

    const newTotal = updatedCounters.reduce(
      (sum, counter) => sum + counter.value,
      0,
    );

    if (newTotal >= 10) {
      setCollector((prev) => prev + newTotal);

      setCounters(
        updatedCounters.map((counter) => ({
          ...counter,
          value: 0,
        })),
      );
    } else {
      setCounters(updatedCounters);
    }
  }

  function addCounter() {
    setCounters([
      ...counters,
      {
        id: nextId,
        value: 0,
      },
    ]);

    setNextId(nextId + 1);
  }

  function removeCounter(id: number) {
    setCounters(counters.filter((counter) => counter.id !== id));
  }

  function reset() {
    setCollector(0);

    setCounters(
      counters.map((counter) => ({
        ...counter,
        value: 0,
      })),
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Collector: {collector}</h1>
      <h2>Total: {total}</h2>

      <button onClick={addCounter}>Lägg till räknare</button>
      <button onClick={reset} style={{ marginLeft: "10px" }}>
        Reset
      </button>

      <hr />

      {counters.map((counter) => (
        <Counter
          key={counter.id}
          counter={counter}
          onIncrement={increment}
          onRemove={removeCounter}
        />
      ))}
    </div>
  );
}

function Counter({
  counter,
  onIncrement,
  onRemove,
}: {
  counter: { id: number; value: number };
  onIncrement: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const isDisabled = counter.value >= 3;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Räknare #{counter.id}</h3>

      <p>Värde: {counter.value}</p>

      <button onClick={() => onIncrement(counter.id)} disabled={isDisabled}>
        +
      </button>

      <button
        onClick={() => onRemove(counter.id)}
        style={{ marginLeft: "10px" }}
      >
        Ta bort
      </button>

      {isDisabled && <p>Max nått!</p>}
    </div>
  );
}

import './Sidebar.css';

function Sidebar() {
  return (
    <aside id="sidebar">
      <h3>RESULT</h3>
      <p id="resultId">0</p>

      <h3>Summary</h3>
      <div id="summary">Total additions: 0,<br /> Total subtractions: 0</div>

      <h3>Status</h3>
      <div id="totalMessage">The total is zero.</div>

      <h3>History (click an item to remove it)</h3>
      <ul id="historyList"></ul>

      <button id="clearAllBtn">Clear History & Results</button>
    </aside>
  );
}

export default Sidebar;
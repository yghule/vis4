import './MainContent.css';

function MainContent() {
  return (
    <main id="main-content" class="bucket bolded">
      <h3>Control Center</h3>

      <div class="controls">
        <button id="btnMinus2">-2</button>
        <button id="btnMinus1">-1</button>
        <button id="btnReset">Reset</button>
        <button id="btnPlus1">+1</button>
        <button id="btnPlus2">+2</button>
      </div>
    </main>
  );
}

export default MainContent;
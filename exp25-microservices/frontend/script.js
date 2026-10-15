
const testButton = document.getElementById("test-button");
const resultPanel = document.getElementById("result-panel");
const connectionStatus = document.getElementById("connection-status");

testButton.addEventListener("click", async function () {
    testButton.disabled = true;
    testButton.innerHTML = "Testing connection...";

    resultPanel.innerHTML = "<p>Contacting Microservice One...</p>";
    connectionStatus.textContent = "Testing";

    try {
        const response = await fetch("/process");
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Request failed");
        }

        resultPanel.innerHTML = `
            <p><strong>Connection successful!</strong></p>
            <pre></pre>
        `;

        resultPanel.querySelector("pre").textContent =
            JSON.stringify(data, null, 2);

        connectionStatus.textContent = "Connected";
    } catch (error) {
        resultPanel.innerHTML = `
            <p><strong>Connection unsuccessful.</strong></p>
            <p>Could not reach the backend service.</p>
        `;

        connectionStatus.textContent = "Failed";
        console.error("Connection error:", error);
    } finally {
        testButton.disabled = false;
        testButton.innerHTML = 'Test Connection <span>→</span>';
    }
});

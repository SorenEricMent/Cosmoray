chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "COSMORAY");
  port.onMessage.addListener(function(msg) {
     port.postMessage({question: "是谁？"});
  });
});
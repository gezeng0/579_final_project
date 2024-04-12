// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCitation") {
    // Get the selected text from the content script
    const selectedText = request.selectedText;
    const pageInfo = request.pageInfo;
    // Create the citation
    const citation = generateCitation(selectedText, pageInfo);
    // Send the citation back to the content script
    sendResponse({ citation: citation });
  }
});
  
const generateCitation = (selectedText, pageInfo) => {
  const currentDateTime = new Date().toLocaleString();
  const author = "Ge Zeng"; 
  const language = "English";
  const citation = `${pageInfo.title}.\n${author}.\n(${currentDateTime}).\n"${selectedText}" (${language}).\n${pageInfo.url}.`;
  return citation;
}
  
  
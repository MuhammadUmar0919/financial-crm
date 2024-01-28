// --- ** copy with clipboard ** --- //

// react import
// import React from "react";
// import ClipboardJS from "clipboard";

// const ClipboardCopy = ({ textToCopy }) => {
//   const textRef = React.useRef(null);

//   const copyToClipboard = () => {
//     const clipboard = new ClipboardJS(textRef.current);
//     clipboard.on("success", (e) => {
//       e.clearSelection();
//     });
//     clipboard.on("error", (e) => {
//       console.error("Copy failed:", e);
//     });
//     clipboard.onClick({ action: "copy" });
//   };

//   return (
//     <div>
//       <div ref={textRef} data-clipboard-text={textToCopy} style={{ display: "none" }}>
//         {textToCopy}
//       </div>
//       <button onClick={copyToClipboard}>Copy to Clipboard</button>
//     </div>
//   );
// };


// const ClipboardCopyPage = () => {
//   const textToCopy = "This is the text to copy to the clipboard.";

//   return (
//     <div className="App">
//       <h1>Clipboard Copy Example</h1>
//       <ClipboardCopy textToCopy={textToCopy} />
//     </div>
//   );
// };

// --- ** copy with react-copy-to-clipboard ** --- //

// import { CopyToClipboard } from 'react-copy-to-clipboard';

// const CopyReact = () => {
//   const [value, setValue] = React.useState('');
//   const [copied, setCopied] = React.useState(false);

//   const handleInputChange = (e) => {
//     setValue(e.target.value);
//     setCopied(false);
//   };

//   const handleCopy = () => {
//     setCopied(true);
//   };

//   return (
//     <div>
//       <input
//         value={value}
//         onChange={handleInputChange}
//       />

//       <CopyToClipboard text={value} onCopy={handleCopy}>
//         <span>Copy to clipboard with span</span>
//       </CopyToClipboard>

//       <CopyToClipboard text={value} onCopy={handleCopy}>
//         <button>Copy to clipboard with button</button>
//       </CopyToClipboard>

//       {copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
//     </div>
//   );
// };

// --- ** copy with react-use-clipboard ** --- //

// import { useClipboard } from 'react-use-clipboard';

// function App() {
//   const [text, setText] = React.useState('Bu matn nusxalangan bo\'ladi!');
//   const [isCopied, setCopied] = useClipboard(text, {
//     // 1000 ms (1 sekund) davomida nusxalanish habari chiqadi
//     successDuration: 1000,
//   });

//   return (
//     <div className="App">
//       <h1>React Clipboard Example</h1>
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Matnni kiriting..."
//       />
//       <button onClick={setCopied}>Matnni Nusxalash</button>
//       {isCopied ? <span style={{ color: 'green' }}>Nusxalandi!</span> : null}
//     </div>
//   );
// }

// export { ClipboardCopyPage, ClipboardCopy, CopyReact};
// export default App;

// --- ** copy with navigator ** --- //

// import React from 'react';
// function App() {
//   const [text, setText] = React.useState('');
//   const [isCopied, setIsCopied] = React.useState(false);

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setIsCopied(true);
//       setTimeout(() => {
//         setIsCopied(false);
//       }, 1000); // 1000 ms (1 sekund) davomida nusxalandi habarni chiqarish
//     } catch (err) {
//       console.error('Nusxalashda xatolik yuz berdi: ', err);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>React Clipboard Example</h1>
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Matnni kiriting..."
//       />
//       <button onClick={copyToClipboard}>Matnni Nusxalash</button>
//       {isCopied && <span style={{ color: 'green' }}>Nusxalandi!</span>}
//     </div>
//   );
// }

// export default App;

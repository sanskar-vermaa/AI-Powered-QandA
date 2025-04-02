// "use client"
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import React from 'react'
// import useSpeechToText from 'react-hook-speech-to-text'
// import Webcam from 'react-webcam'



// function RecordAnswerSection() {
//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false
//   });



//   return (
//     <div className='flex items-center justify-center flex-col'>

   
//             <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
//                 <Image src ={'/webcam.png'} width={200} height={200} alt='webcam'
//                 className='absolute'/>
//                 <Webcam
//                 mirrored={true}
//                 style={{
//                     height:300,
//                     width:'100%',
//                     zIndex:10,
                    
//                 }}
//                 />
//             </div>

//             <Button variant="outline" className="my-10">Record Answer</Button>
//             <h1>Recording: {isRecording.toString()}</h1>
//       <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
//         {isRecording ? 'Stop Recording' : 'Start Recording'}
//       </button>
//       <ul>
//         {results.map((result) => (
//           <li key={result.timestamp}>{result.transcript}</li>
//         ))}
//         {interimResult && <li>{interimResult}</li>}
//       </ul>
//     </div>
//   )
// }

// export default RecordAnswerSection






// "use client";

// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import React from "react";
// import Webcam from "react-webcam";
// import dynamic from "next/dynamic";

// // Dynamically import 'react-hook-speech-to-text' only on client-side
// const useSpeechToText = dynamic(() => import("react-hook-speech-to-text").then((mod) => mod.default), { ssr: false });

// function RecordAnswerSection() {
//   // Always call the hook, but ensure it's only used on the client
//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
//         <Image src={"/webcam.png"} width={200} height={200} alt="webcam" className="absolute" />
//         <Webcam
//           mirrored={true}
//           style={{
//             height: 300,
//             width: "100%",
//             zIndex: 10,
//           }}
//         />
//       </div>

//       <Button
//         variant="outline"
//         className="my-10"
//         onClick={isRecording ? stopSpeechToText : startSpeechToText}
//       >
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </Button>
//       <h1>Recording: {isRecording?.toString()}</h1>
//       <button onClick={isRecording ? stopSpeechToText : startSpeechToText} className="p-2 bg-blue-500 text-white rounded">
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>
//       {error && <p className="text-red-500">Error: {error}</p>}

//       <ul>
//         {results?.map((result) => (
//           <li key={result.timestamp}>{result.transcript}</li>
//         ))}
//         {interimResult && <li>{interimResult}</li>}
//       </ul>
//     </div>
//   );
// }

// export default RecordAnswerSection;

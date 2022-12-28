import React, { useState } from "react";
import Image from "next/image"
import Link from "next/link";


function Header() {
  return (
    <div>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />

      <link rel="icon" href="/aird1@300x-8 - 복사본.png" />
      <link rel="apple-touch-icon" href="/자산 4@300x-8.png" />
      <link rel="manifest" href=".//manifest.json" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>

      <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
      />
      <title>Aird Members Page</title>
    </div>
    
  )
}


function Body() {
  const [pw, setPw] = useState("")
  const onChange = (e) => {
    setPw(e.target.value)
  }

  
  
    return (
      <div>
        <div>
        </div>
        <div className="App">
        <div id="search">
        <div id="wrapper">
            <a href="https://www.jotform.com/app/221943338469465"><img id="hirelogo" src='/aird1@300x-8 - 복사본.png'/></a></div>
            <p id="title">Utility Fee</p>
            <p id='subtitle'>Check your bill that <b>used in November</b>.</p>
            {/* <br/> */}
            {/* <p id='subtitle'>The amount might be different from the paper bill or APP,<br/>
            ignore that bill because it includes rent fee and the usage of whole month regardless your exact contract.</p> */}
            

            <input id="rcNumber" onChange={onChange} value={pw} placeholder=" type the code you've got from the email (starts with 'rec')"></input>
            <Link
            href={{
              pathname: `/result`,
              query: {rec_id: pw}
            }}
            as={`/result`}
            >
              <button type="button" className="btn btn-primary btn-sm" id="searchBtn">Login</button>
          </Link>
          <p id='subtitle3'>please wait a second after pressing Login button once!</p>
          </div>
        </div>


      </div>
    )
  
  
}


export default function HomePage() {
  return(
    <div>
      <Header />
      <Body/>
    </div>
  )
}

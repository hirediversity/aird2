import React, { useState, useEffect } from "react";
import Image from "next/image"
import Link from "next/link"


export async function getServerSideProps(props) {
  var rec_id = props.query.rec_id

  if (typeof rec_id == "undefined") {
    return ({props: { status: -1, data: {} }})
  } else if (rec_id == "") {
    return ({props: { status: -2, data: {} }})
  } else {
    var url = process.env.AIRTABLE_API_URL + rec_id
    const res = await fetch(url, { 
      method: "get", 
      headers: new Headers({
        "Authorization": "Bearer " + process.env.AIRTABLE_API_KEY,
        "Content-Type": "application/json"
      })
    });

    const data = await res.json();

    // data 없을 땐 리턴값을 달리함
     if (!data) {
      return { props: {status: 999, data: {}} }
    }

    //pageProps로 넘길 데이터
    return { props: { status: res.status, data: data } }
    }
}


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

function Body(props) {
    if (props.status == -1) {
        alert('Please check the code once again :)')
        window.location.assign('/');
    } else if (props.status == -2) {
        alert('Please input the code :)')
        window.location.assign('/');
    } else if (props.status == 200) {
        return (
          <div className="App">
            <div id="wrapper">
            <a href="https://aird.kr"><img id="hirelogo" src='/aird1@300x-8 - 복사본.png'/></a></div>
            <p id="title">Utility Fee</p>
            <p id='subtitle2'>Check your maintenance fee charged for the usage of last <b>August</b>.</p><br/>

            <div>
                <Content props={props}/>
            </div>
            <Link
              href={{
                pathname: "/"
              }}
              >
                <button type="button" className="btn btn-primary btn-sm" id="searchBtn2">Back to Main</button>
            </Link>
          </div>
        )
    } else {
        alert('Please check the code once again :)')
        window.location.assign('/');
    }
}


export default function HomePage({ status, data }) {
  return(
    <div>
      <Header />
      <div>
      </div>
      <Body status={status} data={data} />
    </div>
  )
}


const Content = ({props}) => {
    var data = props.data.fields
    
    let [link, setLink] = useState(false);
    let [open, setOpen] = useState(false);
    let [link2, setLink2] = useState(false);
    let [link3, setLink3] = useState(false);
    let [payment, setPayment] = useState(false);
    let [date, setDate] = useState(false);

    function Normal() {

            return (
                <>
                    <p id="title2">Hello, {data.이름}!</p>
                    <p id="subtitle">From the contents below, you can check <b>how much you have to pay</b> as utility this month,<br/>
                    how to <b>find the breakdown</b> for the amount, and how to pay 😊</p>

                    <p id="title3">🙋‍♀️ Total amount for August</p>
                    <p id="subtitle">The amount you have to pay is <b>{data.관리비안내용}KRW</b>,<br/>
                    You can pay it through the button below!</p>
                    <p id="subtitle">Payment due : <b>2022. 10. 05</b></p>

                    <a href={data.관리비링크} target="_blank" rel="noreferrer">
                    <button type="button" className="btn btn-primary btn-sm" id="searchBtn">Click here to pay the utilty 💸</button></a>
                    <p>&nbsp;</p>
                    <p id="title3">🙆‍♀️ How to check the breakdown</p>
                    <p id="subtitle">You can check it both on the paper bill and the APP, regardless of the rent fee (임대료)<br/>
                    {`If you want to check through the APP, click the top right button and find 'Maintenace Fee'`}</p>

                    <details>
                    <summary id="subtitle">Details for the bill on the APP</summary>
                    <p id="subtitle3">{`This bill is normally issued a month later, so you can find a bill for August on the tap named "2022year 09month"`}</p>
                    <p id="subtitle3">&nbsp;ㆍ This image is for a reference<br/>
                    &nbsp;ㆍ {`If you click the purple button named 'Check the deposit account' and pay to that account, it will be hard to be confirmed faster`}<br/>
                    &nbsp;ㆍ Just use that page as checking for the breakdown, Click the button above on this page to the payment</p>
                    <p></p>
                    <img id="screenshot" src="https://github.com/hirediversity/app/blob/main/Resized_Screenshot_20220926-170716.jpg?raw=true"></img>
                    </details>
                    <p></p>
                    <p id="subtitle">{`If you don't have an access of your APP account, please click the button below!`}</p>

                    <a href='https://form.jotform.com/221941752449057' target="_blank" rel="noreferrer">
                    <button type="button" className="btn btn-primary btn-sm" id="searchBtn">Submit information to make the APP account</button></a>
                </>
                )
            }
        


    return (
        <div>
            {
                <Normal />
            }
        </div>
    )
}



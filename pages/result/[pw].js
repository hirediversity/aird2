import React, { useState, useEffect } from "react";
import Image from "next/image"
import Link from "next/link"
import fetch from 'node-fetch'


export async function getServerSideProps(context) {
    const rec_id = context.params.pw

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
      <link rel="apple-touch-icon" href="../자산 4@300x-8.png" />
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
    const alert = console.log.bind(console);
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
            <a href="https://www.jotform.com/app/221943338469465"><img id="hirelogo" src='../aird1@300x-8 - 복사본.png'/></a></div>
            


            <div>
                <Content props={props}/>
            </div>

            
            <a href="https://www.jotform.com/app/221943338469465">
                <button type="button" className="btn btn-primary btn-sm" id="searchBtn2">Back to Main</button>
            </a>

            
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

        var checkin = data.체크인.split("-");
        var checkinD = new Date(`${checkin[0]}-${checkin[1]}-${checkin[2]}`);
        var checkout = data.체크아웃.split("-");
        var checkoutD = new Date(`${checkout[0]}-${checkout[1]}-${checkout[2]}`);
        // var interval = checkoutD - checkinD;
        // var day = 1000*60*60*24;
        // var month = day*30;
        // var months = parseInt(interval/month);
        var fordec = new Date("2023-01-01");
        var fornov = new Date("2022-12-01");
        var foroct = new Date("2022-11-01");
        var forsep = new Date("2022-10-01");



            return (
                <>
                <p id="title2">Hello, {data.이름}!</p>
                <p id="subtitle2">From the contents below, you can check the status of your <b>monthly rent and utility</b>.</p>
                <p id="subtitle2">&nbsp;</p>
                <p id="title">Utility Fee</p>
                <p id='subtitle2'>Check your maintenance fee that <b>used in October</b>.</p>


                <p id="title3">🙋‍♀️ Total amount for October</p>
                <p id="subtitle">The amount you have to pay is <b>{data.관리비안내용}KRW</b>,<br/>
                You can pay it through the button below!</p>
                <p id="subtitle">Payment due : <b>2022. 11. 30</b></p>

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
                <button type="button" className="btn btn-primary btn-sm" id="searchBtn">Submit information to make an APP account</button></a>
                <p id="subtitle3">&nbsp;</p>
                <p id="subtitle2">&nbsp;</p>
                <p id="title">Monthly Rent</p>
                <p id="subtitle2">Maximum three months are displayed below,<br/>each status will be changed within a week after pay!</p>

                    {/* 12월 월세 */}
                    {
                        checkinD < fordec && fordec < checkoutD && Number(checkout[1]) !== 12 && Date(`2023-01-${Number(checkin[2])-1}`) < checkoutD
                        ? data.상태.toString().indexOf("22-12") !== -1 || data.상태.toString().indexOf("완납") !== -1
                        ? (Number(checkin[2]) === 1
                            ? <div className="card">
                                <div className="card-body" id="card">
                                <img src="../checked.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-12</p>
                                <p id="subtitle">Covers from {checkin[0]}. 12. {Number(checkin[2])}. to {checkin[0]}. 12. 31.</p>
                            </div>
                            </div>
                            : <div className="card">
                                <div className="card-body" id="card">
                                <img src="../checked.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-12</p>
                                <p id="subtitle">Covers from {checkin[0]}. 12. {Number(checkin[2])}. to 2023. 01. {Number(checkin[2])-1}.</p>
                            </div>
                            </div>)
                        : (Number(checkin[2]) === 1
                            ? <a href={data.월세납부링크} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-12<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 12. {Number(checkin[2])}. to {checkin[0]}. 12. 31.</p>
                            </div>
                            </div></a>
                            : <a href={data.월세납부링크} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-12<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 12. {Number(checkin[2])}. to 2023. 01. {Number(checkin[2])-1}.</p>
                            </div>
                            </div></a>)
                        : checkinD < fordec && fordec < checkoutD && Number(checkout[1]) !== 12
                        ? data.상태.toString().indexOf("22-12") !== -1 || data.상태.toString().indexOf("완납") !== -1
                        ? <div className="card">
                                <div className="card-body" id="card">
                                <img src="../checked.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-12</p>
                                <p id="subtitle">Covers from {checkin[0]}. 12. {Number(checkin[2])}. to {checkout[0]}. {checkout[1]}. {checkout[2]}.</p>
                            </div>
                            </div>
                        : data.월세잔금 - data.월세 > 0
                        ? <a href={"https://form.jotform.com/221793411877463/prefill/62dfa450314c5c71c82884c3eb7d&email=" + data.이메일 + "&totalkrw=" + Number(data.월세잔금 - data.월세) + "&totalusd=" + Math.ceil(Number(data.월세잔금 - data.월세)/1180*1.1)} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-12<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 12. {Number(checkin[2])}. to {checkout[0]}. {checkout[1]}. {checkout[2]}.</p>
                            </div>
                            </div></a>
                        : <a href={"https://form.jotform.com/221793411877463/prefill/62dfa450314c5c71c82884c3eb7d&email=" + data.이메일 + "&totalkrw=" + Number(data.월세잔금) + "&totalusd=" + Math.ceil(Number(data.월세잔금)/1180*1.1)} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-12<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 12. {Number(checkin[2])}. to {checkout[0]}. {checkout[1]}. {checkout[2]}.</p>
                            </div>
                            </div></a>
                        : null
                    }

                    {/* 11월 월세 */}
                    {
                        checkinD < fornov && fornov < checkoutD && Number(checkout[1]) !== 11 && Date(`2022-12-${Number(checkin[2])-1}`) < checkoutD
                        ? data.상태.toString().indexOf("22-11") !== -1 || data.상태.toString().indexOf("완납") !== -1
                        ? (Number(checkin[2]) === 1
                            ? <div className="card">
                                <div className="card-body" id="card">
                                <img src="../checked.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-11</p>
                                <p id="subtitle">Covers from {checkin[0]}. 11. {Number(checkin[2])}. to {checkin[0]}. 11. 30.</p>
                            </div>
                            </div>
                            : <div className="card">
                                <div className="card-body" id="card">
                                <img src="../checked.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-11</p>
                                <p id="subtitle">Covers from {checkin[0]}. 11. {Number(checkin[2])}. to 2022. 12. {Number(checkin[2])-1}.</p>
                            </div>
                            </div>)
                        : (Number(checkin[2]) === 1
                            ? <a href={data.월세납부링크} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-11<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 11. {Number(checkin[2])}. to {checkin[0]}. 11. 30.</p>
                            </div>
                            </div></a>
                            : <a href={data.월세납부링크} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-11<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 11. {Number(checkin[2])}. to 2022. 12. {Number(checkin[2])-1}.</p>
                            </div>
                            </div></a>)
                        : checkinD < fornov && fornov < checkoutD && Number(checkout[1]) !== 11
                        ? data.상태.toString().indexOf("22-11") !== -1 || data.상태.toString().indexOf("완납") !== -1
                        ? <div className="card">
                                <div className="card-body" id="card">
                                <img src="../checked.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-11</p>
                                <p id="subtitle">Covers from {checkin[0]}. 11. {Number(checkin[2])}. to {checkout[0]}. {checkout[1]}. {checkout[2]}.</p>
                            </div>
                            </div>
                        : data.월세잔금 - data.월세 > 0
                        ? <a href={"https://form.jotform.com/221793411877463/prefill/62dfa450314c5c71c82884c3eb7d&email=" + data.이메일 + "&totalkrw=" + Number(data.월세잔금 - data.월세) + "&totalusd=" + Math.ceil(Number(data.월세잔금 - data.월세)/1180*1.1)} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-11<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 11. {Number(checkin[2])}. to {checkout[0]}. {checkout[1]}. {checkout[2]}.</p>
                            </div>
                            </div></a>
                        : <a href={"https://form.jotform.com/221793411877463/prefill/62dfa450314c5c71c82884c3eb7d&email=" + data.이메일 + "&totalkrw=" + Number(data.월세잔금) + "&totalusd=" + Math.ceil(Number(data.월세잔금)/1180*1.1)} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-11<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 11. {Number(checkin[2])}. to {checkout[0]}. {checkout[1]}. {checkout[2]}.</p>
                            </div>
                            </div></a>
                        : null
                    }

                    {/* 10월 월세 */}
                    {
                        checkinD < foroct && foroct < checkoutD
                        ? data.상태.toString().indexOf("22-10") !== -1 || data.상태.toString().indexOf("완납") !== -1
                        ? (Number(checkin[2]) === 1
                            ? <div className="card">
                                <div className="card-body" id="card">
                                <img src="../checked.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-10</p>
                                <p id="subtitle">Covers from {checkin[0]}. 10. {Number(checkin[2])}. to {checkin[0]}. 10. 31.</p>
                            </div>
                            </div>
                            : <div className="card">
                                <div className="card-body" id="card">
                                <img src="../checked.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-10</p>
                                <p id="subtitle">Covers from {checkin[0]}. 10. {Number(checkin[2])}. to {checkin[0]}. 11. {Number(checkin[2])-1}.</p>
                            </div>
                            </div>)
                        : (Number(checkin[2]) === 1
                            ? <a href={"https://form.jotform.com/221793411877463/prefill/62dfa450314c5c71c82884c3eb7d&email=" + data.이메일 + "&totalkrw=" + Number(data.월세) + "&totalusd=" + Math.ceil(Number(data.월세)/1180*1.1)} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-10<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 10. {Number(checkin[2])}. to {checkin[0]}. 10. 31.</p>
                            </div>
                            </div></a>
                            : <a href={"https://form.jotform.com/221793411877463/prefill/62dfa450314c5c71c82884c3eb7d&email=" + data.이메일 + "&totalkrw=" + Number(data.월세) + "&totalusd=" + Math.ceil(Number(data.월세)/1180*1.1)} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-10<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 10. {Number(checkin[2])}. to {checkin[0]}. 11. {Number(checkin[2])-1}.</p>
                            </div>
                            </div></a>)
                        : null
                    }
               
                    {/* 9월 월세 */}
                    {/* {
                        checkinD < forsep && forsep < checkoutD
                        ? data.상태.toString().indexOf("22-9") !== -1 || data.상태.toString().indexOf("완납") !== -1
                        ? (Number(checkin[2]) === 1
                            ? <div className="card">
                                <div className="card-body" id="card">
                                <img src="../checked.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-9</p>
                                <p id="subtitle">Covers from {checkin[0]}. 9. {Number(checkin[2])}. to {checkin[0]}. 9. 30.</p>
                            </div>
                            </div>
                            : <div className="card">
                                <div className="card-body" id="card">
                                <img src="../checked.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-9</p>
                                <p id="subtitle">Covers from {checkin[0]}. 9. {Number(checkin[2])}. to {checkin[0]}. 10. {Number(checkin[2])-1}.</p>
                            </div>
                            </div>)
                        : (Number(checkin[2]) === 1
                            ? <a href={"https://form.jotform.com/221793411877463/prefill/62dfa450314c5c71c82884c3eb7d&email=" + data.이메일 + "&totalkrw=" + Number(data.월세) + "&totalusd=" + Math.ceil(Number(data.월세)/1180*1.1)} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-9<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 9. {Number(checkin[2])}. to {checkin[0]}. 9. 30.</p>
                            </div>
                            </div></a>
                            : <a href={"https://form.jotform.com/221793411877463/prefill/62dfa450314c5c71c82884c3eb7d&email=" + data.이메일 + "&totalkrw=" + Number(data.월세) + "&totalusd=" + Math.ceil(Number(data.월세)/1180*1.1)} target="_blank" rel="noreferrer" id="cardlink">
                                <div className="card">
                                <div className="card-body" id="card">
                                <img src="../cancel.png" id="납부아이콘"></img>
                                <p id="boxtitle">{checkin[0]}-9<p id="paytext">👈 Click to pay</p></p>
                                <p id="subtitle">Covers from {checkin[0]}. 9. {Number(checkin[2])}. to {checkin[0]}. 10. {Number(checkin[2])-1}.</p>
                            </div>
                            </div></a>)
                        : null
                    } */}
                                                          
                    <p id="subtitle3">&nbsp;</p>

                    

                    
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



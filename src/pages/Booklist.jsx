import React, { useState, useCallback, useContext, useEffect } from 'react'
import {
  IonContent, IonHeader, IonPage, IonImg, IonToolbar, IonIcon, IonItem, IonLabel, IonButton,
  IonList, IonRouterLink, IonThumbnail
} from '@ionic/react';
import './Booklist.css';
import Axios from "axios";

const Booklist = ({ ...props }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  async function getData() {
    await Axios.get("http://localhost:3000/book/app/" + props.match.params.name, {})
      .then((res) => {
        // console.log(res.data);
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(async () => {
    await getData()
    await setLoading(false);
  }, [])

  return (

    <IonPage className="Booklist-Page">

      {/* <IonToolbar className="toolbar">
        Garzip
      </IonToolbar> */}

      <IonContent fullscreen>
        <div className='Booklist'>
          <div className="bar">
            <IonRouterLink href='/HOME' className="button-back">
              <IonIcon name="chevron-back-outline" ></IonIcon>
            </IonRouterLink>
          </div>
          <h1>{props.match.params.name}</h1>

          {/* <IonRouterLink href='/DetailBook/' className="button-back"> */}
          <IonList >
            {data.map((book, i) => {
              return (
                <IonRouterLink href={`/DetailBook/${book._id}`} className="button-back">
                  <IonItem key={i} >
                    <IonThumbnail slot="start" >
                      <IonImg src={book.image} />
                    </IonThumbnail>
                    <span className="book">
                      <IonLabel className='title'>{book.name}</IonLabel>
                      <IonLabel className='detial'>เขียนโดย : {book.auther}</IonLabel>
                      <IonLabel className='detial'>ระยะเวลา : 00.00 น.</IonLabel>
                    </span>
                  </IonItem>
                </IonRouterLink>
              )
            })}
          </IonList>
          {/* </IonRouterLink> */}


        </div>

      </IonContent>
    </IonPage>

  );
};

export default Booklist;

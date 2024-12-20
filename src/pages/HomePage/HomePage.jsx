import React, { useEffect, useState } from "react";
import "./HomePage.css";

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent, { DetalhesEvents } from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import Notification from "../../components/Notification/Notification";

import api, { eventsResource } from '../../Services/Service';

import { nextEventResource } from '../../Services/Service';



const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [backEvents, setBackEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState([])

  //roda somente na inicialização do componente
  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await api.get(nextEventResource)
        const dados = await promise.data;

        setNextEvents(dados); //atualiza o state
      } catch (error) {
        console.log(error);
      }
    }

    async function getBackEvents() {
      try {
        const request = await api.get(`${eventsResource}/ListarAnteriores`)

        setBackEvents(request.data)

      } catch (error) {
        // alert("Deu ruim no back Events")
        console.log("Deu ruim no back Events", error);
      }
    }

    getNextEvents(); //roda a função
    getBackEvents(); //roda a outra função
  }, [])



  return (

    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>

          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">

            {/* dentro da div event blocks nós criamos
                            um código de javascript usando as chaves */}
            {
              // Aqui chamamos a array criada e criamos um componente para cada item dela
              nextEvents.map((e) => {
                return (
                  <NextEvent
                    key={e.idEvento}
                    idEvent={e.idEvento}
                    title={e.nomeEvento}
                    description={e.descricao}
                    eventDate={e.dataEvento}
                    linkText={"Conectar"}
                  />
                );
              })
            }
          </div>
        </Container>

        <Container>
          <Title titleText={"Eventos Passados"} />

          <div className="events-box">
            {/* dentro da div event blocks nós criamos
                            um código de javascript usando as chaves */}
            {
              // Aqui chamamos a array criada e criamos um componente para cada item dela
              backEvents.map((e) => {
                return (
                  <DetalhesEvents
                    key={e.idEvento}
                    idEvent={e.idEvento}
                    title={e.nomeEvento}
                    description={e.descricao}
                    eventDate={e.dataEvento}
                    text={"Visualizar"}
                  />
                );
              })
              
              // .filter((e) => new Date(e.dataEvento) < Date.now())
            }
          </div>
        </Container>

      </section>

      <VisionSection />
      <ContactSection />
    </MainContent >
  );
};

export default HomePage;

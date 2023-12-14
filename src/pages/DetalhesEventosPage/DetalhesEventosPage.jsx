import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import Spinner from "../../components/Spinner/Spinner";
import api, { commentaryEventResource, eventsResource } from "../../Services/Service";



import "./DetalhesEventosPage.css";
import { UserContext } from "../../context/AuthContext";
import { DetalhesEvents } from "../../components/NextEvent/NextEvent";
import { useParams } from "react-router-dom";
import Table from "./TableDv/TableDv";



const DetalhesEventosPage = () => {
    const [showSpinner, setShowSpinner] = useState(false);

    // Use o hook useParams para obter o ID da URL
    const { id } = useParams();
    const { userData } = useContext(UserContext);

    const [eventos, setEventos] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [idEvento, setIdEvento] = useState(id);
    const [nomeEvento, setnomeEvento] = useState("");
    const [descricao, setdescricao] = useState("");
    const [dataEvento, setdataEvento] = useState("");


    async function loadAll() {
        setShowSpinner(true);

        try {
            const promise = await api.get(eventsResource)
            setEventos(promise.data);
            const promiseEvento = await api.get(`/Evento/${idEvento}`)
            setdescricao(promiseEvento.data.descricao)
            setnomeEvento(promiseEvento.data.nomeEvento)
            setdataEvento(promiseEvento.data.dataEvento)


        } catch (error) { 
            console.log(error);
        }

        setShowSpinner(false);

    }

    async function loadComentario() {

        setShowSpinner(true);

        try {
            const promiseAll = await api.get(commentaryEventResource + `?idEvento=${id}`)
            const promiseShow = await api.get(commentaryEventResource + `/ListarSomenteExibe?idEvento=${id}`)

            console.log(promiseAll);

            console.log(".............");

            console.log(promiseShow);

           setComentarios(userData.role === "Administrador"  ? promiseAll.data : promiseShow.data );

        } catch (error) { 

        }
        setShowSpinner(false);
    }

    useEffect(() => {

        loadAll();
        loadComentario();

    }, [userData])


    return (
        <>
            <MainContent>
                <Container>
                    <Title titleText={"Detalhes"} additionalClass="custom-title" />
                    <br />


                    <div className="container__detalhes">

                        <DetalhesEvents
                            key={idEvento}
                            title={nomeEvento}
                            description={descricao}
                            eventDate={dataEvento}
                            additionalClass={"event-card__detalhes"}
                        />

                        {/* <h1>{id}</h1> */}

                        <Table
                            dados={comentarios}
                            idEvento={idEvento}
                        />

                    </div>

                </Container>
            </MainContent>
            {/* SPINNER -Feito com position */}
            {showSpinner ? <Spinner /> : null}


        </>
    );
};

export default DetalhesEventosPage;
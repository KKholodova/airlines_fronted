import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {CardImg, Col, Container, Row} from "reactstrap";
import mockImage from "assets/mock.png";
import {T_Airline} from "modules/types.ts";
import {AirlineMocks} from "modules/mocks.ts";

type Props = {
    selectedAirline: T_Airline | null,
    setSelectedAirline: React.Dispatch<React.SetStateAction<T_Airline | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const AirlinePage = ({selectedAirline, setSelectedAirline, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const env = await import.meta.env;
            const response = await fetch(`${env.VITE_API_URL}/api/airlines/${id}`)
            const data = await response.json()
            setSelectedAirline(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedAirline(AirlineMocks.find(airline => airline?.id == parseInt(id as string)) as T_Airline)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedAirline(null)
    }, []);

    if (!selectedAirline) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <CardImg src={isMock ? mockImage as string : selectedAirline.image} className="mb-3" />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedAirline.name}</h1>
                    <p className="fs-5">Описание: {selectedAirline.description}</p>
                    <p className="fs-5">Год основания: {selectedAirline.foundation_year}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default AirlinePage
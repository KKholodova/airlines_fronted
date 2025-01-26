import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import AirlineCard from "components/AirlineCard/AirlineCard.tsx";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {RootState, useAppSelector} from "src/store/store.ts";
import {updateAirlineName} from "src/store/slices/airlinesSlice.ts";
import {T_Airline} from "modules/types.ts";
import {AirlineMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";
import "./styles.css"

type Props = {
    airlines: T_Airline[],
    setAirlines: React.Dispatch<React.SetStateAction<T_Airline[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const AirlinesListPage = ({airlines, setAirlines, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {airline_name} = useAppSelector((state:RootState) => state.airlines)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateAirlineName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setAirlines(AirlineMocks.filter(airline => airline.name.toLowerCase().includes(airline_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchAirlines()
    }

    const fetchAirlines = async () => {
        try {
            const env = await import.meta.env;
            const response = await fetch(`${env.VITE_API_URL}/api/airlines/?airline_name=${airline_name.toLowerCase()}`)
            const data = await response.json()
            setAirlines(data.airlines)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchAirlines()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={airline_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {airlines?.map(airline => (
                    <Col key={airline.id} sm="12" md="6" lg="4">
                        <AirlineCard airline={airline} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AirlinesListPage
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import AirlinePage from "pages/AirlinePage/AirlinePage.tsx";
import AirlinesListPage from "pages/AirlinesListPage/AirlinesListPage.tsx";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage/HomePage.tsx";
import {useState} from "react";
import {T_Airline} from "modules/types.ts";

function App() {

    const [airlines, setAirlines] = useState<T_Airline[]>([])

    const [selectedAirline, setSelectedAirline] = useState<T_Airline | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedAirline={selectedAirline}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/airlines/" element={<AirlinesListPage airlines={airlines} setAirlines={setAirlines} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/airlines/:id" element={<AirlinePage selectedAirline={selectedAirline} setSelectedAirline={setSelectedAirline} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App

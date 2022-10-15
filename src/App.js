import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";


export default function App() {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        axios.get("https://api.spacexdata.com/v4/launches")
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    return (
        <div className="container h-100 mt-5 px-5">
            <div className="row h-100 justify-content-center align-items-center"></div>
                <InputGroup className="col-6">
                <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    onChange={(e) => searchItems(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Search
                </Button>
                </InputGroup>

                <ListGroup variant="flush" itemsPerRow={3} style={{ marginTop: 20 }}>
                    {searchInput.length > 1 ? (
                        filteredResults.map((item) => {
                          return (
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                  <img
                                      alt=""
                                      src={item.links.patch.small}
                                      width="100"
                                      height="100"
                                  />
                                  
                                    <p className = "header">
                                      Flight {item.flight_number}: {item.name} ({item.date_utc})
                                    </p>

                                    <p className = "small">
                                      Details: {item.details}
                                    </p>

                                </ListGroup.Item>
                                <br />
                            </ListGroup>
                        )
                    })
                    ) : (
                        APIData.map((item) => {
                            return (
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                      <img
                                          alt=""
                                          src={item.links.patch.small}
                                          width="100"
                                          height="100"
                                      />
                                      
                                        <p className = "header">
                                          Flight {item.flight_number}: {item.name} ({item.date_utc})
                                        </p>

                                        <p className = "small">
                                          Details: {item.details}
                                        </p>
                                      
                                    </ListGroup.Item>
                                    <br />
                                </ListGroup>
                            )
                        })
                    )}
                </ListGroup>
            </div>
    )
}